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
    const Toggle = ({ label, desc, checked, onChange }) => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }, children: [_jsxs("div", { children: [_jsx("div", { style: { color: '#0F172A', fontSize: '14px', fontWeight: 600 }, children: label }), _jsx("div", { style: { color: '#64748B', fontSize: '13px', marginTop: '2px' }, children: desc })] }), _jsx("div", { onClick: () => onChange(!checked), style: {
                    width: '44px', height: '24px', borderRadius: '12px',
                    background: checked ? '#2563EB' : '#CBD5E1',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease',
                    flexShrink: 0
                }, children: _jsx("div", { style: {
                        width: '20px', height: '20px', borderRadius: '50%', background: '#FFFFFF',
                        position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
                        transition: 'left 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    } }) })] }));
    return (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx("button", { onClick: onBack, style: {
                    background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: 0,
                    width: 'fit-content', fontWeight: 500
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }, children: [_jsxs("div", { children: [_jsx("h2", { style: { margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }, children: "Privacidad" }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: '14px' }, children: "Controla la visibilidad p\u00FAblica de tu perfil." })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column' }, children: [_jsx(Toggle, { label: "Perfil p\u00FAblico", desc: "Permite que otros estudiantes encuentren tu perfil y vean tus intereses.", checked: perfilPublico, onChange: setPerfilPublico }), _jsx(Toggle, { label: "Mostrar progreso y logros", desc: "Tus estad\u00EDsticas y racha ser\u00E1n visibles en salas de estudio grupales.", checked: mostrarProgreso, onChange: setMostrarProgreso })] }), error && _jsx("div", { style: { color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }, children: error }), success && _jsx("div", { style: { color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }, children: "\u00A1Privacidad actualizada!" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
                            background: '#0F172A',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: loading ? 'wait' : 'pointer',
                            alignSelf: 'flex-start',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.15s ease'
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: loading ? 'Guardando...' : 'Guardar cambios' })] })] }));
}
