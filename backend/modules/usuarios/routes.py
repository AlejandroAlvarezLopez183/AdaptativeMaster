"""
Endpoints (FastAPI router) del módulo usuarios.
Aquí solo va la capa HTTP: recibir requests, validar con Pydantic,
llamar a services.py y devolver la respuesta. Sin lógica de negocio aquí.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from . import schemas, services, models
from .dependencies import get_db, get_current_user

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

@router.post("/registro", response_model=schemas.UserResponse)
async def registrar(user_in: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    return await services.registrar_usuario(db, user_in)

@router.post("/login", response_model=schemas.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    # OAuth2 usa 'username' por defecto, lo mapeamos al email
    user_login = schemas.UserLogin(email=form_data.username, password=form_data.password)
    return await services.autenticar_usuario(db, user_login)

@router.get("/me", response_model=schemas.UserResponse)
async def leer_usuarios_me(current_user: models.Usuario = Depends(get_current_user)):
    return current_user

@router.put("/perfil", response_model=schemas.UserResponse)
async def actualizar_perfil(
    update_data: schemas.UserPerfilUpdate,
    current_user: models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await services.actualizar_perfil(db, current_user, update_data)
