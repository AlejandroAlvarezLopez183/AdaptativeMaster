from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from datetime import datetime, date, timedelta
from uuid import UUID

from . import models, schemas
from modules.ia.models import RutaAprendizaje, Leccion
from sqlalchemy.orm import selectinload

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
    
    # 4. Obtener Rutas y progresos
    result_rutas = await db.execute(
        select(RutaAprendizaje)
        .options(selectinload(RutaAprendizaje.lecciones))
        .where(RutaAprendizaje.usuario_id == usuario_id)
    )
    rutas = result_rutas.scalars().unique().all()

    result_progresos = await db.execute(
        select(models.ProgresoLeccion)
        .where(models.ProgresoLeccion.usuario_id == usuario_id, models.ProgresoLeccion.completado == True)
    )
    progresos = result_progresos.scalars().all()
    lecciones_completadas_ids = {p.leccion_id for p in progresos}

    total_lecciones = 0
    total_completadas = 0
    habilidades = []
    pendientes = []

    for ruta in rutas:
        lecciones_ruta = ruta.lecciones
        total_ruta = len(lecciones_ruta)
        completadas_ruta = sum(1 for l in lecciones_ruta if l.id in lecciones_completadas_ids)
        
        total_lecciones += total_ruta
        total_completadas += completadas_ruta
        
        porcentaje_ruta = int((completadas_ruta / total_ruta * 100)) if total_ruta > 0 else 0
        habilidades.append(schemas.Habilidad(nombre=ruta.tema, porcentaje=porcentaje_ruta))
        
        for l in sorted(lecciones_ruta, key=lambda x: x.orden):
            if l.id not in lecciones_completadas_ids:
                pendientes.append(l.titulo)

    progreso_general = int((total_completadas / total_lecciones * 100)) if total_lecciones > 0 else 0
    conceptos_reforzar = pendientes[:3]

    # Tracker Semanal
    hoy = date.today()
    lunes = hoy - timedelta(days=hoy.weekday())
    
    dias_semana_map = ["L", "M", "M", "J", "V", "S", "D"]
    semana = []
    
    fechas_completadas = set(p.completado_en.date() for p in progresos if p.completado_en and p.completado_en.date() >= lunes)
    
    for i in range(7):
        dia_fecha = lunes + timedelta(days=i)
        completado = dia_fecha in fechas_completadas
        semana.append(schemas.DiaTracker(dia=dias_semana_map[i], completado=completado))

    return schemas.DashboardProgresoResponse(
        xp_total=xp_total,
        racha=racha_data,
        ultimos_xp=ultimos_xp,
        logros_obtenidos=[],
        progreso_ruta=progreso_general,
        habilidades=habilidades,
        actividad_semana=semana,
        conceptos_reforzar=conceptos_reforzar
    )
