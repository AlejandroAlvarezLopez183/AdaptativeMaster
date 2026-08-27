import React from "react";

export function SocialView() {
  return (
    <div className="animate-fade-in" style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      padding: 40,
      textAlign: 'center'
    }}>
      <div style={{
        background: 'rgba(23,60,62,0.4)',
        border: '1px solid rgba(69,200,147,0.3)',
        borderRadius: 32,
        padding: '64px 40px',
        maxWidth: 600,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow de fondo */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(69,200,147,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 72, marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            🚧
          </div>
          <h1 style={{ 
            fontFamily: "'Fraunces', Georgia, serif", 
            fontSize: 40, 
            fontWeight: 800, 
            color: "#F5F3EE", 
            margin: "0 0 16px",
            letterSpacing: "-0.02em"
          }}>
            Aprender con otros
          </h1>
          <p style={{ color: "#8FA8AA", margin: "0 0 32px", fontSize: 18, lineHeight: 1.6 }}>
            Estamos construyendo una plataforma increíble para que puedas conectar, estudiar en vivo y resolver retos con estudiantes de todo el mundo. ¡El modo multijugador llegará muy pronto!
          </p>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(0,0,0,0.2)', padding: '12px 24px', borderRadius: 100, border: '1px solid rgba(245,243,238,0.1)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E8B94A', boxShadow: '0 0 10px rgba(232,185,74,0.6)' }} />
            <span style={{ color: '#E8B94A', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              En desarrollo activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
