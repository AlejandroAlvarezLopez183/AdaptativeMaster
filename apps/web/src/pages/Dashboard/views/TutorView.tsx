import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { iaClient, TutorChatResponse, RutaDetalle } from "@adaptativemaster/shared";

interface TutorViewProps {
  setActive?: (v: string) => void;
  rutaId?: string | null;
  leccionId?: string | null;
}

export function TutorView({ setActive, rutaId, leccionId }: TutorViewProps) {
  const [mensajes, setMensajes] = useState<TutorChatResponse[]>([]);
  const [ruta, setRuta] = useState<RutaDetalle | null>(null);
  const [inputMsg, setInputMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [activeRutaId, setActiveRutaId] = useState<string | null>(rutaId || null);
  const [activeLeccionId, setActiveLeccionId] = useState<string | null>(leccionId || null);
  const [todasLasRutas, setTodasLasRutas] = useState<{id: string, titulo: string}[]>([]);

  // Menciones state
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionIndex, setMentionIndex] = useState(-1);

  const MENTIONS = [
    { id: "ruta_actual", label: "@ruta_actual", desc: "Contexto de tu ruta completa" },
    { id: "leccion_actual", label: "@leccion_actual", desc: "Contexto de la lección actual" },
    { id: "mis_errores", label: "@mis_errores", desc: "Análisis de tus fallos recientes" },
  ];
  
  const filteredMentions = MENTIONS.filter(m => m.id.toLowerCase().includes(mentionQuery.toLowerCase()));

  const sugerencias = [
    "Explícame los conceptos básicos",
    "Ponme un ejercicio práctico",
    "Ayúdame con una duda",
    "Evalúa lo que aprendí",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const rutasAll = await iaClient.getRutas(token);
        const rutasEnCurso = rutasAll?.en_curso || [];
        setTodasLasRutas(rutasEnCurso);

        let targetRutaId = rutaId || (rutasEnCurso.length > 0 ? rutasEnCurso[0].id : null);
        
        if (targetRutaId) {
          setActiveRutaId(targetRutaId);
          const rutaData = await iaClient.getRutaDetalle(targetRutaId, token);
          setRuta(rutaData);
          
          let targetLeccionId = leccionId || (rutaData.temario?.length > 0 ? rutaData.temario[0].id : null);
          
          if (targetLeccionId) {
            setActiveLeccionId(targetLeccionId);
            const msgsData = await iaClient.getHistorialChat(targetLeccionId, token);
            setMensajes(msgsData);
          }
        }
      } catch (error) {
        console.error("Error inicializando tutor", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [rutaId, leccionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const handleSend = async (text: string) => {
    if (!text.trim() || !activeLeccionId) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    const tempId = Date.now().toString();
    setMensajes(prev => [...prev, {
      id: tempId,
      leccion_id: activeLeccionId,
      rol: 'user',
      text: text,
      creado_en: new Date().toISOString()
    }]);
    setInputMsg("");
    setSending(true);

    try {
      const res = await iaClient.chatTutor(activeLeccionId, { text }, token);
      setMensajes(prev => [...prev, res]);
    } catch (error) {
      console.error("Error al enviar mensaje", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(inputMsg);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputMsg(val);
    
    const words = val.split(' ');
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('@')) {
      setShowMentions(true);
      setMentionQuery(lastWord.substring(1));
      setMentionIndex(val.lastIndexOf(lastWord));
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (mentionLabel: string) => {
    if (mentionIndex !== -1) {
      const before = inputMsg.substring(0, mentionIndex);
      setInputMsg(before + mentionLabel + " ");
    }
    setShowMentions(false);
  };

  if (loading) {
    return (
      <div style={{ color: "#64748B", textAlign: "center", padding: "60px 0", fontSize: 14 }}>
        Conectando con tu tutor IA...
      </div>
    );
  }

  if (!ruta || !activeLeccionId) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <p style={{ color: "#DC2626", margin: "0 0 12px", fontSize: 15 }}>No se pudo cargar el contexto de la lección.</p>
        <button onClick={() => setActive?.('ruta_detalle')} style={{ background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          Volver al temario
        </button>
      </div>
    );
  }

  const leccionActiva = ruta.temario?.find(t => t.id === activeLeccionId);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '860px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif", display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      
      {/* Botón volver */}
      <button 
        onClick={() => setActive?.('ruta_detalle')}
        style={{
          background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: 0,
          fontSize: 14, fontWeight: 500, alignSelf: 'flex-start'
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
        onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
      >
        <span>←</span> Volver al temario
      </button>

      {/* Barra de Contexto Actual */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        marginBottom: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ flex: 1, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }}>
            <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Ruta activa
            </span>
            <select 
              value={activeRutaId || ''}
              onChange={(e) => setActiveRutaId(e.target.value)}
              style={{
                background: '#F8FAFC', border: '1px solid #CBD5E1', 
                color: '#0F172A', padding: '7px 12px', borderRadius: 8, fontSize: 13, outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value={ruta.id}>{ruta.titulo}</option>
              {todasLasRutas.filter(r => r.id !== ruta.id).map(r => (
                <option key={r.id} value={r.id}>{r.titulo}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }}>
            <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Lección en consulta
            </span>
            <select 
              value={activeLeccionId || ''}
              onChange={(e) => setActiveLeccionId(e.target.value)}
              style={{
                background: '#EFF6FF', border: '1px solid #BFDBFE', 
                color: '#1D4ED8', padding: '7px 12px', borderRadius: 8, fontSize: 13, outline: 'none',
                cursor: 'pointer', fontWeight: 600
              }}
            >
              {ruta.temario?.map(t => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Historial de Mensajes */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: 16,
        padding: '12px 4px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}>
        {mensajes.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748B', marginTop: 'auto', marginBottom: 'auto', padding: '20px' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
              </svg>
            </div>
            <h3 style={{ margin: '0 0 6px', color: '#0F172A', fontSize: 18, fontWeight: 700 }}>
              Tutor IA de estudio
            </h3>
            <p style={{ margin: 0, fontSize: 14 }}>
              ¿Tienes dudas sobre <strong>{leccionActiva?.nombre}</strong>? Elige una opción o escribe tu pregunta.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 24 }}>
              {sugerencias.map((sug, idx) => (
                <button key={idx} onClick={() => handleSend(sug)} style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  padding: '8px 14px',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.color = '#2563EB';
                  e.currentTarget.style.background = '#EFF6FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.color = '#0F172A';
                  e.currentTarget.style.background = '#FFFFFF';
                }}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        ) : (
          mensajes.map((msg, idx) => (
            <div key={msg.id || idx} style={{
              alignSelf: msg.rol === 'user' ? 'flex-end' : 'flex-start',
              background: msg.rol === 'user' ? '#0F172A' : '#FFFFFF',
              border: msg.rol === 'user' ? 'none' : '1px solid #E2E8F0',
              padding: '14px 18px',
              borderRadius: msg.rol === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              maxWidth: '82%',
              color: msg.rol === 'user' ? '#FFFFFF' : '#0F172A',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              lineHeight: 1.6,
              fontSize: 14,
            }}>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text || ''}</ReactMarkdown>
              </div>
            </div>
          ))
        )}

        {sending && (
          <div style={{
            alignSelf: 'flex-start',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: '12px 18px',
            borderRadius: '14px 14px 14px 2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <span style={{ color: '#64748B', fontSize: 13, fontWeight: 500 }}>El tutor está respondiendo</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite 0.2s' }} />
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite 0.4s' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input de Chat */}
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        
        {/* Sugerencias de menciones */}
        {showMentions && filteredMentions.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '100%', 
            left: 0,
            marginBottom: 8,
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: 10,
            padding: '6px 0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            zIndex: 50,
            minWidth: 260
          }}>
            <div style={{ padding: '4px 14px 6px', fontSize: 11, color: '#94A3B8', fontWeight: 600, borderBottom: '1px solid #F1F5F9', textTransform: 'uppercase' }}>
              Atajos de contexto
            </div>
            {filteredMentions.map(m => (
              <div 
                key={m.id}
                onClick={() => handleMentionSelect(m.label)}
                style={{
                  padding: '8px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ color: '#2563EB', fontWeight: 600, fontSize: 13 }}>{m.label}</span>
                <span style={{ color: '#64748B', fontSize: 11 }}>{m.desc}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: 12,
          padding: '6px 8px 6px 16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          alignItems: 'center'
        }}>
          <input 
            type="text" 
            placeholder={`Escribe tu consulta sobre ${leccionActiva?.nombre || 'la lección'}... (usa @ para contexto)`}
            value={inputMsg}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={sending}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              color: '#0F172A',
              fontSize: 14,
              outline: 'none',
              padding: '8px 0'
            }}
          />
          <button 
            onClick={() => handleSend(inputMsg)}
            disabled={sending || !inputMsg.trim()}
            style={{
              background: sending || !inputMsg.trim() ? '#F1F5F9' : '#0F172A',
              color: sending || !inputMsg.trim() ? '#94A3B8' : '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 600,
              cursor: sending || !inputMsg.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Enviar
          </button>
        </div>
      </div>

    </div>
  );
}
