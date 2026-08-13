"""
Punto de entrada del backend. Monolito modular: un solo proceso,
un solo despliegue, cada módulo expone su router aquí.
"""
from fastapi import FastAPI

from backend.modules.usuarios.routes import router as usuarios_router
from backend.modules.ia.routes import router as ia_router
from backend.modules.progreso.routes import router as progreso_router
from backend.modules.sesiones.routes import router as sesiones_router
from backend.modules.pagos.routes import router as pagos_router

app = FastAPI(title="EstudiLabAI API")

app.include_router(usuarios_router, prefix="/api")
app.include_router(ia_router, prefix="/api")
app.include_router(progreso_router, prefix="/api")
app.include_router(sesiones_router, prefix="/api")
app.include_router(pagos_router, prefix="/api")


@app.get("/health")
async def health():
    return {"status": "ok"}
