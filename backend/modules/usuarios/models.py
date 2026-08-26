"""
Modelos SQLAlchemy del módulo usuarios.
Usar schema de Postgres 'usuarios' para mantener separación lógica.
"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, JSON, Text
from sqlalchemy.dialects.postgresql import UUID
from modules.compartido.database import Base

class Usuario(Base):
    __tablename__ = "usuario"
    __table_args__ = {"schema": "usuarios"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    nombre = Column(String(255), nullable=False)
    rol = Column(String(50), nullable=False, default="estudiante")
    nivel = Column(String(50), nullable=True)
    plan = Column(String(50), nullable=True)
    intereses = Column(JSON, nullable=True)
    objetivos = Column(Text, nullable=True)
    preferencias = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

class RefreshToken(Base):
    __tablename__ = "refresh_tokens"
    __table_args__ = {"schema": "usuarios"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    token_hash = Column(String(255), nullable=False)
    expira_en = Column(DateTime, nullable=False)
    revocado = Column(Boolean, default=False, nullable=False)
