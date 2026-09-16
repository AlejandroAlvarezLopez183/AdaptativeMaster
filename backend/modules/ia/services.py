from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from uuid import UUID
from typing import List

from sqlalchemy.orm import selectinload
from . import models, schemas
from modules.compartido.openrouter_client import chat_completion, chat_completion_json
from modules.compartido.prompts import TUTOR_SYSTEM_PROMPT, RUTA_GENERATION_PROMPT

async def listar_rutas(db: AsyncSession, usuario_id: UUID) -> List[models.RutaAprendizaje]:
    result = await db.execute(
        select(models.RutaAprendizaje)
        .options(selectinload(models.RutaAprendizaje.lecciones))
        .where(models.RutaAprendizaje.usuario_id == usuario_id)
        .order_by(models.RutaAprendizaje.generada_en.desc())
    )
    return result.scalars().all()

async def obtener_ruta_por_id(db: AsyncSession, ruta_id: UUID, usuario_id: UUID) -> models.RutaAprendizaje:
    result = await db.execute(
        select(models.RutaAprendizaje)
        .options(selectinload(models.RutaAprendizaje.lecciones))
        .where(models.RutaAprendizaje.id == ruta_id, models.RutaAprendizaje.usuario_id == usuario_id)
    )
    ruta = result.scalars().first()
    if not ruta:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")
    return ruta

async def obtener_leccion_por_id(db: AsyncSession, leccion_id: UUID) -> models.Leccion:
    result = await db.execute(
        select(models.Leccion).where(models.Leccion.id == leccion_id)
    )
    leccion = result.scalars().first()
    if not leccion:
        raise HTTPException(status_code=404, detail="Leccion no encontrada")
    return leccion

async def generar_ruta(
    db: AsyncSession,
    usuario_id: UUID,
    ruta_in: schemas.RutaAprendizajeCreate
) -> models.RutaAprendizaje:
    # 1. Crear el registro base de la ruta
    nueva_ruta = models.RutaAprendizaje(
        usuario_id=usuario_id,
        tema=ruta_in.tema,
        nivel_objetivo=ruta_in.nivel_objetivo
    )
    db.add(nueva_ruta)
    await db.flush()  # Obtenemos el ID antes del commit

    # 2. Construir el prompt con el perfil del usuario y llamar al LLM
    prompt_usuario = RUTA_GENERATION_PROMPT.format(
        tema=ruta_in.tema,
        nivel=ruta_in.nivel_objetivo,
        tiempo=getattr(ruta_in, 'tiempo', '30 minutos al dia'),
        objetivo=getattr(ruta_in, 'objetivo', 'Crecimiento profesional'),
        estilo_aprendizaje=getattr(ruta_in, 'estilo_aprendizaje', 'Practico'),
        tono_tutor=getattr(ruta_in, 'tono_tutor', 'Amigable'),
    )

    try:
        ruta_generada = await chat_completion_json(
            messages=[
                {"role": "user", "content": prompt_usuario}
            ],
            model_key="ruta",
            temperature=0.4,
            max_tokens=8000,
        )
    except Exception as e:
        # Si la IA falla, hacemos rollback de la ruta base (no dejamos basura en la BD)
        await db.rollback()
        print(f"[ERROR] Falló OpenRouter al generar ruta: {e}")
        raise HTTPException(
            status_code=500,
            detail="La IA está saturada y no pudo generar tu temario. Por favor intenta de nuevo."
        )

    # 3. Persistir las lecciones generadas por el LLM
    lecciones_json = ruta_generada.get("lecciones", [])
    for lec_data in lecciones_json:
        leccion = models.Leccion(
            ruta_id=nueva_ruta.id,
            orden=lec_data.get("orden", 1),
            titulo=lec_data.get("titulo", "Sin título"),
            dificultad=lec_data.get("dificultad", "Principiante"),
            contenido={
                "resumen": lec_data.get("resumen", ""),
                "objetivos": lec_data.get("objetivos", []),
                "tipo": lec_data.get("tipo", "lesson"),
                "tipo_minijuego": lec_data.get("tipo_minijuego", None),
                "datos_minijuego": lec_data.get("datos_minijuego", None),
            }
        )
        db.add(leccion)

    await db.commit()
    # Refrescamos la ruta cargando explícitamente la relación lecciones recién creadas
    await db.refresh(nueva_ruta, ["lecciones"])
    return nueva_ruta

