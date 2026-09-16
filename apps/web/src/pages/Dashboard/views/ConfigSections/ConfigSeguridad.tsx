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
      // Simulación de actualización de contraseña
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
          <div style={{ fontSize: '32px' }}>🔒</div>
          <div>
            <h2 style={{ margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }}>Seguridad</h2>
            <p style={{ margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }}>Actualiza tu contraseña para mantener tu cuenta segura.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Contraseña actual</label>
            <input 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Nueva contraseña</label>
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Confirmar nueva contraseña</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                background: 'rgba(15,42,46,0.6)', border: '1px solid rgba(245,243,238,0.1)',
                borderRadius: '8px', padding: '12px 16px', color: '#F5F3EE', fontSize: '15px',
                outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
        </div>

        {error && <div style={{ color: '#F2637B', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#4CAF50', fontSize: '14px' }}>¡Contraseña actualizada con éxito!</div>}

        <button onClick={handleSave} disabled={loading || !currentPassword || !newPassword} style={{
          background: '#E8B94A', color: '#0F2A2E', border: 'none', borderRadius: '8px',
          padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: (loading || !currentPassword || !newPassword) ? 'not-allowed' : 'pointer',
          alignSelf: 'flex-start', opacity: (loading || !currentPassword || !newPassword) ? 0.5 : 1, transition: 'opacity 0.2s'
        }}>
          {loading ? 'Guardando...' : 'Cambiar contraseña'}
        </button>
      </div>
    </div>
  );
}
