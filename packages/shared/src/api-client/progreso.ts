import { apiFetch } from './index';
import { DashboardProgresoResponse } from '../types/api';

export const progresoClient = {
  getResumen: (token: string) => 
    apiFetch<DashboardProgresoResponse>('/progreso/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    })
};
