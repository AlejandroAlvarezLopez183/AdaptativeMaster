// Definición de Interfaces correspondientes a los JSON del Backend

// Módulo IA
export interface TemaRuta {
  id: string;
  nombre: string;
  estado: 'completado' | 'actual' | 'bloqueado';
}

export interface RutaAprendizaje {
  id: string;
  titulo: string;
  icono?: string;
  progreso_porcentaje: number;
  lecciones_completadas: number;
  lecciones_totales: number;
}

export interface RutaDetalle extends RutaAprendizaje {
  objetivo: string;
  nivel: string;
  temario: TemaRuta[];
}

export interface RutasResponse {
  en_curso: RutaAprendizaje[];
  guardado: RutaAprendizaje[];
  completado: RutaAprendizaje[];
}

export interface TutorChatRequest {
  mensaje: string;
  contexto: {
    ruta_id: string;
    leccion_id: string;
  };
}

export interface TutorChatResponse {
  respuesta: string;
  conceptos_clave_extraidos: string[];
}

// Módulo Progreso
export interface Habilidad {
  nombre: string;
  porcentaje: number;
}

export interface DiaTracker {
  dia: string;
  completado: boolean;
}

export interface RachasResponse {
  dias_actuales: number;
  mejor_racha: number;
  ultima_actividad: string | null;
}

export interface XPHistorialResponse {
  id: string;
  cantidad: number;
  motivo: string;
  fecha: string;
}

export interface LogrosResponse {
  id: string;
  nombre: string;
  descripcion: string;
  criterio: string;
  obtenido_en: string;
}

export interface DashboardProgresoResponse {
  xp_total: number;
  racha: RachasResponse;
  ultimos_xp: XPHistorialResponse[];
  logros_obtenidos: LogrosResponse[];
}

// Módulo Sesiones
export interface CompaneroSugerido {
  id: number;
  nombre: string;
  ruta_actual: string;
  nivel: string;
  tag_interes: string;
  disponible: boolean;
}

export interface BusquedaSesionesResponse {
  contexto_actual: {
    ruta: string;
    nivel: string;
  };
  companeros_sugeridos: CompaneroSugerido[];
}

export interface SesionProxima {
  id: number;
  fecha_hora: string;
  participantes_count: number;
}

export interface ProximaSesionResponse {
  hay_sesion: boolean;
  sesion?: SesionProxima;
}
