import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '@adaptativemaster/shared';
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { access_token } = await auth.login(email, password);
            // Guardar el token (MVP, ideal HttpOnly cookies a futuro)
            localStorage.setItem('token', access_token);
            // Redirigir al dashboard
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "auth-container", children: _jsxs("div", { className: "glass-panel animate-fade-in", style: { width: '100%', maxWidth: '400px', padding: '40px' }, children: [_jsxs("div", { style: { textAlign: 'center', marginBottom: '30px' }, children: [_jsx("h2", { style: { margin: 0, fontSize: '24px', fontWeight: 700 }, children: "Bienvenido de nuevo" }), _jsx("p", { style: { color: 'rgba(245,243,238,0.7)', fontSize: '14px', marginTop: '8px' }, children: "Ingresa a tu cuenta para seguir aprendiendo." })] }), error && (_jsx("div", { style: { background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }, children: error })), _jsxs("form", { onSubmit: handleLogin, style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: 'block', fontSize: '12px', color: 'rgba(245,243,238,0.7)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }, children: "Email" }), _jsx("input", { type: "email", className: "auth-input", placeholder: "tu@email.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', fontSize: '12px', color: 'rgba(245,243,238,0.7)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }, children: "Contrase\u00F1a" }), _jsx("input", { type: "password", className: "auth-input", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: (e) => setPassword(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: "auth-button", disabled: loading, style: { marginTop: '10px' }, children: loading ? 'Entrando...' : 'Iniciar Sesión' })] }), _jsxs("div", { style: { marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'rgba(245,243,238,0.6)' }, children: ["\u00BFNo tienes una cuenta? ", _jsx(Link, { to: "/registro", style: { color: 'var(--primary-accent)', textDecoration: 'none', fontWeight: 500 }, children: "Reg\u00EDstrate aqu\u00ED" })] })] }) }));
}
