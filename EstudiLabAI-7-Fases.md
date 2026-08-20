# EstudiLabAI — Las 7 Fases del Proyecto

> Documento de referencia con el desglose completo de actividades, desde el análisis del problema hasta la beta cerrada con testers reales.

---

## Fase 1 · Análisis del problema

No se escribe código en esta fase, pero es la que evita construir algo que nadie quiere. No debería tomar más de 1-2 semanas.

1. **Definir el nicho específico** — decisión más urgente antes de avanzar a arquitectura. Ser generalista pone al proyecto a competir de frente contra Duolingo; el nicho específico es donde está la ventaja real.
2. **Entrevistas rápidas con 8-10 personas del nicho elegido** (15-20 min cada una):
   - ¿Cómo estudian ese tema hoy? ¿Qué usan?
   - ¿Qué les frustra de las apps/métodos actuales?
   - ¿Han estudiado acompañados/en grupo? ¿Les gustaría?
   - ¿Pagarían por algo así? ¿Cuánto?
3. **Mapear a la competencia directa del nicho elegido**, no solo a Duolingo en general.
4. **Escribir el problema en una sola frase clara**, por ejemplo: *"Las personas que quieren aprender X abandonan porque estudian solas y el contenido es genérico."*
5. **Definir el alcance real del MVP** con honestidad, considerando el tamaño actual del equipo.
6. **Validar el nombre y la propuesta de valor** en una frase que cualquiera del equipo pueda explicar en 30 segundos sin trabarse.

**Entregable:** documento corto con nicho elegido, problema en una frase, aprendizajes clave de las entrevistas, y alcance definitivo del MVP.

---

## Fase 2 · Diseño de arquitectura y UX

Aquí el "qué construir" se convierte en decisiones técnicas y visuales concretas.

1. **Confirmar y documentar el stack técnico definitivo** (FastAPI, React, React Native, PostgreSQL, monolito modular) — que todo el equipo esté de acuerdo antes de escribir código.
2. **Diseñar el ERD completo**: rutas de aprendizaje, lecciones, progreso, minijuegos, sesiones, pagos, con sus relaciones y schemas de Postgres por módulo.
3. **Definir los flujos de usuario principales**: registro → onboarding → primera ruta → primera lección → primer minijuego → gamificación; y el flujo paralelo de sesión social.
4. **Wireframes de baja fidelidad** de las pantallas clave: onboarding, ruta, lección/minijuego, perfil/progreso, sesión en vivo.
5. **Definir los contratos de API** entre frontend y backend antes de programar en paralelo.
6. **Diseñar la estructura de prompts** para la capa de IA: cómo pedir rutas, lecciones y contenido de minijuegos, con qué estructura de salida (JSON) y validaciones.
7. **Definir un sistema de diseño básico** (colores, tipografía, componentes base) para evitar estilos inconsistentes entre el equipo.
8. **Ajustar el roadmap de fases** con el equipo y plazo real ya confirmados.

**Entregable:** ERD completo, wireframes, flujos de usuario documentados, contratos de API base, roadmap ajustado.

---

## Fase 3 · Scaffolding y setup del proyecto

Aquí pasan del plan en papel a algo corriendo.

1. **Crear el repositorio en GitHub**, rama `develop`, reglas de protección (PR obligatorio, revisión, CI pasando), y conectar Linear con GitHub.
2. **Verificar que el entorno local funciona para todo el equipo**, no solo para quien lo armó: `docker compose up -d`, `npm install`, backend respondiendo en `/health`, frontend cargando en local.
3. **Configurar las migraciones de base de datos reales** con las tablas completas del ERD de la Fase 2.
4. **Implementar autenticación end-to-end (JWT funcionando de verdad)** — bloquea al resto del equipo hasta que exista.
5. **Configurar variables de entorno y secretos reales** (no los de ejemplo del scaffolding).
6. **Verificar que el CI de GitHub Actions corre y pasa** en verde.
7. **Primer despliegue a staging en DigitalOcean**, aunque sea solo un "hello world" — validar el pipeline completo de punta a punta.
8. **Configurar linting y formateo automático** (ESLint/Prettier en frontend, Black/Ruff en backend).
9. **Repartir los módulos entre el equipo** y crear el primer set de issues en Linear para arrancar la Fase 4.

