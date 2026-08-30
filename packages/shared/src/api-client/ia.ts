import { apiFetch } from './index';
import { RutasResponse, RutaDetalle, TutorChatRequest, TutorChatResponse } from '../types/api';

export const iaClient = {
  getRutas: (token: string) => 
    apiFetch<RutasResponse>('/ia/rutas', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getRutaDetalle: (rutaId: string, token: string) => 
    apiFetch<RutaDetalle>(`/ia/rutas/${rutaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getLeccion: (leccionId: string, token: string) =>
    apiFetch<any>(`/ia/lecciones/${leccionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getHistorialChat: (leccionId: string, token: string) =>
    apiFetch<TutorChatResponse[]>(`/ia/lecciones/${leccionId}/mensajes`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  chatTutor: (leccionId: string, data: { text: string }, token: string) => 
    apiFetch<TutorChatResponse>(`/ia/lecciones/${leccionId}/tutor`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    })
};
