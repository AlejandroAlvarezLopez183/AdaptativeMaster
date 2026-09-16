import React, { useState } from 'react';
import { UserResponse, auth } from '@adaptativemaster/shared';

interface ConfigPreferenciasProps {
  user: UserResponse | null;
  onBack: () => void;
  onUpdateUser?: (user: UserResponse) => void;
}

export function ConfigPreferencias({ user, onBack, onUpdateUser }: ConfigPreferenciasProps) {
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
      if (!token) throw new Error("No autenticado");
      
      const updatedUser = await auth.updatePerfil({ nivel, objetivos }, token);
      if (onUpdateUser) onUpdateUser(updatedUser);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  const niveles = ["Principiante", "Intermedio", "Avanzado"];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', padding: 0,
        width: 'fit-content', fontFamily: 'Inter, sans-serif'
      }}>
        ← Volver a Configuración
      </button>

      <div style={{
        background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: '16px',
        padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '32px' }}>🎯</div>
          <div>
            <h2 style={{ margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }}>Preferencias de Estudio</h2>
            <p style={{ margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }}>Ajusta tu nivel y objetivos para personalizar el contenido.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Nivel de experiencia</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {niveles.map(n => (
                <button 
                  key={n}
                  onClick={() => setNivel(n)}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(245,243,238,0.1)',
                    background: nivel === n ? 'rgba(232,185,74,0.15)' : 'rgba(15,42,46,0.6)',
                    color: nivel === n ? '#E8B94A' : '#8FA8AA',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, transition: 'all 0.2s'
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Objetivo principal</label>
            <textarea 
              value={objetivos}
              onChange={(e) => setObjetivos(e.target.value)}
              placeholder="Ej: Aprender React para encontrar mi primer empleo..."
              rows={4}
              style={{
                background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                outline: 'none', fontFamily: 'Inter, sans-serif', resize: 'vertical'
              }}
            />
          </div>
        </div>

        {error && <div style={{ color: '#F2637B', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#4CAF50', fontSize: '14px' }}>¡Preferencias de estudio guardadas!</div>}

        <button onClick={handleSave} disabled={loading} style={{
          background: '#E8B94A', color: '#0F2A2E', border: 'none', borderRadius: '8px',
          padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: loading ? 'wait' : 'pointer',
          alignSelf: 'flex-start', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s'
        }}>
          {loading ? 'Guardando...' : 'Guardar preferencias'}
        </button>
      </div>
    </div>
  );
}
