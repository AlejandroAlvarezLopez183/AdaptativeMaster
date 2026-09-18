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
        { id: "cuenta", label: "Cuenta", icon: "👤", action: () => setActiveSection("cuenta") },
        { id: "notificaciones", label: "Notificaciones", icon: "🔔", action: () => setActiveSection("notificaciones") },
        { id: "privacidad", label: "Privacidad", icon: "👁️", action: () => setActiveSection("privacidad") },
        { id: "preferencias", label: "Preferencias de estudio", icon: "🎯", action: () => setActiveSection("preferencias") },
        { id: "idioma", label: "Idioma", icon: "🌐", action: () => setActiveSection("idioma") },
        { id: "seguridad", label: "Seguridad", icon: "🔒", action: () => setActiveSection("seguridad") },
        { id: "logout", label: "Cerrar sesión", icon: "🚪", action: onLogout, danger: true },
    ];
    if (activeSection) {
        const commonProps = {
            user,
            onBack: () => setActiveSection(null),
            onUpdateUser
        };
        return (_jsxs("div", { style: { maxWidth: '800px', width: '100%', margin: '0 auto' }, children: [activeSection === "cuenta" && _jsx(ConfigCuenta, { ...commonProps }), activeSection === "notificaciones" && _jsx(ConfigNotificaciones, { ...commonProps }), activeSection === "privacidad" && _jsx(ConfigPrivacidad, { ...commonProps }), activeSection === "preferencias" && _jsx(ConfigPreferencias, { ...commonProps }), activeSection === "idioma" && _jsx(ConfigIdioma, { ...commonProps }), activeSection === "seguridad" && _jsx(ConfigSeguridad, { onBack: commonProps.onBack })] }));
    }
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '800px', width: '100%', margin: '0 auto' }, children: [_jsx("h1", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 10px" }, children: "Configuraci\u00F3n" }), _jsx("p", { style: { color: "#8FA8AA", margin: '0 0 40px', fontSize: 15 }, children: "Ajusta tus preferencias y gestiona tu cuenta." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }, children: opciones.map((opc) => (_jsxs("div", { onClick: opc.action, style: {
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
                        e.currentTarget.style.background = opc.danger ? 'rgba(242,99,123,0.15)' : 'rgba(23,60,62,0.7)';
                        e.currentTarget.style.borderColor = opc.danger ? 'rgba(242,99,123,0.4)' : 'rgba(232,185,74,0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }, onMouseLeave: e => {
                        e.currentTarget.style.background = 'rgba(23,60,62,0.4)';
                        e.currentTarget.style.borderColor = 'rgba(245,243,238,0.06)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }, children: [_jsx("div", { style: { fontSize: '24px' }, children: opc.icon }), _jsx("span", { style: {
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '15px',
                                fontWeight: 600,
                                color: opc.danger ? '#F2637B' : '#F5F3EE'
                            }, children: opc.label })] }, opc.id))) })] }));
}
