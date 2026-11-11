"""
Lógica de negocio del módulo sesiones.
Aquí van las reglas reales (cálculos, validaciones de negocio, orquestación).
No debe conocer detalles de HTTP ni de SQL directamente.
"""
import random
import string
import re
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from . import repository, schemas, models
from modules.usuarios import services as usuarios_services
from modules.ia import services as ia_services

# ── Moderación de contenido (Regla 8 de AGENTS.md) ──────────────────────────

PALABRAS_PROHIBIDAS = [
    r"\bidiota\b", r"\bestupido\b", r"\bmierda\b", r"\bimbecil\b",
    r"\bhijo de puta\b", r"\bculero\b", r"\bputa\b", r"\bperra\b"
]

def moderar_texto(texto: str) -> str:
    """Filtra y censura lenguaje ofensivo en salas colaborativas."""
    texto_limpio = texto.strip()
    for patron in PALABRAS_PROHIBIDAS:
        texto_limpio = re.sub(patron, "***", texto_limpio, flags=re.IGNORECASE)
    return texto_limpio

def generar_codigo_sala(prefijo: str = "EST") -> str:
    """Genera un código amigable para unirse a salas (ej: EST-4921)."""
    letras = "".join(random.choices(string.ascii_uppercase, k=3))
    numeros = "".join(random.choices(string.digits, k=3))
    return f"{letras}-{numeros}"

# ── Lógica de Sesiones y Salas ──────────────────────────────────────────────

async def crear_sala(
    db: AsyncSession, 
    usuario_id: UUID, 
    tema: str
) -> schemas.SesionDetalleResponse:
    # 1. Generar código único
    codigo = None
    for _ in range(5):
        posible_codigo = generar_codigo_sala()
        existente = await repository.obtener_sesion_por_codigo(db, posible_codigo)
        if not existente:
            codigo = posible_codigo
            break
    if not codigo:
        codigo = f"SALA-{random.randint(1000, 9999)}"

    # 2. Crear sesión en DB
    sesion = await repository.crear_sesion(db, usuario_id, codigo, tema)
    
    # 3. Añadir al creador como participante
    await repository.agregar_o_reconectar_participante(db, sesion.id, usuario_id)

    # 4. Obtener detalle completo
    return await obtener_detalle_sala(db, sesion.id, usuario_id)

async def unirse_a_sala_por_codigo(
    db: AsyncSession, 
    usuario_id: UUID, 
    codigo: str
) -> schemas.SesionDetalleResponse:
    sesion = await repository.obtener_sesion_por_codigo(db, codigo)
    if not sesion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No se encontró ninguna sala activa con el código '{codigo}'"
        )
    
    await repository.agregar_o_reconectar_participante(db, sesion.id, usuario_id)
    return await obtener_detalle_sala(db, sesion.id, usuario_id)

async def obtener_detalle_sala(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID
) -> schemas.SesionDetalleResponse:
    sesion = await repository.obtener_sesion_por_id(db, sesion_id)
    if not sesion:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Sala de estudio no encontrada"
        )

    # Obtener participantes y sus nombres
    participantes_db = await repository.listar_participantes(db, sesion.id)
    user_ids = [p.usuario_id for p in participantes_db]
    if sesion.creador_id not in user_ids:
        user_ids.append(sesion.creador_id)

    usuarios_dict = {
        u.id: u.nombre for u in await usuarios_services.obtener_usuarios_por_ids(db, user_ids)
    }

    participantes_info = [
        schemas.ParticipanteInfo(
            id=str(p.id),
            usuario_id=str(p.usuario_id),
            nombre=usuarios_dict.get(p.usuario_id, "Estudiante"),
            conectado=p.conectado,
            unido_en=p.unido_en
        )
        for p in participantes_db
    ]

    # Obtener mensajes recientes
    mensajes_db = await repository.listar_mensajes_recientes(db, sesion.id, limit=50)
    msg_user_ids = list({m.usuario_id for m in mensajes_db if m.usuario_id not in usuarios_dict})
    if msg_user_ids:
        usuarios_extra = {
            u.id: u.nombre for u in await usuarios_services.obtener_usuarios_por_ids(db, msg_user_ids)
        }
        usuarios_dict.update(usuarios_extra)

    mensajes_info = [
        schemas.MensajeSesionResponse(
            id=str(m.id),
            sesion_id=str(m.sesion_id),
            usuario_id=str(m.usuario_id),
            usuario_nombre=usuarios_dict.get(m.usuario_id, "Estudiante"),
            text=m.text,
            enviado_en=m.enviado_en
        )
        for m in mensajes_db
    ]

    return schemas.SesionDetalleResponse(
        id=str(sesion.id),
        creador_id=str(sesion.creador_id),
        creador_nombre=usuarios_dict.get(sesion.creador_id, "Creador"),
        tema=sesion.tema,
        codigo_invitacion=sesion.codigo_invitacion,
        estado=sesion.estado,
        creada_en=sesion.creada_en,
        participantes=participantes_info,
        mensajes_recientes=mensajes_info
    )

