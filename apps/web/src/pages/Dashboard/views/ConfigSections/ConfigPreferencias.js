import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { auth } from '@adaptativemaster/shared';
export function ConfigPreferencias({ user, onBack, onUpdateUser }) {
    const [nivel, setNivel] = useState(user?.nivel || '');
    const [objetivos, setObjetivos] = useState(user?.objetivos || '');
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
            const updatedUser = await auth.updatePerfil({ nivel, objetivos }, token);
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
    const niveles = ["Principiante", "Intermedio", "Avanzado"];
    return (_jsxs("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsx("button", { onClick: onBack, style: {
                    background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', padding: 0,
                    width: 'fit-content', fontFamily: 'Inter, sans-serif'
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: '16px',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: { fontSize: '32px' }, children: "\uD83C\uDFAF" }), _jsxs("div", { children: [_jsx("h2", { style: { margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }, children: "Preferencias de Estudio" }), _jsx("p", { style: { margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }, children: "Ajusta tu nivel y objetivos para personalizar el contenido." })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Nivel de experiencia" }), _jsx("div", { style: { display: 'flex', gap: '12px' }, children: niveles.map(n => (_jsx("button", { onClick: () => setNivel(n), style: {
                                                flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(245,243,238,0.1)',
                                                background: nivel === n ? 'rgba(232,185,74,0.15)' : 'rgba(15,42,46,0.6)',
                                                color: nivel === n ? '#E8B94A' : '#8FA8AA',
                                                cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.2s'
                                            }, children: n }, n))) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }, children: "Objetivo principal" }), _jsx("textarea", { value: objetivos, onChange: (e) => setObjetivos(e.target.value), placeholder: "Ej: Aprender React para encontrar mi primer empleo...", rows: 4, style: {
                                            background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                                            borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                                            outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical'
                                        } })] })] }), error && _jsx("div", { style: { color: '#F2637B', fontSize: '14px' }, children: error }), success && _jsx("div", { style: { color: '#4CAF50', fontSize: '14px' }, children: "\u00A1Preferencias de estudio guardadas!" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
                            background: '#E8B94A', color: '#0F2A2E', border: 'none', borderRadius: '8px',
                            padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
                            alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
                        }, children: loading ? 'Guardando...' : 'Guardar preferencias' })] })] }));
}
