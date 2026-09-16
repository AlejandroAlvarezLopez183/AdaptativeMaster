import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { iaClient, Leccion } from '@adaptativemaster/shared';

interface LeccionContenidoViewProps {
  leccionId: string | null;
  onGoBack: () => void;
  onOpenTutor: () => void;
}

export function LeccionContenidoView({ leccionId, onGoBack, onOpenTutor }: LeccionContenidoViewProps) {
  const [lesson, setLesson] = useState<Leccion | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchLeccion = async () => {
      if (!leccionId) return;
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setLoading(true);
        let data = await iaClient.getLeccion(leccionId, token);
        
        // Si no hay teoría, la IA genera el contenido on-the-fly
        if (!data.contenido || !data.contenido.teoria) {
          setIsGenerating(true);
          try {
            data = await iaClient.generarContenidoLeccion(leccionId, token);
          } catch (error) {
            console.error("Error generando contenido de la lección:", error);
          } finally {
            setIsGenerating(false);
          }
        }
        
        setLesson(data);
      } catch (error) {
        console.error("Error fetching leccion:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeccion();
  }, [leccionId]);

  if (loading || isGenerating) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: '#E8B94A', gap: 16 }}>
        <span className="animate-spin" style={{ fontSize: 48 }}>⚙️</span>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 18 }}>
          {isGenerating ? "Generando contenido de la lección..." : "Cargando lección..."}
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0', color: '#8FA8AA' }}>
        <p>No se pudo cargar la lección.</p>
        <button onClick={onGoBack} style={{ marginTop: 20, padding: '10px 20px', background: '#173C3E', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>Volver</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '800px',
      width: '100%',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Botón Volver */}
      <button 
        onClick={onGoBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#8FA8AA',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 32,
          padding: 0,
          fontSize: 15,
          fontWeight: 500
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#F5F3EE'}
        onMouseLeave={e => e.currentTarget.style.color = '#8FA8AA'}
      >
        <span>←</span> Volver al mapa de la ruta
      </button>

      {/* Cabecera */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <span style={{ 
            fontSize: 11, fontWeight: 700, color: '#0F2A2E', 
            background: '#7EC8C8', padding: '4px 10px', 
            borderRadius: 12, textTransform: 'uppercase', letterSpacing: '0.05em' 
          }}>
            Lección teórica
          </span>
          <span style={{ fontSize: 13, color: '#8FA8AA', fontWeight: 500 }}>
            Lección {lesson.orden} · Dificultad: {lesson.dificultad}
          </span>
        </div>
        
        <h1 style={{ 
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, 
          fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px',
          letterSpacing: '-0.02em'
        }}>
          {lesson.titulo}
        </h1>
        
        <div style={{ display: 'flex', gap: 24, color: '#8FA8AA', fontSize: 14 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>⏱ 15 min</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>✨ +20 XP al completar</span>
        </div>
      </div>

      {/* Área principal (Video + Texto) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 40 }}>
        
        {/* Video */}
        {lesson.contenido?.video_url ? (
          <div style={{ 
            width: '100%', aspectRatio: '16/9', background: '#173C3E', 
            borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(245,243,238,0.06)'
          }}>
            <iframe 
              width="100%" 
              height="100%" 
              src={lesson.contenido.video_url.replace("watch?v=", "embed/")} 
              title="Video de la lección"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        ) : (
          <div style={{ 
            width: '100%', aspectRatio: '16/9', background: '#173C3E', 
            borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(245,243,238,0.06)', position: 'relative', overflow: 'hidden'
          }}>
            <p style={{ color: '#8FA8AA' }}>No hay video disponible para esta lección</p>
          </div>
        )}

        {/* Teoría */}
        <div style={{ 
          background: 'rgba(23,60,62,0.4)', borderRadius: 20, padding: 32,
          border: '1px solid rgba(245,243,238,0.06)'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }}>
            Resumen de la lección
          </h3>
          <div className="markdown-content" style={{ color: '#E4EAEB', fontSize: 16, lineHeight: 1.7 }}>
            {lesson.contenido?.teoria ? (
              <ReactMarkdown>{lesson.contenido.teoria}</ReactMarkdown>
            ) : (
              "No hay teoría disponible para esta lección."
            )}
          </div>
        </div>

        {/* Recursos extra */}
        {lesson.contenido?.recursos_extra && lesson.contenido.recursos_extra.length > 0 && (
          <div style={{ 
            background: 'rgba(23,60,62,0.4)', borderRadius: 20, padding: 32,
            border: '1px solid rgba(245,243,238,0.06)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }}>
              Recursos adicionales
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {lesson.contenido.recursos_extra.map((rec: any, idx: number) => (
                <a key={idx} href={rec.url} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '16px',
                  background: 'rgba(245,243,238,0.03)', borderRadius: 12, textDecoration: 'none',
                  border: '1px solid rgba(245,243,238,0.05)', transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,243,238,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,243,238,0.03)'}
                >
                  <span style={{ fontSize: 24 }}>
                    {rec.tipo === 'video' ? '🎥' : rec.tipo === 'libro' ? '📘' : rec.tipo === 'herramienta' ? '🛠️' : '📄'}
                  </span>
                  <div>
                    <h4 style={{ margin: '0 0 4px', color: '#7EC8C8', fontSize: 16 }}>{rec.titulo}</h4>
                    <p style={{ margin: 0, color: '#8FA8AA', fontSize: 14 }}>{rec.descripcion}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Botones de acción fijos al final */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, 
        paddingTop: 32, borderTop: '1px solid rgba(245,243,238,0.1)' 
      }}>
        <button style={{
          background: 'transparent',
          color: '#E8B94A',
          border: '2px solid rgba(232,185,74,0.3)',
          borderRadius: 14,
          padding: '16px 24px',
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,185,74,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        onClick={onOpenTutor}
        >
          <span>🤖</span> Practicar con Tutor IA
        </button>

        <button style={{
          background: '#7EC8C8',
          color: '#0F2A2E',
          border: 'none',
          borderRadius: 14,
          padding: '16px 24px',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(126,200,200,0.2)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Marcar como completada ✔
        </button>
      </div>

    </div>
  );
}
