import React, { useEffect, useState } from "react";
import { UserResponse, iaClient, RutasResponse } from "@adaptativemaster/shared";

interface InicioViewProps {
  user: UserResponse | null;
  setActive?: (v: string) => void;
  onSelectRuta?: (id: string) => void;
}

export function InicioView({ user, setActive, onSelectRuta }: InicioViewProps) {
  const nombre = user?.nombre?.split(' ')[0] || "Usuario";
  const [rutas, setRutas] = useState<RutasResponse | null>(null);
  
  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";

  useEffect(() => {
    const fetchRutas = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const data = await iaClient.getRutas(token);
          setRutas(data);
        } catch (error) {
          console.error("Error fetching rutas", error);
        }
      }
    };
    fetchRutas();
  }, []);

  const rutaPrincipal = rutas?.en_curso?.[0];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Saludo */}
      <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 700, color: "#F5F3EE", margin: 0 }}>
          {saludo}, {nombre}
        </h1>
        <span style={{ fontSize: 32, display: 'inline-block' }}>👋</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        
        {/* Tarjeta 1: Continúa con tu aprendizaje (SOLO SI HAY RUTA EN CURSO) */}
        {rutaPrincipal && (
          <div style={{ 
            background: 'linear-gradient(145deg, rgba(23,60,62,0.8) 0%, rgba(15,42,46,0.9) 100%)', 
            border: '1px solid rgba(232,185,74,0.15)', 
            borderRadius: 20, 
            padding: 32, 
            gridColumn: '1 / -1', 
            position: 'relative', 
            overflow: 'hidden' 
          }}>
             <div style={{ position: 'absolute', top: -150, right: -100, width: 350, height: 350, background: 'radial-gradient(circle, rgba(232,185,74,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
             
             <h2 style={{ fontSize: 13, color: '#E8B94A', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>
               Continúa con tu aprendizaje
             </h2>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, position: 'relative' }}>
               <h3 style={{ fontSize: 28, fontWeight: 700, color: '#F5F3EE', margin: 0 }}>{rutaPrincipal.titulo}</h3>
               <span style={{ fontSize: 20, fontWeight: 600, color: '#E8B94A' }}>{rutaPrincipal.progreso_porcentaje}%</span>
             </div>
             
             <div style={{ width: '100%', height: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: 24, position: 'relative' }}>
               <div style={{ width: `${rutaPrincipal.progreso_porcentaje}%`, height: '100%', background: 'linear-gradient(90deg, #C49A33, #E8B94A)', borderRadius: 4 }} />
             </div>

             <button style={{
               position: 'relative',
               background: '#E8B94A',
               color: '#0F2A2E',
               border: 'none',
               borderRadius: 12,
               padding: '14px 32px',
               fontSize: 15,
               fontWeight: 700,
               cursor: 'pointer',
               boxShadow: '0 4px 14px rgba(232,185,74,0.2)',
             }}
             onClick={() => {
               if (onSelectRuta && rutaPrincipal?.id) onSelectRuta(rutaPrincipal.id);
               if (setActive) setActive('ruta_detalle');
             }}
             onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,185,74,0.3)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(232,185,74,0.2)'; }}
             >
               Continuar
             </button>
          </div>
        )}

        {/* Tarjeta 2: Resumen rápido */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 20, padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
               <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(242,99,123,0.1)', color: '#F2637B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔥</div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Racha actual</span>
                 <span style={{ fontSize: 18, color: '#F5F3EE', fontWeight: 600 }}>Cargando...</span>
               </div>
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
               <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(69,200,147,0.1)', color: '#45C893', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📚</div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Progreso</span>
                 <span style={{ fontSize: 18, color: '#F5F3EE', fontWeight: 600 }}>-</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
               <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(232,185,74,0.1)', color: '#E8B94A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🎯</div>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rutas</span>
                 <span style={{ fontSize: 18, color: '#F5F3EE', fontWeight: 600 }}>{rutas?.en_curso?.length || 0} en curso</span>
               </div>
             </div>
          </div>
        </div>

        {/* Tarjeta 3: Tu sesión de hoy (Social) */}
        <div style={{ background: 'rgba(69,200,147,0.05)', border: '1px solid rgba(69,200,147,0.2)', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 26 }}>👥</span>
              <h3 style={{ margin: 0, fontSize: 18, color: '#F5F3EE', fontWeight: 600 }}>Tu sesión de hoy</h3>
            </div>
            <p style={{ margin: 0, color: '#8FA8AA', fontSize: 15, lineHeight: 1.6 }}>
              Tienes <strong style={{ color: '#45C893', fontWeight: 600 }}>0 compañeros</strong> disponibles ahora mismo para estudiar en grupo y resolver dudas juntos.
            </p>
          </div>
          
          <button style={{
             marginTop: 24,
             background: 'transparent',
             color: '#45C893',
             border: '1px solid rgba(69,200,147,0.4)',
             borderRadius: 12,
             padding: '12px 28px',
             fontSize: 15,
             fontWeight: 600,
             cursor: 'pointer',
             transition: 'all 0.2s',
             alignSelf: 'flex-start'
           }}
           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(69,200,147,0.1)'; e.currentTarget.style.borderColor = '#45C893'; }}
           onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(69,200,147,0.4)'; }}
           >
             Próximamente
           </button>
        </div>

      </div>
    </div>
  );
}
