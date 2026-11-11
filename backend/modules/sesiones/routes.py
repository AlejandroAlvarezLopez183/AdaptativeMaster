"""
Rutas HTTP y WebSockets del módulo sesiones (Estudio Colaborativo).
"""
import json
from typing import List, Dict, Set
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from jose import jwt, JWTError

from modules.compartido.config import settings
from modules.compartido.database import async_session
from modules.usuarios.dependencies import get_current_user, get_db
from modules.usuarios import models as usuarios_models
from . import services, schemas

router = APIRouter(prefix="/sesiones", tags=["Sesiones Multijugador / Estudio Colaborativo"])


# ── Gestor de Conexiones WebSocket en Tiempo Real ───────────────────────────

class ConnectionManager:
    def __init__(self):
        # Map: room_identifier -> set of (WebSocket, user_id, user_name)
        self.active_rooms: Dict[str, List[Dict]] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str, user_name: str):
        await websocket.accept()
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = []
        
        self.active_rooms[room_id].append({
            "ws": websocket,
            "user_id": user_id,
            "user_name": user_name
        })

        # Notificar a la sala que un usuario se ha conectado
        await self.broadcast(room_id, {
            "type": "usuario_conectado",
            "user_id": user_id,
            "user_name": user_name,
            "conectados_count": len(self.active_rooms[room_id]),
            "usuarios": [
                {"id": conn["user_id"], "nombre": conn["user_name"]} 
                for conn in self.active_rooms[room_id]
            ]
        })

    def disconnect(self, websocket: WebSocket, room_id: str) -> Dict:
        leaving_user = None
        if room_id in self.active_rooms:
            for conn in list(self.active_rooms[room_id]):
                if conn["ws"] == websocket:
                    leaving_user = conn
                    self.active_rooms[room_id].remove(conn)
                    break
            if not self.active_rooms[room_id]:
                del self.active_rooms[room_id]
        return leaving_user

    async def broadcast(self, room_id: str, message: dict):
        if room_id in self.active_rooms:
            serialized = json.dumps(message)
            for conn in list(self.active_rooms[room_id]):
                try:
                    await conn["ws"].send_text(serialized)
                except Exception:
                    pass

manager = ConnectionManager()


# ── Endpoints REST (Matchmaking & API_DOCS.md) ───────────────────────────────

