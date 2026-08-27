import React, { useState, useEffect, useRef } from "react";
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
    "Ponme un ejercicio",
    "Ayúdame con una duda",
    "Evalúa lo que aprendí",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token && rutaId && leccionId) {
        try {
          const [rutaData, msgsData] = await Promise.all([
            iaClient.getRutaDetalle(rutaId, token),
            iaClient.getHistorialChat(leccionId, token)
          ]);
          setRuta(rutaData);
          setMensajes(msgsData);
        } catch (error) {
          console.error("Error al obtener datos del tutor", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [rutaId, leccionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const handleSend = async (text: string) => {
    if (!text.trim() || !leccionId) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    // Agregar mensaje local optimista
    const tempId = Date.now().toString();
    setMensajes(prev => [...prev, {
      id: tempId,
      leccion_id: leccionId,
      rol: 'user',
      text: text,
      creado_en: new Date().toISOString()
    }]);
    setInputMsg("");
    setSending(true);

    try {
      const res = await iaClient.chatTutor(leccionId, { text }, token);
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
    
    // Buscar la última palabra escrita
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
    // Para devolver el foco al input se puede hacer con un ref, pero por simplicidad de la plantilla:
  };

  if (loading) {
    return (
      <div style={{ color: "#E8B94A", textAlign: "center", marginTop: 40 }}>
        Conectando con tu tutor IA...
      </div>
    );
  }

  if (!ruta || !leccionId) {
    return (
      <div style={{ color: "#F2637B", textAlign: "center", marginTop: 40 }}>
        No se pudo cargar la lección. <button onClick={() => setActive?.('ruta_detalle')} style={{background: 'none', border: 'none', color: '#E8B94A', cursor: 'pointer', textDecoration: 'underline'}}>Volver</button>
      </div>
    );
  }

  const leccionActiva = ruta.temario?.find(t => t.id === leccionId);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      
      <button 
        onClick={() => setActive?.('ruta_detalle')}
        style={{ background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: 0, fontSize: 15, fontWeight: 500 }}
        onMouseEnter={e => e.currentTarget.style.color = '#F5F3EE'}
        onMouseLeave={e => e.currentTarget.style.color = '#8FA8AA'}
      >
        <span>←</span> Volver al temario
      </button>

      {/* Contexto Actual Compacto (Seleccionable) */}
      <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 12, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, display: 'flex', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <span style={{ fontSize: 11, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contexto: Ruta</span>
            <select 
              style={{
                background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.1)', 
                color: '#F5F3EE', padding: '8px 12px', borderRadius: 8, fontSize: 14, outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value={ruta.id} style={{background: '#0F2A2E', color: '#F5F3EE'}}>{ruta.titulo}</option>
              <option value="frontend" style={{background: '#0F2A2E', color: '#F5F3EE'}}>Frontend React Experto (Ejemplo)</option>
              <option value="data" style={{background: '#0F2A2E', color: '#F5F3EE'}}>Data Science con Python (Ejemplo)</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <span style={{ fontSize: 11, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contexto: Lección Actual</span>
            <select 
              value={leccionId || ''}
              onChange={() => {}} // Solo visual por ahora
              style={{
                background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(232,185,74,0.3)', 
                color: '#E8B94A', padding: '8px 12px', borderRadius: 8, fontSize: 14, outline: 'none',
                cursor: 'pointer', fontWeight: 600
              }}
            >
              {ruta.temario?.map(t => (
                <option key={t.id} value={t.id} style={{background: '#0F2A2E', color: '#E8B94A'}}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Historial de Chat */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 24, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {mensajes.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#8FA8AA', marginTop: 'auto', marginBottom: 'auto' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✨</div>
            <h3 style={{ margin: '0 0 8px', color: '#F5F3EE' }}>¡Hola! Soy tu Tutor IA</h3>
            <p style={{ margin: 0 }}>¿En qué te puedo ayudar con <strong>{leccionActiva?.nombre}</strong>?</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 32 }}>
              {sugerencias.map((sug, idx) => (
                <button key={idx} onClick={() => handleSend(sug)} style={{
                  background: 'rgba(23,60,62,0.4)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  color: '#F5F3EE',
                  padding: '10px 16px',
                  borderRadius: 20,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.color = '#E8B94A' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.color = '#F5F3EE' }}
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
              background: msg.rol === 'user' ? 'rgba(232,185,74,0.15)' : 'rgba(23,60,62,0.6)',
              border: msg.rol === 'user' ? '1px solid rgba(232,185,74,0.3)' : '1px solid rgba(245,243,238,0.06)',
              padding: '16px 20px',
              borderRadius: 16,
              maxWidth: '80%',
              color: msg.rol === 'user' ? '#E8B94A' : '#F5F3EE',
              lineHeight: 1.5,
              fontSize: 15,
            }}>
              {msg.text}
            </div>
          ))
        )}
        {sending && (
          <div className="animate-pulse" style={{ alignSelf: 'flex-start', background: 'rgba(23,60,62,0.4)', padding: '12px 20px', borderRadius: 16, color: '#8FA8AA', fontSize: 14 }}>
            Tutor escribiendo...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input y Popover de Menciones */}
      <div style={{ position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', marginTop: 'auto' }}>
        
        {/* Menú de menciones */}
        {showMentions && filteredMentions.length > 0 && (
          <div style={{
            position: 'absolute',
            bottom: '100%', 
            left: 24,
            marginBottom: 8,
            background: '#173C3E',
            border: '1px solid rgba(232,185,74,0.3)',
            borderRadius: 12,
            padding: '8px 0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 50,
            minWidth: 250
          }}>
            <div style={{ padding: '0 16px 8px', fontSize: 12, color: '#8FA8AA', borderBottom: '1px solid rgba(245,243,238,0.1)', marginBottom: 4 }}>
              Sugerencias de contexto
            </div>
            {filteredMentions.map(m => (
              <div 
                key={m.id}
                onClick={() => handleMentionSelect(m.label)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,185,74,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ color: '#E8B94A', fontWeight: 600, fontSize: 14 }}>{m.label}</span>
                <span style={{ color: '#8FA8AA', fontSize: 12 }}>{m.desc}</span>
              </div>
            ))}
          </div>
        )}

        <input 
          type="text" 
          placeholder={`Pregúntame sobre ${leccionActiva?.nombre || 'esta lección'}...`}
          value={inputMsg}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={sending}
          style={{
            width: '100%',
            background: 'linear-gradient(145deg, rgba(23,60,62,0.8) 0%, rgba(15,42,46,0.9) 100%)',
            border: '1px solid rgba(232,185,74,0.3)',
            borderRadius: 20,
            padding: '20px 24px 20px 24px',
            color: '#F5F3EE',
            fontSize: 16,
            outline: 'none',
            transition: 'all 0.3s'
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,185,74,0.15)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.boxShadow = 'none' }}
        />
        <button 
          onClick={() => handleSend(inputMsg)}
          disabled={sending || !inputMsg.trim()}
          style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          background: sending || !inputMsg.trim() ? 'rgba(245,243,238,0.1)' : '#E8B94A',
          color: sending || !inputMsg.trim() ? 'rgba(245,243,238,0.3)' : '#0F2A2E',
          border: 'none',
          borderRadius: 12,
          padding: '10px 20px',
          fontSize: 14,
          fontWeight: 700,
          cursor: sending || !inputMsg.trim() ? 'not-allowed' : 'pointer',
          transition: 'transform 0.2s',
        }}
        >
          Enviar
        </button>
      </div>

    </div>
  );
}
