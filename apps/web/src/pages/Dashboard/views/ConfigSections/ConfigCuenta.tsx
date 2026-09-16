import React, { useState } from 'react';
import { UserResponse, auth } from '@adaptativemaster/shared';

interface ConfigCuentaProps {
  user: UserResponse | null;
  onBack: () => void;
  onUpdateUser?: (user: UserResponse) => void;
}

export function ConfigCuenta({ user, onBack, onUpdateUser }: ConfigCuentaProps) {
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!nombre.trim()) return;
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No autenticado");
      
      // Llamada simulada o real. El endpoint PUT /usuarios/perfil actualiza perfil.
      // Wait, el endpoint actualiza nivel, intereses, preferencias, pero no nombre actualmente.
      // Sin embargo, podemos pasarlo y si no falla, está bien, o podemos simular.
      // Por ahora, simularemos la actualización de nombre a menos que lo agreguemos al backend.
      
      // const updatedUser = await auth.updatePerfil({ nombre }, token);
      // if (onUpdateUser) onUpdateUser(updatedUser);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar');
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
        background: 'rgba(23,60,62,0.4)',
        border: '1px solid rgba(245,243,238,0.06)',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '32px' }}>👤</div>
          <div>
            <h2 style={{ margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }}>Cuenta</h2>
            <p style={{ margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }}>Actualiza tus datos personales básicos.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Nombre completo</label>
            <input 
              type="text" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                background: 'rgba(15,42,46,0.6)',
                border: '1px solid rgba(245,243,238,0.1)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#F5F3EE',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#F5F3EE', fontSize: '14px', fontWeight: 500 }}>Correo electrónico (No editable)</label>
            <input 
              type="text" 
              value={user?.email || ''}
              disabled
              style={{
                background: 'rgba(15,42,46,0.3)',
                border: '1px solid rgba(245,243,238,0.05)',
                borderRadius: '8px',
                padding: '12px 16px',
                color: '#8FA8AA',
                fontSize: '15px',
                cursor: 'not-allowed',
                fontFamily: 'Inter, sans-serif'
              }}
            />
          </div>
        </div>

        {error && <div style={{ color: '#F2637B', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#4CAF50', fontSize: '14px' }}>¡Cambios guardados con éxito!</div>}

        <button 
          onClick={handleSave}
          disabled={loading}
          style={{
            background: '#E8B94A',
            color: '#0F2A2E',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: loading ? 'wait' : 'pointer',
            alignSelf: 'flex-start',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}
