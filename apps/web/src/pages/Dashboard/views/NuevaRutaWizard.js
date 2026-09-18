import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { iaClient } from "@adaptativemaster/shared";
export function NuevaRutaWizard({ onComplete, onCancel }) {
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
                if (!token) {
                    onComplete();
                    return;
                }
                try {
                    await iaClient.crearRuta({
                        tema,
                        nivel_objetivo: nivel,
                        tiempo,
                        objetivo,
                        estilo_aprendizaje: estiloAprendizaje,
                        tono_tutor: tonoTutor,
                    }, token);
                    // Esperamos un momento para que el usuario vea la animación
                    setTimeout(onComplete, 2500);
                }
                catch (err) {
                    setErrorMsg(err.message || "Error al generar la ruta. Intenta de nuevo.");
                }
            };
            crearRuta();
        }
    }, [step]);
    const nextStep = () => setStep(s => s + 1);
    return (_jsxs("div", { className: "animate-fade-in", style: {
            maxWidth: '700px',
            width: '100%',
            margin: '0 auto',
            fontFamily: 'Inter, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '60vh',
            justifyContent: 'center'
        }, children: [step < 7 && (_jsxs("button", { onClick: onCancel, style: { background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, padding: 0, fontSize: 15, fontWeight: 500, alignSelf: 'flex-start' }, onMouseEnter: e => e.currentTarget.style.color = '#F5F3EE', onMouseLeave: e => e.currentTarget.style.color = '#8FA8AA', children: [_jsx("span", { children: "\u2190" }), " Cancelar y volver"] })), step === 1 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: 32 }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: 16, display: 'block' }, children: "\uD83C\uDFAF" }), _jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }, children: "\u00BFQu\u00E9 quieres dominar hoy?" }), _jsx("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: "Escribe cualquier tema, tecnolog\u00EDa o habilidad que quieras aprender." })] }), _jsx("input", { type: "text", placeholder: "Ej. An\u00E1lisis de Datos, Inteligencia Artificial, Marketing...", value: tema, onChange: e => setTema(e.target.value), onKeyDown: e => e.key === 'Enter' && tema.trim() && nextStep(), style: {
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
                        }, onFocus: e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,185,74,0.15)'; }, onBlur: e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.2)'; }, autoFocus: true }), _jsx("button", { onClick: nextStep, disabled: !tema.trim(), style: {
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
                        }, children: "Continuar" })] })), step === 2 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: 32 }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: 16, display: 'block' }, children: "\uD83E\uDDD7" }), _jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }, children: "\u00BFCu\u00E1l es tu nivel actual?" }), _jsxs("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: ["Para ", tema, ", \u00BFqu\u00E9 tanta experiencia tienes?"] })] }), _jsx("div", { style: { display: 'grid', gap: 16 }, children: [
                            { id: 'novato', title: 'Novato total', desc: 'Nunca lo he visto antes' },
                            { id: 'bases', title: 'Tengo algunas bases', desc: 'Conozco lo fundamental' },
                            { id: 'avanzado', title: 'Busco dominarlo a fondo', desc: 'Ya tengo experiencia' }
                        ].map(lvl => (_jsxs("button", { onClick: () => { setNivel(lvl.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => { e.currentTarget.style.borderColor = '#45C893'; e.currentTarget.style.background = 'rgba(69,200,147,0.1)'; }, onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 4px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }, children: lvl.title }), _jsx("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 14 }, children: lvl.desc })] }), _jsx("span", { style: { fontSize: 24, color: '#45C893' }, children: "\u2192" })] }, lvl.id))) })] })), step === 3 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: 32 }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: 16, display: 'block' }, children: "\u23F1" }), _jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }, children: "\u00BFCu\u00E1nto tiempo tienes al d\u00EDa?" }), _jsx("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: "Ajustaremos la longitud de las lecciones a tu horario." })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }, children: [
                            { id: '15m', title: '15 min', desc: 'Rápido y diario' },
                            { id: '30m', title: '30 min', desc: 'Ritmo normal' },
                            { id: '1h', title: '1 hora', desc: 'Intensivo' }
                        ].map(t => (_jsxs("button", { onClick: () => { setTiempo(t.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(232,185,74,0.15)'; }, onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }, children: [_jsx("h3", { style: { margin: '0 0 8px', fontSize: 24, color: '#F5F3EE', fontWeight: 700 }, children: t.title }), _jsx("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 14 }, children: t.desc })] }, t.id))) })] })), step === 4 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: 32 }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: 16, display: 'block' }, children: "\uD83C\uDFAF" }), _jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }, children: "\u00BFPor qu\u00E9 quieres aprender esto?" }), _jsx("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: "Definiremos el enfoque pr\u00E1ctico de tu ruta." })] }), _jsx("div", { style: { display: 'grid', gap: 16 }, children: [
                            { id: 'profesional', title: 'Crecimiento profesional', desc: 'Para conseguir trabajo o ascender' },
                            { id: 'proyecto', title: 'Proyecto o escuela', desc: 'Necesito aplicarlo en un caso real' },
                            { id: 'hobby', title: 'Curiosidad o hobby', desc: 'Aprender por diversión' }
                        ].map(obj => (_jsxs("button", { onClick: () => { setObjetivo(obj.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => { e.currentTarget.style.borderColor = '#45C893'; e.currentTarget.style.background = 'rgba(69,200,147,0.1)'; }, onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 4px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }, children: obj.title }), _jsx("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 14 }, children: obj.desc })] }), _jsx("span", { style: { fontSize: 24, color: '#45C893' }, children: "\u2192" })] }, obj.id))) })] })), step === 5 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: 32 }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: 16, display: 'block' }, children: "\uD83E\uDDE0" }), _jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }, children: "\u00BFC\u00F3mo absorbes mejor la informaci\u00F3n?" }), _jsx("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: "Ajustaremos el tipo de contenido que generar\u00E1 la IA." })] }), _jsx("div", { style: { display: 'grid', gap: 16 }, children: [
                            { id: 'visual', title: 'Visual', desc: 'Prefiero diagramas, videos y esquemas' },
                            { id: 'practico', title: 'Práctico', desc: 'Quiero código, ejercicios y retos' },
                            { id: 'teorico', title: 'Teórico', desc: 'Lecturas profundas y conceptos detallados' }
                        ].map(est => (_jsxs("button", { onClick: () => { setEstiloAprendizaje(est.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.background = 'rgba(232,185,74,0.1)'; }, onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.background = 'rgba(23,60,62,0.4)'; }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 4px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }, children: est.title }), _jsx("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 14 }, children: est.desc })] }), _jsx("span", { style: { fontSize: 24, color: '#E8B94A' }, children: "\u2192" })] }, est.id))) })] })), step === 6 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: 32 }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("span", { style: { fontSize: 48, marginBottom: 16, display: 'block' }, children: "\uD83E\uDD16" }), _jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 40, fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px', letterSpacing: '-0.02em' }, children: "\u00BFC\u00F3mo quieres que te trate tu tutor?" }), _jsx("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: "Elige la personalidad de tu inteligencia artificial." })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }, children: [
                            { id: 'amigable', title: 'Amigable', desc: 'Como un amigo' },
                            { id: 'estricto', title: 'Estricto', desc: 'Como un profesor' },
                            { id: 'directo', title: 'Directo', desc: 'Respuestas cortas' }
                        ].map(tono => (_jsxs("button", { onClick: () => { setTonoTutor(tono.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => { e.currentTarget.style.borderColor = '#45C893'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(69,200,147,0.15)'; }, onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }, children: [_jsx("h3", { style: { margin: '0 0 8px', fontSize: 24, color: '#F5F3EE', fontWeight: 700 }, children: tono.title }), _jsx("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 14 }, children: tono.desc })] }, tono.id))) })] })), step === 7 && (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: 40 }, children: [!errorMsg ? (_jsxs(_Fragment, { children: [_jsxs("div", { style: { position: 'relative', width: 120, height: 120 }, children: [_jsx("div", { style: { position: 'absolute', inset: 0, background: 'radial-gradient(circle, #E8B94A 0%, transparent 60%)', animation: 'pulse 2s infinite' } }), _jsxs("svg", { style: { position: 'absolute', inset: -20, animation: 'spin 3s linear infinite' }, viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "rgba(232,185,74,0.2)", strokeWidth: "2" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#E8B94A", strokeWidth: "2", strokeDasharray: "60 200", strokeLinecap: "round" })] }), _jsx("span", { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 40 }, children: "\u2728" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h2", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, color: '#F5F3EE', margin: '0 0 12px' }, children: "Creando tu ruta maestra..." }), _jsxs("p", { style: { color: '#8FA8AA', fontSize: 16 }, children: ["La IA est\u00E1 organizando el temario de ", _jsx("strong", { children: tema })] })] })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { style: { fontSize: 56 }, children: "\uD83D\uDE35" }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h2", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 24, color: '#F2637B', margin: '0 0 12px' }, children: "Algo sali\u00F3 mal" }), _jsx("p", { style: { color: '#8FA8AA', fontSize: 14, marginBottom: 24 }, children: errorMsg }), _jsx("button", { onClick: () => { setStep(1); setErrorMsg(""); }, style: {
                                            background: '#E8B94A', color: '#0F2A2E', border: 'none', padding: '12px 24px',
                                            borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer'
                                        }, children: "Intentar de nuevo" })] })] })), _jsx("style", { children: `
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes pulse { 0% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } 100% { opacity: 0.4; transform: scale(0.8); } }
            ` })] }))] }));
}
