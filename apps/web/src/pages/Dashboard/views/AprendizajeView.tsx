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
    { id: "completado", label: "Completadas" },
    { id: "guardado", label: "Guardadas" },
  ] as const;

  const rutasA_Mostrar = rutas?.[tab] || [];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '960px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
            Mi aprendizaje
          </h1>
          <p style={{ margin: 0, color: "#64748B", fontSize: 14 }}>
            Organiza y retoma tus rutas de estudio activas, finalizadas o archivadas.
          </p>
        </div>

        <button
          onClick={() => { if (setActive) setActive('nueva_ruta_wizard'); }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            padding: '9px 16px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1E293B')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0F172A')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nueva ruta personalizada
        </button>
      </div>

      {/* Pestañas (Segmented Tabs) */}
      <div style={{
        display: 'inline-flex',
        background: '#F1F5F9',
        padding: 4,
        borderRadius: 8,
        gap: 4,
        marginBottom: 24,
        border: '1px solid #E2E8F0'
      }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              background: tab === t.id ? '#FFFFFF' : 'transparent',
              color: tab === t.id ? '#0F172A' : '#64748B',
              border: 'none',
              padding: '7px 18px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: tab === t.id ? 600 : 500,
              cursor: 'pointer',
              boxShadow: tab === t.id ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center', color: '#64748B', fontSize: 14 }}>
          Cargando tus rutas...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          
          {/* Tarjetas de cursos */}
          {rutasA_Mostrar.map(curso => (
            <div key={curso.id} style={{ 
              background: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: 12, 
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: '#EFF6FF',
                  border: '1px solid #DBEAFE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: '#2563EB',
                  flexShrink: 0
                }}>
                  {curso.icono || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  )}
                </div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                  {curso.titulo}
                </h3>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8, marginTop: 'auto' }}>
                <span style={{ fontSize: 13, color: '#64748B' }}>
                  {curso.lecciones_completadas}/{curso.lecciones_totales} lecciones
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                  {curso.progreso_porcentaje}%
                </span>
              </div>
              
              <div style={{ width: '100%', height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
                <div style={{ width: `${curso.progreso_porcentaje}%`, height: '100%', background: '#2563EB', borderRadius: 3 }} />
              </div>

              <button style={{
                background: '#F8FAFC',
                color: '#0F172A',
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                padding: '10px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                width: '100%',
                textAlign: 'center'
              }}
              onClick={() => {
                if (onSelectRuta) onSelectRuta(curso.id);
                if (setActive) setActive('ruta_detalle');
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#0F172A';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = '#0F172A';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.color = '#0F172A';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
              >
                Continuar ruta
              </button>
            </div>
          ))}

          {/* Tarjeta para crear nueva ruta */}
          <div style={{ 
            background: '#FFFFFF', 
            border: '2px dashed #CBD5E1', 
            borderRadius: 12, 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 28,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            minHeight: 200,
          }}
          onClick={() => { if (setActive) setActive('nueva_ruta_wizard'); }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#2563EB';
            e.currentTarget.style.background = '#F8FAFC';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.background = '#FFFFFF';
          }}
          >
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 12
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0F172A' }}>Crear nueva ruta</h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748B', textAlign: 'center' }}>
              Personalizada con Tutor IA
            </p>
          </div>

        </div>
      )}

      {!loading && rutasA_Mostrar.length === 0 && (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          color: '#64748B',
          background: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          marginTop: 16
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#0F172A' }}>
            No tienes rutas en esta pestaña
          </p>
          <p style={{ margin: 0, fontSize: 13 }}>
            Crea una nueva ruta o explora tus cursos en las otras categorías.
          </p>
        </div>
      )}
    </div>
  );
}
