"""
Acceso a datos del módulo usuarios.
Aquí van las queries a la base de datos (SQLAlchemy). Nada de lógica de negocio.
"""
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from .models import Usuario

async def get_user_by_email(session: AsyncSession, email: str) -> Optional[Usuario]:
    result = await session.execute(select(Usuario).where(Usuario.email == email))
    return result.scalars().first()

async def create_user(session: AsyncSession, user_data: dict) -> Usuario:
    user = Usuario(**user_data)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
