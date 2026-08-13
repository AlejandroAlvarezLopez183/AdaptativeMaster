// Tipos compartidos entre web y mobile (deben reflejar los schemas Pydantic del backend)

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  nivel: number;
  xpTotal: number;
  rachaDias: number;
  plan: "free" | "premium";
}

export interface RutaAprendizaje {
  id: string;
  usuarioId: string;
  tema: string;
  nivelObjetivo: string;
}
