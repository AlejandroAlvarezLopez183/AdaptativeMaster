import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { iaClient, progresoClient } from "@adaptativemaster/shared";

interface LeccionContenidoViewProps {
  leccionId: string | null;
  onGoBack: () => void;
  onOpenTutor: () => void;
  onComplete: () => void;
}

export function LeccionContenidoView({ 
  leccionId, 
  onGoBack, 
  onOpenTutor,
  onComplete 
}: LeccionContenidoViewProps) {
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchLeccion = async () => {
      if (!leccionId) return;
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const data = await iaClient.getLeccion(leccionId, token);
        setLesson(data);

        // Si no tiene contenido teórico y video_url, llamar a generar
        if (!data.contenido?.teoria) {
          setIsGenerating(true);
          try {
            const updated = await iaClient.generarContenidoLeccion(leccionId, token);
            setLesson(updated);
          } catch (genError) {
            console.error("Error generando contenido de lección:", genError);
          } finally {
            setIsGenerating(false);
          }
        }
      } catch (error) {
        console.error("Error al obtener la lección:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeccion();
  }, [leccionId]);

  if (loading || isGenerating) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: '#0F172A', gap: 16 }}>
        <div style={{
          width: 44,
          height: 44,
          border: '3px solid #E2E8F0',
          borderTopColor: '#2563EB',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: 0 }}>
          {isGenerating ? "Generando contenido personalizado de la lección..." : "Cargando lección..."}
        </p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0', color: '#64748B' }}>
        <p>No se pudo cargar la información de la lección.</p>
        <button onClick={onGoBack} style={{ marginTop: 16, padding: '9px 18px', background: '#0F172A', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Volver al mapa</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{
      maxWidth: '860px',
      width: '100%',
      margin: '0 auto',
      padding: '24px 20px 48px',
      fontFamily: "'Open Sans', system-ui, sans-serif"
    }}>
      
      {/* Botón Volver */}
      <button 
        onClick={onGoBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#64748B',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 24,
          padding: 0,
          fontSize: 14,
          fontWeight: 500
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
        onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
      >
        <span>←</span> Volver al mapa de la ruta
      </button>

      {/* Cabecera */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: '28px 32px',
        marginBottom: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
          <span style={{ 
            fontSize: 11, fontWeight: 600, color: '#1D4ED8', 
            background: '#EFF6FF', border: '1px solid #DBEAFE', padding: '3px 10px', 
            borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em' 
          }}>
            Lección teórica
          </span>
          <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
            Módulo {lesson.orden} · Nivel: {lesson.dificultad}
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: 26, fontWeight: 700, color: '#0F172A', margin: '0 0 12px',
          letterSpacing: '-0.01em'
        }}>
          {lesson.titulo}
        </h1>
        
        <div style={{ display: 'flex', gap: 20, color: '#64748B', fontSize: 13 }}>
          <span>Duración estimada: 15 min</span>
          <span>·</span>
          <span>Recompensa: +20 XP</span>
        </div>
      </div>

      {/* Área principal (Video + Texto) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
        
        {/* Video si está disponible */}
        {lesson.contenido?.video_url && (
          <div style={{ 
            width: '100%', aspectRatio: '16/9', background: '#0F172A', 
            borderRadius: 14, overflow: 'hidden', border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
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
        )}

        {/* Teoría y contenido */}
        <div style={{ 
          background: '#FFFFFF', borderRadius: 14, padding: '32px',
          border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 18, color: '#0F172A', fontWeight: 700 }}>
            Contenido de estudio
          </h3>
          <div className="markdown-content" style={{ color: '#334155', fontSize: 15, lineHeight: 1.8 }}>
            {lesson.contenido?.teoria ? (
              <ReactMarkdown>{lesson.contenido.teoria}</ReactMarkdown>
            ) : (
              "No hay teoría disponible para esta lección."
            )}
          </div>
        </div>

        {/* Recursos adicionales */}
        {lesson.contenido?.recursos_extra && lesson.contenido.recursos_extra.length > 0 && (
          <div style={{ 
            background: '#FFFFFF', borderRadius: 14, padding: 28,
            border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, color: '#0F172A', fontWeight: 700 }}>
              Recursos de lectura recomendados
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {lesson.contenido.recursos_extra.map((rec: any, idx: number) => (
                <a key={idx} href={rec.url} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                  background: '#F8FAFC', borderRadius: 8, textDecoration: 'none',
                  border: '1px solid #E2E8F0', transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#DBEAFE';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
                >
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 2px', color: '#1D4ED8', fontSize: 14, fontWeight: 600 }}>{rec.titulo}</h4>
                    <p style={{ margin: 0, color: '#64748B', fontSize: 12 }}>{rec.descripcion}</p>
                  </div>
                  <span style={{ color: '#94A3B8', fontSize: 16 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Botones de acción */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, 
        paddingTop: 24, borderTop: '1px solid #E2E8F0' 
      }}>
        <button style={{
          background: '#FFFFFF',
          color: '#0F172A',
          border: '1px solid #CBD5E1',
          borderRadius: 8,
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#F8FAFC';
          e.currentTarget.style.borderColor = '#94A3B8';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#FFFFFF';
          e.currentTarget.style.borderColor = '#CBD5E1';
        }}
        onClick={onOpenTutor}
        >
          Consultar dudas con Tutor IA
        </button>

        <button style={{
          background: '#0F172A',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 8,
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#1E293B')}
        onMouseLeave={e => (e.currentTarget.style.background = '#0F172A')}
        onClick={async () => {
          if (!leccionId) return;
          const token = localStorage.getItem('token');
          if (!token) return;
          try {
            await progresoClient.completarLeccion(leccionId, token);
            onComplete();
          } catch (error) {
            console.error("Error completando la lección:", error);
            onComplete();
          }
        }}
        >
          Marcar lección como completada
        </button>
      </div>

    </div>
  );
}