async def enviar_mensaje_tutor(
    db: AsyncSession,
    leccion_id: UUID,
    texto: str,
    usuario_id: UUID | None = None
) -> schemas.MensajeTutorResponse:
    # 1. Recuperar la lección para obtener contexto
    leccion = await obtener_leccion_por_id(db, leccion_id)
    contenido_leccion = leccion.contenido or {}
    leccion_contexto = (
        f"Lección: {leccion.titulo}\n"
        f"Resumen: {contenido_leccion.get('resumen', 'No disponible')}\n"
        f"Objetivos: {', '.join(contenido_leccion.get('objetivos', []))}"
    )

    # 2. Recuperar historial de la conversación (últimos 10 mensajes)
    historial = await obtener_historial_chat(db, leccion_id)
    mensajes_previos = [
        {"role": m.rol, "content": m.text}
        for m in historial[-10:]  # Solo los últimos 10 para no exceder el contexto
    ]

    # 3. Guardar mensaje del usuario en la BD
    msg_usuario = models.MensajeTutor(
        leccion_id=leccion_id,
        rol="user",
        text=texto
    )
    db.add(msg_usuario)
    await db.flush()

    # 4. Construir el payload de mensajes para el LLM
    system_prompt = TUTOR_SYSTEM_PROMPT.format(
        leccion_contexto=leccion_contexto,
        objetivo_usuario="Crecimiento profesional",  # TODO: leer del perfil del usuario
        estilo_aprendizaje="Práctico",               # TODO: leer del perfil del usuario
        tono_tutor="Amigable",                        # TODO: leer del perfil del usuario
    )

    messages = [
        {"role": "system", "content": system_prompt},
        *mensajes_previos,
        {"role": "user", "content": texto},
    ]

    # 5. Llamar al LLM
    try:
        respuesta_llm = await chat_completion(
            messages=messages,
            model_key="tutor",
            temperature=0.7,
            max_tokens=800,
        )
    except Exception as e:
        respuesta_llm = "Lo siento, tuve un problema al procesar tu pregunta. Intenta de nuevo en un momento. 🙏"
        print(f"[ERROR] Fallo llamada a OpenRouter (tutor): {e}")

    # 6. Guardar respuesta del tutor en la BD
    msg_tutor = models.MensajeTutor(
        leccion_id=leccion_id,
        rol="assistant",
        text=respuesta_llm
    )
    db.add(msg_tutor)
    await db.commit()
    await db.refresh(msg_tutor)

    return msg_tutor

async def obtener_historial_chat(db: AsyncSession, leccion_id: UUID) -> List[models.MensajeTutor]:
    result = await db.execute(
        select(models.MensajeTutor)
        .where(models.MensajeTutor.leccion_id == leccion_id)
        .order_by(models.MensajeTutor.creado_en.asc())
    )
    return result.scalars().all()


async def generar_contenido_leccion(db: AsyncSession, leccion_id: UUID) -> models.Leccion:
    from modules.compartido.prompts import LECCION_CONTENT_GENERATION_PROMPT
    from modules.compartido.openrouter_client import chat_completion_json
    
    # 1. Obtener la lección y su ruta
    leccion = await obtener_leccion_por_id(db, leccion_id)
    result = await db.execute(select(models.RutaAprendizaje).where(models.RutaAprendizaje.id == leccion.ruta_id))
    ruta = result.scalars().first()
    
    if not ruta:
        raise HTTPException(status_code=404, detail="Ruta no encontrada para esta lección")

    # 2. Preparar el prompt
    prompt = LECCION_CONTENT_GENERATION_PROMPT.format(
        tema_ruta=ruta.tema,
        titulo_leccion=leccion.titulo,
        nivel=ruta.nivel_objetivo,
        dificultad=leccion.dificultad,
        resumen=leccion.contenido.get("resumen", "") if leccion.contenido else ""
    )

    # 3. Llamar a la IA
    try:
        contenido_generado = await chat_completion_json(
            messages=[{"role": "user", "content": prompt}],
            model_key="ruta",
            temperature=0.5,
            max_tokens=4000
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando contenido de lección: {e}")

    # 4. Actualizar la lección en DB (haciendo un merge con el contenido existente si lo hay)
    contenido_actual = dict(leccion.contenido) if leccion.contenido else {}
    
    contenido_actual["teoria"] = contenido_generado.get("teoria", "")
    contenido_actual["video_url"] = contenido_generado.get("video_url", "")
    contenido_actual["recursos_extra"] = contenido_generado.get("recursos_extra", [])
    
    from sqlalchemy.orm.attributes import flag_modified
    leccion.contenido = contenido_actual
    flag_modified(leccion, "contenido")

    await db.commit()
    await db.refresh(leccion)
    
    return leccion
