import React, { useState } from 'react';
import { UserResponse, auth } from '@adaptativemaster/shared';

interface ConfigPreferenciasProps {
  user: UserResponse | null;
  onBack: () => void;
  onUpdateUser?: (user: UserResponse) => void;
}

export function ConfigPreferencias({ user, onBack, onUpdateUser }: ConfigPreferenciasProps) {
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
          <h2 style={{ margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }}>Preferencias de estudio</h2>
          <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>Ajusta tu nivel y objetivos para personalizar el contenido del Tutor IA.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#0F172A', fontSize: '13px', fontWeight: 600 }}>Nivel de dificultad preferido</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {niveles.map(n => (
                <button
                  key={n}
                  onClick={() => setNivel(n)}
                  style={{
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
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#0F172A', fontSize: '13px', fontWeight: 600 }}>Objetivos principales</label>
            <textarea 
              rows={3}
              value={objetivos}
              onChange={(e) => setObjetivos(e.target.value)}
              placeholder="Ej. Quiero aprender desarrollo web para crear mi propia startup..."
              style={{
                background: '#FFFFFF', border: '1px solid #CBD5E1',
                borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                outline: 'none', resize: 'vertical'
              }}
            />
          </div>
        </div>

        {error && <div style={{ color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }}>{error}</div>}
        {success && <div style={{ color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }}>¡Preferencias guardadas!</div>}

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
          {loading ? 'Guardando...' : 'Guardar preferencias'}
        </button>
      </div>
    </div>
  );
}
