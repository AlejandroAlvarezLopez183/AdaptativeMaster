import { apiFetch } from './index';
import { ResumenProgresoResponse } from '../types/api';

export const progresoClient = {
  getResumen: (token: string) => 
    apiFetch<ResumenProgresoResponse>('/progreso/resumen', {
      headers: { Authorization: `Bearer ${token}` }
    })
};
