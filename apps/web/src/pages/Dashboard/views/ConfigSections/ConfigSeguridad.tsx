import React, { useState } from 'react';

interface ConfigSeguridadProps {
  onBack: () => void;
}

export function ConfigSeguridad({ onBack }: ConfigSeguridadProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

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
          <h2 style={{ margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }}>Seguridad</h2>
          <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>Actualiza tu contraseña para mantener tu cuenta segura.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#0F172A', fontSize: '13px', fontWeight: 600 }}>Contraseña actual</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                background: '#FFFFFF', border: '1px solid #CBD5E1',
                borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#0F172A', fontSize: '13px', fontWeight: 600 }}>Nueva contraseña</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                background: '#FFFFFF', border: '1px solid #CBD5E1',
                borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ color: '#0F172A', fontSize: '13px', fontWeight: 600 }}>Confirmar nueva contraseña</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                background: '#FFFFFF', border: '1px solid #CBD5E1',
                borderRadius: '8px', padding: '10px 14px', color: '#0F172A', fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {error && <div style={{ color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }}>{error}</div>}
        {success && <div style={{ color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }}>¡Contraseña actualizada correctamente!</div>}

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
          {loading ? 'Actualizando...' : 'Actualizar contraseña'}
        </button>
      </div>
    </div>
  );
}
