import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '@adaptativemaster/shared';
export default function Register() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await auth.register(nombre, email, password);
            // Redirigir al login para que entre
            navigate('/login');
        }
        catch (err) {
            setError(err.message || 'Error al crear la cuenta');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "auth-container", style: { fontFamily: "'Open Sans', system-ui, sans-serif" }, children: _jsxs("div", { className: "glass-panel animate-fade-in", style: { width: '100%', maxWidth: '420px', padding: '40px 32px' }, children: [_jsxs("div", { style: { textAlign: 'center', marginBottom: '28px' }, children: [_jsx("div", { style: {
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                background: "#EFF6FF",
                                border: "1px solid #DBEAFE",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 16
                            }, children: _jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M22 10v6M2 10l10-5 10 5-10 5z" }), _jsx("path", { d: "M6 12v5c3 3 9 3 12 0v-5" })] }) }), _jsx("h2", { style: { margin: 0, fontSize: '22px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }, children: "Crea tu cuenta gratis" }), _jsx("p", { style: { color: '#64748B', fontSize: '14px', marginTop: '6px' }, children: "Comienza hoy mismo con una ruta de aprendizaje adaptada a ti." })] }), error && (_jsx("div", { style: { background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }, children: error })), _jsxs("form", { onSubmit: handleRegister, style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '6px', fontWeight: 600 }, children: "Nombre completo" }), _jsx("input", { type: "text", className: "auth-input", placeholder: "Juan P\u00E9rez", value: nombre, onChange: (e) => setNombre(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '6px', fontWeight: 600 }, children: "Correo electr\u00F3nico" }), _jsx("input", { type: "email", className: "auth-input", placeholder: "tu@email.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '6px', fontWeight: 600 }, children: "Contrase\u00F1a" }), _jsx("input", { type: "password", className: "auth-input", placeholder: "M\u00EDnimo 6 caracteres", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: "auth-button", disabled: loading, style: { marginTop: '8px' }, children: loading ? 'Creando cuenta...' : 'Crear Cuenta' })] }), _jsxs("div", { style: { marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748B' }, children: ["\u00BFYa tienes una cuenta? ", _jsx(Link, { to: "/login", style: { color: '#2563EB', textDecoration: 'none', fontWeight: 600 }, children: "Inicia sesi\u00F3n" })] }), _jsx("div", { style: { marginTop: '16px', textAlign: 'center' }, children: _jsx(Link, { to: "/", style: { color: '#94A3B8', textDecoration: 'none', fontSize: '12px' }, children: "\u2190 Volver al inicio" }) })] }) }));
}
