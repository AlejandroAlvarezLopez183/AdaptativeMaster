import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { iaClient } from "@adaptativemaster/shared";
export function InicioView({ user, setActive, onSelectRuta }) {
    const nombre = user?.nombre?.split(' ')[0] || "Usuario";
    const [rutas, setRutas] = useState(null);
    const hora = new Date().getHours();
    const saludo = hora < 12 ? "Buenos días" : hora < 19 ? "Buenas tardes" : "Buenas noches";
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
            }
        };
        fetchRutas();
    }, []);
    const rutaPrincipal = rutas?.en_curso?.[0];
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '900px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }, children: [_jsxs("div", { style: { marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }, children: [_jsxs("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, fontWeight: 700, color: "#F5F3EE", margin: 0 }, children: [saludo, ", ", nombre] }), _jsx("span", { style: { fontSize: 32, display: 'inline-block' }, children: "\uD83D\uDC4B" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }, children: [rutaPrincipal && (_jsxs("div", { style: {
                            background: 'linear-gradient(145deg, rgba(23,60,62,0.8) 0%, rgba(15,42,46,0.9) 100%)',
                            border: '1px solid rgba(232,185,74,0.15)',
                            borderRadius: 20,
                            padding: 32,
                            gridColumn: '1 / -1',
                            position: 'relative',
                            overflow: 'hidden'
                        }, children: [_jsx("div", { style: { position: 'absolute', top: -150, right: -100, width: 350, height: 350, background: 'radial-gradient(circle, rgba(232,185,74,0.1) 0%, transparent 70%)', borderRadius: '50%' } }), _jsx("h2", { style: { fontSize: 13, color: '#E8B94A', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }, children: "Contin\u00FAa con tu aprendizaje" }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12, position: 'relative' }, children: [_jsx("h3", { style: { fontSize: 28, fontWeight: 700, color: '#F5F3EE', margin: 0 }, children: rutaPrincipal.titulo }), _jsxs("span", { style: { fontSize: 20, fontWeight: 600, color: '#E8B94A' }, children: [rutaPrincipal.progreso_porcentaje, "%"] })] }), _jsx("div", { style: { width: '100%', height: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: 24, position: 'relative' }, children: _jsx("div", { style: { width: `${rutaPrincipal.progreso_porcentaje}%`, height: '100%', background: 'linear-gradient(90deg, #C49A33, #E8B94A)', borderRadius: 4 } }) }), _jsx("button", { style: {
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
                                }, onClick: () => {
                                    if (onSelectRuta && rutaPrincipal?.id)
                                        onSelectRuta(rutaPrincipal.id);
                                    if (setActive)
                                        setActive('ruta_detalle');
                                }, onMouseEnter: e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,185,74,0.3)'; }, onMouseLeave: e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(232,185,74,0.2)'; }, children: "Continuar" })] })), _jsx("div", { style: { background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 20, padding: 32 }, children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 24 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("div", { style: { width: 48, height: 48, borderRadius: 12, background: 'rgba(242,99,123,0.1)', color: '#F2637B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }, children: "\uD83D\uDD25" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx("span", { style: { fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em' }, children: "Racha actual" }), _jsx("span", { style: { fontSize: 18, color: '#F5F3EE', fontWeight: 600 }, children: "Cargando..." })] })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("div", { style: { width: 48, height: 48, borderRadius: 12, background: 'rgba(69,200,147,0.1)', color: '#45C893', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }, children: "\uD83D\uDCDA" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx("span", { style: { fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em' }, children: "Progreso" }), _jsx("span", { style: { fontSize: 18, color: '#F5F3EE', fontWeight: 600 }, children: "-" })] })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("div", { style: { width: 48, height: 48, borderRadius: 12, background: 'rgba(232,185,74,0.1)', color: '#E8B94A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }, children: "\uD83C\uDFAF" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx("span", { style: { fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.04em' }, children: "Rutas" }), _jsxs("span", { style: { fontSize: 18, color: '#F5F3EE', fontWeight: 600 }, children: [rutas?.en_curso?.length || 0, " en curso"] })] })] })] }) }), _jsxs("div", { style: { background: 'rgba(69,200,147,0.05)', border: '1px solid rgba(69,200,147,0.2)', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }, children: [_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }, children: [_jsx("span", { style: { fontSize: 26 }, children: "\uD83D\uDC65" }), _jsx("h3", { style: { margin: 0, fontSize: 18, color: '#F5F3EE', fontWeight: 600 }, children: "Tu sesi\u00F3n de hoy" })] }), _jsxs("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 15, lineHeight: 1.6 }, children: ["Tienes ", _jsx("strong", { style: { color: '#45C893', fontWeight: 600 }, children: "0 compa\u00F1eros" }), " disponibles ahora mismo para estudiar en grupo y resolver dudas juntos."] })] }), _jsx("button", { style: {
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
                                }, onMouseEnter: e => { e.currentTarget.style.background = 'rgba(69,200,147,0.1)'; e.currentTarget.style.borderColor = '#45C893'; }, onMouseLeave: e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(69,200,147,0.4)'; }, children: "Pr\u00F3ximamente" })] })] })] }));
}
