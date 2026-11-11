import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AyudaView() {
    const opciones = [
        {
            label: "Preguntas frecuentes",
            desc: "Respuestas a dudas comunes sobre rutas, lecciones y progreso.",
            icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }), _jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })] }))
        },
        {
            label: "Reportar un problema",
            desc: "Envíanos detalles si encontraste un error en una lección o evaluación.",
            icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#D97706", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }), _jsx("line", { x1: "4", y1: "22", x2: "4", y2: "15" })] }))
        },
        {
            label: "Seguridad y accesos",
            desc: "Información sobre cómo protegemos tu cuenta y credenciales.",
            icon: (_jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#059669", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) }))
        },
        {
            label: "Privacidad de datos",
            desc: "Conoce el tratamiento de tus datos y preferencias de privacidad.",
            icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#4F46E5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }), _jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })] }))
        },
        {
            label: "Contacto y soporte",
            desc: "Habla con nuestro equipo de asistencia técnica o sugerencias.",
            icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#0F172A", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }), _jsx("polyline", { points: "22,6 12,13 2,6" })] }))
        },
    ];
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '900px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: { marginBottom: 28 }, children: [_jsx("h1", { style: { fontSize: 26, fontWeight: 700, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.01em" }, children: "Centro de ayuda" }), _jsx("p", { style: { color: "#64748B", margin: 0, fontSize: 14 }, children: "\u00BFEn qu\u00E9 podemos orientarte hoy? Selecciona una categor\u00EDa de asistencia." })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }, children: opciones.map((opc, idx) => (_jsxs("div", { style: {
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: 12,
                        padding: 24,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }, onMouseEnter: e => {
                        e.currentTarget.style.borderColor = '#CBD5E1';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }, onMouseLeave: e => {
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }, children: [_jsx("div", { style: {
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                background: '#F8FAFC',
                                border: '1px solid #E2E8F0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }, children: opc.icon }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: 15, fontWeight: 600, color: '#0F172A', margin: '0 0 4px' }, children: opc.label }), _jsx("p", { style: { fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.5 }, children: opc.desc })] })] }, idx))) })] }));
}