**Entregable:** repo funcionando localmente para todos, auth real funcionando, CI verde, primer deploy exitoso a staging, cada módulo con su esqueleto de capas listo.

---

## Fase 4 · Desarrollo del núcleo

La fase más larga del proyecto. Aquí se construye el "camino feliz" individual de la app.

### Módulo IA — generación de rutas y contenido
- Endpoint que genera una ruta de aprendizaje completa según objetivo/nivel/tiempo
- Prompts finales integrados al backend, con salida validada por Pydantic
- Caché de plantillas base para reducir costo de tokens
- Generación de contenido de lección individual
- Manejo de errores cuando la IA devuelve algo mal formado

### Módulo Progreso — minijuegos y gamificación
- Implementar las 4-5 mecánicas de juego como componentes reutilizables (emparejar pares, completar espacios, ordenar secuencia, quiz contra reloj, arrastrar y soltar)
- Endpoint que pide a la IA el contenido (JSON) para llenar cada mecánica
- Cálculo de XP, rachas y niveles
- Primeros 5-8 logros
- Pantalla de perfil/progreso

### Tutor conversacional
- Endpoint de chat con contexto de conversación
- Integración con el módulo de progreso (que sepa en qué lección está el usuario)
- UI de chat en web y mobile
- Tono definido en el prompt del sistema: paciente, explica el porqué, no solo corrige

### Frontend
- Onboarding, pantalla de ruta, pantalla de lección con minijuego, perfil/progreso, chat del tutor
- En ambas plataformas (web y mobile), reutilizando tipos y lógica desde `packages/shared`

### Backend core
- Endpoints de perfil de usuario
- Relación usuario-rutas-lecciones en base de datos
- Arrancar módulo de pagos si el tiempo lo permite

### Qué NO entra en esta fase
- Sesiones sociales en tiempo real (Fase 5 aparte)
- Integración completa de pagos si el tiempo aprieta
- Pulido visual fino

**Entregable:** un usuario puede registrarse, recibir una ruta generada por IA, completar lecciones con minijuegos funcionando, hablar con el tutor, y ver su progreso.

---

## Fase 5 · Sesiones sociales en tiempo real

El diferenciador central del producto frente a la competencia.

1. **Infraestructura de tiempo real**: servidor WebSocket sobre FastAPI, eventos base (`unirse_sala`, `salir_sala`, `mensaje`, `sincronizar_estado`, `usuario_conectado/desconectado`), Redis Pub/Sub, manejo de reconexión.
2. **Modelo de datos de sesiones**: `SesionEstudio`, `ParticipanteSesion`, `MensajeSesion`, con sus migraciones en el schema `sesiones`.
3. **Crear y unirse a una sesión**: endpoint de creación, unión por código de invitación, matchmaking automático por tema/nivel/horario.
4. **Estado compartido y sincronización**: todos ven el mismo ejercicio, definir mecánica de interacción (quién responde primero / todos comparan), reflejar aciertos/fallos/desconexiones en tiempo real.
5. **Chat dentro de la sesión**: UI en tiempo real, persistencia de mensajes, indicador de "escribiendo...".
6. **Moderación y seguridad (crítico, no opcional)**: filtro automático de contenido, reporte y bloqueo de usuarios, rate limiting de mensajes, controles adicionales si hay usuarios menores de edad.
7. **Cierre de sesión y persistencia**: guardar resumen de la sesión, alimentar el progreso individual, pantalla de resumen post-sesión.
8. **Integración con el resto de la app**: entrada visible para "estudiar con alguien", notificaciones de invitación/matchmaking, reutilizar la lógica de IA ya construida en la Fase 4.

### Orden de recorte si el tiempo aprieta
1. Quitar video/audio (ya descartado del MVP desde el inicio)
2. Simplificar matchmaking automático a solo unión por código
3. Mover esta fase completa a después de la beta inicial, si es necesario

**Entregable:** dos o más usuarios pueden crear/unirse a una sesión, ver contenido sincronizado, chatear con moderación activa, y ver un resumen al terminar.

---

