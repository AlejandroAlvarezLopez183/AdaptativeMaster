// Definición de Interfaces correspondientes a los JSON del Backend

// Módulo IA
export interface TemaRuta {
  id: string;
  nombre: string;
  estado: 'completado' | 'actual' | 'bloqueado';
}

export interface Leccion {
  id: string;
  ruta_id: string;
  orden: number;
  titulo: string;
  dificultad: string;
  contenido: {
    teoria?: string;
    video_url?: string;
    [key: string]: any;
  } | null;
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
  lecciones?: Leccion[];
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

export interface UserResponse {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  nivel?: string;
  intereses?: string[];
  objetivos?: string;
  preferencias?: Record<string, any>;
  created_at: string;
}

export interface UserPerfilUpdate {
  nivel?: string;
  intereses?: string[];
  objetivos?: string;
  preferencias?: Record<string, any>;
}

export interface TutorChatResponse {
  id: string;
  leccion_id: string;
  rol: string;
  text: string;
  creado_en: string;
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
  progreso_ruta: number;
  habilidades: Habilidad[];
  actividad_semana: DiaTracker[];
  conceptos_reforzar: string[];
}

// Módulo Sesiones
export interface CompaneroSugerido {
  id: string | number;
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
  id: string | number;
  fecha_hora: string;
  participantes_count: number;
  tema?: string;
  codigo_invitacion?: string;
}

export interface ProximaSesionResponse {
  hay_sesion: boolean;
  sesion?: SesionProxima;
}

export interface ParticipanteInfo {
  id: string;
  usuario_id: string;
  nombre: string;
  conectado: boolean;
  unido_en: string;
}

export interface MensajeSesionResponse {
  id: string;
  sesion_id: string;
  usuario_id: string;
  usuario_nombre: string;
  text: string;
  enviado_en: string;
}

export interface SesionDetalleResponse {
  id: string;
  creador_id: string;
  creador_nombre: string;
  tema: string;
  codigo_invitacion: string;
  estado: string;
  creada_en: string;
  participantes: ParticipanteInfo[];
  mensajes_recientes: MensajeSesionResponse[];
}

export interface SesionListItem {
  id: string;
  creador_id: string;
  creador_nombre: string;
  tema: string;
  codigo_invitacion: string;
  estado: string;
  participantes_count: number;
  creada_en: string;
}
