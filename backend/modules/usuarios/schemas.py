"""
Esquemas (Pydantic) del módulo usuarios.
Usados para validar el input de las peticiones (request) y el output (response).
"""
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    nombre: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: UUID
    rol: str
    nivel: str | None = None
    intereses: list | None = None
    objetivos: str | None = None
    preferencias: list | None = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserPerfilUpdate(BaseModel):
    nivel: str | None = None
    intereses: list | None = None
    objetivos: str | None = None
    preferencias: list | None = None

class Token(BaseModel):
    access_token: str
    token_type: str
