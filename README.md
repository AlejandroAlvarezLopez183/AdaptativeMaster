# Adaptative Master

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

## 🚀 Requisitos previos

Para correr este proyecto en tu entorno local, solo necesitas tener instalado:
- **[Docker](https://docs.docker.com/get-docker/)** y **Docker Compose**.
- _Opcional_: Node.js v20+ (solo si deseas correr el frontend fuera de Docker para desarrollo avanzado en la app móvil).

## 💻 Cómo levantar el proyecto localmente

1. **Configurar variables de entorno**
   Copia el archivo de ejemplo en el backend para crear tu `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
   *(Ajusta las credenciales de la base de datos o JWT si es necesario)*

2. **Levantar todos los servicios con Docker**
   El proyecto está contenerizado. Un solo comando levantará la Base de Datos, Redis, el Backend (FastAPI) y el Frontend Web (Vite/React):
   ```bash
   docker compose up -d
   ```

3. **Aplicar migraciones de la Base de Datos**
   La primera vez que levantes el proyecto, necesitas crear las tablas ejecutando:
   ```bash
   docker compose exec backend alembic upgrade head
   ```

4. **¡Listo!**
   - El **Frontend Web** estará disponible en: [http://localhost:5173](http://localhost:5173)
   - El **Backend API** estará disponible en: [http://localhost:8000](http://localhost:8000)
   - La **Documentación Swagger** en: [http://localhost:8000/docs](http://localhost:8000/docs)

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
