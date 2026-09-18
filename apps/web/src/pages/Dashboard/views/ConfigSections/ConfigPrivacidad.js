import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { auth } from '@adaptativemaster/shared';
export function ConfigPrivacidad({ user, onBack, onUpdateUser }) {
    const prefs = user?.preferencias || {};
    const [perfilPublico, setPerfilPublico] = useState(prefs.perfilPublico ?? false);
    const [mostrarProgreso, setMostrarProgreso] = useState(prefs.mostrarProgreso ?? true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const token = localStorage.getItem('token');
            if (!token)
                throw new Error("No autenticado");
            const newPreferencias = {
                ...prefs,
                perfilPublico,
                mostrarProgreso
            };
            const updatedUser = await auth.updatePerfil({ preferencias: newPreferencias }, token);
            if (onUpdateUser)
                onUpdateUser(updatedUser);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
        catch (err) {
            setError(err.message || 'Error al actualizar');
        }
        finally {
            setLoading(false);
        }
    };
    const Toggle = ({ label, desc, checked, onChange }) => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(245,243,238,0.05)' }, children: [_jsxs("div", { children: [_jsx("div", { style: { color: '#F5F3EE', fontSize: '15px', fontWeight: 500 }, children: label }), _jsx("div", { style: { color: '#8FA8AA', fontSize: '13px', marginTop: '4px' }, children: desc })] }), _jsx("div", { onClick: () => onChange(!checked), style: {
                    width: '48px', height: '26px', borderRadius: '13px',
                    background: checked ? '#E8B94A' : 'rgba(15,42,46,0.8)',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.3s'
                }, children: _jsx("div", { style: {
                        position: 'absolute', top: '3px', left: checked ? '25px' : '3px',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: checked ? '#0F2A2E' : '#8FA8AA',
                        transition: 'left 0.3s, background 0.3s'
                    } }) })] }));
    return (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx("button", { onClick: onBack, style: {
                    background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', padding: 0,
                    width: 'fit-content', fontFamily: 'Inter, sans-serif'
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: '16px',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: { fontSize: '32px' }, children: "\uD83D\uDC41\uFE0F" }), _jsxs("div", { children: [_jsx("h2", { style: { margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }, children: "Privacidad" }), _jsx("p", { style: { margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }, children: "Controla qui\u00E9n puede ver tu actividad." })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx(Toggle, { label: "Perfil P\u00FAblico", desc: "Permite que otros estudiantes te encuentren y vean tu perfil.", checked: perfilPublico, onChange: setPerfilPublico }), _jsx(Toggle, { label: "Mostrar Progreso", desc: "Muestra tus logros y avance en las tablas de clasificaci\u00F3n.", checked: mostrarProgreso, onChange: setMostrarProgreso })] }), error && _jsx("div", { style: { color: '#F2637B', fontSize: '14px' }, children: error }), success && _jsx("div", { style: { color: '#4CAF50', fontSize: '14px' }, children: "\u00A1Privacidad actualizada!" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
                            background: '#E8B94A', color: '#0F2A2E', border: 'none', borderRadius: '8px',
                            padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
                            alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
                        }, children: loading ? 'Guardando...' : 'Guardar privacidad' })] })] }));
}
