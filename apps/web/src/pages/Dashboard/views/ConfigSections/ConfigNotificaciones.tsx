import React, { useState } from 'react';
import { UserResponse, auth } from '@adaptativemaster/shared';

interface ConfigNotificacionesProps {
  user: UserResponse | null;
  onBack: () => void;
  onUpdateUser?: (user: UserResponse) => void;
}

export function ConfigNotificaciones({ user, onBack, onUpdateUser }: ConfigNotificacionesProps) {
  const prefs = user?.preferencias || {};
  const [emailAlerts, setEmailAlerts] = useState(prefs.emailAlerts ?? true);
  const [pushAlerts, setPushAlerts] = useState(prefs.pushAlerts ?? true);
  const [weeklyReport, setWeeklyReport] = useState(prefs.weeklyReport ?? false);
  
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
        emailAlerts,
        pushAlerts,
        weeklyReport
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

  const Toggle = ({ label, desc, checked, onChange }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(245,243,238,0.05)' }}>
      <div>
        <div style={{ color: '#F5F3EE', fontSize: '15px', fontWeight: 500 }}>{label}</div>
        <div style={{ color: '#8FA8AA', fontSize: '13px', marginTop: '4px' }}>{desc}</div>
      </div>
      <div 
        onClick={() => onChange(!checked)}
        style={{
          width: '48px', height: '26px', borderRadius: '13px',
          background: checked ? '#E8B94A' : 'rgba(15,42,46,0.8)',
          cursor: 'pointer', position: 'relative', transition: 'background 0.3s'
        }}
      >
        <div style={{
          position: 'absolute', top: '3px', left: checked ? '25px' : '3px',
          width: '20px', height: '20px', borderRadius: '50%',
          background: checked ? '#0F2A2E' : '#8FA8AA',
          transition: 'left 0.3s, background 0.3s'
        }} />
      </div>
    </div>
  );

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
          <div style={{ fontSize: '32px' }}>🔔</div>
          <div>
            <h2 style={{ margin: 0, color: '#F5F3EE', fontSize: '20px', fontFamily: "'Fraunces', Georgia, serif" }}>Notificaciones</h2>
            <p style={{ margin: '4px 0 0 0', color: '#8FA8AA', fontSize: '14px' }}>Elige cómo y cuándo quieres que nos comuniquemos contigo.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Toggle 
            label="Correos electrónicos" 
            desc="Recibe actualizaciones importantes y alertas por correo."
            checked={emailAlerts} onChange={setEmailAlerts} 
          />
          <Toggle 
            label="Notificaciones Push" 
            desc="Alertas en tiempo real en tu navegador."
            checked={pushAlerts} onChange={setPushAlerts} 
          />
          <Toggle 
            label="Resumen Semanal" 
            desc="Un correo cada semana con tu progreso de estudio."
            checked={weeklyReport} onChange={setWeeklyReport} 
          />
        </div>

        {error && <div style={{ color: '#F2637B', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#4CAF50', fontSize: '14px' }}>¡Preferencias guardadas!</div>}

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
