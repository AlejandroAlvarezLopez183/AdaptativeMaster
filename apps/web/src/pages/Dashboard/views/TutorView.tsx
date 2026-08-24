import React from "react";

export function TutorView() {
  const sugerencias = [
    "Explícame REST desde cero",
    "Ponme un ejercicio",
    "Evalúa lo que aprendí",
    "Explícame este concepto",
    "Ayúdame con esta lección"
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 700, color: "#F5F3EE", margin: "0 0 12px" }}>
          ¿Qué estás aprendiendo?
        </h1>
        <p style={{ color: "#8FA8AA", margin: 0, fontSize: 16 }}>
          Tu tutor personalizado impulsado por IA está listo para ayudarte.
        </p>
      </div>

      {/* Caja de Chat principal */}
      <div style={{ position: 'relative', marginBottom: 48, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        <div style={{ position: 'absolute', top: 18, left: 24, fontSize: 24 }}>✨</div>
        <input 
          type="text" 
          placeholder="Pregúntame sobre APIs REST..." 
          style={{
            width: '100%',
            background: 'linear-gradient(145deg, rgba(23,60,62,0.8) 0%, rgba(15,42,46,0.9) 100%)',
            border: '1px solid rgba(232,185,74,0.3)',
            borderRadius: 20,
            padding: '24px 24px 24px 64px',
            color: '#F5F3EE',
            fontSize: 18,
            outline: 'none',
            transition: 'all 0.3s'
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,185,74,0.15)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.boxShadow = 'none' }}
        />
        <button style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#E8B94A',
          color: '#0F2A2E',
          border: 'none',
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
        >
          Preguntar
        </button>
      </div>

      {/* Sugerencias */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 14, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Sugerencias para empezar
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {sugerencias.map((sug, idx) => (
            <button key={idx} style={{
              background: 'rgba(23,60,62,0.4)',
              border: '1px solid rgba(245,243,238,0.1)',
              color: '#F5F3EE',
              padding: '12px 20px',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,185,74,0.1)'; e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.color = '#E8B94A' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.color = '#F5F3EE' }}
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Contexto Actual */}
      <div style={{ background: 'rgba(0,0,0,0.15)', border: '1px dashed rgba(245,243,238,0.1)', borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(232,185,74,0.15)', color: '#E8B94A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          🧠
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 15, color: '#F5F3EE', fontWeight: 600 }}>Contexto de la conversación</h3>
          
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ruta</span>
              <span style={{ fontSize: 14, color: '#F5F3EE', fontWeight: 500 }}>Python Backend</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lección</span>
              <span style={{ fontSize: 14, color: '#F5F3EE', fontWeight: 500 }}>APIs REST</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nivel</span>
              <span style={{ fontSize: 14, color: '#E8B94A', fontWeight: 600 }}>Intermedio</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
