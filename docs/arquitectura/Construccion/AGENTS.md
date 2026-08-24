# Contexto del proyecto — Adaptative Master

Este archivo existe para que cualquier asistente de IA (Claude Code, Cursor, Copilot, etc.)
entienda el proyecto antes de escribir o modificar código. Léelo completo antes de proponer
cambios de arquitectura, crear archivos nuevos, o sugerir dependencias.

---

## Qué es Adaptative Master

Plataforma de aprendizaje impulsada por IA (tipo Duolingo, pero diferenciada). El valor
central no es solo "generar rutas de estudio con IA" — eso ya lo hace la competencia.
Los diferenciadores reales del producto son:

1. **Minijuegos generados dinámicamente**: la IA genera el *contenido*, nunca el motor del
   juego. El motor son componentes ya programados y probados (ver sección Minijuegos).
2. **Tutor conversacional con IA** que explica el porqué de los errores, no solo corrige.
3. **Sesiones de estudio sociales en tiempo real**: varios usuarios estudian juntos,
   se corrigen entre ellos, sincronizados vía WebSockets. Este es el diferenciador
   principal frente a Duolingo y apps similares — trátalo como feature de alta prioridad,
   no como "extra".

Plazo: versión beta en 5 meses. Equipo: 6 desarrolladores, cada uno dueño de un módulo.

---

## Decisiones de arquitectura (no las cuestiones sin razón fuerte)

Estas decisiones ya se tomaron deliberadamente considerando el tamaño del equipo y el plazo.
Si vas a sugerir una alternativa (microservicios, otra base de datos, otro framework),
explica explícitamente por qué el contexto cambió — no lo sugieras por "buenas prácticas"
genéricas sin justificar contra estas razones:

- **Monolito modular, no microservicios.** Un solo backend, un solo despliegue. Con 6 devs
  y 5 meses, la sobrecarga operativa de microservicios cuesta más de lo que aporta.
  Los módulos están delimitados para poder extraerse a futuro si hay volumen real.
- **Una sola base de datos PostgreSQL**, organizada con *schemas* por módulo
  (`usuarios.*`, `ia.*`, `progreso.*`, `sesiones.*`, `pagos.*`), no una base por módulo.
- **Arquitectura en capas dentro de cada módulo** (`routes → services → repository`),
  pero NO como organizador global del proyecto. No muevas lógica de negocio de varios
  módulos a una carpeta `/services` compartida — eso rompe el aislamiento por dueño.
- **Backend: Python + FastAPI.** Elegido sobre Node porque la capa de IA (prompts,
  embeddings, orquestación) vive más natural en Python.
- **Frontend: monorepo** (Turborepo) con `apps/web` (React + TS + Vite), `apps/mobile`
  (React Native + Expo) y `packages/shared` (tipos, cliente de API, validaciones).
  Web y mobile deben compartir tipos e implementación de llamadas a la API vía
  `packages/shared`, no duplicarlos.
- **Auth: JWT** (access token corto ~30 min + refresh token). No implementar sesiones
  basadas en cookies de servidor tradicionales.
- **Infra: DigitalOcean** para MVP/staging, Docker Compose para desarrollo local.
  No sugerir AWS/GCP salvo que se pida explícitamente escalar.
- **CI/CD: GitHub Actions**, no Jenkins.
- **IA: proveedor por API** (Claude/OpenAI), nunca modelo autoalojado para el MVP — el
  costo de GPU no se justifica a esta escala. Toda llamada a IA pasa por una interfaz
  propia (`AIProvider`) para poder cambiar de proveedor sin tocar lógica de negocio.

---

## Estructura del repo (resumen)

```
apps/web         → Frontend web (React + TS)
apps/mobile       → App móvil (React Native + Expo)
packages/shared   → Tipos, cliente de API y validaciones compartidas
backend/modules/  → Backend, un submódulo por dominio de negocio
  usuarios/        → Auth, perfil, JWT
  ia/              → Rutas de aprendizaje, prompts, tutor conversacional
  progreso/        → XP, rachas, logros, contenido de minijuegos
  sesiones/        → WebSockets, salas, matchmaking de sesiones sociales
  pagos/           → Stripe, suscripciones
  compartido/      → Config, conexión DB, seguridad, utilidades genéricas
```

Cada módulo de `backend/modules/` sigue siempre:
`routes.py` (HTTP) → `services.py` (lógica de negocio) → `repository.py` (acceso a datos),
con `models.py` (SQLAlchemy) y `schemas.py` (Pydantic, request/response).

---

## Reglas para escribir o modificar código

1. **No cruces módulos directamente.** Un módulo nunca importa `repository.py` o
   `models.py` de otro módulo. Si `progreso` necesita datos de `usuarios`, expón una
   función pública en `services.py` de `usuarios` y llama a esa.
2. **La lógica de negocio va en `services.py`, nunca en `routes.py`.** Los endpoints solo
   validan input, llaman al service y devuelven la respuesta.
3. **Todo output de IA se valida con Pydantic antes de usarse.** Nunca confíes en que el
   modelo devuelve JSON bien formado sin validación explícita.
4. **Minijuegos: la IA genera contenido (JSON), nunca código de UI ni lógica de juego.**
   Si se necesita una mecánica nueva, se programa como componente reutilizable en el
   frontend, no se genera dinámicamente.
5. **Nunca hardcodear secretos** (API keys, credenciales de DB, JWT secret). Todo vía
   variables de entorno (`compartido/config.py` en backend, `.env` en frontend).
6. **Tipos compartidos entre web y mobile viven en `packages/shared/src/types`.** Si
   cambias un modelo de datos en el backend, actualiza el tipo correspondiente ahí.
7. **Toda tabla nueva va en el schema de Postgres de su módulo**, con migración de
   Alembic — nunca modificar la base directamente sin migración.
8. **Endpoints y eventos de WebSocket del módulo `sesiones` deben pasar por moderación**
   (filtro de contenido) antes de reenviar mensajes entre usuarios — es una feature con
   usuarios interactuando entre sí, tratar la seguridad como requisito, no como extra.

---

## Convenciones de nombres

- Backend: `snake_case` para variables/funciones, `PascalCase` para clases y modelos.
- Frontend: `camelCase` para variables/funciones, `PascalCase` para componentes.
- Rutas de API: `/api/{modulo}/...` (ej. `/api/usuarios/login`, `/api/ia/generar-ruta`).
- Nombres de tablas en snake_case, en el schema correspondiente al módulo.

---

## Qué evitar (errores comunes al asistir en este proyecto)

- No propongas reorganizar el proyecto a arquitectura en capas horizontal global —
  ya se evaluó y se descartó por romper el aislamiento por dueño de módulo (ver arriba).
- No propongas microservicios para el MVP.
- No generes lógica de minijuegos completa vía IA en tiempo de ejecución — solo contenido
  que llena un componente ya existente.
- No agregues dependencias nuevas sin que estén justificadas por una necesidad real del
  módulo en el que se está trabajando.
- No implementes almacenamiento de datos de tarjetas de pago directamente — siempre a
  través de Stripe (tokenización), nunca en la base de datos propia.

---

## Estado actual del proyecto

Fase: scaffolding inicial / Semana 1-2 del roadmap de 5 meses.
Prioridad actual: esquema base de base de datos (usuarios + migraciones), auth
funcionando end-to-end, y CI básico corriendo. El resto de módulos aún no tiene
lógica de negocio implementada — solo la estructura de capas vacía.
