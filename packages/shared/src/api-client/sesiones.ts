import { apiFetch } from './index';
import { 
  BusquedaSesionesResponse, 
  ProximaSesionResponse, 
  SesionDetalleResponse, 
  SesionListItem, 
  MensajeSesionResponse 
} from '../types/api';

export const sesionesClient = {
  buscarCompaneros: (token: string) => 
    apiFetch<BusquedaSesionesResponse>('/sesiones/busqueda', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getProximaSesion: (token: string) => 
    apiFetch<ProximaSesionResponse>('/sesiones/proxima', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  listarSalas: (token: string) =>
    apiFetch<SesionListItem[]>('/sesiones/salas', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  crearSala: (token: string, tema: string) =>
    apiFetch<SesionDetalleResponse>('/sesiones/crear', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tema })
    }),

  unirsePorCodigo: (token: string, codigo_invitacion: string) =>
    apiFetch<SesionDetalleResponse>('/sesiones/unirse', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ codigo_invitacion })
    }),

  getDetalleSala: (token: string, sesionId: string) =>
    apiFetch<SesionDetalleResponse>(`/sesiones/${sesionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  enviarMensaje: (token: string, sesionId: string, text: string) =>
    apiFetch<MensajeSesionResponse>(`/sesiones/${sesionId}/mensajes`, {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    }),

  salirDeSala: (token: string, sesionId: string) =>
    apiFetch<{ status: string; message: string }>(`/sesiones/${sesionId}/salir`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
};
