import React, { useState } from 'react';
import { UserResponse, auth } from '@adaptativemaster/shared';

interface ConfigIdiomaProps {
  user: UserResponse | null;
  onBack: () => void;
  onUpdateUser?: (user: UserResponse) => void;
}

export function ConfigIdioma({ user, onBack, onUpdateUser }: ConfigIdiomaProps) {
  const prefs = user?.preferencias || {};
  const [idioma, setIdioma] = useState(prefs.idioma || 'es');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No autenticado");
      
      const newPreferencias = {
        ...prefs,
        idioma
      };

      const updatedUser = await auth.updatePerfil({ preferencias: newPreferencias }, token);
      if (onUpdateUser) onUpdateUser(updatedUser);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  const idiomas = [
    { code: 'es', label: 'Español (Predeterminado)' },
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: 0,
        width: 'fit-content', fontWeight: 500
      }}>
        ← Volver a Configuración
      </button>

      <div style={{
        background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px',
        padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div>
          <h2 style={{ margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }}>Idioma de la plataforma</h2>
          <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>Selecciona el idioma para los textos de la interfaz y lecciones.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {idiomas.map(i => (
            <div
              key={i.code}
              onClick={() => setIdioma(i.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '8px',
                border: `1.5px solid ${idioma === i.code ? '#2563EB' : '#E2E8F0'}`,
                background: idioma === i.code ? '#EFF6FF' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{
                color: idioma === i.code ? '#1D4ED8' : '#0F172A',
                fontWeight: idioma === i.code ? 600 : 500,
                fontSize: '14px'
              }}>
                {i.label}
              </span>
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2px solid ${idioma === i.code ? '#2563EB' : '#CBD5E1'}`,
                background: idioma === i.code ? '#2563EB' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {idioma === i.code && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} />}
              </div>
            </div>
          ))}
        </div>

        {error && <div style={{ color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }}>{error}</div>}
        {success && <div style={{ color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }}>¡Idioma actualizado!</div>}

        <button 
          onClick={handleSave}
          disabled={loading}
          style={{
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
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1E293B')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0F172A')}
        >
          {loading ? 'Guardando...' : 'Guardar idioma'}
        </button>
      </div>
    </div>
  );
}
