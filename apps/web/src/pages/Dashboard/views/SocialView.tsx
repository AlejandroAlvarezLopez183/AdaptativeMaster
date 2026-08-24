import React from "react";

export function SocialView() {
  const companeros = [
    { id: 1, nombre: "Ana", ruta: "Python", nivel: "Intermedio", tag: "Backend", disponible: true },
    { id: 2, nombre: "Carlos", ruta: "Python", nivel: "Intermedio", tag: "APIs", disponible: true },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Cabecera y Buscador */}
      <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 8px" }}>
            Aprender con otros
          </h1>
          <p style={{ color: "#8FA8AA", margin: 0, fontSize: 15 }}>
            Encuentra compañeros de estudio con tus mismos intereses.
          </p>
        </div>
        
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: '#8FA8AA' }}>🔎</span>
          <input 
            type="text" 
            placeholder="Buscar compañeros..." 
            style={{ 
              width: '100%', 
              background: 'rgba(0,0,0,0.2)', 
              border: '1px solid rgba(245,243,238,0.1)', 
              borderRadius: 12, 
              padding: '14px 16px 14px 44px', 
              color: '#F5F3EE',
              fontSize: 15,
              outline: 'none',
              transition: 'border-color 0.2s'
            }} 
            onFocus={e => e.currentTarget.style.borderColor = 'rgba(232,185,74,0.5)'}
            onBlur={e => e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        
        {/* Columna Principal: Compañeros y Contexto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, gridColumn: '1 / span 2' }}>
          
          {/* Badge Contexto */}
          <div style={{ background: 'rgba(232,185,74,0.08)', border: '1px solid rgba(232,185,74,0.2)', borderRadius: 16, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: '#8FA8AA' }}>Hoy estás aprendiendo:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#F5F3EE' }}>Python Backend</span>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#8FA8AA' }} />
              <span style={{ fontSize: 14, color: '#E8B94A' }}>Intermedio</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 20 }}>✨</span>
              <h3 style={{ margin: 0, fontSize: 18, color: '#F5F3EE', fontWeight: 600 }}>Encontramos compañeros</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {companeros.map(comp => (
                <div key={comp.id} style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24, transition: 'transform 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(69,200,147,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #45C893, #1E4A4D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#0F2A2E' }}>
                        {comp.nombre.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: 16, color: '#F5F3EE', fontWeight: 600 }}>{comp.nombre}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 13, color: '#8FA8AA' }}>{comp.ruta}</span>
                          <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#8FA8AA' }} />
                          <span style={{ fontSize: 13, color: '#8FA8AA' }}>{comp.nivel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <span style={{ background: 'rgba(0,0,0,0.2)', padding: '4px 10px', borderRadius: 12, fontSize: 12, color: '#E8B94A', fontWeight: 500 }}>
                      {comp.tag}
                    </span>
                    {comp.disponible && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#45C893', boxShadow: '0 0 8px rgba(69,200,147,0.5)' }} />
                        <span style={{ fontSize: 12, color: '#45C893', fontWeight: 600 }}>Disponible</span>
                      </div>
                    )}
                  </div>

                  <button style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(245,243,238,0.1)',
                    color: '#F5F3EE',
                    padding: '10px',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,243,238,0.05)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)' }}
                  >
                    Ver perfil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Secundaria: Próxima sesión */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'linear-gradient(145deg, rgba(69,200,147,0.1) 0%, rgba(23,60,62,0.6) 100%)', border: '1px solid rgba(69,200,147,0.2)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: 'radial-gradient(circle, rgba(69,200,147,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
            
            <h3 style={{ margin: '0 0 20px', fontSize: 16, color: '#F5F3EE', fontWeight: 600 }}>Tu próxima sesión</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>📅</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, color: '#8FA8AA' }}>Fecha y hora</span>
                  <span style={{ fontSize: 15, color: '#F5F3EE', fontWeight: 600 }}>Hoy · 19:00</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>👥</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 13, color: '#8FA8AA' }}>Asistentes</span>
                  <span style={{ fontSize: 15, color: '#F5F3EE', fontWeight: 600 }}>3 participantes</span>
                </div>
              </div>
            </div>

            <button style={{
              width: '100%',
              background: '#45C893',
              color: '#0F2A2E',
              border: 'none',
              borderRadius: 12,
              padding: '14px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 14px rgba(69,200,147,0.2)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(69,200,147,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(69,200,147,0.2)'; }}
            >
              Entrar a la sesión
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
