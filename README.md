# 1. Nombre y descripción del proyecto

**Nombre:** Adaptative Master — Plataforma de Aprendizaje Adaptativo e Inteligente Impulsada por IA.

**Descripción:** Es una plataforma web educativa interactiva diseñada para transformar el aprendizaje autodidacta en una experiencia personalizada, gamificada y pedagógicamente asistida. El sistema elimina las rutas de estudio lineales y genéricas mediante el uso de Modelos de Lenguaje Grande (LLMs a través de OpenRouter), generando mallas curriculares dinámicas adaptadas a las metas y tiempos de cada estudiante. Integra un mapa de progreso visual en serpentina estilo Duolingo, minijuegos interactivos de evaluación generados en tiempo real, un tutor conversacional con contexto pedagógico profundo y salas de estudio colaborativas en vivo para fomentar la constancia y el aprendizaje social.

---

## 2. Objetivo general y principales funcionalidades

**Objetivo general:** Desarrollar una plataforma integral de aprendizaje adaptativo web y móvil que personalice de manera automatizada las rutas de estudio, evalúe continuamente el rendimiento del usuario mediante mecánicas gamificadas y ofrezca tutoría contextualizada asistida por IA, optimizando la retención de conocimientos y la motivación en el proceso formativo.

**Principales funcionalidades:**

* **Generación Dinámica de Rutas (Asistente Wizard IA):** Asistente paso a paso que analiza el tema de interés, el nivel del estudiante y su disponibilidad de tiempo para estructurar automáticamente una malla curricular modular.
* **Mapa de Progreso Interactivo (Estilo Duolingo):** Interfaz visual en serpentina horizontal con desplazamiento asistido por rueda del ratón, visualizando lecciones bloqueadas, en curso y superadas.
* **Antesala y Contenido de Lección:** Pantalla de preparación con resúmenes conceptuales generados por IA, recursos audiovisuales/videos embebidos y formato listo para estudio o impresión técnica.
* **Motor de Minijuegos Adaptativos:** Módulo de evaluación dinámica con 4 modalidades pedagógicas distintas:
  * **Emparejamiento (`EmparejadorGame`):** Vinculación de conceptos clave con sus definiciones.
  * **Ordenamiento (`OrdenarGame`):** Jerarquización de pasos procedimentales o algoritmos.
  * **Rellenar Espacios (`RellenarGame`):** Completar enunciados teóricos o fragmentos de código.
  * **Verdadero o Falso (`VerdaderoFalsoGame`):** Validación rápida de afirmaciones técnicas.
* **Tutor Inteligente Conversacional (`@ Mentions`):** Chat pedagógico interactivo con memoria de contexto, selector dinámico de cursos y autocompletado flotante con comandos `@` (ej. `@leccion_actual`, `@mis_errores`) para consultas dirigidas.
* **Sistema de Gamificación y Métricas:** Acumulación de puntos de experiencia (XP), seguimiento de rachas de estudio diarias, tasa de precisión y desbloqueo de módulos.
* **Salas de Estudio Social y Multijugador:** Módulo de sesiones de estudio en tiempo real con organización por temáticas grupales y presencia de compañeros.
* **Perfil de Usuario y Configuración Modular:** Gestión de intereses y metas personales almacenadas en base de datos, junto con paneles configurables de cuenta, notificaciones, idioma, privacidad y seguridad.

---

## 3. Tecnologías, herramientas y dependencias utilizadas

El proyecto está construido bajo una arquitectura de **Monorepo (Turborepo)** con un backend en **Monolito Modular en capas** (`routes` → `services` → `repository`) y clientes frontend desacoplados:

* **Lenguajes Base:**
  * **Python `v3.11` o superior** (Backend y servicios de IA).
  * **TypeScript / JavaScript (Node.js `v20` o superior)** (Frontend web y paquetes compartidos).

* **Interfaz Gráfica (Frontend):**
  * **React `v18.3`:** Biblioteca principal para la construcción de interfaces de usuario componentes y reactivas.
  * **Vite `v5.4`:** Herramienta de compilación y empaquetador ultrarrápido para desarrollo moderno.
  * **Tailwind CSS:** Framework utilitario para el diseño de la interfaz oscura (*Dark Mode*) y estilización responsiva.
  * **Lucide React:** Set de iconografía vectorial moderna y consistente.
  * **React Router DOM `v6.26`:** Gestión de rutas y navegación en el Dashboard de la aplicación.
  * **React Markdown & Remark GFM:** Renderizado y formateo dinámico de respuestas enriquecidas del tutor e instrucciones de lecciones.

* **Backend y Lógica de Negocio:**
  * **FastAPI `v0.115`:** Framework web asíncrono moderno y de alto desempeño para la API REST.
  * **SQLAlchemy `v2.0` (AsyncIO) & AsyncPG:** ORM para manejo asíncrono de persistencia relacional.
  * **Alembic `v1.13`:** Sistema de control de versiones y migraciones de la base de datos.
  * **Pydantic `v2.9`:** Validación de esquemas, tipado estricto y serialización de datos.
  * **Python Socket.IO `v5.11`:** Soporte de WebSockets para comunicación bidireccional en tiempo real (salas de estudio).
  * **OpenRouter API & HTTPX:** Conexión asíncrona con modelos de Inteligencia Artificial (LLMs como Meta LLaMA / Claude / GPT) mediante prompts optimizados.

