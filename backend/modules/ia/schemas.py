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
    estado: str
    generada_en: datetime
    lecciones: List[LeccionResponse] = []

    class Config:
        from_attributes = True
