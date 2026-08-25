from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime
from uuid import UUID

class MensajeTutorBase(BaseModel):
    rol: str
    text: str

class MensajeTutorCreate(MensajeTutorBase):
    pass

class MensajeTutorResponse(MensajeTutorBase):
    id: UUID
    leccion_id: UUID
    creado_en: datetime

    class Config:
        from_attributes = True

class LeccionBase(BaseModel):
    orden: int
    titulo: str
    contenido: Optional[Dict[str, Any]] = None
    dificultad: str

class LeccionResponse(LeccionBase):
    id: UUID
    ruta_id: UUID

    class Config:
        from_attributes = True

class RutaAprendizajeBase(BaseModel):
    tema: str
    nivel_objetivo: str

class RutaAprendizajeCreate(RutaAprendizajeBase):
    pass

class RutaAprendizajeResponse(RutaAprendizajeBase):
    id: UUID
    usuario_id: UUID
    estado: str = "en_curso"
    generada_en: datetime
    lecciones: List[LeccionResponse] = []
    titulo: str = ""
    progreso_porcentaje: int = 0
    lecciones_completadas: int = 0
    lecciones_totales: int = 0

    class Config:
        from_attributes = True

class RutasDashboardResponse(BaseModel):
    en_curso: List[RutaAprendizajeResponse] = []
    guardado: List[RutaAprendizajeResponse] = []
    completado: List[RutaAprendizajeResponse] = []

    class Config:
        from_attributes = True

class TemaRuta(BaseModel):
    id: UUID
    nombre: str
    estado: str

class RutaDetalleResponse(RutaAprendizajeResponse):
    objetivo: str
    nivel: str
    temario: List[TemaRuta]
