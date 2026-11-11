import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
// Importar subcomponentes
import { ConfigCuenta } from "./ConfigSections/ConfigCuenta";
import { ConfigNotificaciones } from "./ConfigSections/ConfigNotificaciones";
import { ConfigPrivacidad } from "./ConfigSections/ConfigPrivacidad";
import { ConfigPreferencias } from "./ConfigSections/ConfigPreferencias";
import { ConfigIdioma } from "./ConfigSections/ConfigIdioma";
import { ConfigSeguridad } from "./ConfigSections/ConfigSeguridad";
export function ConfigView({ onLogout, user, onUpdateUser }) {
    const [activeSection, setActiveSection] = useState(null);
    const opciones = [
        {
            id: "cuenta",
            label: "Cuenta",
            desc: "Información personal y nombre visible",
            icon: (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "12", cy: "7", r: "4" })] })),
            action: () => setActiveSection("cuenta")
        },
        {
            id: "notificaciones",
            label: "Notificaciones",
            desc: "Avisos de rachas, correos y recordatorios",
            icon: (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#4F46E5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), _jsx("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })] })),
            action: () => setActiveSection("notificaciones")
        },
        {
            id: "privacidad",
            label: "Privacidad",
            desc: "Visibilidad de tu perfil y actividad pública",
            icon: (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#059669", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }), _jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })] })),
            action: () => setActiveSection("privacidad")
        },
        {
            id: "preferencias",
            label: "Preferencias de estudio",
            desc: "Ritmo de aprendizaje y estilo de evaluaciones",
            icon: (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#D97706", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" }) })),
            action: () => setActiveSection("preferencias")
        },
        {
            id: "idioma",
            label: "Idioma",
            desc: "Español (predeterminado)",
            icon: (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#0284C7", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }), _jsx("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })] })),
            action: () => setActiveSection("idioma")
        },
        {
            id: "seguridad",
            label: "Seguridad",
            desc: "Cambio de contraseña y credenciales",
            icon: (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#475569", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) })),
            action: () => setActiveSection("seguridad")
        },
        {
            id: "logout",
            label: "Cerrar sesión",
            desc: "Finalizar la sesión en este dispositivo",
            icon: (_jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#DC2626", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), _jsx("polyline", { points: "16 17 21 12 16 7" }), _jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })] })),
            action: onLogout,
            danger: true
        },
    ];
    if (activeSection) {
        const commonProps = {
            user,
            onBack: () => setActiveSection(null),
            onUpdateUser
        };
        return (_jsxs("div", { style: { maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [activeSection === "cuenta" && _jsx(ConfigCuenta, { ...commonProps }), activeSection === "notificaciones" && _jsx(ConfigNotificaciones, { ...commonProps }), activeSection === "privacidad" && _jsx(ConfigPrivacidad, { ...commonProps }), activeSection === "preferencias" && _jsx(ConfigPreferencias, { ...commonProps }), activeSection === "idioma" && _jsx(ConfigIdioma, { ...commonProps }), activeSection === "seguridad" && _jsx(ConfigSeguridad, { onBack: commonProps.onBack })] }));
    }
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '900px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: { marginBottom: 28 }, children: [_jsx("h1", { style: { fontSize: 26, fontWeight: 700, color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.01em" }, children: "Configuraci\u00F3n" }), _jsx("p", { style: { color: "#64748B", margin: 0, fontSize: 14 }, children: "Ajusta tus preferencias de estudio, privacidad y credenciales de acceso." })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }, children: opciones.map((opc) => (_jsxs("div", { onClick: opc.action, style: {
                        background: '#FFFFFF',
                        border: `1px solid ${opc.danger ? '#FEE2E2' : '#E2E8F0'}`,
                        borderRadius: 12,
                        padding: 24,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }, onMouseEnter: e => {
                        if (opc.danger) {
                            e.currentTarget.style.background = '#FEF2F2';
                            e.currentTarget.style.borderColor = '#FCA5A5';
                        }
                        else {
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }, onMouseLeave: e => {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.borderColor = opc.danger ? '#FEE2E2' : '#E2E8F0';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }, children: [_jsx("div", { style: {
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                background: opc.danger ? '#FEE2E2' : '#F8FAFC',
                                border: `1px solid ${opc.danger ? '#FECACA' : '#E2E8F0'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }, children: opc.icon }), _jsxs("div", { children: [_jsx("span", { style: {
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        color: opc.danger ? '#DC2626' : '#0F172A',
                                        display: 'block',
                                        marginBottom: 4
                                    }, children: opc.label }), _jsx("p", { style: { margin: 0, fontSize: 13, color: '#64748B', lineHeight: 1.4 }, children: opc.desc })] })] }, opc.id))) })] }));
}
