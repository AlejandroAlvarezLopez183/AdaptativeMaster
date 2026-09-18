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
        { id: "completado", label: "Completado" },
        { id: "guardado", label: "Guardado" },
    ];
    const rutasA_Mostrar = rutas?.[tab] || [];
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '840px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }, children: [_jsxs("div", { style: { marginBottom: 32 }, children: [_jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 24px" }, children: "Mi aprendizaje" }), _jsx("div", { style: { display: 'flex', gap: 12, borderBottom: '1px solid rgba(245,243,238,0.06)', paddingBottom: 16 }, children: tabs.map(t => (_jsx("button", { onClick: () => setTab(t.id), style: {
                                background: tab === t.id ? 'rgba(232,185,74,0.15)' : 'transparent',
                                color: tab === t.id ? '#E8B94A' : '#8FA8AA',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: 20,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }, onMouseEnter: e => { if (tab !== t.id)
                                e.currentTarget.style.color = '#F5F3EE'; }, onMouseLeave: e => { if (tab !== t.id)
                                e.currentTarget.style.color = '#8FA8AA'; }, children: t.label }, t.id))) })] }), loading ? (_jsx("div", { style: { color: '#E8B94A' }, children: "Cargando tus rutas..." })) : (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }, children: [rutasA_Mostrar.map(curso => (_jsxs("div", { style: {
                            background: 'rgba(23,60,62,0.4)',
                            border: '1px solid rgba(245,243,238,0.06)',
                            borderRadius: 20,
                            padding: 28,
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            transition: 'transform 0.2s, border-color 0.2s',
                        }, onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; }, onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)'; }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }, children: [_jsx("div", { style: { width: 44, height: 44, borderRadius: 12, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }, children: curso.icono || "🧠" }), _jsx("h3", { style: { margin: 0, fontSize: 20, fontWeight: 700, color: '#F5F3EE' }, children: curso.titulo })] }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }, children: [_jsxs("span", { style: { fontSize: 13, color: '#8FA8AA' }, children: [curso.lecciones_completadas, "/", curso.lecciones_totales, " lecciones"] }), _jsxs("span", { style: { fontSize: 18, fontWeight: 700, color: '#E8B94A' }, children: [curso.progreso_porcentaje, "%"] })] }), _jsx("div", { style: { width: '100%', height: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }, children: _jsx("div", { style: { width: `${curso.progreso_porcentaje}%`, height: '100%', background: 'linear-gradient(90deg, #C49A33, #E8B94A)', borderRadius: 4 } }) }), _jsx("button", { style: {
                                    background: 'transparent',
                                    color: '#E8B94A',
                                    border: '1px solid rgba(232,185,74,0.4)',
                                    borderRadius: 10,
                                    padding: '12px',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    width: '100%',
                                    textAlign: 'center'
                                }, onClick: () => {
                                    if (onSelectRuta)
                                        onSelectRuta(curso.id);
                                    if (setActive)
                                        setActive('ruta_detalle');
                                }, onMouseEnter: e => { e.currentTarget.style.background = 'rgba(232,185,74,0.1)'; }, onMouseLeave: e => { e.currentTarget.style.background = 'transparent'; }, children: "Continuar" })] }, curso.id))), rutasA_Mostrar.length === 0 && (_jsx("div", { style: { gridColumn: '1 / -1', padding: '40px 0', textAlign: 'center', color: '#8FA8AA' }, children: "No tienes rutas en esta secci\u00F3n." })), _jsxs("div", { style: {
                            background: 'rgba(0,0,0,0.15)',
                            border: '1px dashed rgba(245,243,238,0.2)',
                            borderRadius: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 28,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            minHeight: 220,
                        }, onClick: () => { if (setActive)
                            setActive('nueva_ruta_wizard'); }, onMouseEnter: e => { e.currentTarget.style.background = 'rgba(232,185,74,0.05)'; e.currentTarget.style.borderColor = 'rgba(232,185,74,0.4)'; }, onMouseLeave: e => { e.currentTarget.style.background = 'rgba(0,0,0,0.15)'; e.currentTarget.style.borderColor = 'rgba(245,243,238,0.2)'; }, children: [_jsx("div", { style: { width: 56, height: 56, borderRadius: '50%', background: 'rgba(232,185,74,0.15)', color: '#E8B94A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }, children: "+" }), _jsx("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600, color: '#F5F3EE' }, children: "Crear nueva ruta" }), _jsx("p", { style: { margin: '8px 0 0', fontSize: 13, color: '#8FA8AA', textAlign: 'center' }, children: "Con ayuda de la IA" })] })] }))] }));
}
