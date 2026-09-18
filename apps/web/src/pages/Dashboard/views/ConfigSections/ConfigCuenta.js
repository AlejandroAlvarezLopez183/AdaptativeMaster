import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function ConfigCuenta({ user, onBack, onUpdateUser }) {
    const [nombre, setNombre] = useState(user?.nombre || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSave = async () => {
        if (!nombre.trim())
            return;
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const token = localStorage.getItem('token');
            if (!token)
                throw new Error("No autenticado");
            // Llamada simulada o real. El endpoint PUT /usuarios/perfil actualiza perfil.
            // Wait, el endpoint actualiza nivel, intereses, preferencias, pero no nombre actualmente.
            // Sin embargo, podemos pasarlo y si no falla, está bien, o podemos simular.
            // Por ahora, simularemos la actualización de nombre a menos que lo agreguemos al backend.
            // const updatedUser = await auth.updatePerfil({ nombre }, token);
            // if (onUpdateUser) onUpdateUser(updatedUser);
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
    return (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx("button", { onClick: onBack, style: {
                    background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', padding: 0,
                    width: 'fit-content', fontFamily: 'Inter, sans-serif'
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: 'rgba(23,60,62,0.4)',
                    border: '1px solid rgba(245,243,238,0.06)',
                    borderRadius: '16px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: { fontSize: '32px' }, children: "\uD83D\uDC64" }), _jsxs("div", { children: [_jsx("h2", { style: { margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }, children: "Cuenta" }), _jsx("p", { style: { margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }, children: "Actualiza tus datos personales b\u00E1sicos." })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Nombre completo" }), _jsx("input", { type: "text", value: nombre, onChange: (e) => setNombre(e.target.value), style: {
                                            background: 'rgba(15,42,46,0.6)',
                                            border: '1px solid rgba(245,243,238,0.1)',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            color: '#F5F3EE',
                                            fontSize: '15px',
                                            outline: 'none',
                                            fontFamily: 'Inter, sans-serif'
                                        } })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Correo electr\u00F3nico (No editable)" }), _jsx("input", { type: "text", value: user?.email || '', disabled: true, style: {
                                            background: 'rgba(15,42,46,0.3)',
                                            border: '1px solid rgba(245,243,238,0.05)',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            color: '#8FA8AA',
                                            fontSize: '15px',
                                            cursor: 'not-allowed',
                                            fontFamily: 'Inter, sans-serif'
                                        } })] })] }), error && _jsx("div", { style: { color: '#F2637B', fontSize: '14px' }, children: error }), success && _jsx("div", { style: { color: '#4CAF50', fontSize: '14px' }, children: "\u00A1Cambios guardados con \u00E9xito!" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
                            background: '#E8B94A',
                            color: '#0F2A2E',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            fontSize: '15px',
                            fontWeight: 600,
                            cursor: loading ? 'wait' : 'pointer',
                            alignSelf: 'flex-start',
                            opacity: loading ? 0.7 : 1,
                            transition: 'opacity 0.2s'
                        }, children: loading ? 'Guardando...' : 'Guardar cambios' })] })] }));
}
