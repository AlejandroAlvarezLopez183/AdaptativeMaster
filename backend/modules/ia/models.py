"""
Modelos SQLAlchemy del módulo ia.
Usar schema de Postgres 'ia' para mantener separación lógica.
"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from modules.compartido.database import Base

class RutaAprendizaje(Base):
    __tablename__ = "rutas_aprendizaje"
    __table_args__ = {"schema": "ia"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    tema = Column(String(255), nullable=False)
    nivel_objetivo = Column(String(50), nullable=False)
    estado = Column(String(50), default="activa", nullable=False)
    generada_en = Column(DateTime, default=datetime.utcnow, nullable=False)

    lecciones = relationship("Leccion", back_populates="ruta", cascade="all, delete-orphan")


class Leccion(Base):
    __tablename__ = "lecciones"
    __table_args__ = {"schema": "ia"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ruta_id = Column(UUID(as_uuid=True), ForeignKey("ia.rutas_aprendizaje.id", ondelete="CASCADE"), nullable=False)
    orden = Column(Integer, nullable=False)
    titulo = Column(String(255), nullable=False)
    contenido = Column(JSON, nullable=True)
    dificultad = Column(String(50), nullable=False)

    ruta = relationship("RutaAprendizaje", back_populates="lecciones")
    mensajes = relationship("MensajeTutor", back_populates="leccion", cascade="all, delete-orphan")


class MensajeTutor(Base):
    __tablename__ = "mensajes_tutor"
    __table_args__ = {"schema": "ia"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    leccion_id = Column(UUID(as_uuid=True), ForeignKey("ia.lecciones.id", ondelete="CASCADE"), nullable=False)
    rol = Column(String(50), nullable=False)  # user, assistant, system
    text = Column(Text, nullable=False)
    creado_en = Column(DateTime, default=datetime.utcnow, nullable=False)

    leccion = relationship("Leccion", back_populates="mensajes")
