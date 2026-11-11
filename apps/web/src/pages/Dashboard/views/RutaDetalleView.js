import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { iaClient } from "@adaptativemaster/shared";
export function RutaDetalleView({ setActive, rutaId, onSelectLeccion }) {
    const [ruta, setRuta] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDetalle = async () => {
            const token = localStorage.getItem("token");
            if (token && rutaId) {
                try {
                    const data = await iaClient.getRutaDetalle(rutaId, token);
                    setRuta(data);
                }
                catch (error) {
                    console.error("Error al obtener detalle de la ruta", error);
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                setLoading(false);
            }
        };
        fetchDetalle();
    }, [rutaId]);
    if (loading) {
        return (_jsx("div", { style: { color: "#64748B", textAlign: "center", padding: "60px 0", fontSize: 14 }, children: "Cargando detalle de la ruta..." }));
    }
    if (!ruta) {
        return (_jsxs("div", { style: { textAlign: "center", padding: "60px 0" }, children: [_jsx("p", { style: { color: "#DC2626", margin: "0 0 12px", fontSize: 15 }, children: "No se encontr\u00F3 la ruta solicitada." }), _jsx("button", { onClick: () => setActive?.('aprendizaje'), style: { background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }, children: "Volver a mis rutas" })] }));
    }
    const renderStatusIcon = (estado) => {
        if (estado === 'completado') {
            return (_jsx("div", { style: { width: 28, height: 28, borderRadius: '50%', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }, children: _jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) }) }));
        }
        if (estado === 'actual') {
            return (_jsx("div", { style: { width: 28, height: 28, borderRadius: '50%', background: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }, children: _jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("polygon", { points: "5 3 19 12 5 21 5 3" }) }) }));
        }
        return (_jsx("div", { style: { width: 28, height: 28, borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }, children: _jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }), _jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })] }) }));
    };
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("button", { onClick: () => setActive?.('aprendizaje'), style: {
                    background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, padding: 0,
                    fontSize: 14, fontWeight: 500
                }, onMouseEnter: e => (e.currentTarget.style.color = '#0F172A'), onMouseLeave: e => (e.currentTarget.style.color = '#64748B'), children: [_jsx("span", { children: "\u2190" }), " Volver a mis rutas"] }), _jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '28px 32px',
                    marginBottom: 20,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }, children: [_jsx("span", { style: {
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
                            marginBottom: 12
                        }, children: "Ruta personalizada" }), _jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: "#0F172A", margin: "0 0 8px", letterSpacing: "-0.01em" }, children: ruta.titulo }), _jsx("p", { style: { color: "#64748B", margin: 0, fontSize: 14 }, children: ruta.objetivo })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }, children: [_jsxs("div", { style: { background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }, children: [_jsx("span", { style: { display: 'block', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }, children: "Nivel asignado" }), _jsx("span", { style: { fontSize: 16, color: '#0F172A', fontWeight: 700 }, children: ruta.nivel })] }), _jsxs("div", { style: { background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }, children: [_jsx("span", { style: { display: 'block', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, marginBottom: 6 }, children: "Total de lecciones" }), _jsxs("span", { style: { fontSize: 16, color: '#0F172A', fontWeight: 700 }, children: [ruta.temario?.length || 0, " m\u00F3dulos en el plan"] })] })] }), _jsxs("div", { style: { background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 14, padding: 28, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }, children: [_jsx("h3", { style: { margin: '0 0 16px', fontSize: 16, color: '#0F172A', fontWeight: 700 }, children: "M\u00F3dulos y lecciones" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: ruta.temario?.map((tema, idx) => (_jsxs("div", { onClick: () => {
                                if (tema.estado !== 'bloqueado' && onSelectLeccion) {
                                    onSelectLeccion(tema.id);
                                    if (setActive)
                                        setActive('leccion_duolingo');
                                }
                            }, style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '14px 16px',
                                borderRadius: 10,
                                background: tema.estado === 'actual' ? '#EFF6FF' : '#F8FAFC',
                                border: `1px solid ${tema.estado === 'actual' ? '#BFDBFE' : '#F1F5F9'}`,
                                cursor: tema.estado !== 'bloqueado' ? 'pointer' : 'default',
                                opacity: tema.estado === 'bloqueado' ? 0.6 : 1,
                                transition: 'all 0.15s ease'
                            }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 14 }, children: [renderStatusIcon(tema.estado), _jsx("div", { children: _jsxs("span", { style: {
                                                    fontSize: 14,
                                                    fontWeight: tema.estado === 'actual' ? 700 : 500,
                                                    color: tema.estado === 'actual' ? '#1D4ED8' : '#0F172A',
                                                    display: 'block'
                                                }, children: [idx + 1, ". ", tema.nombre] }) })] }), tema.estado === 'actual' && (_jsx("span", { style: { fontSize: 11, fontWeight: 700, color: '#1D4ED8', background: '#DBEAFE', padding: '3px 8px', borderRadius: 12 }, children: "En curso" }))] }, tema.id))) })] }), _jsx("button", { style: {
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 8,
                    padding: '13px 0',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)'
                }, onClick: () => {
                    const actual = ruta.temario?.find(t => t.estado === 'actual');
                    if (actual && onSelectLeccion) {
                        onSelectLeccion(actual.id);
                        if (setActive)
                            setActive('leccion_duolingo');
                    }
                    else {
                        if (setActive)
                            setActive('leccion_duolingo');
                    }
                }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: "Continuar con la lecci\u00F3n actual" })] }));
}
