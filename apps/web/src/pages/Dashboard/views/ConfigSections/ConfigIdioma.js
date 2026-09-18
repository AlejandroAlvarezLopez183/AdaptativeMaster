import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { auth } from '@adaptativemaster/shared';
export function ConfigIdioma({ user, onBack, onUpdateUser }) {
    const prefs = user?.preferencias || {};
    const [idioma, setIdioma] = useState(prefs.idioma || 'es');
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
                idioma
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
    const idiomas = [
        { code: 'es', label: 'Español' },
        { code: 'en', label: 'English' },
        { code: 'pt', label: 'Português' },
        { code: 'fr', label: 'Français' },
    ];
    return (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx("button", { onClick: onBack, style: {
                    background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', padding: 0,
                    width: 'fit-content', fontFamily: 'Inter, sans-serif'
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: '16px',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: { fontSize: '32px' }, children: "\uD83C\uDF10" }), _jsxs("div", { children: [_jsx("h2", { style: { margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }, children: "Idioma" }), _jsx("p", { style: { margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }, children: "Selecciona tu idioma preferido para la interfaz." })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }, children: idiomas.map(i => (_jsx("div", { onClick: () => setIdioma(i.code), style: {
                                padding: '16px', borderRadius: '12px', border: '1px solid',
                                borderColor: idioma === i.code ? 'rgba(232,185,74,0.4)' : 'rgba(245,243,238,0.1)',
                                background: idioma === i.code ? 'rgba(232,185,74,0.1)' : 'rgba(15,42,46,0.4)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s ease', color: idioma === i.code ? '#E8B94A' : '#F5F3EE',
                                fontWeight: 500
                            }, children: i.label }, i.code))) }), error && _jsx("div", { style: { color: '#F2637B', fontSize: '14px' }, children: error }), success && _jsx("div", { style: { color: '#4CAF50', fontSize: '14px' }, children: "\u00A1Idioma actualizado! (Nota: la traducci\u00F3n total estar\u00E1 disponible pronto)" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
                            background: '#E8B94A', color: '#0F2A2E', border: 'none', borderRadius: '8px',
                            padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
                            alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
                        }, children: loading ? 'Guardando...' : 'Guardar idioma' })] })] }));
}
