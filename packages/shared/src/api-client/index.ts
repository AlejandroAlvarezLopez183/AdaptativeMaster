// Cliente de API compartido — configurar base URL y helpers de fetch aquí,
// para que web y mobile usen exactamente la misma lógica de llamadas al backend.

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000/api";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
