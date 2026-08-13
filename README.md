# EstudiLabAI

Plataforma de aprendizaje impulsada 100% por IA: rutas personalizadas,
minijuegos generados dinámicamente, tutor conversacional y sesiones de
estudio social en tiempo real.

## Estructura del repo

```
apps/
  web/        → Frontend web (React + TypeScript + Vite)
  mobile/     → App móvil (React Native + Expo)
packages/
  shared/     → Tipos, cliente de API y validaciones compartidas entre web y mobile
backend/
  modules/    → Backend en monolito modular (FastAPI)
    usuarios/     → Auth, perfil, JWT
    ia/           → Rutas de aprendizaje, prompts, tutor
    progreso/     → XP, rachas, logros, minijuegos
    sesiones/     → WebSockets, salas, matchmaking
    pagos/        → Stripe, suscripciones
    compartido/   → Config, conexión DB, utilidades comunes
docs/
  diagramas/  → Diagramas ER, arquitectura, flujo (Mermaid / exportados)
```

Cada módulo del backend sigue el patrón de capas: `routes.py` → `services.py` → `repository.py`.

## Cómo levantar el proyecto localmente

1. Copiar `.env.example` a `.env` dentro de `backend/` y ajustar valores
2. Levantar base de datos y backend:
   ```bash
   docker compose up -d
   ```
3. Instalar dependencias del monorepo (frontend):
   ```bash
   npm install
   ```
4. Levantar el frontend web:
   ```bash
   npm run dev:web
   ```
5. Levantar la app móvil:
   ```bash
   npm run dev:mobile
   ```

## Migraciones de base de datos

```bash
cd backend
alembic revision --autogenerate -m "descripcion"
alembic upgrade head
```

## Módulos y dueños

| Módulo | Dueño |
|---|---|
| usuarios | — |
| ia | — |
| progreso | — |
| sesiones | — |
| pagos | — |
| infra / CI/CD | — |

_(Completar con los nombres del equipo)_
