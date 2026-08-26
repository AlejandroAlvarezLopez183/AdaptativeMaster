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
    return <div style={{ color: "#E8B94A", textAlign: "center", marginTop: "40px" }}>Cargando tu progreso...</div>;
  }

  if (error) {
    return <div style={{ color: "#F2637B", textAlign: "center", marginTop: "40px" }}>{error}</div>;
  }

  const rachaActual = data?.racha?.dias_actuales || 0;
  const xpTotal = data?.xp_total || 0;
  const leccionesCompletadas = data?.ultimos_xp?.filter(x => x.motivo.includes("Lección")).length || 0;

  const stats = [
    { label: "Racha actual", value: `${rachaActual} días`, icon: "🔥", color: "#F2637B" },
    { label: "Total XP", value: `${xpTotal} XP`, icon: "✨", color: "#E8B94A" },
    { label: "Lecciones", value: `${leccionesCompletadas}`, icon: "📚", color: "#45C893" },
  ];

  const habilidades = data?.habilidades || [];
  const semana = data?.actividad_semana || [];
  const reforzar = data?.conceptos_reforzar || [];
  const progresoRuta = data?.progreso_ruta || 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '840px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 8px" }}>
          Mi progreso
        </h1>
        <p style={{ color: "#8FA8AA", margin: 0, fontSize: 15 }}>
          Haz un seguimiento de tus objetivos y habilidades.
        </p>
      </div>

      {/* Progreso General y Stats Superiores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
        
        {/* Tarjeta de progreso gigante */}
        <div style={{ background: 'rgba(23,60,62,0.6)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progreso de la ruta</span>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#E8B94A', lineHeight: 1 }}>{progresoRuta}%</span>
          </div>
          <div style={{ width: '100%', height: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ width: `${progresoRuta}%`, height: '100%', background: 'linear-gradient(90deg, #C49A33, #E8B94A)', borderRadius: 8 }} />
          </div>
        </div>

        {/* Stats pequeñas */}
        {stats.map((stat, idx) => (
          <div key={idx} style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{stat.label}</p>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#F5F3EE' }}>{stat.value}</p>
            </div>
          </div>
        ))}

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        
        {/* Habilidades */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 15, color: '#F5F3EE', fontWeight: 600 }}>Habilidades</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {habilidades.map(hab => (
              <div key={hab.nombre}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, color: '#8FA8AA', fontWeight: 500 }}>{hab.nombre}</span>
                  <span style={{ fontSize: 14, color: '#F5F3EE', fontWeight: 600 }}>{hab.porcentaje}%</span>
                </div>
                <div style={{ width: '100%', height: 6, background: 'rgba(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${hab.porcentaje}%`, height: '100%', background: '#45C893', borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Esta semana */}
          <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 15, color: '#F5F3EE', fontWeight: 600 }}>Esta semana</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {semana.map((dia, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#8FA8AA', fontWeight: 600 }}>{dia.dia}</span>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: dia.completado ? 'rgba(232,185,74,0.15)' : 'rgba(0,0,0,0.2)',
                    border: `1px solid ${dia.completado ? '#E8B94A' : 'rgba(245,243,238,0.06)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: dia.completado ? '#E8B94A' : 'transparent',
                    fontSize: 14
                  }}>
                    {dia.completado && '✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conceptos a reforzar */}
          <div style={{ background: 'rgba(242,99,123,0.05)', border: '1px solid rgba(242,99,123,0.2)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <h3 style={{ margin: 0, fontSize: 15, color: '#F2637B', fontWeight: 600 }}>Conceptos que debes reforzar</h3>
            </div>
            <ul style={{ margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, color: '#F5F3EE' }}>
              {reforzar.map((item, idx) => (
                <li key={idx} style={{ fontSize: 14, fontWeight: 500 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
