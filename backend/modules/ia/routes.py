from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from modules.usuarios.dependencies import get_db, get_current_user
from modules.usuarios.models import Usuario
from . import schemas, services

router = APIRouter(prefix="/ia", tags=["Inteligencia Artificial"])

@router.get("/rutas", response_model=List[schemas.RutaAprendizajeResponse])
async def obtener_mis_rutas(
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    return await services.listar_rutas(db, current_user.id)

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
