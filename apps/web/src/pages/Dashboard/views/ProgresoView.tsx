import React, { useEffect, useState } from "react";
import { progresoClient, DashboardProgresoResponse } from "@adaptativemaster/shared";

export function ProgresoView() {
  const [data, setData] = useState<DashboardProgresoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProgreso = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay sesión activa");
        setLoading(false);
        return;
      }

      try {
        const res = await progresoClient.getResumen(token);
        setData(res);
      } catch (err: any) {
        setError(err.message || "Error al cargar progreso");
      } finally {
        setLoading(false);
      }
    };
    fetchProgreso();
  }, []);

  if (loading) {
    return (
      <div style={{ color: "#64748B", textAlign: "center", padding: "60px 0", fontSize: 14 }}>
        Cargando tu progreso...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", padding: 16, borderRadius: 8, textAlign: "center", margin: "20px auto", maxWidth: 400 }}>
        {error}
      </div>
    );
  }

  const rachaActual = data?.racha?.dias_actuales || 0;
  const xpTotal = data?.xp_total || 0;
  const leccionesCompletadas = data?.ultimos_xp?.filter(x => x.motivo.includes("Lección")).length || 0;

  const stats = [
    {
      label: "Racha actual",
      value: `${rachaActual} días`,
      caption: "Constancia de estudio",
      bg: "#FEF3C7",
      iconColor: "#D97706",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
        </svg>
      )
    },
    {
      label: "Total XP",
      value: `${xpTotal} XP`,
      caption: "Experiencia acumulada",
      bg: "#EFF6FF",
      iconColor: "#2563EB",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      )
    },
    {
      label: "Lecciones completadas",
      value: `${leccionesCompletadas}`,
      caption: "Actividades finalizadas",
      bg: "#ECFDF5",
      iconColor: "#059669",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )
    },
  ];

  const habilidades = data?.habilidades || [];
  const semana = data?.actividad_semana || [];
  const reforzar = data?.conceptos_reforzar || [];
  const progresoRuta = data?.progreso_ruta || 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '960px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
          Mi progreso
        </h1>
        <p style={{ color: "#64748B", margin: 0, fontSize: 14 }}>
          Métricas de desempeño, retención y seguimiento semanal de tus objetivos.
        </p>
      </div>

      {/* Tarjeta de Progreso General */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
          <div>
            <span style={{ fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
              Progreso general de la ruta activa
            </span>
            <div style={{ fontSize: 14, color: '#0F172A', marginTop: 2 }}>
              Avanza a tu ritmo completando lecciones y evaluaciones
            </div>
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
            {progresoRuta}%
          </span>
        </div>
        <div style={{ width: '100%', height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: `${progresoRuta}%`, height: '100%', background: '#2563EB', borderRadius: 4, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: stat.bg,
              color: stat.iconColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: 12, color: '#64748B', fontWeight: 500 }}>{stat.label}</p>
              <p style={{ margin: '0 0 2px', fontSize: 20, fontWeight: 700, color: '#0F172A' }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: 11, color: '#94A3B8' }}>{stat.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Inferior: Habilidades & Actividad Semanal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        
        {/* Habilidades dominadas */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 16, color: '#0F172A', fontWeight: 700 }}>
            Habilidades evaluadas
          </h3>
          
          {habilidades.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {habilidades.map(hab => (
                <div key={hab.nombre}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{hab.nombre}</span>
                    <span style={{ fontSize: 13, color: '#0F172A', fontWeight: 600 }}>{hab.porcentaje}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${hab.porcentaje}%`, height: '100%', background: '#059669', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: '#64748B', fontSize: 13 }}>
              Completa lecciones y minijuegos para ver tu desglose de habilidades.
            </p>
          )}
        </div>

        {/* Columna Derecha: Semana y Refuerzo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Actividad semanal */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, color: '#0F172A', fontWeight: 700 }}>
              Constancia semanal
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              {semana.map((dia, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{dia.dia}</span>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: dia.completado ? '#EFF6FF' : '#F8FAFC',
                    border: `1.5px solid ${dia.completado ? '#2563EB' : '#E2E8F0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: dia.completado ? '#2563EB' : '#94A3B8',
                    fontSize: 13,
                    fontWeight: 700
                  }}>
                    {dia.completado ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conceptos a reforzar */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 style={{ margin: 0, fontSize: 15, color: '#0F172A', fontWeight: 700 }}>
                Conceptos a reforzar
              </h3>
            </div>

            {reforzar.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, color: '#475569', fontSize: 13 }}>
                {reforzar.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, color: '#64748B', fontSize: 13 }}>
                ¡Vas al día! No se han detectado conceptos críticos por reforzar en este momento.
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
