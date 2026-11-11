import React, { useEffect, useState } from "react";
import { iaClient, RutaDetalle } from "@adaptativemaster/shared";

interface RutaDetalleViewProps {
  setActive?: (v: string) => void;
  rutaId?: string | null;
  onSelectLeccion?: (id: string) => void;
}

export function RutaDetalleView({ setActive, rutaId, onSelectLeccion }: RutaDetalleViewProps) {
  const [ruta, setRuta] = useState<RutaDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      const token = localStorage.getItem("token");
      if (token && rutaId) {
        try {
          const data = await iaClient.getRutaDetalle(rutaId, token);
          setRuta(data);
        } catch (error) {
          console.error("Error al obtener detalle de la ruta", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [rutaId]);

  if (loading) {
    return (
      <div style={{ color: "#64748B", textAlign: "center", padding: "60px 0", fontSize: 14 }}>
        Cargando detalle de la ruta...
      </div>
    );
  }

  if (!ruta) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <p style={{ color: "#DC2626", margin: "0 0 12px", fontSize: 15 }}>No se encontró la ruta solicitada.</p>
        <button onClick={() => setActive?.('aprendizaje')} style={{ background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          Volver a mis rutas
        </button>
      </div>
    );
  }

  const renderStatusIcon = (estado: string) => {
    if (estado === 'completado') {
      return (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      );
    }
    if (estado === 'actual') {
      return (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      );
    }
    return (
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      
      <button 
        onClick={() => setActive?.('aprendizaje')}
        style={{
          background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, padding: 0,
          fontSize: 14, fontWeight: 500
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
        onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
      >
        <span>←</span> Volver a mis rutas
      </button>

      {/* Header Ruta */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: '28px 32px',
        marginBottom: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#EFF6FF',
          color: '#1D4ED8',
          border: '1px solid #DBEAFE',
          borderRadius: 6,
          padding: '3px 10px',
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 12
        }}>
          Ruta personalizada
        </span>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          {ruta.titulo}
        </h1>
        <p style={{ color: "#64748B", margin: 0, fontSize: 14 }}>
          {ruta.objetivo}
        </p>
      </div>

      {/* Meta Cards: Objetivo y Nivel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ display: 'block', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
            Nivel asignado
          </span>
          <span style={{ fontSize: 16, color: '#0F172A', fontWeight: 700 }}>
            {ruta.nivel}
          </span>
        </div>
        
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ display: 'block', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }}>
            Total de lecciones
          </span>
          <span style={{ fontSize: 16, color: '#0F172A', fontWeight: 700 }}>
            {ruta.temario?.length || 0} módulos en el plan
          </span>
        </div>
      </div>

      {/* Lista de Temario */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: 28, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 16, color: '#0F172A', fontWeight: 700 }}>
          Módulos y lecciones
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ruta.temario?.map((tema, idx) => (
            <div
              key={tema.id}
              onClick={() => {
                if (tema.estado !== 'bloqueado' && onSelectLeccion) {
                  onSelectLeccion(tema.id);
                  if (setActive) setActive('leccion_duolingo');
                }
              }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: 10,
                background: tema.estado === 'actual' ? '#EFF6FF' : '#F8FAFC',
                border: `1px solid ${tema.estado === 'actual' ? '#BFDBFE' : '#F1F5F9'}`,
                cursor: tema.estado !== 'bloqueado' ? 'pointer' : 'default',
                opacity: tema.estado === 'bloqueado' ? 0.6 : 1,
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {renderStatusIcon(tema.estado)}
                <div>
                  <span style={{ 
                    fontSize: 14, 
                    fontWeight: tema.estado === 'actual' ? 700 : 500, 
                    color: tema.estado === 'actual' ? '#1D4ED8' : '#0F172A',
                    display: 'block'
                  }}>
                    {idx + 1}. {tema.nombre}
                  </span>
                </div>
              </div>
              
              {tema.estado === 'actual' && (
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1D4ED8', background: '#DBEAFE', padding: '3px 8px', borderRadius: 12 }}>
                  En curso
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        style={{
          background: '#0F172A',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 8,
          padding: '13px 0',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.15s ease',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)'
        }}
        onClick={() => {
          const actual = ruta.temario?.find(t => t.estado === 'actual');
          if (actual && onSelectLeccion) {
            onSelectLeccion(actual.id);
            if (setActive) setActive('leccion_duolingo');
          } else {
            if (setActive) setActive('leccion_duolingo');
          }
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#1E293B')}
        onMouseLeave={e => (e.currentTarget.style.background = '#0F172A')}
      >
        Continuar con la lección actual
      </button>
    </div>
  );
}
