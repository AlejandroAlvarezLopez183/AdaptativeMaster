import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function ConfigSeguridad({ onBack }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const handleSave = async () => {
        if (newPassword !== confirmPassword) {
            setError("Las contraseñas nuevas no coinciden");
            return;
        }
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            // Simulación de actualización de contraseña
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setSuccess(false), 3000);
        }
        catch (err) {
            setError('Error al actualizar la contraseña');
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
                    background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: '16px',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: { fontSize: '32px' }, children: "\uD83D\uDD12" }), _jsxs("div", { children: [_jsx("h2", { style: { margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }, children: "Seguridad" }), _jsx("p", { style: { margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }, children: "Actualiza tu contrase\u00F1a para mantener tu cuenta segura." })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Contrase\u00F1a actual" }), _jsx("input", { type: "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), style: {
                                            background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                                            borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                                            outline: 'none', fontFamily: 'Inter, sans-serif'
                                        } })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Nueva contrase\u00F1a" }), _jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), style: {
                                            background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                                            borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                                            outline: 'none', fontFamily: 'Inter, sans-serif'
                                        } })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Confirmar nueva contrase\u00F1a" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), style: {
                                            background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                                            borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                                            outline: 'none', fontFamily: 'Inter, sans-serif'
                                        } })] })] }), error && _jsx("div", { style: { color: '#F2637B', fontSize: '14px' }, children: error }), success && _jsx("div", { style: { color: '#4CAF50', fontSize: '14px' }, children: "\u00A1Contrase\u00F1a actualizada con \u00E9xito!" }), _jsx("button", { onClick: handleSave, disabled: loading || !currentPassword || !newPassword, style: {
                            background: '#E8B94A', color: '#0F2A2E', border: 'none', borderRadius: '8px',
                            padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: (loading || !currentPassword || !newPassword) ? 'not-allowed' : 'pointer',
                            alignSelf: 'flex-start', opacity: (loading || !currentPassword || !newPassword) ? 0.5 : 1, transition: 'opacity 0.2s'
                        }, children: loading ? 'Guardando...' : 'Cambiar contraseña' })] })] }));
}