@router.get("/busqueda", response_model=schemas.BusquedaSesionesResponse)
async def buscar_companeros(
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Retorna compañeros de estudio sugeridos según las rutas o intereses comunes."""
    return await services.buscar_companeros(db, user.id)


@router.get("/proxima", response_model=schemas.ProximaSesionResponse)
async def obtener_proxima_sesion(
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Consulta si el usuario tiene una sesión activa o próxima programada."""
    return await services.get_proxima_sesion(db, user.id)


@router.get("/salas", response_model=List[schemas.SesionListItem])
async def listar_salas_activas(
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Lista las salas de estudio abiertas y activas en la comunidad."""
    return await services.listar_salas_publicas(db)


@router.post("/crear", response_model=schemas.SesionDetalleResponse)
async def crear_sala_estudio(
    req: schemas.CrearSesionRequest,
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Crea una nueva sala colaborativa y genera un código de invitación único."""
    return await services.crear_sala(db, user.id, req.tema)


@router.post("/unirse", response_model=schemas.SesionDetalleResponse)
async def unirse_por_codigo(
    req: schemas.UnirseSesionRequest,
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Permite unirse a una sala existente mediante código de invitación."""
    return await services.unirse_a_sala_por_codigo(db, user.id, req.codigo_invitacion)


@router.get("/{sesion_id}", response_model=schemas.SesionDetalleResponse)
async def obtener_detalle_sesion(
    sesion_id: UUID,
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Obtiene información completa de la sala, sus participantes y el historial de chat."""
    return await services.obtener_detalle_sala(db, sesion_id, user.id)


@router.post("/{sesion_id}/mensajes", response_model=schemas.MensajeSesionResponse)
async def enviar_mensaje_chat(
    sesion_id: UUID,
    req: schemas.EnviarMensajeRequest,
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Envía un mensaje al chat de la sala (vía HTTP REST con moderación)."""
    mensaje_resp = await services.enviar_mensaje(db, sesion_id, user.id, req.text)

    # Notificar también vía WebSocket si hay usuarios conectados
    await manager.broadcast(str(sesion_id), {
        "type": "nuevo_mensaje",
        "mensaje": mensaje_resp.model_dump(mode="json")
    })

    return mensaje_resp


@router.post("/{sesion_id}/salir")
async def salir_de_sesion(
    sesion_id: UUID,
    user: usuarios_models.Usuario = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Marca la desconexión del usuario en la sala."""
    await services.salir_de_sala(db, sesion_id, user.id)
    return {"status": "ok", "message": "Has salido de la sesión"}


# ── Endpoint WebSocket en Tiempo Real ───────────────────────────────────────

@router.websocket("/ws/{sesion_id}")
async def websocket_sala(
    websocket: WebSocket,
    sesion_id: str,
    token: str = Query(...)
):
    """
    Canal bidireccional en tiempo real para la sala de estudio.
    Soporta chat en directo, presencia de participantes y sincronización de ejercicios.
    """
    # 1. Validar autenticación vía JWT Token
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        user_id_str: str = payload.get("sub")
        if not user_id_str:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
        user_id = UUID(user_id_str)
    except (JWTError, ValueError):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # 2. Conectar y obtener nombre de usuario
    async with async_session() as db:
        user = await db.get(usuarios_models.Usuario, user_id)
        user_name = user.nombre if user else "Estudiante"
        try:
            sesion_uuid = UUID(sesion_id)
            await services.repository.agregar_o_reconectar_participante(db, sesion_uuid, user_id)
        except Exception:
            pass

    await manager.connect(websocket, sesion_id, str(user_id), user_name)

    try:
        while True:
            data_raw = await websocket.receive_text()
            try:
                data = json.loads(data_raw)
            except Exception:
                continue

            msg_type = data.get("type")

            # A. Mensaje de chat
            if msg_type == "mensaje":
                texto = data.get("text", "")
                if texto.strip():
                    async with async_session() as db:
                        try:
                            msg_resp = await services.enviar_mensaje(db, UUID(sesion_id), user_id, texto)
                            await manager.broadcast(sesion_id, {
                                "type": "nuevo_mensaje",
                                "mensaje": msg_resp.model_dump(mode="json")
                            })
                        except Exception as e:
                            await websocket.send_text(json.dumps({
                                "type": "error",
                                "message": str(e)
                            }))

            # B. Sincronización de reto o ejercicio colaborativo
            elif msg_type == "reto_colaborativo":
                # Reenviar el estado del reto (pregunta actual, opción seleccionada) a toda la sala
                await manager.broadcast(sesion_id, {
                    "type": "reto_actualizado",
                    "emisor_id": str(user_id),
                    "emisor_nombre": user_name,
                    "payload": data.get("payload", {})
                })

            # C. Indicador de "escribiendo..."
            elif msg_type == "escribiendo":
                await manager.broadcast(sesion_id, {
                    "type": "usuario_escribiendo",
                    "user_id": str(user_id),
                    "user_name": user_name,
                    "escribiendo": bool(data.get("escribiendo", True))
                })

    except WebSocketDisconnect:
        leaving = manager.disconnect(websocket, sesion_id)
        if leaving:
            async with async_session() as db:
                try:
                    await services.salir_de_sala(db, UUID(sesion_id), user_id)
                except Exception:
                    pass

            await manager.broadcast(sesion_id, {
                "type": "usuario_desconectado",
                "user_id": leaving["user_id"],
                "user_name": leaving["user_name"],
                "conectados_count": len(manager.active_rooms.get(sesion_id, [])),
                "usuarios": [
                    {"id": conn["user_id"], "nombre": conn["user_name"]} 
                    for conn in manager.active_rooms.get(sesion_id, [])
                ]
            })
