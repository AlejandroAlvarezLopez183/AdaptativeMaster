import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AyudaView() {
    const opciones = [
        { label: "Preguntas frecuentes", icon: "💬" },
        { label: "Reportar problema", icon: "⚠️" },
        { label: "Seguridad", icon: "🔒" },
        { label: "Privacidad", icon: "👁️" },
        { label: "Contacto", icon: "✉️" },
    ];
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '800px', width: '100%', margin: '0 auto' }, children: [_jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 10px" }, children: "Centro de ayuda" }), _jsx("p", { style: { color: "#8FA8AA", margin: '0 0 40px', fontSize: 15 }, children: "\u00BFEn qu\u00E9 podemos ayudarte hoy? Selecciona una de las opciones." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }, children: opciones.map((opc, idx) => (_jsxs("div", { style: {
                        background: 'rgba(23,60,62,0.4)',
                        border: '1px solid rgba(245,243,238,0.06)',
                        borderRadius: '16px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                    }, onMouseEnter: e => {
                        e.currentTarget.style.background = 'rgba(23,60,62,0.7)';
                        e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }, onMouseLeave: e => {
                        e.currentTarget.style.background = 'rgba(23,60,62,0.4)';
                        e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }, children: [_jsx("div", { style: { fontSize: '24px' }, children: opc.icon }), _jsx("span", { style: { fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: '#F5F3EE' }, children: opc.label })] }, idx))) })] }));
}
