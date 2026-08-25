"""
Modelos SQLAlchemy del módulo pagos.
Usar schema de Postgres 'pagos' para mantener separación lógica.
"""
import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from modules.compartido.database import Base

class Suscripciones(Base):
    __tablename__ = "suscripciones"
    __table_args__ = {"schema": "pagos"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    stripe_subscription_id = Column(String(255), nullable=False)
    estado = Column(String(50), nullable=False)
    inicio = Column(DateTime, nullable=False)
    fin = Column(DateTime, nullable=False)

class Transacciones(Base):
    __tablename__ = "transacciones"
    __table_args__ = {"schema": "pagos"}

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    usuario_id = Column(UUID(as_uuid=True), ForeignKey("usuarios.usuario.id", ondelete="CASCADE"), nullable=False)
    stripe_payment_id = Column(String(255), nullable=False)
    monto = Column(Numeric(10, 2), nullable=False)
    moneda = Column(String(3), nullable=False)
    estado = Column(String(50), nullable=False)
    fecha = Column(DateTime, default=datetime.utcnow, nullable=False)
