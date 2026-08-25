from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from modules.usuarios.dependencies import get_db, get_current_user
from modules.usuarios.models import Usuario
from . import schemas, services

router = APIRouter(prefix="/ia", tags=["Inteligencia Artificial"])

@router.get("/rutas", response_model=schemas.RutasDashboardResponse)
async def obtener_mis_rutas(
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    rutas = await services.listar_rutas(db, current_user.id)
    rutas_response = []
    for r in rutas:
        # Simulamos o calculamos estadísticas. 
        # La BD de IA actualmente solo guarda las lecciones generadas.
        lecciones_totales = len(r.lecciones) if r.lecciones else 0
        rutas_response.append(schemas.RutaAprendizajeResponse(
            id=r.id,
            usuario_id=r.usuario_id,
            tema=r.tema,
            titulo=r.tema,
            nivel_objetivo=r.nivel_objetivo,
            estado=r.estado or "en_curso",
            generada_en=r.generada_en,
            lecciones=r.lecciones,
            progreso_porcentaje=0,
            lecciones_completadas=0,
            lecciones_totales=lecciones_totales
        ))

    return schemas.RutasDashboardResponse(
        en_curso=rutas_response,
        guardado=[],
        completado=[]
    )

@router.get("/rutas/{ruta_id}", response_model=schemas.RutaDetalleResponse)
async def obtener_detalle_ruta(
    ruta_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    ruta = await services.obtener_ruta_por_id(db, ruta_id, current_user.id)
    
    lecciones_totales = len(ruta.lecciones) if ruta.lecciones else 0
    
    temario = []
    # Ordenar lecciones por orden
    lecciones_ordenadas = sorted(ruta.lecciones, key=lambda x: x.orden) if ruta.lecciones else []
    for i, lec in enumerate(lecciones_ordenadas):
        estado = "bloqueado"
        if i == 0:
            estado = "actual"
            
        temario.append(schemas.TemaRuta(
            id=lec.id,
            nombre=lec.titulo,
            estado=estado
        ))
        
    return schemas.RutaDetalleResponse(
        id=ruta.id,
        usuario_id=ruta.usuario_id,
        tema=ruta.tema,
        titulo=ruta.tema,
        nivel_objetivo=ruta.nivel_objetivo,
        estado=ruta.estado or "en_curso",
        generada_en=ruta.generada_en,
        lecciones=ruta.lecciones,
        progreso_porcentaje=0,
        lecciones_completadas=0,
        lecciones_totales=lecciones_totales,
        objetivo=f"Dominar {ruta.tema}",
        nivel=ruta.nivel_objetivo,
        temario=temario
    )

@router.post("/rutas", response_model=schemas.RutaAprendizajeResponse)
async def crear_ruta(
    ruta_in: schemas.RutaAprendizajeCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return await services.generar_ruta(db, current_user.id, ruta_in)

@router.post("/lecciones/{leccion_id}/tutor", response_model=schemas.MensajeTutorResponse)
async def chatear_con_tutor(
    leccion_id: UUID,
    mensaje: schemas.MensajeTutorCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    # Nota: Aquí podríamos validar que la lección pertenece a una ruta del usuario
    return await services.enviar_mensaje_tutor(db, leccion_id, mensaje.text)