* **Base de Datos, Caché y Almacenamiento:**
  * **PostgreSQL `v16`:** Motor de base de datos relacional para usuarios, cursos, lecciones y progreso.
  * **Redis `v7`:** Almacén clave-valor en memoria para control de sesiones activas, salas y caché temporal.

* **Dependencias de Seguridad y Autenticación:**
  * **python-jose & bcrypt:** Generación y validación de tokens JWT (JSON Web Tokens) y cifrado seguro de contraseñas.

---

## 4. Requisitos de hardware y software

### Requisitos de Hardware:
* **Computadora:** Equipo de escritorio o laptop funcional.
* **Conexión de Red:** Conexión a Internet activa (necesaria para consumir las APIs de OpenRouter y descarga de paquetes en contenedores).
* **Memoria RAM:** Mínimo 4 GB (se recomiendan **8 GB o más** para ejecutar fluidamente Docker con PostgreSQL, Redis, Backend y Frontend simultáneos).
* **Almacenamiento:** Al menos **3 GB** de espacio libre en disco para las imágenes base de Docker, volúmenes de base de datos y dependencias locales.

### Requisitos de Software:
* **Sistema Operativo:** Distribuciones Linux (Ubuntu, Debian, Arch, Fedora), macOS o Windows con subsistema WSL2 activado.
* **Motor de Contenedores:** **[Docker Engine](https://docs.docker.com/get-docker/)** y **Docker Compose** instalados y en ejecución.
* **Entorno de Desarrollo (Opcional para ejecución sin Docker):**
  * Node.js `v20+` y npm.
  * Python `v3.11+` con gestor de entornos virtuales (`venv`).
  * Cliente Git instalado.

---

## 5. Instrucciones de instalación y configuración

Sigue estos pasos en tu terminal para preparar el entorno de trabajo:

1. **Clonar el repositorio:** Descarga el proyecto en tu máquina local ejecutando:
   ```bash
   git clone git@github.com:AlejandroAlvarezLopez183/AdaptativeMaster.git
   cd AdaptativeMaster
   ```

2. **Configurar variables de entorno:**
   Copia la plantilla de configuración de backend para generar tu archivo `.env`:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Abre `backend/.env` y configura tus credenciales esenciales:
   ```env
   DATABASE_URL=postgresql+asyncpg://user:password@db:5432/adaptativemaster
   REDIS_URL=redis://redis:6379
   JWT_SECRET=tu_clave_secreta_jwt_de_desarrollo
   AI_API_KEY=sk-or-v1-xxxxxxxxxxxxxxx  # Tu API Key de OpenRouter
   OPENROUTER_MODEL_TUTOR=meta-llama/llama-3.1-8b-instruct:free
   OPENROUTER_MODEL_RUTA=meta-llama/llama-3.1-8b-instruct:free
   ```

3. **Construir y levantar los contenedores con Docker:**
   Inicia todos los servicios del proyecto (PostgreSQL, Redis, Backend y Frontend Web) en segundo plano:
   ```bash
   docker compose up -d --build
   ```

4. **Aplicar migraciones de Base de Datos:**
   Ejecuta las migraciones de Alembic en el contenedor del backend para inicializar las tablas:
   ```bash
   docker compose exec backend alembic upgrade head
   ```

---

## 6. Procedimiento de ejecución, compilación o despliegue

### Ejecución del sistema:
Una vez levantado el stack mediante Docker Compose, los servicios se encuentran disponibles en los siguientes puntos de acceso locales:

* **Frontend Web (Vite + React):** [http://localhost:5173](http://localhost:5173)
* **Backend API (FastAPI):** [http://localhost:8000](http://localhost:8000)
* **Documentación Interactiva Swagger:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **Gestor de Base de Datos (pgAdmin 4):** [http://localhost:5051](http://localhost:5051) *(Email: `admin@estudilab.ai`, Contraseña: `admin`)*

### Despliegue y uso en entornos locales:
Al tratarse de una solución orquestada con Docker, no es necesario instalar Python ni Node.js en la máquina anfitriona para el uso regular. Para detener el sistema:
```bash
docker compose down
```
Para ver los registros en vivo del backend o frontend:
```bash
docker compose logs -f backend
docker compose logs -f web
```

### Ejemplos de uso y evidencias de funcionamiento:

* **Asistente Wizard de Creación de Rutas:** Permite a los estudiantes ingresar un tema deseado, nivel y tiempo disponible para generar un plan de estudios estructurado en segundos mediante IA.
* **Mapa de Lecciones Duolingo:** Navegación dinámica por nodos donde los estudiantes desbloquean temas progresivamente a medida que completan actividades teóricas y prácticas.
* **Antesala de Lección y Recursos Multimedia:** Muestra resúmenes teóricos, videos explicativos incrustados y opción de impresión formateada para estudiar offline.
* **Batería de Minijuegos Evaluativos:** Retos interactivos de emparejar conceptos, ordenar secuencias, rellenar espacios y preguntas de verdadero/falso que otorgan puntos de experiencia (XP).
* **Tutor Inteligente con Contexto `@`:** Asistente conversacional con acceso al historial de lecciones, selector rápido de curso y menciones rápidas para resolver dudas puntuales.
* **Panel de Perfil y Ajustes:** Interfaz completa para personalizar intereses de aprendizaje, objetivos y configurar privacidad, temas y notificaciones.
