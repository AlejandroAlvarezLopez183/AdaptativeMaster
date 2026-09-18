import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { progresoClient } from "@adaptativemaster/shared";
export function ProgresoView() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchProgreso = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No hay sesión activa");
                setLoading(false);
                return;
            }
            try {
                const res = await progresoClient.getResumen(token);
                setData(res);
            }
            catch (err) {
                setError(err.message || "Error al cargar progreso");
            }
            finally {
                setLoading(false);
            }
        };
        fetchProgreso();
    }, []);
    if (loading) {
        return _jsx("div", { style: { color: "#E8B94A", textAlign: "center", marginTop: "40px" }, children: "Cargando tu progreso..." });
    }
    if (error) {
        return _jsx("div", { style: { color: "#F2637B", textAlign: "center", marginTop: "40px" }, children: error });
    }
    const rachaActual = data?.racha?.dias_actuales || 0;
    const xpTotal = data?.xp_total || 0;
    const leccionesCompletadas = data?.ultimos_xp?.filter(x => x.motivo.includes("Lección")).length || 0;
    const stats = [
        { label: "Racha actual", value: `${rachaActual} días`, icon: "🔥", color: "#F2637B" },
        { label: "Total XP", value: `${xpTotal} XP`, icon: "✨", color: "#E8B94A" },
        { label: "Lecciones", value: `${leccionesCompletadas}`, icon: "📚", color: "#45C893" },
    ];
    const habilidades = data?.habilidades || [];
    const semana = data?.actividad_semana || [];
    const reforzar = data?.conceptos_reforzar || [];
    const progresoRuta = data?.progreso_ruta || 0;
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '840px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }, children: [_jsxs("div", { style: { marginBottom: 32 }, children: [_jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 8px" }, children: "Mi progreso" }), _jsx("p", { style: { color: "#8FA8AA", margin: 0, fontSize: 15 }, children: "Haz un seguimiento de tus objetivos y habilidades." })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }, children: [_jsxs("div", { style: { background: 'rgba(23,60,62,0.6)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gridColumn: '1 / -1' }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }, children: [_jsx("span", { style: { fontSize: 14, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Progreso de la ruta" }), _jsxs("span", { style: { fontSize: 32, fontWeight: 800, color: '#E8B94A', lineHeight: 1 }, children: [progresoRuta, "%"] })] }), _jsx("div", { style: { width: '100%', height: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 8, overflow: 'hidden' }, children: _jsx("div", { style: { width: `${progresoRuta}%`, height: '100%', background: 'linear-gradient(90deg, #C49A33, #E8B94A)', borderRadius: 8 } }) })] }), stats.map((stat, idx) => (_jsxs("div", { style: { background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }, children: [_jsx("div", { style: { width: 48, height: 48, borderRadius: 12, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }, children: stat.icon }), _jsxs("div", { children: [_jsx("p", { style: { margin: '0 0 4px', fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.02em' }, children: stat.label }), _jsx("p", { style: { margin: 0, fontSize: 18, fontWeight: 700, color: '#F5F3EE' }, children: stat.value })] })] }, idx)))] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }, children: [_jsxs("div", { style: { background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }, children: [_jsx("h3", { style: { margin: '0 0 20px', fontSize: 15, color: '#F5F3EE', fontWeight: 600 }, children: "Habilidades" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: habilidades.map(hab => (_jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6 }, children: [_jsx("span", { style: { fontSize: 14, color: '#8FA8AA', fontWeight: 500 }, children: hab.nombre }), _jsxs("span", { style: { fontSize: 14, color: '#F5F3EE', fontWeight: 600 }, children: [hab.porcentaje, "%"] })] }), _jsx("div", { style: { width: '100%', height: 6, background: 'rgba(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden' }, children: _jsx("div", { style: { width: `${hab.porcentaje}%`, height: '100%', background: '#45C893', borderRadius: 4 } }) })] }, hab.nombre))) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 24 }, children: [_jsxs("div", { style: { background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }, children: [_jsx("h3", { style: { margin: '0 0 20px', fontSize: 15, color: '#F5F3EE', fontWeight: 600 }, children: "Esta semana" }), _jsx("div", { style: { display: 'flex', justifyContent: 'space-between' }, children: semana.map((dia, idx) => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }, children: [_jsx("span", { style: { fontSize: 12, color: '#8FA8AA', fontWeight: 600 }, children: dia.dia }), _jsx("div", { style: {
                                                        width: 28,
                                                        height: 28,
                                                        borderRadius: '50%',
                                                        background: dia.completado ? 'rgba(232,185,74,0.15)' : 'rgba(0,0,0,0.2)',
                                                        border: `1px solid ${dia.completado ? '#E8B94A' : 'rgba(245,243,238,0.06)'}`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: dia.completado ? '#E8B94A' : 'transparent',
                                                        fontSize: 14
                                                    }, children: dia.completado && '✓' })] }, idx))) })] }), _jsxs("div", { style: { background: 'rgba(242,99,123,0.05)', border: '1px solid rgba(242,99,123,0.2)', borderRadius: 16, padding: 24 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }, children: [_jsx("span", { style: { fontSize: 20 }, children: "\uD83D\uDCA1" }), _jsx("h3", { style: { margin: 0, fontSize: 15, color: '#F2637B', fontWeight: 600 }, children: "Conceptos que debes reforzar" })] }), _jsx("ul", { style: { margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10, color: '#F5F3EE' }, children: reforzar.map((item, idx) => (_jsx("li", { style: { fontSize: 14, fontWeight: 500 }, children: item }, idx))) })] })] })] })] }));
}
