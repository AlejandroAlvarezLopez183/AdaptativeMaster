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
                    setTimeout(onComplete, 2000);
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
            maxWidth: '680px',
            width: '100%',
            margin: '0 auto',
            fontFamily: "'Open Sans', system-ui, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            minHeight: '60vh',
            justifyContent: 'center',
            padding: '20px 0'
        }, children: [step < 7 && (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }, children: [_jsxs("button", { onClick: onCancel, style: {
                            background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontSize: 14, fontWeight: 500
                        }, onMouseEnter: e => (e.currentTarget.style.color = '#0F172A'), onMouseLeave: e => (e.currentTarget.style.color = '#64748B'), children: [_jsx("span", { children: "\u2190" }), " Cancelar y volver"] }), _jsxs("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 600 }, children: ["Paso ", step, " de 6"] })] })), step === 1 && (_jsxs("div", { className: "animate-fade-in", style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '40px 32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24,
                    textAlign: 'center'
                }, children: [_jsxs("div", { children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.01em' }, children: "\u00BFQu\u00E9 tema quieres dominar hoy?" }), _jsx("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: "Escribe cualquier materia, tecnolog\u00EDa o habilidad que desees aprender paso a paso." })] }), _jsx("input", { type: "text", placeholder: "Ej. An\u00E1lisis de Datos, Fundamentos de IA, Python...", value: tema, onChange: e => setTema(e.target.value), onKeyDown: e => e.key === 'Enter' && tema.trim() && nextStep(), style: {
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
                        }, autoFocus: true }), _jsx("button", { onClick: nextStep, disabled: !tema.trim(), style: {
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
                        }, children: "Continuar" })] })), step === 2 && (_jsxs("div", { className: "animate-fade-in", style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '40px 32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }, children: "\u00BFCu\u00E1l es tu nivel en este tema?" }), _jsxs("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: ["Adaptaremos la dificultad inicial para ", _jsx("strong", { children: tema }), "."] })] }), _jsx("div", { style: { display: 'grid', gap: 12 }, children: [
                            { id: 'novato', title: 'Principiante', desc: 'No tengo experiencia previa en el tema.' },
                            { id: 'bases', title: 'Intermedio', desc: 'Conozco los conceptos básicos y fundamentales.' },
                            { id: 'avanzado', title: 'Avanzado', desc: 'Busco profundizar y dominar temas complejos.' }
                        ].map(lvl => (_jsxs("button", { onClick: () => { setNivel(lvl.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => {
                                e.currentTarget.style.borderColor = '#2563EB';
                                e.currentTarget.style.background = '#EFF6FF';
                            }, onMouseLeave: e => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.background = '#F8FAFC';
                            }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 2px', fontSize: 15, color: '#0F172A', fontWeight: 600 }, children: lvl.title }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 13 }, children: lvl.desc })] }), _jsx("span", { style: { fontSize: 18, color: '#2563EB', fontWeight: 600 }, children: "\u2192" })] }, lvl.id))) })] })), step === 3 && (_jsxs("div", { className: "animate-fade-in", style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '40px 32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }, children: "\u00BFCu\u00E1nto tiempo tienes al d\u00EDa?" }), _jsx("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: "Ajustaremos la longitud de las sesiones de estudio." })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }, children: [
                            { id: '15m', title: '15 minutos', desc: 'Rápido y diario' },
                            { id: '30m', title: '30 minutos', desc: 'Ritmo recomendado' },
                            { id: '1h', title: '1 hora', desc: 'Sesión intensiva' }
                        ].map(t => (_jsxs("button", { onClick: () => { setTiempo(t.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => {
                                e.currentTarget.style.borderColor = '#2563EB';
                                e.currentTarget.style.background = '#EFF6FF';
                            }, onMouseLeave: e => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.background = '#F8FAFC';
                            }, children: [_jsx("h3", { style: { margin: '0 0 6px', fontSize: 18, color: '#0F172A', fontWeight: 700 }, children: t.title }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 12 }, children: t.desc })] }, t.id))) })] })), step === 4 && (_jsxs("div", { className: "animate-fade-in", style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '40px 32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }, children: "\u00BFCu\u00E1l es tu prop\u00F3sito principal?" }), _jsx("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: "Daremos a la ruta un enfoque m\u00E1s pr\u00E1ctico o te\u00F3rico seg\u00FAn tu meta." })] }), _jsx("div", { style: { display: 'grid', gap: 12 }, children: [
                            { id: 'profesional', title: 'Crecimiento laboral', desc: 'Para buscar empleo, ascender o certificarte.' },
                            { id: 'proyecto', title: 'Proyecto concreto', desc: 'Necesito aplicarlo en un proyecto de trabajo o estudio.' },
                            { id: 'hobby', title: 'Curiosidad e interés personal', desc: 'Aprender por motivación personal y cultura general.' }
                        ].map(obj => (_jsxs("button", { onClick: () => { setObjetivo(obj.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => {
                                e.currentTarget.style.borderColor = '#2563EB';
                                e.currentTarget.style.background = '#EFF6FF';
                            }, onMouseLeave: e => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.background = '#F8FAFC';
                            }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 2px', fontSize: 15, color: '#0F172A', fontWeight: 600 }, children: obj.title }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 13 }, children: obj.desc })] }), _jsx("span", { style: { fontSize: 18, color: '#2563EB', fontWeight: 600 }, children: "\u2192" })] }, obj.id))) })] })), step === 5 && (_jsxs("div", { className: "animate-fade-in", style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '40px 32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }, children: "\u00BFC\u00F3mo prefieres aprender?" }), _jsx("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: "La IA adaptar\u00E1 el formato de explicaciones y ejemplos." })] }), _jsx("div", { style: { display: 'grid', gap: 12 }, children: [
                            { id: 'practico', title: 'Práctico y con retos', desc: 'Ejercicios interactivos, código y resolución de problemas.' },
                            { id: 'visual', title: 'Visual y esquemático', desc: 'Resúmenes claros, listas y diagramas estructurados.' },
                            { id: 'teorico', title: 'Profundo y detallado', desc: 'Explicaciones conceptuales y fundamentos teóricos.' }
                        ].map(est => (_jsxs("button", { onClick: () => { setEstiloAprendizaje(est.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => {
                                e.currentTarget.style.borderColor = '#2563EB';
                                e.currentTarget.style.background = '#EFF6FF';
                            }, onMouseLeave: e => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.background = '#F8FAFC';
                            }, children: [_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 2px', fontSize: 15, color: '#0F172A', fontWeight: 600 }, children: est.title }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 13 }, children: est.desc })] }), _jsx("span", { style: { fontSize: 18, color: '#2563EB', fontWeight: 600 }, children: "\u2192" })] }, est.id))) })] })), step === 6 && (_jsxs("div", { className: "animate-fade-in", style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '40px 32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', margin: '0 0 8px' }, children: "\u00BFQu\u00E9 estilo de comunicaci\u00F3n prefieres en el Tutor IA?" }), _jsx("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: "Define c\u00F3mo responder\u00E1 el asistente cuando tengas dudas." })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }, children: [
                            { id: 'amigable', title: 'Cercano', desc: 'Tono amigable y motivador' },
                            { id: 'directo', title: 'Directo', desc: 'Respuestas claras y al grano' },
                            { id: 'academico', title: 'Académico', desc: 'Formal y riguroso' }
                        ].map(tono => (_jsxs("button", { onClick: () => { setTonoTutor(tono.id); nextStep(); }, style: {
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
                            }, onMouseEnter: e => {
                                e.currentTarget.style.borderColor = '#2563EB';
                                e.currentTarget.style.background = '#EFF6FF';
                            }, onMouseLeave: e => {
                                e.currentTarget.style.borderColor = '#E2E8F0';
                                e.currentTarget.style.background = '#F8FAFC';
                            }, children: [_jsx("h3", { style: { margin: '0 0 6px', fontSize: 16, color: '#0F172A', fontWeight: 700 }, children: tono.title }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 12 }, children: tono.desc })] }, tono.id))) })] })), step === 7 && (_jsx("div", { className: "animate-fade-in", style: {
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
                }, children: !errorMsg ? (_jsxs(_Fragment, { children: [_jsx("div", { style: {
                                width: 48,
                                height: 48,
                                border: '3px solid #E2E8F0',
                                borderTopColor: '#2563EB',
                                borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite',
                            } }), _jsxs("div", { children: [_jsx("h2", { style: { fontSize: 20, color: '#0F172A', fontWeight: 700, margin: '0 0 6px' }, children: "Creando tu ruta de estudio..." }), _jsxs("p", { style: { color: '#64748B', fontSize: 14, margin: 0 }, children: ["Organizando el temario y lecciones adaptadas para ", _jsx("strong", { children: tema }), "."] })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { style: { width: 44, height: 44, borderRadius: '50%', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }), _jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })] }) }), _jsxs("div", { children: [_jsx("h2", { style: { fontSize: 18, color: '#DC2626', fontWeight: 700, margin: '0 0 6px' }, children: "No se pudo generar la ruta" }), _jsx("p", { style: { color: '#64748B', fontSize: 14, margin: '0 0 20px' }, children: errorMsg }), _jsx("button", { onClick: () => { setStep(1); setErrorMsg(""); }, style: {
                                        background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '10px 20px',
                                        borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer'
                                    }, children: "Intentar de nuevo" })] })] })) }))] }));
}
