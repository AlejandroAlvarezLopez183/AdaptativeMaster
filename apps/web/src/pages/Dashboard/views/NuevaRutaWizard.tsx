import React, { useState, useEffect } from "react";
import { iaClient } from "@adaptativemaster/shared";

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
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (step === 7) {
      const crearRuta = async () => {
        const token = localStorage.getItem("token");
        if (!token) { onComplete(); return; }
        try {
          await iaClient.crearRuta(
            {
              tema,
              nivel_objetivo: nivel,
              tiempo,
              objetivo,
              estilo_aprendizaje: estiloAprendizaje,
              tono_tutor: tonoTutor,
            },
            token
          );
          setTimeout(onComplete, 2000);
        } catch (err: any) {
          setErrorMsg(err.message || "Error al generar la ruta. Intenta de nuevo.");
        }
      };
      crearRuta();
    }
  }, [step]);

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="animate-fade-in" style={{ 
      maxWidth: '680px', 
      width: '100%', 
      margin: '0 auto', 
      fontFamily: "'Open Sans', system-ui, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      minHeight: '60vh',
      justifyContent: 'center',
      padding: '20px 0'
    }}>
      
      {step < 7 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <button 
            onClick={onCancel}
            style={{
              background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontSize: 14, fontWeight: 500
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0F172A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
          >
            <span>←</span> Cancelar y volver
          </button>

          <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>
            Paso {step} de 6
          </span>
        </div>
      )}

      {/* STEP 1: TEMA */}
      {step === 1 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '40px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
              ¿Qué tema quieres dominar hoy?
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
              Escribe cualquier materia, tecnología o habilidad que desees aprender paso a paso.
            </p>
          </div>
          
          <input 
            type="text" 
            placeholder="Ej. Análisis de Datos, Fundamentos de IA, Python..."
            value={tema}
            onChange={e => setTema(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tema.trim() && nextStep()}
            style={{
              width: '100%',
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              borderRadius: 10,
              padding: '16px 20px',
              fontSize: 16,
              color: '#0F172A',
              outline: 'none',
              textAlign: 'center',
              transition: 'border-color 0.15s ease'
            }}
            autoFocus
          />

          <button 
            onClick={nextStep}
            disabled={!tema.trim()}
            style={{
              background: !tema.trim() ? '#E2E8F0' : '#0F172A',
              color: !tema.trim() ? '#94A3B8' : '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 600,
              cursor: !tema.trim() ? 'not-allowed' : 'pointer',
              alignSelf: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            Continuar
          </button>
        </div>
      )}

      {/* STEP 2: NIVEL */}
      {step === 2 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '40px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
              ¿Cuál es tu nivel en este tema?
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
              Adaptaremos la dificultad inicial para <strong>{tema}</strong>.
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { id: 'novato', title: 'Principiante', desc: 'No tengo experiencia previa en el tema.' },
              { id: 'bases', title: 'Intermedio', desc: 'Conozco los conceptos básicos y fundamentales.' },
              { id: 'avanzado', title: 'Avanzado', desc: 'Busco profundizar y dominar temas complejos.' }
            ].map(lvl => (
              <button 
                key={lvl.id}
                onClick={() => { setNivel(lvl.id); nextStep(); }}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.background = '#EFF6FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 15, color: '#0F172A', fontWeight: 600 }}>{lvl.title}</h3>
                  <p style={{ margin: 0, color: '#64748B', fontSize: 13 }}>{lvl.desc}</p>
                </div>
                <span style={{ fontSize: 18, color: '#2563EB', fontWeight: 600 }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: TIEMPO */}
      {step === 3 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '40px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
              ¿Cuánto tiempo tienes al día?
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
              Ajustaremos la longitud de las sesiones de estudio.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { id: '15m', title: '15 minutos', desc: 'Rápido y diario' },
              { id: '30m', title: '30 minutos', desc: 'Ritmo recomendado' },
              { id: '1h', title: '1 hora', desc: 'Sesión intensiva' }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => { setTiempo(t.id); nextStep(); }}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.background = '#EFF6FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
              >
                <h3 style={{ margin: '0 0 6px', fontSize: 18, color: '#0F172A', fontWeight: 700 }}>{t.title}</h3>
                <p style={{ margin: 0, color: '#64748B', fontSize: 12 }}>{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: OBJETIVO */}
      {step === 4 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '40px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
              ¿Cuál es tu propósito principal?
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
              Daremos a la ruta un enfoque más práctico o teórico según tu meta.
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { id: 'profesional', title: 'Crecimiento laboral', desc: 'Para buscar empleo, ascender o certificarte.' },
              { id: 'proyecto', title: 'Proyecto concreto', desc: 'Necesito aplicarlo en un proyecto de trabajo o estudio.' },
              { id: 'hobby', title: 'Curiosidad e interés personal', desc: 'Aprender por motivación personal y cultura general.' }
            ].map(obj => (
              <button 
                key={obj.id}
                onClick={() => { setObjetivo(obj.id); nextStep(); }}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.background = '#EFF6FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 15, color: '#0F172A', fontWeight: 600 }}>{obj.title}</h3>
                  <p style={{ margin: 0, color: '#64748B', fontSize: 13 }}>{obj.desc}</p>
                </div>
                <span style={{ fontSize: 18, color: '#2563EB', fontWeight: 600 }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: ESTILO */}
      {step === 5 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '40px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
              ¿Cómo prefieres aprender?
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
              La IA adaptará el formato de explicaciones y ejemplos.
            </p>
          </div>
          
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { id: 'practico', title: 'Práctico y con retos', desc: 'Ejercicios interactivos, código y resolución de problemas.' },
              { id: 'visual', title: 'Visual y esquemático', desc: 'Resúmenes claros, listas y diagramas estructurados.' },
              { id: 'teorico', title: 'Profundo y detallado', desc: 'Explicaciones conceptuales y fundamentos teóricos.' }
            ].map(est => (
              <button 
                key={est.id}
                onClick={() => { setEstiloAprendizaje(est.id); nextStep(); }}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.background = '#EFF6FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 15, color: '#0F172A', fontWeight: 600 }}>{est.title}</h3>
                  <p style={{ margin: 0, color: '#64748B', fontSize: 13 }}>{est.desc}</p>
                </div>
                <span style={{ fontSize: 18, color: '#2563EB', fontWeight: 600 }}>→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6: TONO */}
      {step === 6 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '40px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }}>
              ¿Qué estilo de comunicación prefieres en el Tutor IA?
            </h1>
            <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
              Define cómo responderá el asistente cuando tengas dudas.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { id: 'amigable', title: 'Cercano', desc: 'Tono amigable y motivador' },
              { id: 'directo', title: 'Directo', desc: 'Respuestas claras y al grano' },
              { id: 'academico', title: 'Académico', desc: 'Formal y riguroso' }
            ].map(tono => (
              <button 
                key={tono.id}
                onClick={() => { setTonoTutor(tono.id); nextStep(); }}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.background = '#EFF6FF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.background = '#F8FAFC';
                }}
              >
                <h3 style={{ margin: '0 0 6px', fontSize: 16, color: '#0F172A', fontWeight: 700 }}>{tono.title}</h3>
                <p style={{ margin: 0, color: '#64748B', fontSize: 12 }}>{tono.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 7: CREANDO RUTA */}
      {step === 7 && (
        <div className="animate-fade-in" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 14,
          padding: '48px 32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          textAlign: 'center'
        }}>
          {!errorMsg ? (
            <>
              <div style={{
                width: 48,
                height: 48,
                border: '3px solid #E2E8F0',
                borderTopColor: '#2563EB',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <div>
                <h2 style={{ fontSize: 20, color: '#0F172A', fontWeight: 700, margin: '0 0 6px' }}>
                  Creando tu ruta de estudio...
                </h2>
                <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>
                  Organizando el temario y lecciones adaptadas para <strong>{tema}</strong>.
                </p>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: 18, color: '#DC2626', fontWeight: 700, margin: '0 0 6px' }}>
                  No se pudo generar la ruta
                </h2>
                <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 20px' }}>{errorMsg}</p>
                <button
                  onClick={() => { setStep(1); setErrorMsg(""); }}
                  style={{
                    background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '10px 20px',
                    borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Intentar de nuevo
                </button>
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
}
