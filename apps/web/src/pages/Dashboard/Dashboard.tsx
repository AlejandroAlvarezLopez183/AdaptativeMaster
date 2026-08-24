import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, UserResponse } from '@estudilabai/shared';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userData = await auth.getMe(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ background: '#0F2A2E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8B94A' }}>
        <p>Cargando tu sesión...</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#0F2A2E', minHeight: '100vh', color: '#F5F3EE', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }} className="glass-panel animate-fade-in">
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", margin: 0, fontSize: '32px', color: '#E8B94A' }}>
              Mi Aprendizaje
            </h1>
            <button 
              onClick={handleLogout} 
              style={{ background: 'transparent', border: '1px solid rgba(245,243,238,0.2)', color: '#F5F3EE', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,243,238,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Cerrar sesión
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(245,243,238,0.1)' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'rgba(245,243,238,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Nombre</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{user?.nombre}</p>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(245,243,238,0.1)' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: 'rgba(245,243,238,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
