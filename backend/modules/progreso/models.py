"""
Modelos SQLAlchemy del módulo progreso.
Usar schema de Postgres 'progreso' para mantener separación lógica.
"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey, Date
from sqlalchemy.dialects.postgresql import UUID
from modules.compartido.database import Base

class ProgresoLeccion(Base):
    __tablename__ = "progreso_leccion"
    __table_args__ = {"schema": "progreso"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    leccion_id = Column(UUID(as_uuid=True), ForeignKey("ia.lecciones.id", ondelete="CASCADE"), nullable=False)
    completado = Column(Boolean, default=False, nullable=False)
    puntaje = Column(Integer, default=0, nullable=False)
    intentos = Column(Integer, default=0, nullable=False)
    completado_en = Column(DateTime, nullable=True)

class XPHistorial(Base):
    __tablename__ = "xp_historial"
    __table_args__ = {"schema": "progreso"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    motivo = Column(String(255), nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow, nullable=False)

class Rachas(Base):
    __tablename__ = "rachas"
    __table_args__ = {"schema": "progreso"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    dias_actuales = Column(Integer, default=0, nullable=False)
    mejor_racha = Column(Integer, default=0, nullable=False)
    ultima_actividad = Column(Date, nullable=True)

class Logros(Base):
    __tablename__ = "logros"
    __table_args__ = {"schema": "progreso"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(String(255), nullable=False)
    criterio = Column(String(255), nullable=False)

class LogrosUsuario(Base):
    __tablename__ = "logros_usuario"
    __table_args__ = {"schema": "progreso"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    logro_id = Column(UUID(as_uuid=True), ForeignKey("progreso.logros.id", ondelete="CASCADE"), nullable=False)
    obtenido_en = Column(DateTime, default=datetime.utcnow, nullable=False)
