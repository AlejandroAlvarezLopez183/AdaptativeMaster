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

  chatTutor: (data: TutorChatRequest, token: string) => 
    apiFetch<TutorChatResponse>('/ia/tutor/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    })
};
