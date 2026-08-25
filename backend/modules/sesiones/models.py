"""
Modelos SQLAlchemy del módulo sesiones.
Usar schema de Postgres 'sesiones' para mantener separación lógica.
"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from modules.compartido.database import Base

class SesionesEstudio(Base):
    __tablename__ = "sesiones_estudio"
    __table_args__ = {"schema": "sesiones"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    creador_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    codigo_invitacion = Column(String(50), nullable=False, unique=True)
    estado = Column(String(50), nullable=False, default="activa")
    creada_en = Column(DateTime, default=datetime.utcnow, nullable=False)

class ParticipantesSesion(Base):
    __tablename__ = "participantes_sesion"
    __table_args__ = {"schema": "sesiones"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sesion_id = Column(UUID(as_uuid=True), ForeignKey("sesiones.sesiones_estudio.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    conectado = Column(Boolean, default=True, nullable=False)
    unido_en = Column(DateTime, default=datetime.utcnow, nullable=False)

class MensajesSesion(Base):
    __tablename__ = "mensajes_sesion"
    __table_args__ = {"schema": "sesiones"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sesion_id = Column(UUID(as_uuid=True), ForeignKey("sesiones.sesiones_estudio.id", ondelete="CASCADE"), nullable=False)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    text = Column(Text, nullable=False)
    enviado_en = Column(DateTime, default=datetime.utcnow, nullable=False)
