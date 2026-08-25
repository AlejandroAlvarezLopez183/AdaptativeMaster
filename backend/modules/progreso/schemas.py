from pydantic import BaseModel
from typing import List
from datetime import datetime, date
from uuid import UUID

class XPHistorialResponse(BaseModel):
    id: UUID
    cantidad: int
    motivo: str
    fecha: datetime

    class Config:
        from_attributes = True

class RachasResponse(BaseModel):
    dias_actuales: int
    mejor_racha: int
    ultima_actividad: date | None

    class Config:
        from_attributes = True

class LogrosResponse(BaseModel):
    id: UUID
    nombre: str
    descripcion: str
    criterio: str
    obtenido_en: datetime

    class Config:
        from_attributes = True

class DashboardProgresoResponse(BaseModel):
    xp_total: int
    racha: RachasResponse
    ultimos_xp: List[XPHistorialResponse]
    logros_obtenidos: List[LogrosResponse]
