import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '@adaptativemaster/shared';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { access_token } = await auth.login(email, password);
      localStorage.setItem('token', access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '40px 32px' }}>
        
        {/* Logo / Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#EFF6FF",
            border: "1px solid #DBEAFE",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.01em' }}>
            Bienvenido de nuevo
          </h2>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '6px' }}>
            Ingresa a tu cuenta para continuar con tu ruta de estudio.
          </p>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 14px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '6px', fontWeight: 600 }}>
              Correo electrónico
            </label>
            <input 
              type="email" 
              className="auth-input" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#0F172A', marginBottom: '6px', fontWeight: 600 }}>
              Contraseña
            </label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
          ¿No tienes una cuenta? <Link to="/registro" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 600 }}>Regístrate gratis</Link>
        </div>
        
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#94A3B8', fontSize: '12px', textDecoration: 'none' }}>
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
