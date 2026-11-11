import React, { useState, useEffect, useRef } from "react";
import { 
  sesionesClient, 
  BusquedaSesionesResponse, 
  SesionDetalleResponse, 
  SesionListItem, 
  MensajeSesionResponse 
} from "@adaptativemaster/shared";

interface SocialViewProps {
  user?: any;
}

export function SocialView({ user }: SocialViewProps) {
  const token = localStorage.getItem("token") || "";

  // Estado general
  const [activeTab, setActiveTab] = useState<"lobby" | "sala">("lobby");
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Datos del Lobby
  const [matchmaking, setMatchmaking] = useState<BusquedaSesionesResponse | null>(null);
  const [salasPublicas, setSalasPublicas] = useState<SesionListItem[]>([]);
  const [temaNuevo, setTemaNuevo] = useState<string>("");
  const [codigoUnirse, setCodigoUnirse] = useState<string>("");
  const [creandoSala, setCreandoSala] = useState<boolean>(false);
  const [uniendoseSala, setUniendoseSala] = useState<boolean>(false);

  // Datos de la Sala Activa
  const [salaActual, setSalaActual] = useState<SesionDetalleResponse | null>(null);
  const [mensajes, setMensajes] = useState<MensajeSesionResponse[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState<string>("");
  const [copiado, setCopiado] = useState<boolean>(false);
  const [salaTab, setSalaTab] = useState<"reto" | "notas">("reto");

  // Estado del Reto Colaborativo
  const [indiceReto, setIndiceReto] = useState<number>(0);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState<number | null>(null);
  const [retoRespondido, setRetoRespondido] = useState<boolean>(false);
  const [apuntesCompartidos, setApuntesCompartidos] = useState<string>(
    "• Conceptos clave acordados en la sesión:\n- Entender la asincronía y el ciclo de eventos.\n- Manejo de excepciones en endpoints REST.\n- Implementación de pruebas unitarias y de integración."
  );

  // Referencias para WebSocket y scroll
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Retos colaborativos predefinidos
  const retosColaborativos = [
    {
      pregunta: "¿Cuál es la principal ventaja de utilizar WebSockets frente a peticiones HTTP tradicionales en aplicaciones interactivas?",
      opciones: [
        "Permite conexiones bidireccionales y de baja latencia en tiempo real sin polling continuo",
        "Obliga al servidor a almacenar en caché todas las consultas en disco",
        "Encripta automáticamente los datos sin necesidad de certificados SSL/TLS",
        "Reduce el consumo de memoria RAM del cliente a cero"
      ],
      correcta: 0,
      explicacion: "WebSockets mantiene un canal TCP abierto permanente que permite al servidor y al cliente enviarse mensajes mutuamente de manera instantánea con una sobrecarga mínima."
    },
    {
      pregunta: "En una arquitectura de software modular, ¿por qué es fundamental evitar la importación cruzada de repositorios entre módulos distintos?",
      opciones: [
        "Porque PostgreSQL no permite realizar consultas con JOIN entre tablas de diferentes schemas",
        "Para mantener el bajo acoplamiento y permitir que cada módulo evolucione o se extraiga de forma independiente",
        "Porque TypeScript prohíbe importar más de 3 archivos en un mismo componente",
        "Para acelerar la velocidad de compilación de Python en un 90%"
      ],
      correcta: 1,
      explicacion: "El aislamiento modular garantiza que cada dominio sea dueño de sus datos y exponga servicios limpios, evitando dependencias circulares que rompen la mantenibilidad."
    },
    {
      pregunta: "¿Qué mecanismo de Pydantic y FastAPI garantiza que las respuestas del LLM cumplan con el formato esperado antes de llegar al usuario?",
      opciones: [
        "Validación estricta de esquemas Pydantic con tipos de datos tipados y manejo de errores",
        "El compilador JIT de Python que traduce prompts a código binario",
        "El middleware de CORS que rechaza caracteres no válidos",
        "Un archivo .env donde se guardan todas las respuestas válidas"
      ],
      correcta: 0,
      explicacion: "Validar con modelos de Pydantic asegura que si la IA genera un JSON incompleto o malformado, el backend lo detecte de inmediato y aplique reintentos controlados."
    }
  ];

  // Cargar datos iniciales del Lobby
  useEffect(() => {
    cargarDatosLobby();
  }, []);

  const cargarDatosLobby = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [busquedaData, salasData] = await Promise.all([
        sesionesClient.buscarCompaneros(token).catch(() => null),
        sesionesClient.listarSalas(token).catch(() => [])
      ]);

      if (busquedaData) setMatchmaking(busquedaData);
      if (salasData) setSalasPublicas(salasData);
    } catch (err: any) {
      setErrorMsg("No se pudieron cargar los datos colaborativos.");
    } finally {
      setLoading(false);
    }
  };

  // Conexión WebSocket al entrar a una sala
  useEffect(() => {
    if (activeTab === "sala" && salaActual) {
      setMensajes(salaActual.mensajes_recientes || []);
      conectarWebSocket(salaActual.id);
    }

    return () => {
      desconectarWebSocket();
    };
  }, [activeTab, salaActual?.id]);

  // Auto-scroll en el chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const conectarWebSocket = (sesionId: string) => {
    desconectarWebSocket();

    const wsUrl = `ws://localhost:8000/api/sesiones/ws/${sesionId}?token=${token}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      // Conexión establecida
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "nuevo_mensaje" && data.mensaje) {
          setMensajes((prev) => [...prev, data.mensaje]);
        } else if (data.type === "usuario_conectado") {
          // Actualizar participantes si vienen en el payload
          if (data.usuarios && salaActual) {
            setSalaActual((prev) => prev ? {
              ...prev,
              participantes: data.usuarios.map((u: any) => ({
                id: u.id,
                usuario_id: u.id,
                nombre: u.nombre,
                conectado: true,
                unido_en: new Date().toISOString()
              }))
            } : null);
          }
        } else if (data.type === "reto_actualizado" && data.payload) {
          if (typeof data.payload.indice === "number") {
            setIndiceReto(data.payload.indice);
          }
          if (typeof data.payload.opcion === "number") {
            setOpcionSeleccionada(data.payload.opcion);
            setRetoRespondido(true);
          }
        }
      } catch (e) {
        // Ignorar mensajes no parseables
      }
    };

    ws.onerror = () => {
      // Manejar error silenciosamente con fallback REST
    };

    wsRef.current = ws;
  };

  const desconectarWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // Crear sala
  const handleCrearSala = async (e: React.FormEvent) => {
    e.preventDefault();
    const tema = temaNuevo.trim() || "Estudio Colaborativo";
    setCreandoSala(true);
    setErrorMsg("");
    try {
      const nuevaSala = await sesionesClient.crearSala(token, tema);
      setSalaActual(nuevaSala);
      setActiveTab("sala");
      setTemaNuevo("");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al crear la sala de estudio.");
    } finally {
      setCreandoSala(false);
    }
  };

  // Unirse por código
  const handleUnirsePorCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoUnirse.trim()) return;
    setUniendoseSala(true);
    setErrorMsg("");
    try {
      const sala = await sesionesClient.unirsePorCodigo(token, codigoUnirse.trim());
      setSalaActual(sala);
      setActiveTab("sala");
      setCodigoUnirse("");
    } catch (err: any) {
      setErrorMsg(err.message || "No se pudo acceder a la sala con ese código.");
    } finally {
      setUniendoseSala(false);
    }
  };

  // Entrar a una sala pública
  const handleEntrarASala = async (codigo: string) => {
    setLoading(true);
    try {
      const sala = await sesionesClient.unirsePorCodigo(token, codigo);
      setSalaActual(sala);
      setActiveTab("sala");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al unirse a la sala.");
    } finally {
      setLoading(false);
    }
  };

  // Salir de la sala actual
  const handleSalirDeSala = async () => {
    if (salaActual) {
      try {
        await sesionesClient.salirDeSala(token, salaActual.id);
      } catch (e) {
        // Salir de todos modos
      }
    }
    desconectarWebSocket();
    setSalaActual(null);
    setActiveTab("lobby");
    cargarDatosLobby();
  };

  // Enviar mensaje de chat
  const handleEnviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    const texto = nuevoMensaje.trim();
    if (!texto || !salaActual) return;

    setNuevoMensaje("");

    // Intentar enviar por WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "mensaje",
        text: texto
      }));
    } else {
      // Fallback a llamada REST
      try {
        const msgGuardado = await sesionesClient.enviarMensaje(token, salaActual.id, texto);
        setMensajes((prev) => [...prev, msgGuardado]);
      } catch (err: any) {
        setErrorMsg("Error al enviar el mensaje.");
      }
    }
  };

  // Sincronizar respuesta a reto colaborativo
  const handleResponderReto = (opcionIndex: number) => {
    setOpcionSeleccionada(opcionIndex);
    setRetoRespondido(true);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "reto_colaborativo",
        payload: {
          indice: indiceReto,
          opcion: opcionIndex
        }
      }));
    }
  };

  // Siguiente reto sincronizado
  const handleSiguienteReto = () => {
    const siguiente = (indiceReto + 1) % retosColaborativos.length;
    setIndiceReto(siguiente);
    setOpcionSeleccionada(null);
    setRetoRespondido(false);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "reto_colaborativo",
        payload: {
          indice: siguiente,
          opcion: null
        }
      }));
    }
  };

  // Copiar código de invitación
  const handleCopiarCodigo = () => {
    if (salaActual?.codigo_invitacion) {
      navigator.clipboard.writeText(salaActual.codigo_invitacion);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  // Invitar a un compañero sugerido (crea sala con ese tema y copia código)
  const handleInvitarCompanero = async (companero: any) => {
    const tema = `Sesión de ${companero.tag_interes || "Estudio"} con ${companero.nombre}`;
    setLoading(true);
    try {
      const nuevaSala = await sesionesClient.crearSala(token, tema);
      setSalaActual(nuevaSala);
      setActiveTab("sala");
    } catch (e: any) {
      setErrorMsg("No se pudo iniciar la sala de invitación.");
    } finally {
      setLoading(false);
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER: SALA DE ESTUDIO EN VIVO
  // ══════════════════════════════════════════════════════════════════════════
  if (activeTab === "sala" && salaActual) {
    const retoActual = retosColaborativos[indiceReto];

    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", gap: 16 }}>
        {/* Cabecera de la Sala */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#EFF6FF",
              border: "1px solid #DBEAFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2563EB"
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                  {salaActual.tema}
                </h2>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "#ECFDF5",
                  border: "1px solid #A7F3D0",
                  color: "#059669",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: 11,
                  fontWeight: 600
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                  EN VIVO
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#64748B", margin: "2px 0 0" }}>
                Creada por <strong style={{ color: "#334155" }}>{salaActual.creador_nombre}</strong> • {salaActual.participantes.length} participantes
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Botón copiar código */}
            <button
              onClick={handleCopiarCodigo}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: copiado ? "#ECFDF5" : "#F8FAFC",
                border: copiado ? "1px solid #10B981" : "1px solid #CBD5E1",
                color: copiado ? "#059669" : "#334155",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
              title="Copiar código para invitar compañeros"
            >
              <span>{copiado ? "✓ ¡Copiado!" : `Código: ${salaActual.codigo_invitacion}`}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>

            {/* Botón salir */}
            <button
              onClick={handleSalirDeSala}
              style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              Abandonar sala
            </button>
          </div>
        </div>

        {/* Cuerpo Principal de la Sala (2 Columnas: Retos / Notas + Chat & Participantes) */}
        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.95fr", gap: 16, flex: 1, minHeight: 0 }}>
          
          {/* Columna Izquierda: Actividad Colaborativa */}
          <div style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
          }}>
            {/* Pestañas de la actividad */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid #E2E8F0",
              background: "#F8FAFC",
              padding: "0 16px"
            }}>
              <button
                onClick={() => setSalaTab("reto")}
                style={{
                  padding: "12px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: "transparent",
                  border: "none",
                  borderBottom: salaTab === "reto" ? "2px solid #2563EB" : "2px solid transparent",
                  color: salaTab === "reto" ? "#2563EB" : "#64748B",
                  cursor: "pointer"
                }}
              >
                🎯 Reto Colaborativo Sincronizado
              </button>
              <button
                onClick={() => setSalaTab("notas")}
                style={{
                  padding: "12px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  background: "transparent",
                  border: "none",
                  borderBottom: salaTab === "notas" ? "2px solid #2563EB" : "2px solid transparent",
                  color: salaTab === "notas" ? "#2563EB" : "#64748B",
                  cursor: "pointer"
                }}
              >
                📝 Pizarra de Apuntes Grupales
              </button>
            </div>

            {/* Contenido de la actividad */}
            <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
              {salaTab === "reto" ? (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Pregunta {indiceReto + 1} de {retosColaborativos.length}
                    </span>
                    <span style={{ fontSize: 12, color: "#64748B" }}>
                      Sincronizado en tiempo real con tu equipo
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", lineHeight: 1.45, margin: "0 0 20px" }}>
                    {retoActual.pregunta}
                  </h3>

                  {/* Opciones */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                    {retoActual.opciones.map((opcion, idx) => {
                      const seleccionada = opcionSeleccionada === idx;
                      const esCorrecta = idx === retoActual.correcta;
                      let bg = "#FFFFFF";
                      let border = "#E2E8F0";
                      let textColor = "#1E293B";

                      if (retoRespondido) {
                        if (esCorrecta) {
                          bg = "#ECFDF5";
                          border = "#10B981";
                          textColor = "#065F46";
                        } else if (seleccionada && !esCorrecta) {
                          bg = "#FEF2F2";
                          border = "#EF4444";
                          textColor = "#991B1B";
                        }
                      } else if (seleccionada) {
                        bg = "#EFF6FF";
                        border = "#2563EB";
                        textColor = "#1D4ED8";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => !retoRespondido && handleResponderReto(idx)}
                          disabled={retoRespondido}
                          style={{
                            textAlign: "left",
                            padding: "14px 16px",
                            background: bg,
                            border: `1.5px solid ${border}`,
                            borderRadius: 10,
                            fontSize: 13.5,
                            fontWeight: 500,
                            color: textColor,
                            cursor: retoRespondido ? "default" : "pointer",
                            transition: "all 0.15s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 12
                          }}
                        >
                          <span style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: retoRespondido && esCorrecta ? "#10B981" : retoRespondido && seleccionada ? "#EF4444" : "#F1F5F9",
                            color: retoRespondido && (esCorrecta || seleccionada) ? "#FFFFFF" : "#64748B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span style={{ flex: 1 }}>{opcion}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback y Explicación */}
                  {retoRespondido && (
                    <div style={{
                      padding: "16px 18px",
                      background: opcionSeleccionada === retoActual.correcta ? "#F0FDF4" : "#FFFBEB",
                      border: opcionSeleccionada === retoActual.correcta ? "1px solid #BBF7D0" : "1px solid #FDE68A",
                      borderRadius: 10,
                      marginBottom: 20
                    }}>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: opcionSeleccionada === retoActual.correcta ? "#166534" : "#92400E",
                        marginBottom: 4
                      }}>
                        {opcionSeleccionada === retoActual.correcta ? "✓ ¡Respuesta Correcta!" : "ℹ️ Explicación del concepto"}
                      </div>
                      <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>
                        {retoActual.explicacion}
                      </div>
                    </div>
                  )}

                  {/* Botón avanzar reto */}
                  {retoRespondido && (
                    <button
                      onClick={handleSiguienteReto}
                      style={{
                        background: "#2563EB",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 20px",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 1px 2px rgba(37,99,235,0.2)"
                      }}
                    >
                      Siguiente reto grupal →
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 8 }}>
                    Notas compartidas del equipo (edición colaborativa):
                  </label>
                  <textarea
                    value={apuntesCompartidos}
                    onChange={(e) => setApuntesCompartidos(e.target.value)}
                    style={{
                      flex: 1,
                      minHeight: 220,
                      padding: 14,
                      borderRadius: 8,
                      border: "1px solid #CBD5E1",
                      fontFamily: "monospace",
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "#1E293B",
                      resize: "none",
                      outline: "none"
                    }}
                  />
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 8 }}>
                    💡 Los apuntes quedan registrados en la sesión para que todos los miembros puedan repasarlos al terminar.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Participantes y Chat en Vivo */}
          <div style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
          }}>
            {/* Cabecera Participantes */}
            <div style={{
              padding: "12px 18px",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
                En la sala ({salaActual.participantes.length})
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                {salaActual.participantes.map((p) => (
                  <div
                    key={p.id}
                    title={`${p.nombre} (${p.conectado ? "En línea" : "Desconectado"})`}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "#EFF6FF",
                      border: "1.5px solid #2563EB",
                      color: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700
                    }}
                  >
                    {p.nombre.slice(0, 2).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Historial de Mensajes del Chat */}
            <div style={{ flex: 1, padding: "16px 18px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {mensajes.length === 0 ? (
                <div style={{ textAlign: "center", color: "#94A3B8", fontSize: 13, marginTop: 40 }}>
                  💬 No hay mensajes aún. ¡Saluda a tus compañeros de estudio!
                </div>
              ) : (
                mensajes.map((m) => {
                  const esMio = user && m.usuario_nombre === user.nombre;
                  return (
                    <div
                      key={m.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: esMio ? "flex-end" : "flex-start"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: esMio ? "#2563EB" : "#334155" }}>
                          {esMio ? "Tú" : m.usuario_nombre}
                        </span>
                        <span style={{ fontSize: 10, color: "#94A3B8" }}>
                          {new Date(m.enviado_en).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <div style={{
                        maxWidth: "85%",
                        padding: "8px 14px",
                        borderRadius: esMio ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                        background: esMio ? "#2563EB" : "#F1F5F9",
                        color: esMio ? "#FFFFFF" : "#0F172A",
                        fontSize: 13,
                        lineHeight: 1.45,
                        wordBreak: "break-word"
                      }}>
                        {m.text}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de Mensaje */}
            <form onSubmit={handleEnviarMensaje} style={{ padding: "12px 16px", borderTop: "1px solid #E2E8F0", display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Escribe un mensaje al grupo..."
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #CBD5E1",
                  fontSize: 13,
                  outline: "none",
                  color: "#0F172A"
                }}
              />
              <button
                type="submit"
                disabled={!nuevoMensaje.trim()}
                style={{
                  background: nuevoMensaje.trim() ? "#2563EB" : "#94A3B8",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 8,
                  padding: "0 16px",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: nuevoMensaje.trim() ? "pointer" : "not-allowed",
                  transition: "background 0.15s ease"
                }}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER: LOBBY DE ESTUDIO COLABORATIVO
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="animate-fade-in" style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: 40 }}>
      {/* Banner Superior */}
      <div style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        padding: "32px 36px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <div style={{ maxWidth: 620 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#EFF6FF",
            border: "1px solid #DBEAFE",
            borderRadius: 16,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: "#1D4ED8",
            marginBottom: 12
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />
            Fase 5 • Sesiones en Vivo
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
            Estudio Colaborativo
          </h1>
          <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: 0 }}>
            Estudia en tiempo real con otros compañeros. Comparte salas privadas por código o únete a sesiones de práctica grupal con retos interactivos sincronizados.
          </p>
        </div>

        {/* Métricas rápidas */}
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ textAlign: "center", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px 20px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#2563EB" }}>{salasPublicas.length}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>Salas Activas</div>
          </div>
          <div style={{ textAlign: "center", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: "14px 20px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#10B981" }}>+50 XP</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B" }}>Bono Grupal</div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div style={{
          background: "#FEF2F2",
          border: "1px solid #FECACA",
          color: "#DC2626",
          padding: "12px 18px",
          borderRadius: 10,
          marginBottom: 24,
          fontSize: 13
        }}>
          {errorMsg}
        </div>
      )}

      {/* Grid de 2 Columnas: Crear Sala & Unirse por Código */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        
        {/* Tarjeta: Crear Sala */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#EFF6FF",
              border: "1px solid #DBEAFE",
              color: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Crear una sala de estudio
              </h3>
              <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
                Genera un código para estudiar con amigos o compañeros
              </p>
            </div>
          </div>

          <form onSubmit={handleCrearSala}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
              Tema o materia de estudio:
            </label>
            <input
              type="text"
              placeholder="Ej: Repaso de Python, Algoritmos, APIs..."
              value={temaNuevo}
              onChange={(e) => setTemaNuevo(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: 13,
                marginBottom: 14,
                outline: "none"
              }}
            />
            <button
              type="submit"
              disabled={creandoSala}
              style={{
                width: "100%",
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                padding: "11px",
                fontSize: 13,
                fontWeight: 600,
                cursor: creandoSala ? "not-allowed" : "pointer"
              }}
            >
              {creandoSala ? "Creando sala..." : "Crear Sala y Obtener Código →"}
            </button>
          </form>
        </div>

        {/* Tarjeta: Unirse con Código */}
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 14,
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#16A34A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Unirse con código
              </h3>
              <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
                Ingresa el código compartido por tu compañero
              </p>
            </div>
          </div>

          <form onSubmit={handleUnirsePorCodigo}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
              Código de invitación:
            </label>
            <input
              type="text"
              placeholder="Ej: ABC-123"
              value={codigoUnirse}
              onChange={(e) => setCodigoUnirse(e.target.value.toUpperCase())}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: 13,
                marginBottom: 14,
                outline: "none",
                letterSpacing: "0.08em",
                fontWeight: 600
              }}
            />
            <button
              type="submit"
              disabled={uniendoseSala || !codigoUnirse.trim()}
              style={{
                width: "100%",
                background: "#0F172A",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                padding: "11px",
                fontSize: 13,
                fontWeight: 600,
                cursor: uniendoseSala || !codigoUnirse.trim() ? "not-allowed" : "pointer"
              }}
            >
              {uniendoseSala ? "Entrando..." : "Entrar a la Sala →"}
            </button>
          </form>
        </div>
      </div>

      {/* Sección: Compañeros Sugeridos (Matchmaking) */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>
              Compañeros sugeridos para estudiar
            </h2>
            <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
              Estudiantes en tu misma área ({matchmaking?.contexto_actual.ruta || "Python & IA"} • Nivel {matchmaking?.contexto_actual.nivel || "Intermedio"})
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {matchmaking?.companeros_sugeridos.map((comp) => (
            <div
              key={comp.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#EFF6FF",
                  border: "1px solid #DBEAFE",
                  color: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700
                }}>
                  {comp.nombre.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{comp.nombre}</div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>Nivel {comp.nivel}</div>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <span style={{
                  display: "inline-block",
                  background: "#F1F5F9",
                  color: "#475569",
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600
                }}>
                  🏷️ {comp.tag_interes}
                </span>
              </div>

              <button
                onClick={() => handleInvitarCompanero(comp)}
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                  color: "#2563EB",
                  borderRadius: 8,
                  padding: "8px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#EFF6FF";
                  e.currentTarget.style.borderColor = "#BFDBFE";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F8FAFC";
                  e.currentTarget.style.borderColor = "#CBD5E1";
                }}
              >
                Invitar a estudiar juntos →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección: Salas Públicas Activas */}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 16px" }}>
          Salas abiertas en la comunidad
        </h2>

        {salasPublicas.length === 0 ? (
          <div style={{
            background: "#FFFFFF",
            border: "1px dashed #CBD5E1",
            borderRadius: 14,
            padding: "36px",
            textAlign: "center"
          }}>
            <p style={{ color: "#64748B", fontSize: 14, margin: "0 0 12px" }}>
              No hay salas públicas abiertas en este momento.
            </p>
            <button
              onClick={() => setTemaNuevo("Estudio Grupal de Python")}
              style={{
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                padding: "9px 18px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              ¡Sé el primero en abrir una sala!
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {salasPublicas.map((sala) => (
              <div
                key={sala.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
                      {sala.tema}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: "#ECFDF5",
                      color: "#059669",
                      padding: "2px 6px",
                      borderRadius: 4
                    }}>
                      {sala.codigo_invitacion}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>
                    Creada por {sala.creador_nombre} • {sala.participantes_count} miembros
                  </div>
                </div>

                <button
                  onClick={() => handleEntrarASala(sala.codigo_invitacion)}
                  style={{
                    background: "#0F172A",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Unirme
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
