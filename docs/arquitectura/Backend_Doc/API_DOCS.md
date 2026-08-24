# Documentación de API e Integración Frontend - EstudiLabAI

Este documento registra los contratos de la API acordados para el proyecto y la infraestructura de comunicación creada en la capa de Frontend (monorepo). Esto servirá como guía principal para la implementación del Backend en FastAPI.

---

## 1. Contratos de API (Endpoints y JSONs)

Para facilitar la respuesta plana y eficiente por parte del backend y permitir que los modelos de Pydantic coincidan automáticamente, se ha diseñado el siguiente estándar en `snake_case`. (Importante: todas las peticiones asumen prefijo `/api` y el header `Authorization: Bearer <TOKEN>`).

### Módulo IA (`/api/ia`)

#### `GET /api/ia/rutas`
Lista el estado general de las rutas de aprendizaje.
**Response (200 OK):**
```json
{
  "en_curso": [
    {
      "id": 1,
      "titulo": "Python Backend",
      "icono": "🐍",
      "progreso_porcentaje": 72,
      "lecciones_completadas": 12,
      "lecciones_totales": 17
    }
  ],
  "guardado": [],
  "completado": []
}
```

#### `GET /api/ia/rutas/{ruta_id}`
Detalle interactivo del temario.
**Response (200 OK):**
```json
{
  "id": 1,
  "titulo": "Python Backend",
  "objetivo": "Crear APIs profesionales con Python",
  "nivel": "Intermedio",
  "temario": [
    { "id": 101, "nombre": "Fundamentos", "estado": "completado" },
    { "id": 102, "nombre": "POO", "estado": "completado" },
    { "id": 103, "nombre": "APIs REST", "estado": "actual" },
    { "id": 104, "nombre": "PostgreSQL", "estado": "bloqueado" }
  ]
}
```

#### `POST /api/ia/tutor/chat`
Interacción con el Tutor IA (Agente conversacional).
**Request Body:**
```json
{
  "mensaje": "Explícame REST desde cero",
  "contexto": {
    "ruta_id": 1,
    "leccion_id": 103
  }
}
```
**Response (200 OK):**
```json
{
  "respuesta": "Claro, REST (Representational State Transfer) es una arquitectura...",
  "conceptos_clave_extraidos": ["HTTP", "Stateless"]
}
```

---

### Módulo Progreso (`/api/progreso`)

#### `GET /api/progreso/resumen`
Estadísticas masivas para la pantalla "Mi Progreso".
**Response (200 OK):**
```json
{
  "progreso_general": 72,
  "racha_dias": 5,
  "tiempo_estudio_minutos": 522,
  "lecciones_totales_completadas": 12,
  "habilidades": [
    { "nombre": "Python", "porcentaje": 80 },
    { "nombre": "HTTP", "porcentaje": 60 },
    { "nombre": "APIs", "porcentaje": 40 }
  ],
  "tracker_semanal": [
    { "dia": "L", "completado": true },
    { "dia": "M", "completado": true },
    { "dia": "M", "completado": true },
    { "dia": "J", "completado": true },
    { "dia": "V", "completado": false },
    { "dia": "S", "completado": true },
    { "dia": "D", "completado": false }
  ],
  "conceptos_a_reforzar": ["Autenticación", "Status codes", "Middleware"]
}
```

---

### Módulo Sesiones (Aprender con Otros) (`/api/sesiones`)

#### `GET /api/sesiones/busqueda`
Motor de match-making para sesiones de estudio social.
**Response (200 OK):**
```json
{
  "contexto_actual": {
    "ruta": "Python Backend",
    "nivel": "Intermedio"
  },
  "companeros_sugeridos": [
    {
      "id": 1,
      "nombre": "Ana",
      "ruta_actual": "Python",
      "nivel": "Intermedio",
      "tag_interes": "Backend",
      "disponible": true
    },
    {
      "id": 2,
      "nombre": "Carlos",
      "ruta_actual": "Python",
      "nivel": "Intermedio",
      "tag_interes": "APIs",
      "disponible": true
    }
  ]
}
```

#### `GET /api/sesiones/proxima`
Poll de sesión activa programada.
**Response (200 OK):**
```json
{
  "hay_sesion": true,
  "sesion": {
    "id": 90,
    "fecha_hora": "2026-08-24T19:00:00Z",
    "participantes_count": 3
  }
}
```

---

## 2. Trabajo realizado en el Frontend (Integración)

Para garantizar la integridad y preparar al frontend para el consumo de estos endpoints, se construyó la infraestructura del cliente API en la carpeta `packages/shared`. Esto permite que tanto el frontend Web (`apps/web`) como la app móvil (`apps/mobile`) utilicen el mismo código exacto para hacer peticiones HTTP seguras.

**Archivos creados/modificados:**

- `packages/shared/src/types/api.ts`: 
  Contiene las interfaces estrictas de TypeScript (`RutaDetalle`, `TutorChatResponse`, `ResumenProgresoResponse`, etc.). Mapean 1 a 1 los JSONs documentados arriba.

- `packages/shared/src/api-client/ia.ts`: 
  Cliente (`iaClient`) con funciones `getRutas()`, `getRutaDetalle()`, `chatTutor()` utilizando `apiFetch`.

- `packages/shared/src/api-client/progreso.ts`: 
  Cliente (`progresoClient`) con la función `getResumen()`.

- `packages/shared/src/api-client/sesiones.ts`: 
  Cliente (`sesionesClient`) con las funciones `buscarCompaneros()` y `getProximaSesion()`.

- `packages/shared/src/api-client/index.ts`: 
  Se encarga de configurar la URL base del Backend, inyectar el sistema de capturas de error genérico en las llamadas asíncronas y exportar todos los módulos de manera centralizada.

### Siguientes pasos (Rol Backend)
Se debe iniciar el desarrollo en FastAPI ubicando la lógica de base de datos en los directorios `backend/modules/ia/`, `backend/modules/progreso/` y `backend/modules/sesiones/`, siguiendo la arquitectura definida (Models -> Repository -> Service -> Routes).
