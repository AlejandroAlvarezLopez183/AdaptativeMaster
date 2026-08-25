import React, { useEffect, useState } from "react";
import { iaClient, RutasResponse } from "@adaptativemaster/shared";

interface AprendizajeViewProps {
  setActive?: (v: string) => void;
  onSelectRuta?: (id: string) => void;
}

export function AprendizajeView({ setActive, onSelectRuta }: AprendizajeViewProps) {
  const [tab, setTab] = useState<"en_curso" | "completado" | "guardado">("en_curso");
  const [rutas, setRutas] = useState<RutasResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRutas = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await iaClient.getRutas(token);
          setRutas(data);
        } catch (error) {
          console.error("Error fetching rutas", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRutas();
  }, []);

  const tabs = [
    { id: "en_curso", label: "En curso" },
    { id: "completado", label: "Completado" },
    { id: "guardado", label: "Guardado" },
  ] as const;

  const rutasA_Mostrar = rutas?.[tab] || [];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 24px" }}>
          Mi aprendizaje
        </h1>
        
        {/* Pestañas (Tabs) */}
        <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid rgba(245,243,238,0.06)', paddingBottom: 16 }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                background: tab === t.id ? 'rgba(232,185,74,0.15)' : 'transparent',
                color: tab === t.id ? '#E8B94A' : '#8FA8AA',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if(tab !== t.id) e.currentTarget.style.color = '#F5F3EE' }}
              onMouseLeave={e => { if(tab !== t.id) e.currentTarget.style.color = '#8FA8AA' }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ color: '#E8B94A' }}>Cargando tus rutas...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          
          {/* Tarjetas de cursos */}
          {rutasA_Mostrar.map(curso => (
            <div key={curso.id} style={{ 
              background: 'rgba(23,60,62,0.4)', 
              border: '1px solid rgba(245,243,238,0.06)', 
              borderRadius: 20, 
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                  {curso.icono || "🧠"}
                </div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#F5F3EE' }}>{curso.titulo}</h3>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: '#8FA8AA' }}>{curso.lecciones_completadas}/{curso.lecciones_totales} lecciones</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#E8B94A' }}>{curso.progreso_porcentaje}%</span>
              </div>
              
              <div style={{ width: '100%', height: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }}>
                <div style={{ width: `${curso.progreso_porcentaje}%`, height: '100%', background: 'linear-gradient(90deg, #C49A33, #E8B94A)', borderRadius: 4 }} />
              </div>

              <button style={{
                background: 'transparent',
                color: '#E8B94A',
                border: '1px solid rgba(232,185,74,0.4)',
                borderRadius: 10,
                padding: '12px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: '100%',
                textAlign: 'center'
              }}
              onClick={() => {
                if (onSelectRuta) onSelectRuta(curso.id);
                if (setActive) setActive('ruta_detalle');
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,185,74,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                Continuar
              </button>
            </div>
          ))}

          {rutasA_Mostrar.length === 0 && (
             <div style={{ gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center', color: '#8FA8AA' }}>
               No tienes rutas en esta sección.
             </div>
          )}

          {/* Botón Crear nueva ruta */}
          <div style={{ 
            background: 'rgba(0,0,0,0.15)', 
            border: '1px dashed rgba(245,243,238,0.2)', 
            borderRadius: 20, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 28,
            cursor: 'pointer',
            transition: 'all 0.2s',
            minHeight: 220,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,185,74,0.05)'; e.currentTarget.style.borderColor = 'rgba(232,185,74,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.2)'; }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(232,185,74,0.15)', color: '#E8B94A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>
              +
            </div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#F5F3EE' }}>Crear nueva ruta</h3>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#8FA8AA', textAlign: 'center' }}>Con ayuda de la IA</p>
          </div>

        </div>
      )}
    </div>
  );
}
