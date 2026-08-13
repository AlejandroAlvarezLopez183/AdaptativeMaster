"""
Configuración de conexión a base de datos (SQLAlchemy async).
Cada módulo debe usar su propio schema de Postgres (usuarios, ia, progreso, sesiones, pagos).
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base

from backend.modules.compartido.config import settings

engine = create_async_engine(settings.database_url, echo=False)
async_session = async_sessionmaker(engine, expire_on_commit=False)
Base = declarative_base()


async def get_db():
    async with async_session() as session:
        yield session
