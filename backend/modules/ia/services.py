from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from uuid import UUID
from typing import List

from sqlalchemy.orm import selectinload
from . import models, schemas

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

async def generar_ruta(db: AsyncSession, usuario_id: UUID, ruta_in: schemas.RutaAprendizajeCreate) -> models.RutaAprendizaje:
    # 1. Crear el registro base de la ruta
    nueva_ruta = models.RutaAprendizaje(
        usuario_id=usuario_id,
        tema=ruta_in.tema,
        nivel_objetivo=ruta_in.nivel_objetivo
    )
    db.add(nueva_ruta)
    await db.flush() # Para obtener el ID

    # TODO: Aquí llamaremos al LLM (OpenAI o Anthropic) para que genere 
    # el JSON con las lecciones basadas en el tema y nivel_objetivo.
    # Por ahora creamos lecciones hardcodeadas de prueba.
    
    leccion_1 = models.Leccion(
        ruta_id=nueva_ruta.id,
        orden=1,
        titulo=f"Introducción a {ruta_in.tema}",
        dificultad="Principiante",
        contenido={"texto": "Aquí aprenderás los conceptos básicos."}
    )
    db.add(leccion_1)
    
    await db.commit()
    await db.refresh(nueva_ruta)
    return nueva_ruta

async def enviar_mensaje_tutor(db: AsyncSession, leccion_id: UUID, texto: str) -> schemas.MensajeTutorResponse:
    # 1. Guardar mensaje del usuario
    msg_usuario = models.MensajeTutor(
        leccion_id=leccion_id,
        rol="user",
        text=texto
    )
    db.add(msg_usuario)
    await db.flush()

    # TODO: Aquí recuperaremos el historial de mensajes de esta lección,
    # llamaremos al LLM y le pediremos la respuesta del Tutor.
    # Por ahora mockeamos la respuesta.
    respuesta_llm = f"He recibido tu duda sobre la lección. Te ayudaré a entenderlo. (Mock LLM)"

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
