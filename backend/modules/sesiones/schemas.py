"""
Esquemas Pydantic del módulo sesiones (request/response, validación de entrada/salida).
"""
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field

# Matchmaking & Búsqueda
class CompaneroSugerido(BaseModel):
    id: str
    nombre: str
    ruta_actual: str
    nivel: str
    tag_interes: str
    disponible: bool = True

class ContextoActual(BaseModel):
    ruta: str
    nivel: str

class BusquedaSesionesResponse(BaseModel):
    contexto_actual: ContextoActual
    companeros_sugeridos: List[CompaneroSugerido]

class SesionProxima(BaseModel):
    id: str
    fecha_hora: str
    participantes_count: int
    tema: Optional[str] = None
    codigo_invitacion: Optional[str] = None

class ProximaSesionResponse(BaseModel):
    hay_sesion: bool
    sesion: Optional[SesionProxima] = None

# Operaciones de Salas
class CrearSesionRequest(BaseModel):
    tema: str = Field(default="Estudio Colaborativo", min_length=2, max_length=255)

class UnirseSesionRequest(BaseModel):
    codigo_invitacion: str = Field(min_length=3, max_length=50)

class ParticipanteInfo(BaseModel):
    id: str
    usuario_id: str
    nombre: str
    conectado: bool
    unido_en: datetime

class MensajeSesionResponse(BaseModel):
    id: str
    sesion_id: str
    usuario_id: str
    usuario_nombre: str
    text: str
    enviado_en: datetime

class EnviarMensajeRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2000)

class SesionDetalleResponse(BaseModel):
    id: str
    creador_id: str
    creador_nombre: str
    tema: str
    codigo_invitacion: str
    estado: str
    creada_en: datetime
    participantes: List[ParticipanteInfo]
    mensajes_recientes: List[MensajeSesionResponse]

class SesionListItem(BaseModel):
    id: str
    creador_id: str
    creador_nombre: str
    tema: str
    codigo_invitacion: str
    estado: str
    participantes_count: int
    creada_en: datetime
