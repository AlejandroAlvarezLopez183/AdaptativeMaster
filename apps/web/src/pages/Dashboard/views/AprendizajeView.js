import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { iaClient } from "@adaptativemaster/shared";
export function AprendizajeView({ setActive, onSelectRuta }) {
    const [tab, setTab] = useState("en_curso");
    const [rutas, setRutas] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchRutas = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const data = await iaClient.getRutas(token);
                    setRutas(data);
                }
                catch (error) {
                    console.error("Error fetching rutas", error);
                }
                finally {
                    setLoading(false);
                }
            }
        };
        fetchRutas();
    }, []);
    const tabs = [
        { id: "en_curso", label: "En curso" },
        { id: "completado", label: "Completadas" },
        { id: "guardado", label: "Guardadas" },
    ];
    const rutasA_Mostrar = rutas?.[tab] || [];
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '960px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: { marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }, children: [_jsxs("div", { children: [_jsx("h1", { style: { fontSize: 26, fontWeight: 700, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.01em" }, children: "Mi aprendizaje" }), _jsx("p", { style: { margin: 0, color: "#64748B", fontSize: 14 }, children: "Organiza y retoma tus rutas de estudio activas, finalizadas o archivadas." })] }), _jsxs("button", { onClick: () => { if (setActive)
                            setActive('nueva_ruta_wizard'); }, style: {
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
                            transition: 'all 0.15s ease'
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: [_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }), "Nueva ruta personalizada"] })] }), _jsx("div", { style: {
                    display: 'inline-flex',
                    background: '#F1F5F9',
                    padding: 4,
                    borderRadius: 8,
                    gap: 4,
                    marginBottom: 24,
                    border: '1px solid #E2E8F0'
                }, children: tabs.map(t => (_jsx("button", { onClick: () => setTab(t.id), style: {
                        background: tab === t.id ? '#FFFFFF' : 'transparent',
                        color: tab === t.id ? '#0F172A' : '#64748B',
                        border: 'none',
                        padding: '7px 18px',
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: tab === t.id ? 600 : 500,
                        cursor: 'pointer',
                        boxShadow: tab === t.id ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 0.15s ease',
                    }, children: t.label }, t.id))) }), loading ? (_jsx("div", { style: { padding: '60px 0', textAlign: 'center', color: '#64748B', fontSize: 14 }, children: "Cargando tus rutas..." })) : (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }, children: [rutasA_Mostrar.map(curso => (_jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: 24,
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            transition: 'all 0.2s ease',
                        }, onMouseEnter: e => {
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }, onMouseLeave: e => {
                            e.currentTarget.style.borderColor = '#E2E8F0';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }, children: [_jsx("div", { style: {
                                            width: 40,
                                            height: 40,
                                            borderRadius: 8,
                                            background: '#EFF6FF',
                                            border: '1px solid #DBEAFE',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 18,
                                            color: '#2563EB',
                                            flexShrink: 0
                                        }, children: curso.icono || (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), _jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })] })) }), _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }, children: curso.titulo })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8, marginTop: 'auto' }, children: [_jsxs("span", { style: { fontSize: 13, color: '#64748B' }, children: [curso.lecciones_completadas, "/", curso.lecciones_totales, " lecciones"] }), _jsxs("span", { style: { fontSize: 14, fontWeight: 700, color: '#0F172A' }, children: [curso.progreso_porcentaje, "%"] })] }), _jsx("div", { style: { width: '100%', height: 6, background: '#F1F5F9', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }, children: _jsx("div", { style: { width: `${curso.progreso_porcentaje}%`, height: '100%', background: '#2563EB', borderRadius: 3 } }) }), _jsx("button", { style: {
                                    background: '#F8FAFC',
                                    color: '#0F172A',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: 8,
                                    padding: '10px',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease',
                                    width: '100%',
                                    textAlign: 'center'
                                }, onClick: () => {
                                    if (onSelectRuta)
                                        onSelectRuta(curso.id);
                                    if (setActive)
                                        setActive('ruta_detalle');
                                }, onMouseEnter: e => {
                                    e.currentTarget.style.background = '#0F172A';
                                    e.currentTarget.style.color = '#FFFFFF';
                                    e.currentTarget.style.borderColor = '#0F172A';
                                }, onMouseLeave: e => {
                                    e.currentTarget.style.background = '#F8FAFC';
                                    e.currentTarget.style.color = '#0F172A';
                                    e.currentTarget.style.borderColor = '#E2E8F0';
                                }, children: "Continuar ruta" })] }, curso.id))), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '2px dashed #CBD5E1',
                            borderRadius: 12,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 28,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            minHeight: 200,
                        }, onClick: () => { if (setActive)
                            setActive('nueva_ruta_wizard'); }, onMouseEnter: e => {
                            e.currentTarget.style.borderColor = '#2563EB';
                            e.currentTarget.style.background = '#F8FAFC';
                        }, onMouseLeave: e => {
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.background = '#FFFFFF';
                        }, children: [_jsx("div", { style: {
                                    width: 44,
                                    height: 44,
                                    borderRadius: '50%',
                                    background: '#EFF6FF',
                                    color: '#2563EB',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 12
                                }, children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }) }), _jsx("h3", { style: { margin: 0, fontSize: 15, fontWeight: 600, color: '#0F172A' }, children: "Crear nueva ruta" }), _jsx("p", { style: { margin: '4px 0 0', fontSize: 12, color: '#64748B', textAlign: 'center' }, children: "Personalizada con Tutor IA" })] })] })), !loading && rutasA_Mostrar.length === 0 && (_jsxs("div", { style: {
                    padding: '48px 24px',
                    textAlign: 'center',
                    color: '#64748B',
                    background: '#FFFFFF',
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                    marginTop: 16
                }, children: [_jsx("p", { style: { margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#0F172A' }, children: "No tienes rutas en esta pesta\u00F1a" }), _jsx("p", { style: { margin: 0, fontSize: 13 }, children: "Crea una nueva ruta o explora tus cursos en las otras categor\u00EDas." })] }))] }));
}
