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
      // Guardar el token (MVP, ideal HttpOnly cookies a futuro)
      localStorage.setItem('token', access_token);
      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Bienvenido de nuevo</h2>
          <p style={{ color: 'rgba(245,243,238,0.7)', fontSize: '14px', marginTop: '8px' }}>
            Ingresa a tu cuenta para seguir aprendiendo.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(245,243,238,0.7)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
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
            <label style={{ display: 'block', fontSize: '12px', color: 'rgba(245,243,238,0.7)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contraseña</label>
            <input 
              type="password" 
              className="auth-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Entrando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: 'rgba(245,243,238,0.6)' }}>
          ¿No tienes una cuenta? <Link to="/registro" style={{ color: 'var(--primary-accent)', textDecoration: 'none', fontWeight: 500 }}>Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}
