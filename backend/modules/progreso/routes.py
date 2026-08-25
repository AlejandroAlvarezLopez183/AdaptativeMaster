from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from modules.usuarios.dependencies import get_db, get_current_user
from modules.usuarios.models import Usuario
from . import schemas, services

router = APIRouter(prefix="/progreso", tags=["Gamificación y Progreso"])

@router.get("/dashboard", response_model=schemas.DashboardProgresoResponse)
async def ver_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtiene el resumen de XP, Rachas y Logros del usuario logueado"""
    return await services.obtener_dashboard(db, current_user.id)

@router.post("/leccion/{leccion_id}/completar")
async def completar_leccion(
    leccion_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Marca una lección como completada y otorga recompensas (XP y Rachas)"""
    try:
        await services.marcar_leccion_completada(db, current_user.id, leccion_id)
        return {"mensaje": "Lección completada. ¡Has ganado experiencia!"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
