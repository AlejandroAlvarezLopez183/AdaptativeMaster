import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { iaClient, progresoClient } from "@adaptativemaster/shared";
export function InicioView({ user, setActive, onSelectRuta }) {
    const nombre = user?.nombre?.split(' ')[0] || "Usuario";
    const [rutas, setRutas] = useState(null);
    const [progreso, setProgreso] = useState(null);
    const [loading, setLoading] = useState(true);
    const hora = new Date().getHours();
    const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
    // Fecha actual formateada en español
    const hoyStr = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(new Date());
    const fechaCapitalizada = hoyStr.charAt(0).toUpperCase() + hoyStr.slice(1);
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const [rutasData, progresoData] = await Promise.allSettled([
                        iaClient.getRutas(token),
                        progresoClient.getResumen(token),
                    ]);
                    if (rutasData.status === 'fulfilled') {
                        setRutas(rutasData.value);
                    }
                    if (progresoData.status === 'fulfilled') {
                        setProgreso(progresoData.value);
                    }
                }
                catch (error) {
                    console.error("Error al cargar datos del dashboard", error);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const rutaPrincipal = rutas?.en_curso?.[0];
    const rachaDias = progreso?.racha?.dias_actuales ?? 0;
    const xpTotal = progreso?.xp_total ?? 0;
    const rutasActivas = rutas?.en_curso?.length ?? 0;
    const rutasCompletadas = rutas?.completado?.length ?? 0;
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '1000px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 16 }, children: [_jsxs("div", { children: [_jsx("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 600, letterSpacing: '0.02em', display: 'block', marginBottom: 4 }, children: fechaCapitalizada }), _jsxs("h1", { style: { fontSize: 28, fontWeight: 700, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.02em" }, children: [saludo, ", ", nombre] }), _jsx("p", { style: { margin: 0, color: "#64748B", fontSize: 14 }, children: "Aqu\u00ED tienes un resumen de tu actividad y tus pr\u00F3ximas metas de estudio." })] }), _jsx("div", { style: { display: 'flex', gap: 10 }, children: _jsxs("button", { onClick: () => setActive && setActive('nueva_ruta_wizard'), style: {
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                background: '#0F172A',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: 8,
                                padding: '9px 16px',
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)'
                            }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: [_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }), "Nueva ruta de estudio"] }) })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, marginBottom: 24 }, children: [_jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: '18px 20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }, children: [_jsx("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 500 }, children: "Racha de estudio" }), _jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "#D97706", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" }) }) })] }), _jsxs("div", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }, children: [rachaDias, " ", rachaDias === 1 ? 'día' : 'días'] }), _jsx("span", { style: { fontSize: 12, color: '#64748B', display: 'block', marginTop: 4 }, children: rachaDias > 0 ? '¡Excelente constancia!' : 'Estudia hoy para sumar racha' })] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: '18px 20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }, children: [_jsx("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 500 }, children: "Experiencia" }), _jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) }) })] }), _jsxs("div", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }, children: [xpTotal, " XP"] }), _jsx("span", { style: { fontSize: 12, color: '#64748B', display: 'block', marginTop: 4 }, children: "Puntos ganados en lecciones" })] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: '18px 20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }, children: [_jsx("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 500 }, children: "Rutas de estudio" }), _jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "#4F46E5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), _jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })] }) })] }), _jsxs("div", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }, children: [rutasActivas, " en curso"] }), _jsxs("span", { style: { fontSize: 12, color: '#64748B', display: 'block', marginTop: 4 }, children: [rutasCompletadas, " completadas"] })] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: '18px 20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }, children: [_jsx("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 500 }, children: "Nivel de aprendizaje" }), _jsx("div", { style: { width: 32, height: 32, borderRadius: 8, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsxs("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "#059669", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "8", r: "7" }), _jsx("polyline", { points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88" })] }) })] }), _jsx("div", { style: { fontSize: 24, fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }, children: user?.nivel || "Intermedio" }), _jsx("span", { style: { fontSize: 12, color: '#64748B', display: 'block', marginTop: 4 }, children: "Ajuste seg\u00FAn tu ritmo" })] })] }), rutaPrincipal ? (_jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '28px 32px',
                    marginBottom: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    position: 'relative'
                }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }, children: [_jsxs("span", { style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    background: '#EFF6FF',
                                    color: '#1D4ED8',
                                    border: '1px solid #DBEAFE',
                                    borderRadius: 6,
                                    padding: '3px 10px',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    letterSpacing: '0.02em',
                                    textTransform: 'uppercase'
                                }, children: [_jsx("span", { style: { width: 6, height: 6, borderRadius: '50%', background: '#2563EB' } }), "Ruta en curso"] }), _jsxs("span", { style: { fontSize: 14, fontWeight: 600, color: '#0F172A' }, children: [rutaPrincipal.progreso_porcentaje, "% completado"] })] }), _jsxs("div", { style: { marginBottom: 20 }, children: [_jsx("h2", { style: { fontSize: 22, fontWeight: 700, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.01em' }, children: rutaPrincipal.titulo }), _jsxs("p", { style: { margin: 0, fontSize: 14, color: '#64748B' }, children: [rutaPrincipal.lecciones_completadas || 0, " de ", rutaPrincipal.lecciones_totales || 0, " lecciones terminadas"] })] }), _jsx("div", { style: {
                            width: '100%',
                            height: 8,
                            background: '#F1F5F9',
                            borderRadius: 4,
                            overflow: 'hidden',
                            marginBottom: 24
                        }, children: _jsx("div", { style: {
                                width: `${rutaPrincipal.progreso_porcentaje}%`,
                                height: '100%',
                                background: '#2563EB',
                                borderRadius: 4,
                                transition: 'width 0.4s ease'
                            } }) }), _jsxs("div", { style: { display: 'flex', gap: 12, flexWrap: 'wrap' }, children: [_jsxs("button", { onClick: () => {
                                    if (onSelectRuta && rutaPrincipal?.id)
                                        onSelectRuta(rutaPrincipal.id);
                                    if (setActive)
                                        setActive('ruta_detalle');
                                }, style: {
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    background: '#0F172A',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '11px 22px',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: [_jsx("span", { children: "Continuar ruta" }), _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), _jsx("polyline", { points: "12 5 19 12 12 19" })] })] }), _jsx("button", { onClick: () => {
                                    if (onSelectRuta && rutaPrincipal?.id)
                                        onSelectRuta(rutaPrincipal.id);
                                    if (setActive)
                                        setActive('leccion_duolingo');
                                }, style: {
                                    background: '#FFFFFF',
                                    color: '#475569',
                                    border: '1px solid #CBD5E1',
                                    borderRadius: 8,
                                    padding: '11px 18px',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                }, onMouseEnter: e => {
                                    e.currentTarget.style.background = '#F8FAFC';
                                    e.currentTarget.style.color = '#0F172A';
                                }, onMouseLeave: e => {
                                    e.currentTarget.style.background = '#FFFFFF';
                                    e.currentTarget.style.color = '#475569';
                                }, children: "Ver mapa interactivo" })] })] })) : (_jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '36px 32px',
                    marginBottom: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 20
                }, children: [_jsxs("div", { children: [_jsx("span", { style: { fontSize: 12, color: '#2563EB', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }, children: "Comienza hoy" }), _jsx("h2", { style: { fontSize: 20, fontWeight: 700, color: '#0F172A', margin: '4px 0 6px' }, children: "A\u00FAn no tienes una ruta de aprendizaje activa" }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 14, maxWidth: 520 }, children: "Crea tu primera ruta personalizada con la asistencia de la IA. Aprender\u00E1s paso a paso con lecciones adaptadas a tu nivel." })] }), _jsx("button", { onClick: () => setActive && setActive('nueva_ruta_wizard'), style: {
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            background: '#0F172A',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: 8,
                            padding: '12px 22px',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: "Crear mi primera ruta" })] })), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }, children: [_jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 14,
                            padding: 24,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsx("h3", { style: { fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 16px' }, children: "Herramientas recomendadas" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: [_jsxs("div", { onClick: () => setActive && setActive('tutor'), style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 14,
                                            padding: '12px 14px',
                                            borderRadius: 8,
                                            border: '1px solid #F1F5F9',
                                            background: '#F8FAFC',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.background = '#EFF6FF';
                                            e.currentTarget.style.borderColor = '#DBEAFE';
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.background = '#F8FAFC';
                                            e.currentTarget.style.borderColor = '#F1F5F9';
                                        }, children: [_jsx("div", { style: { width: 36, height: 36, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "10", rx: "2" }), _jsx("circle", { cx: "12", cy: "5", r: "2" }), _jsx("path", { d: "M12 7v4" })] }) }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("div", { style: { fontSize: 14, fontWeight: 600, color: '#0F172A' }, children: "Tutor IA Personalizado" }), _jsx("div", { style: { fontSize: 12, color: '#64748B' }, children: "Resuelve dudas y pide explicaciones detalladas" })] }), _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#94A3B8", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "9 18 15 12 9 6" }) })] }), _jsxs("div", { onClick: () => setActive && setActive('progreso'), style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 14,
                                            padding: '12px 14px',
                                            borderRadius: 8,
                                            border: '1px solid #F1F5F9',
                                            background: '#F8FAFC',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.background = '#EFF6FF';
                                            e.currentTarget.style.borderColor = '#DBEAFE';
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.background = '#F8FAFC';
                                            e.currentTarget.style.borderColor = '#F1F5F9';
                                        }, children: [_jsx("div", { style: { width: 36, height: 36, borderRadius: 8, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#059669", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "20", x2: "18", y2: "10" }), _jsx("line", { x1: "12", y1: "20", x2: "12", y2: "4" }), _jsx("line", { x1: "6", y1: "20", x2: "6", y2: "14" })] }) }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("div", { style: { fontSize: 14, fontWeight: 600, color: '#0F172A' }, children: "M\u00E9tricas de Progreso" }), _jsx("div", { style: { fontSize: 12, color: '#64748B' }, children: "Eval\u00FAa tus habilidades y conceptos por reforzar" })] }), _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#94A3B8", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "9 18 15 12 9 6" }) })] }), _jsxs("div", { onClick: () => setActive && setActive('aprendizaje'), style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 14,
                                            padding: '12px 14px',
                                            borderRadius: 8,
                                            border: '1px solid #F1F5F9',
                                            background: '#F8FAFC',
                                            cursor: 'pointer',
                                            transition: 'all 0.15s ease'
                                        }, onMouseEnter: e => {
                                            e.currentTarget.style.background = '#EFF6FF';
                                            e.currentTarget.style.borderColor = '#DBEAFE';
                                        }, onMouseLeave: e => {
                                            e.currentTarget.style.background = '#F8FAFC';
                                            e.currentTarget.style.borderColor = '#F1F5F9';
                                        }, children: [_jsx("div", { style: { width: 36, height: 36, borderRadius: 8, background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#D97706", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), _jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })] }) }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("div", { style: { fontSize: 14, fontWeight: 600, color: '#0F172A' }, children: "Biblioteca de Aprendizaje" }), _jsx("div", { style: { fontSize: 12, color: '#64748B' }, children: "Gestiona tus rutas activas y terminadas" })] }), _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#94A3B8", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "9 18 15 12 9 6" }) })] })] })] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 14,
                            padding: 24,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }, children: [_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }, children: [_jsx("div", { style: { width: 36, height: 36, borderRadius: 8, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#059669", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" })] }) }), _jsx("span", { style: {
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    color: '#047857',
                                                    background: '#ECFDF5',
                                                    border: '1px solid #A7F3D0',
                                                    padding: '2px 8px',
                                                    borderRadius: 12
                                                }, children: "Pr\u00F3ximamente" })] }), _jsx("h3", { style: { fontSize: 16, fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }, children: "Estudio en comunidad" }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 13, lineHeight: 1.6 }, children: "Conecta con otros compa\u00F1eros para estudiar en simult\u00E1neo, participar en desaf\u00EDos grupales y resolver dudas de temarios juntos." })] }), _jsx("div", { style: { marginTop: 20 }, children: _jsx("button", { onClick: () => setActive && setActive('social'), style: {
                                        width: '100%',
                                        background: '#F8FAFC',
                                        color: '#0F172A',
                                        border: '1px solid #E2E8F0',
                                        borderRadius: 8,
                                        padding: '10px 16px',
                                        fontSize: 13,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 6
                                    }, onMouseEnter: e => {
                                        e.currentTarget.style.background = '#F1F5F9';
                                        e.currentTarget.style.borderColor = '#CBD5E1';
                                    }, onMouseLeave: e => {
                                        e.currentTarget.style.background = '#F8FAFC';
                                        e.currentTarget.style.borderColor = '#E2E8F0';
                                    }, children: "Conocer m\u00E1s del modo colaborativo" }) })] })] })] }));
}
