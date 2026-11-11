import React, { useState } from 'react';
import { UserResponse, auth } from '@adaptativemaster/shared';

interface ConfigPrivacidadProps {
  user: UserResponse | null;
  onBack: () => void;
  onUpdateUser?: (user: UserResponse) => void;
}

export function ConfigPrivacidad({ user, onBack, onUpdateUser }: ConfigPrivacidadProps) {
  const prefs = user?.preferencias || {};
  const [perfilPublico, setPerfilPublico] = useState(prefs.perfilPublico ?? false);
  const [mostrarProgreso, setMostrarProgreso] = useState(prefs.mostrarProgreso ?? true);
  
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
        perfilPublico,
        mostrarProgreso
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
      <div>
        <div style={{ color: '#0F172A', fontSize: '14px', fontWeight: 600 }}>{label}</div>
        <div style={{ color: '#64748B', fontSize: '13px', marginTop: '2px' }}>{desc}</div>
      </div>
      <div 
        onClick={() => onChange(!checked)}
        style={{
          width: '44px', height: '24px', borderRadius: '12px',
          background: checked ? '#2563EB' : '#CBD5E1',
          cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease',
          flexShrink: 0
        }}
      >
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%', background: '#FFFFFF',
          position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
          transition: 'left 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }} />
      </div>
    </div>
  );

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
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div>
          <h2 style={{ margin: '0 0 4px', color: '#0F172A', fontSize: '18px', fontWeight: 700 }}>Privacidad</h2>
          <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>Controla la visibilidad pública de tu perfil.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Toggle 
            label="Perfil público"
            desc="Permite que otros estudiantes encuentren tu perfil y vean tus intereses."
            checked={perfilPublico}
            onChange={setPerfilPublico}
          />
          <Toggle 
            label="Mostrar progreso y logros"
            desc="Tus estadísticas y racha serán visibles en salas de estudio grupales."
            checked={mostrarProgreso}
            onChange={setMostrarProgreso}
          />
        </div>

        {error && <div style={{ color: '#DC2626', fontSize: '13px', background: '#FEF2F2', padding: 10, borderRadius: 6 }}>{error}</div>}
        {success && <div style={{ color: '#047857', fontSize: '13px', background: '#ECFDF5', padding: 10, borderRadius: 6 }}>¡Privacidad actualizada!</div>}

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
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}
