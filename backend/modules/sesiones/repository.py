"""
Acceso a datos del módulo sesiones.
Aquí van las queries a la base de datos (SQLAlchemy). Nada de lógica de negocio.
"""
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, func
from .models import SesionesEstudio, ParticipantesSesion, MensajesSesion

async def crear_sesion(
    db: AsyncSession, 
    creador_id: UUID, 
    codigo: str, 
    tema: str = "Estudio Colaborativo"
) -> SesionesEstudio:
    sesion = SesionesEstudio(
        creador_id=creador_id,
        codigo_invitacion=codigo,
        tema=tema,
        estado="activa"
    )
    db.add(sesion)
    await db.commit()
    await db.refresh(sesion)
    return sesion

async def obtener_sesion_por_id(db: AsyncSession, sesion_id: UUID) -> Optional[SesionesEstudio]:
    result = await db.execute(
        select(SesionesEstudio).where(SesionesEstudio.id == sesion_id)
    )
    return result.scalars().first()

async def obtener_sesion_por_codigo(db: AsyncSession, codigo: str) -> Optional[SesionesEstudio]:
    result = await db.execute(
        select(SesionesEstudio).where(
            func.upper(SesionesEstudio.codigo_invitacion) == codigo.strip().upper(),
            SesionesEstudio.estado == "activa"
        )
    )
    return result.scalars().first()

async def listar_sesiones_activas(db: AsyncSession, limit: int = 20) -> List[SesionesEstudio]:
    result = await db.execute(
        select(SesionesEstudio)
        .where(SesionesEstudio.estado == "activa")
        .order_by(SesionesEstudio.creada_en.desc())
        .limit(limit)
    )
    return list(result.scalars().all())

async def obtener_participante(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID
) -> Optional[ParticipantesSesion]:
    result = await db.execute(
        select(ParticipantesSesion).where(
            ParticipantesSesion.sesion_id == sesion_id,
            ParticipantesSesion.usuario_id == usuario_id
        )
    )
    return result.scalars().first()

async def agregar_o_reconectar_participante(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID
) -> ParticipantesSesion:
    existente = await obtener_participante(db, sesion_id, usuario_id)
    if existente:
        existente.conectado = True
        await db.commit()
        await db.refresh(existente)
        return existente
    
    nuevo = ParticipantesSesion(
        sesion_id=sesion_id,
        usuario_id=usuario_id,
        conectado=True
    )
    db.add(nuevo)
    await db.commit()
    await db.refresh(nuevo)
    return nuevo

async def marcar_desconexion_participante(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID
) -> None:
    participante = await obtener_participante(db, sesion_id, usuario_id)
    if participante:
        participante.conectado = False
        await db.commit()

async def listar_participantes(
    db: AsyncSession, 
    sesion_id: UUID
) -> List[ParticipantesSesion]:
    result = await db.execute(
        select(ParticipantesSesion)
        .where(ParticipantesSesion.sesion_id == sesion_id)
        .order_by(ParticipantesSesion.unido_en.asc())
    )
    return list(result.scalars().all())

async def contar_participantes(db: AsyncSession, sesion_id: UUID) -> int:
    result = await db.execute(
        select(func.count(ParticipantesSesion.id)).where(
            ParticipantesSesion.sesion_id == sesion_id,
            ParticipantesSesion.conectado == True
        )
    )
    return result.scalar() or 0

async def guardar_mensaje(
    db: AsyncSession, 
    sesion_id: UUID, 
    usuario_id: UUID, 
    text: str
) -> MensajesSesion:
    mensaje = MensajesSesion(
        sesion_id=sesion_id,
        usuario_id=usuario_id,
        text=text
    )
    db.add(mensaje)
    await db.commit()
    await db.refresh(mensaje)
    return mensaje

async def listar_mensajes_recientes(
    db: AsyncSession, 
    sesion_id: UUID, 
    limit: int = 50
) -> List[MensajesSesion]:
    result = await db.execute(
        select(MensajesSesion)
        .where(MensajesSesion.sesion_id == sesion_id)
        .order_by(MensajesSesion.enviado_en.asc())
        .limit(limit)
    )
    return list(result.scalars().all())

async def obtener_ultima_sesion_usuario(
    db: AsyncSession, 
    usuario_id: UUID
) -> Optional[SesionesEstudio]:
    result = await db.execute(
        select(SesionesEstudio)
        .join(ParticipantesSesion, ParticipantesSesion.sesion_id == SesionesEstudio.id)
        .where(
            ParticipantesSesion.usuario_id == usuario_id,
            SesionesEstudio.estado == "activa"
        )
        .order_by(SesionesEstudio.creada_en.desc())
    )
    return result.scalars().first()
