"""
Punto de entrada del backend. Monolito modular: un solo proceso,
un solo despliegue, cada módulo expone su router aquí.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from modules.usuarios.routes import router as usuarios_router
from modules.ia.routes import router as ia_router
from modules.progreso.routes import router as progreso_router
from modules.sesiones.routes import router as sesiones_router
from modules.pagos.routes import router as pagos_router

app = FastAPI(title="Adaptative Master API")

# Configurar CORS para permitir que el frontend de React se comunique con la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción debe ser tu dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios_router, prefix="/api")
app.include_router(ia_router, prefix="/api")
app.include_router(progreso_router, prefix="/api")
app.include_router(sesiones_router, prefix="/api")
app.include_router(pagos_router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
