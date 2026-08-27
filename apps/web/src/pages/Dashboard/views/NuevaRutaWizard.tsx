import React, { useState, useEffect } from "react";

interface NuevaRutaWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function NuevaRutaWizard({ onComplete, onCancel }: NuevaRutaWizardProps) {
  const [step, setStep] = useState(1);
  const [tema, setTema] = useState("");
  const [nivel, setNivel] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [estiloAprendizaje, setEstiloAprendizaje] = useState("");
  const [tonoTutor, setTonoTutor] = useState("");

  useEffect(() => {
    if (step === 7) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="animate-fade-in" style={{ 
      maxWidth: '700px', 
      width: '100%', 
      margin: '0 auto', 
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '60vh',
      justifyContent: 'center'
    }}>
      
      {step < 7 && (
        <button 
          onClick={onCancel}
          style={{ background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, padding: 0, fontSize: 15, fontWeight: 500, alignSelf: 'flex-start' }}
          onMouseEnter={e => e.currentTarget.style.color = '#F5F3EE'}
          onMouseLeave={e => e.currentTarget.style.color = '#8FA8AA'}
        >
          <span>←</span> Cancelar y volver
        </button>
      )}

      {/* STEP 1: TEMA */}
      {step === 1 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>🎯</span>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              ¿Qué quieres dominar hoy?
            </h1>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              Escribe cualquier tema, tecnología o habilidad que quieras aprender.
            </p>
          </div>
          
          <input 
            type="text" 
            placeholder="Ej. Análisis de Datos, Inteligencia Artificial, Marketing..."
            value={tema}
            onChange={e => setTema(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tema.trim() && nextStep()}
            style={{
              width: '100%',
              background: 'rgba(23,60,62,0.4)',
              border: '2px solid rgba(232,185,74,0.3)',
              borderRadius: 24,
              padding: '24px 32px',
              fontSize: 20,
              color: '#F5F3EE',
              outline: 'none',
              textAlign: 'center',
              boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,185,74,0.15)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)' }}
            autoFocus
          />

          <button 
            onClick={nextStep}
            disabled={!tema.trim()}
            style={{
              background: !tema.trim() ? 'rgba(245,243,238,0.1)' : '#E8B94A',
              color: !tema.trim() ? 'rgba(245,243,238,0.3)' : '#0F2A2E',
              border: 'none',
              borderRadius: 16,
              padding: '18px 32px',
              fontSize: 18,
              fontWeight: 700,
              cursor: !tema.trim() ? 'not-allowed' : 'pointer',
              alignSelf: 'center',
              marginTop: 16,
              transition: 'transform 0.2s',
            }}
          >
            Continuar
          </button>
        </div>
      )}

      {/* STEP 2: NIVEL */}
      {step === 2 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>🧗</span>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              ¿Cuál es tu nivel actual?
            </h1>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              Para {tema}, ¿qué tanta experiencia tienes?
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { id: 'novato', title: 'Novato total', desc: 'Nunca lo he visto antes' },
              { id: 'bases', title: 'Tengo algunas bases', desc: 'Conozco lo fundamental' },
              { id: 'avanzado', title: 'Busco dominarlo a fondo', desc: 'Ya tengo experiencia' }
            ].map(lvl => (
              <button 
                key={lvl.id}
                onClick={() => { setNivel(lvl.id); nextStep(); }}
                style={{
                  background: 'rgba(23,60,62,0.4)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  borderRadius: 16,
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#45C893'; e.currentTarget.style.background = 'rgba(69,200,147,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; }}
              >
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }}>{lvl.title}</h3>
                  <p style={{ margin: 0, color: '#8FA8AA', fontSize: 14 }}>{lvl.desc}</p>
                </div>
                <span style={{ fontSize: 24, color: '#45C893' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: TIEMPO */}
      {step === 3 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>⏱</span>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              ¿Cuánto tiempo tienes al día?
            </h1>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              Ajustaremos la longitud de las lecciones a tu horario.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { id: '15m', title: '15 min', desc: 'Rápido y diario' },
              { id: '30m', title: '30 min', desc: 'Ritmo normal' },
              { id: '1h', title: '1 hora', desc: 'Intensivo' }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => { setTiempo(t.id); nextStep(); }}
                style={{
                  background: 'rgba(23,60,62,0.4)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  borderRadius: 16,
                  padding: '32px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(232,185,74,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 24, color: '#F5F3EE', fontWeight: 700 }}>{t.title}</h3>
                <p style={{ margin: 0, color: '#8FA8AA', fontSize: 14 }}>{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: OBJETIVO */}
      {step === 4 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>🎯</span>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              ¿Por qué quieres aprender esto?
            </h1>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              Definiremos el enfoque práctico de tu ruta.
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { id: 'profesional', title: 'Crecimiento profesional', desc: 'Para conseguir trabajo o ascender' },
              { id: 'proyecto', title: 'Proyecto o escuela', desc: 'Necesito aplicarlo en un caso real' },
              { id: 'hobby', title: 'Curiosidad o hobby', desc: 'Aprender por diversión' }
            ].map(obj => (
              <button 
                key={obj.id}
                onClick={() => { setObjetivo(obj.id); nextStep(); }}
                style={{
                  background: 'rgba(23,60,62,0.4)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  borderRadius: 16,
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#45C893'; e.currentTarget.style.background = 'rgba(69,200,147,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; }}
              >
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }}>{obj.title}</h3>
                  <p style={{ margin: 0, color: '#8FA8AA', fontSize: 14 }}>{obj.desc}</p>
                </div>
                <span style={{ fontSize: 24, color: '#45C893' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: ESTILO */}
      {step === 5 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>🧠</span>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              ¿Cómo absorbes mejor la información?
            </h1>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              Ajustaremos el tipo de contenido que generará la IA.
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { id: 'visual', title: 'Visual', desc: 'Prefiero diagramas, videos y esquemas' },
              { id: 'practico', title: 'Práctico', desc: 'Quiero código, ejercicios y retos' },
              { id: 'teorico', title: 'Teórico', desc: 'Lecturas profundas y conceptos detallados' }
            ].map(est => (
              <button 
                key={est.id}
                onClick={() => { setEstiloAprendizaje(est.id); nextStep(); }}
                style={{
                  background: 'rgba(23,60,62,0.4)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  borderRadius: 16,
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.background = 'rgba(232,185,74,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; }}
              >
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }}>{est.title}</h3>
                  <p style={{ margin: 0, color: '#8FA8AA', fontSize: 14 }}>{est.desc}</p>
                </div>
                <span style={{ fontSize: 24, color: '#E8B94A' }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6: TONO */}
      {step === 6 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 48, marginBottom: 16, display: 'block' }}>🤖</span>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              ¿Cómo quieres que te trate tu tutor?
            </h1>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              Elige la personalidad de tu inteligencia artificial.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { id: 'amigable', title: 'Amigable', desc: 'Como un amigo' },
              { id: 'estricto', title: 'Estricto', desc: 'Como un profesor' },
              { id: 'directo', title: 'Directo', desc: 'Respuestas cortas' }
            ].map(tono => (
              <button 
                key={tono.id}
                onClick={() => { setTonoTutor(tono.id); nextStep(); }}
                style={{
                  background: 'rgba(23,60,62,0.4)',
                  border: '1px solid rgba(245,243,238,0.1)',
                  borderRadius: 16,
                  padding: '32px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#45C893'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(69,200,147,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <h3 style={{ margin: '0 0 8px', fontSize: 24, color: '#F5F3EE', fontWeight: 700 }}>{tono.title}</h3>
                <p style={{ margin: 0, color: '#8FA8AA', fontSize: 14 }}>{tono.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 7: CARGANDO MAGIA */}
      {step === 7 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 40 }}>
          
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            {/* Círculo brillante central */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, #E8B94A 0%, transparent 60%)', animation: 'pulse 2s infinite' }} />
            
            {/* Spinner perimetral */}
            <svg style={{ position: 'absolute', inset: -20, animation: 'spin 3s linear infinite' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(232,185,74,0.2)" strokeWidth="2" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E8B94A" strokeWidth="2" strokeDasharray="60 200" strokeLinecap="round" />
            </svg>
            
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 40 }}>✨</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, color: '#F5F3EE', margin: '0 0 12px' }}>
              Creando tu ruta maestra...
            </h2>
            <p style={{ color: '#8FA8AA', fontSize: 16 }}>
              La IA está organizando el temario de <strong>{tema}</strong>
            </p>
          </div>
          
          <style>
            {`
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes pulse { 0% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.4; transform: scale(0.8); } }
            `}
          </style>
        </div>
      )}

    </div>
  );
}
