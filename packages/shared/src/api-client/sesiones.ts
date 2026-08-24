import { apiFetch } from './index';
import { BusquedaSesionesResponse, ProximaSesionResponse } from '../types/api';

export const sesionesClient = {
  buscarCompaneros: (token: string) => 
    apiFetch<BusquedaSesionesResponse>('/sesiones/busqueda', {
      headers: { Authorization: `Bearer ${token}` }
    }),

  getProximaSesion: (token: string) => 
    apiFetch<ProximaSesionResponse>('/sesiones/proxima', {
      headers: { Authorization: `Bearer ${token}` }
    })
};
