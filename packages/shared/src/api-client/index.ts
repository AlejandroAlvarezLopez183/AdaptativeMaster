// Cliente de API compartido — configurar base URL y helpers de fetch aquí,
// para que web y mobile usen exactamente la misma lógica de llamadas al backend.

// En Vite, process.env no existe (usa import.meta.env), así que para compatibilidad
// con el package compartido proveeremos un default fuerte para dev.
const getBaseUrl = () => {
    if (typeof process !== "undefined" && process.env && process.env.API_BASE_URL) {
        return process.env.API_BASE_URL;
    }
    // TODO: En prod, usar url de prod. 
    return "http://localhost:8000/api";
}

const API_BASE_URL = getBaseUrl();

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `API error: ${res.status}`);
  }
  return res.json();
}

export * from './auth';
