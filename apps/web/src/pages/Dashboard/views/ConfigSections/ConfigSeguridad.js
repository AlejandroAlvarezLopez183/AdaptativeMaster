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
            await new Promise(resolve => setTimeout(resolve, 800));
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
                    background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: 0,
                    width: 'fit-content', fontWeight: 500
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }, children: [_jsxs("div", { children: [_jsx("h2", { style: { margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }, children: "Seguridad" }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: '14px' }, children: "Actualiza tu contrase\u00F1a para mantener tu cuenta segura." })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: [_jsx("label", { style: { color: '#0F172A', fontSize: '13px', fontWeight: 600 }, children: "Contrase\u00F1a actual" }), _jsx("input", { type: "password", value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), style: {
                                            background: '#FFFFFF', border: '1px solid #CBD5E1',
                                            borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                                            outline: 'none'
                                        } })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: [_jsx("label", { style: { color: '#0F172A', fontSize: '13px', fontWeight: 600 }, children: "Nueva contrase\u00F1a" }), _jsx("input", { type: "password", value: newPassword, onChange: (e) => setNewPassword(e.target.value), style: {
                                            background: '#FFFFFF', border: '1px solid #CBD5E1',
                                            borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                                            outline: 'none'
                                        } })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: [_jsx("label", { style: { color: '#0F172A', fontSize: '13px', fontWeight: 600 }, children: "Confirmar nueva contrase\u00F1a" }), _jsx("input", { type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), style: {
                                            background: '#FFFFFF', border: '1px solid #CBD5E1',
                                            borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                                            outline: 'none'
                                        } })] })] }), error && _jsx("div", { style: { color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }, children: error }), success && _jsx("div", { style: { color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }, children: "\u00A1Contrase\u00F1a actualizada correctamente!" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
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
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: loading ? 'Actualizando...' : 'Actualizar contraseña' })] })] }));
}
