from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from datetime import datetime, date, timedelta
from uuid import UUID

from . import models, schemas
from modules.ia.models import Leccion

async def otorgar_xp(db: AsyncSession, usuario_id: UUID, cantidad: int, motivo: str):
    nuevo_xp = models.XPHistorial(
        usuario_id=usuario_id,
        cantidad=cantidad,
        motivo=motivo
    )
    db.add(nuevo_xp)
    await db.commit()

async def actualizar_racha(db: AsyncSession, usuario_id: UUID):
    result = await db.execute(
        select(models.Rachas).where(models.Rachas.usuario_id == usuario_id)
    )
    racha = result.scalars().first()
    
    hoy = date.today()
    
    if not racha:
        racha = models.Rachas(
            usuario_id=usuario_id,
            dias_actuales=1,
            mejor_racha=1,
            ultima_actividad=hoy
        )
        db.add(racha)
    else:
        if racha.ultima_actividad == hoy:
            # Ya se actualizó hoy
            return racha
            
        ayer = hoy - timedelta(days=1)
        
        if racha.ultima_actividad == ayer:
            # Mantuvo la racha
            racha.dias_actuales += 1
            if racha.dias_actuales > racha.mejor_racha:
                racha.mejor_racha = racha.dias_actuales
        else:
            # Perdió la racha
            racha.dias_actuales = 1
            
        racha.ultima_actividad = hoy
        
    await db.commit()
    return racha

async def marcar_leccion_completada(db: AsyncSession, usuario_id: UUID, leccion_id: UUID):
    # Verificar si la lección existe
    result = await db.execute(select(Leccion).where(Leccion.id == leccion_id))
    leccion = result.scalars().first()
    if not leccion:
        raise ValueError("La lección no existe")

    # Registrar progreso
    progreso = models.ProgresoLeccion(
        usuario_id=usuario_id,
        leccion_id=leccion_id,
        completado=True,
        puntaje=100, # Por ahora estático
        completado_en=datetime.utcnow()
    )
    db.add(progreso)
    
    # Lógica de gamificación
    await otorgar_xp(db, usuario_id, cantidad=50, motivo=f"Lección completada: {leccion.titulo}")
    await actualizar_racha(db, usuario_id)
    
    await db.commit()
    return progreso

async def obtener_dashboard(db: AsyncSession, usuario_id: UUID) -> schemas.DashboardProgresoResponse:
    # 1. Total de XP
    result = await db.execute(
        select(func.sum(models.XPHistorial.cantidad))
        .where(models.XPHistorial.usuario_id == usuario_id)
    )
    xp_total = result.scalar() or 0
    
    # 2. Racha
    result = await db.execute(
        select(models.Rachas).where(models.Rachas.usuario_id == usuario_id)
    )
    racha_obj = result.scalars().first()
    if not racha_obj:
        racha_data = schemas.RachasResponse(dias_actuales=0, mejor_racha=0, ultima_actividad=None)
    else:
        racha_data = schemas.RachasResponse(
            dias_actuales=racha_obj.dias_actuales, 
            mejor_racha=racha_obj.mejor_racha, 
            ultima_actividad=racha_obj.ultima_actividad
        )
        
    # 3. Últimos XP
    result = await db.execute(
        select(models.XPHistorial)
        .where(models.XPHistorial.usuario_id == usuario_id)
        .order_by(models.XPHistorial.fecha.desc())
        .limit(5)
    )
    ultimos_xp = result.scalars().all()
    
    # Retornar (dejamos logros vacíos por ahora)
    return schemas.DashboardProgresoResponse(
        xp_total=xp_total,
        racha=racha_data,
        ultimos_xp=ultimos_xp,
        logros_obtenidos=[]
    )
