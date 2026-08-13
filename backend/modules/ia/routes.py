"""
Endpoints (FastAPI router) del módulo ia.
Aquí solo va la capa HTTP: recibir requests, validar con Pydantic,
llamar a services.py y devolver la respuesta. Sin lógica de negocio aquí.
"""
from fastapi import APIRouter

router = APIRouter(prefix="/ia", tags=["ia"])

# Ejemplo:
# @router.get("/")
# async def listar():
#     return await services.listar_items()