async def enviar_mensaje(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID, 
    text: str
) -> schemas.MensajeSesionResponse:
    # 1. Moderación del texto
    texto_moderado = moderar_texto(text)
    if not texto_moderado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El mensaje no puede estar vacío"
        )

    # 2. Validar que la sala exista y esté activa
    sesion = await repository.obtener_sesion_por_id(db, sesion_id)
    if not sesion or sesion.estado != "activa":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La sala no está activa"
        )

    # 3. Guardar mensaje
    mensaje = await repository.guardar_mensaje(db, sesion_id, usuario_id, texto_moderado)
    
    # 4. Obtener nombre del emisor
    usuario = await usuarios_services.obtener_usuario_por_id(db, usuario_id)
    nombre = usuario.nombre if usuario else "Estudiante"

    return schemas.MensajeSesionResponse(
        id=str(mensaje.id),
        sesion_id=str(mensaje.sesion_id),
        usuario_id=str(mensaje.usuario_id),
        usuario_nombre=nombre,
        text=mensaje.text,
        enviado_en=mensaje.enviado_en
    )

async def salir_de_sala(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID
) -> None:
    await repository.marcar_desconexion_participante(db, sesion_id, usuario_id)

async def listar_salas_publicas(
    db: AsyncSession
) -> List[schemas.SesionListItem]:
    sesiones_db = await repository.listar_sesiones_activas(db, limit=20)
    if not sesiones_db:
        return []

    creadores_ids = list({s.creador_id for s in sesiones_db})
    usuarios = await usuarios_services.obtener_usuarios_por_ids(db, creadores_ids)
    creadores_dict = {u.id: u.nombre for u in usuarios}

    items = []
    for s in sesiones_db:
        participantes_count = await repository.contar_participantes(db, s.id)
        items.append(schemas.SesionListItem(
            id=str(s.id),
            creador_id=str(s.creador_id),
            creador_nombre=creadores_dict.get(s.creador_id, "Estudiante"),
            tema=s.tema,
            codigo_invitacion=s.codigo_invitacion,
            estado=s.estado,
            participantes_count=participantes_count,
            creada_en=s.creada_en
        ))
    return items

# ── Matchmaking y Endpoints de API_DOCS.md ───────────────────────────────────

async def buscar_companeros(
    db: AsyncSession, 
    usuario_id: UUID
) -> schemas.BusquedaSesionesResponse:
    # 1. Obtener contexto del usuario actual (su última ruta)
    rutas_usuario = await ia_services.listar_rutas(db, usuario_id)
    if rutas_usuario:
        ruta_actual = rutas_usuario[0].tema
        nivel_actual = rutas_usuario[0].nivel_objetivo
    else:
        ruta_actual = "Python Backend & Inteligencia Artificial"
        nivel_actual = "Intermedio"

    # 2. Obtener otros usuarios de la plataforma
    otros_usuarios = await usuarios_services.listar_otros_usuarios(db, usuario_id, limite=6)
    
    companeros: List[schemas.CompaneroSugerido] = []
    tags_default = ["Algoritmos", "Backend", "APIs", "Machine Learning", "Full Stack", "Data Science"]
    
    for i, user in enumerate(otros_usuarios):
        tag = tags_default[i % len(tags_default)]
        if user.intereses and isinstance(user.intereses, list) and len(user.intereses) > 0:
            tag = str(user.intereses[0])

        companeros.append(schemas.CompaneroSugerido(
            id=str(user.id),
            nombre=user.nombre,
            ruta_actual=user.objetivos or ruta_actual,
            nivel=user.nivel or "Intermedio",
            tag_interes=tag,
            disponible=True
        ))

    # Si hay pocos usuarios registrados aún, proveer compañeros recomendados para que la interfaz siempre sea rica
    if len(companeros) < 3:
        bots_demo = [
            {"id": "demo-1", "nombre": "Camila Torres", "ruta": ruta_actual, "nivel": nivel_actual, "tag": "Machine Learning"},
            {"id": "demo-2", "nombre": "David Méndez", "ruta": ruta_actual, "nivel": "Principiante", "tag": "Algoritmos"},
            {"id": "demo-3", "nombre": "Sofía Morales", "ruta": "Frontend & APIs", "nivel": "Intermedio", "tag": "React & APIs"},
        ]
        for bot in bots_demo:
            if len(companeros) < 5:
                companeros.append(schemas.CompaneroSugerido(
                    id=bot["id"],
                    nombre=bot["nombre"],
                    ruta_actual=bot["ruta"],
                    nivel=bot["nivel"],
                    tag_interes=bot["tag"],
                    disponible=True
                ))

    return schemas.BusquedaSesionesResponse(
        contexto_actual=schemas.ContextoActual(
            ruta=ruta_actual,
            nivel=nivel_actual
        ),
        companeros_sugeridos=companeros
    )

async def get_proxima_sesion(
    db: AsyncSession, 
    usuario_id: UUID
) -> schemas.ProximaSesionResponse:
    ultima = await repository.obtener_ultima_sesion_usuario(db, usuario_id)
    if not ultima:
        return schemas.ProximaSesionResponse(hay_sesion=False, sesion=None)

    participantes_count = await repository.contar_participantes(db, ultima.id)
    return schemas.ProximaSesionResponse(
        hay_sesion=True,
        sesion=schemas.SesionProxima(
            id=str(ultima.id),
            fecha_hora=ultima.creada_en.isoformat(),
            participantes_count=participantes_count,
            tema=ultima.tema,
            codigo_invitacion=ultima.codigo_invitacion
        )
    )
