import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { auth } from '@adaptativemaster/shared';
export function ConfigPreferencias({ user, onBack, onUpdateUser }) {
    const [nivel, setNivel] = useState(user?.nivel || 'Intermedio');
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
                    background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: 0,
                    width: 'fit-content', fontWeight: 500
                }, children: "\u2190 Volver a Configuraci\u00F3n" }), _jsxs("div", { style: {
                    background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
                    padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }, children: [_jsxs("div", { children: [_jsx("h2", { style: { margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }, children: "Preferencias de estudio" }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: '14px' }, children: "Ajusta tu nivel y objetivos para personalizar el contenido del Tutor IA." })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("label", { style: { color: '#0F172A', fontSize: '13px', fontWeight: 600 }, children: "Nivel de dificultad preferido" }), _jsx("div", { style: { display: 'flex', gap: '10px' }, children: niveles.map(n => (_jsx("button", { onClick: () => setNivel(n), style: {
                                                flex: 1,
                                                padding: '10px 14px',
                                                borderRadius: '8px',
                                                border: `1.5px solid ${nivel === n ? '#2563EB' : '#E2E8F0'}`,
                                                background: nivel === n ? '#EFF6FF' : '#FFFFFF',
                                                color: nivel === n ? '#1D4ED8' : '#475569',
                                                fontWeight: nivel === n ? 600 : 500,
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                transition: 'all 0.15s ease'
                                            }, children: n }, n))) })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: [_jsx("label", { style: { color: '#0F172A', fontSize: '13px', fontWeight: 600 }, children: "Objetivos principales" }), _jsx("textarea", { rows: 3, value: objetivos, onChange: (e) => setObjetivos(e.target.value), placeholder: "Ej. Quiero aprender desarrollo web para crear mi propia startup...", style: {
                                            background: '#FFFFFF', border: '1px solid #CBD5E1',
                                            borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                                            outline: 'none', resize: 'vertical'
                                        } })] })] }), error && _jsx("div", { style: { color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }, children: error }), success && _jsx("div", { style: { color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }, children: "\u00A1Preferencias guardadas!" }), _jsx("button", { onClick: handleSave, disabled: loading, style: {
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
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: loading ? 'Guardando...' : 'Guardar preferencias' })] })] }));
}
