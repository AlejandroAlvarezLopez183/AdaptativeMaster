import React from "react";
import { UserResponse } from "@adaptativemaster/shared";

interface PerfilViewProps {
  user: UserResponse | null;
}

export function PerfilView({ user }: PerfilViewProps) {
  const nombre = user?.nombre?.split(" ")[0] || "Usuario";
  
  // Datos simulados por ahora (MVPs)
  const perfilData = {
    nivel: "Intermedio",
    intereses: ["Python", "Backend", "IA"],
    objetivos: "Desarrollo profesional",
    preferencias: [
      { text: "Grupos pequeños", icon: "🧑‍🤝‍🧑" },
      { text: "19:00–22:00", icon: "🌙" }
    ],
    rachas: "7",
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '720px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E8B94A, #F2637B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#0F2A2E",
            textTransform: "uppercase",
            boxShadow: "0 8px 24px rgba(232,185,74,0.2)"
          }}>
            {user?.nombre ? user.nombre.substring(0, 2) : "US"}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 4px" }}>
              {nombre}
            </h1>
            <p style={{ margin: 0, color: "#8FA8AA", fontSize: 14 }}>{user?.email}</p>
          </div>
        </div>

        <button style={{
          background: "transparent",
          border: "1px solid rgba(232,185,74,0.4)",
          color: "#E8B94A",
          padding: "10px 20px",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 14,
          transition: "all 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,185,74,0.1)"; e.currentTarget.style.transform = "translateY(-1px)"}}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"}}
        >
          Editar perfil
        </button>
      </div>

      {/* Grid de contenido */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        
        {/* Nivel General */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nivel general</h3>
          <p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#E8B94A' }}>{perfilData.nivel}</p>
        </div>

        {/* Logros / Racha */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logros y Rachas</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <span style={{ fontSize: 20, fontWeight: 600, color: '#F5F3EE' }}>{perfilData.rachas} días</span>
          </div>
        </div>

        {/* Intereses */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24, gridColumn: '1 / -1' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intereses</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {perfilData.intereses.map(interes => (
              <span key={interes} style={{ background: 'rgba(232,185,74,0.15)', color: '#E8B94A', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
                {interes}
              </span>
            ))}
          </div>
        </div>

        {/* Objetivos */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Objetivos</h3>
          <p style={{ margin: 0, fontSize: 16, color: '#F5F3EE', lineHeight: 1.5 }}>
            {perfilData.objetivos}
          </p>
        </div>

        {/* Preferencias de estudio */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferencias de estudio</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {perfilData.preferencias.map((pref, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18 }}>{pref.icon}</span>
                <span style={{ fontSize: 15, color: '#F5F3EE', fontWeight: 500 }}>{pref.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
