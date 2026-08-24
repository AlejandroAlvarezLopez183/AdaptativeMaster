import React from "react";

interface RutaDetalleViewProps {
  setActive?: (v: string) => void;
}

export function RutaDetalleView({ setActive }: RutaDetalleViewProps) {
  const temas = [
    { id: 1, nombre: 'Fundamentos', estado: 'completado' },
    { id: 2, nombre: 'POO', estado: 'completado' },
    { id: 3, nombre: 'HTTP', estado: 'completado' },
    { id: 4, nombre: 'APIs REST', estado: 'actual' },
    { id: 5, nombre: 'PostgreSQL', estado: 'bloqueado' },
    { id: 6, nombre: 'FastAPI', estado: 'bloqueado' },
    { id: 7, nombre: 'Docker', estado: 'bloqueado' },
  ];

  const getIcon = (estado: string) => {
    switch (estado) {
      case 'completado': return '✅';
      case 'actual': return '🔵';
      case 'bloqueado': return '🔒';
      default: return '🔒';
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '720px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      <button 
        onClick={() => setActive?.('aprendizaje')}
        style={{ background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: 0, fontSize: 15, fontWeight: 500 }}
        onMouseEnter={e => e.currentTarget.style.color = '#F5F3EE'}
        onMouseLeave={e => e.currentTarget.style.color = '#8FA8AA'}
      >
        <span>←</span> Volver a mis rutas
      </button>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 700, color: "#F5F3EE", margin: "0 0 8px" }}>
          Python Backend
        </h1>
        <p style={{ color: "#E8B94A", margin: 0, fontSize: 15, fontWeight: 600 }}>
          Ruta de aprendizaje personalizada
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 32 }}>
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <span style={{ display: 'block', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
            Objetivo
          </span>
          <span style={{ fontSize: 18, color: '#F5F3EE', fontWeight: 600, lineHeight: 1.4 }}>
            Crear APIs profesionales con Python
          </span>
        </div>
        
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <span style={{ display: 'block', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
            Tu nivel
          </span>
          <span style={{ fontSize: 18, color: '#E8B94A', fontWeight: 700 }}>
            Intermedio
          </span>
        </div>
      </div>

      <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 20, padding: 32, marginBottom: 32 }}>
        <h3 style={{ margin: '0 0 24px', fontSize: 18, color: '#F5F3EE', fontWeight: 600 }}>Temario</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {temas.map((tema) => (
            <div key={tema.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              padding: '16px',
              borderRadius: 12,
              background: tema.estado === 'actual' ? 'rgba(232,185,74,0.1)' : 'transparent',
              border: tema.estado === 'actual' ? '1px solid rgba(232,185,74,0.3)' : '1px solid transparent',
              opacity: tema.estado === 'bloqueado' ? 0.5 : 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 20 }}>{getIcon(tema.estado)}</span>
                <span style={{ 
                  fontSize: 16, 
                  fontWeight: tema.estado === 'actual' ? 700 : 500, 
                  color: tema.estado === 'actual' ? '#E8B94A' : '#F5F3EE' 
                }}>
                  {tema.nombre}
                </span>
              </div>
              
              {tema.estado === 'actual' && (
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0F2A2E', background: '#E8B94A', padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Actual
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button style={{
        background: '#E8B94A',
        color: '#0F2A2E',
        border: 'none',
        borderRadius: 12,
        padding: '16px 0',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        width: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 14px rgba(232,185,74,0.2)',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,185,74,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(232,185,74,0.2)'; }}
      >
        Continuar lección
      </button>
      
    </div>
  );
}
