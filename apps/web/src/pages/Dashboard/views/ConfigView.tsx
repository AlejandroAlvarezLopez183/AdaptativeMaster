import React from "react";

interface ConfigViewProps {
  onLogout: () => void;
}

export function ConfigView({ onLogout }: ConfigViewProps) {
  const opciones = [
    { id: "cuenta", label: "Cuenta", icon: "👤", action: () => console.log("Cuenta") },
    { id: "notificaciones", label: "Notificaciones", icon: "🔔", action: () => console.log("Notif") },
    { id: "privacidad", label: "Privacidad", icon: "👁️", action: () => console.log("Privacidad") },
    { id: "preferencias", label: "Preferencias de estudio", icon: "🎯", action: () => console.log("Prefs") },
    { id: "idioma", label: "Idioma", icon: "🌐", action: () => console.log("Idioma") },
    { id: "seguridad", label: "Seguridad", icon: "🔒", action: () => console.log("Seguridad") },
    { id: "logout", label: "Cerrar sesión", icon: "🚪", action: onLogout, danger: true },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
      <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 10px" }}>
        Configuración
      </h1>
      <p style={{ color: "#8FA8AA", margin: '0 0 40px', fontSize: 15 }}>
        Ajusta tus preferencias y gestiona tu cuenta.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {opciones.map((opc) => (
          <div key={opc.id} onClick={opc.action} style={{
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
            e.currentTarget.style.background = opc.danger ? 'rgba(242,99,123,0.15)' : 'rgba(23,60,62,0.7)';
            e.currentTarget.style.borderColor = opc.danger ? 'rgba(242,99,123,0.4)' : 'rgba(232,185,74,0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(23,60,62,0.4)';
            e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ fontSize: '24px' }}>{opc.icon}</div>
            <span style={{ 
              fontFamily: 'Inter, sans-serif', 
              fontSize: '15px', 
              fontWeight: 600, 
              color: opc.danger ? '#F2637B' : '#F5F3EE' 
            }}>
              {opc.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