## Fase 6 · Testing intensivo

Se frena la construcción de cosas nuevas y todo se enfoca en confiabilidad.

1. **Code freeze de features nuevas** — solo se corrigen bugs de lo ya construido. Ideas nuevas se anotan para después de la beta.
2. **Completar cobertura de tests automatizados**: unitarios de lógica crítica (XP, validación de IA, matchmaking), tests de integración de flujos completos, 3-5 tests E2E con Playwright, revisar cobertura con `pytest --cov` priorizando auth/pagos/IA.
3. **Testing manual estructurado** con checklist de casos concretos (respuestas simultáneas en sesión, IA tardada, cierre de app a mitad de un minijuego).
4. **Revisión de seguridad**: rate limiting activo, validación de que nadie accede a datos de otro usuario, secretos en variables de entorno (no hardcodeados), CORS y HTTPS, pruebas del sistema de moderación.
5. **Pruebas de carga básicas**: comportamiento con 20-30 usuarios generando rutas simultáneamente, cuántas conexiones WebSocket aguanta el servidor.
6. **Revisión de costos reales de IA** con datos de uso, validando o corrigiendo el presupuesto estimado.
7. **UAT con grupo muy chico** (5-10 personas de confianza) antes de la beta abierta.
8. **Checklist de salida** antes de pasar a la Fase 7:
   - [ ] Cero bugs críticos conocidos
   - [ ] Auth, pagos e IA con cobertura de tests sólida
   - [ ] Checklist de seguridad aplicado
   - [ ] Al menos una prueba de carga básica corrida sin caídas
   - [ ] UAT completado con feedback incorporado
   - [ ] Monitoreo (Sentry) activo y probado

**Entregable:** versión estable, sin bugs críticos, con seguridad revisada y evidencia de que aguanta uso real moderado.

---

## Fase 7 · Beta cerrada con testers reales

La validación más importante antes de invertir en marketing o lanzamiento público.

1. **Tamaño y perfil del grupo**: 50-200 personas del nicho específico validado en la Fase 1, no contactos al azar.
2. **Proceso de entrada**: invitación por código, mensaje de bienvenida claro, formulario corto de registro con contexto (nivel, objetivo).
3. **Duración y ritmo**: 4-6 semanas, en ciclos de 1-2 semanas con ajustes/fixes entre cada uno.
4. **Métricas a medir**:
   - Activación (% que completa onboarding y llega a su primera lección)
   - Retención día 1, día 7, día 30 (la métrica más importante)
   - Uso de la feature social
   - Finalización de rutas
   - Tiempo promedio por sesión de estudio
   - Costo real de IA por usuario activo
5. **Canales de feedback cualitativo**: canal directo (Discord/Telegram), formulario semanal corto, 3-5 entrevistas de 15 min a mitad y al final de la beta.
6. **Gestión de bugs**: proyecto/label específico en Linear para "Bugs de Beta", clasificados por severidad, con triage en cada ciclo.
7. **Reparto de roles del equipo durante la beta**: monitoreo técnico, comunicación con testers, análisis de métricas.
8. **Criterios de salida** (definir antes de empezar): retención día 7 por encima de cierto umbral, sin bugs críticos abiertos, feedback positivo sobre la feature social, costo de IA dentro de lo presupuestado. Si no se cumplen, extender la beta antes de lanzar públicamente.
9. **Cierre con los testers**: agradecimiento explícito, beneficio por su tiempo (acceso premium gratis, prioridad en el lanzamiento), solicitud de testimonios/reviews.

**Entregable:** datos reales de retención y uso, bugs críticos resueltos, testimonios de usuarios reales, y una decisión informada (con números) sobre si están listos para el lanzamiento público.

---

## Resumen visual del recorrido

```
1. Análisis del problema
        ↓
2. Diseño de arquitectura y UX
        ↓
3. Scaffolding y setup
        ↓
4. Desarrollo del núcleo (rutas, minijuegos, tutor)
        ↓
5. Sesiones sociales en tiempo real
        ↓
6. Testing intensivo (code freeze, solo bugs)
        ↓
7. Beta cerrada con testers reales
        ↓
   Lanzamiento público (fuera de este documento)
```
