import React from "react";

export function AyudaView() {
  const opciones = [
    { label: "Preguntas frecuentes", icon: "💬" },
    { label: "Reportar problema", icon: "⚠️" },
    { label: "Seguridad", icon: "🔒" },
    { label: "Privacidad", icon: "👁️" },
    { label: "Contacto", icon: "✉️" },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 10px" }}>
        Centro de ayuda
      </h1>
      <p style={{ color: "#8FA8AA", margin: '0 0 40px', fontSize: 15 }}>
        ¿En qué podemos ayudarte hoy? Selecciona una de las opciones.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {opciones.map((opc, idx) => (
          <div key={idx} style={{
            background: 'rgba(23,60,62,0.4)',
            border: '1px solid rgba(245,243,238,0.06)',
            borderRadius: '16px',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(23,60,62,0.7)';
            e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(23,60,62,0.4)';
            e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ fontSize: '24px' }}>{opc.icon}</div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: '#F5F3EE' }}>
              {opc.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
