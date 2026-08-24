"""
Lógica de negocio del módulo usuarios.
Aquí van las reglas reales (cálculos, validaciones de negocio, orquestación).
No debe conocer detalles de HTTP ni de SQL directamente.
"""
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, status
from modules.compartido.config import settings
from . import repository, schemas, models
from sqlalchemy.ext.asyncio import AsyncSession

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return encoded_jwt

async def registrar_usuario(session: AsyncSession, user_in: schemas.UserCreate) -> models.Usuario:
    user = await repository.get_user_by_email(session, user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado",
        )
    
    hashed_password = get_password_hash(user_in.password)
    user_data = {
        "email": user_in.email,
        "nombre": user_in.nombre,
        "password_hash": hashed_password
    }
    return await repository.create_user(session, user_data)

async def autenticar_usuario(session: AsyncSession, user_in: schemas.UserLogin) -> schemas.Token:
    user = await repository.get_user_by_email(session, user_in.email)
    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return schemas.Token(access_token=access_token, token_type="bearer")
