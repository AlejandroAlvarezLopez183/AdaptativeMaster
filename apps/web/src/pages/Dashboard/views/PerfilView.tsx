import React, { useState } from "react";
import { UserResponse, auth } from "@adaptativemaster/shared";

interface PerfilViewProps {
  user: UserResponse | null;
}

export function PerfilView({ user: initialUser }: PerfilViewProps) {
  const [user, setUser] = useState<UserResponse | null>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados del form
  const [nivel, setNivel] = useState(user?.nivel || "Intermedio");
  const [interesesText, setInteresesText] = useState(user?.intereses?.join(", ") || "");
  const [objetivos, setObjetivos] = useState(user?.objetivos || "");

  const nombre = user?.nombre?.split(" ")[0] || "Usuario";
  const rachas = "0"; 

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const interestsArray = interesesText.split(",").map(i => i.trim()).filter(i => i !== "");
      
      const payload = {
        nivel,
        intereses: interestsArray,
        objetivos,
      };

      const updatedUser = await auth.updatePerfil(payload, token);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar perfil", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      
      {/* Header Perfil */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 14,
        padding: '28px 32px',
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#EFF6FF",
            border: "2px solid #DBEAFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
            color: "#2563EB",
            textTransform: "uppercase",
            flexShrink: 0
          }}>
            {user?.nombre ? user.nombre.substring(0, 2) : "US"}
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }}>
              {user?.nombre || nombre}
            </h1>
            <p style={{ margin: 0, color: "#64748B", fontSize: 13 }}>{user?.email}</p>
          </div>
        </div>

        <button 
          style={{
            background: isEditing ? "#0F172A" : "#FFFFFF",
            border: isEditing ? "none" : "1px solid #CBD5E1",
            color: isEditing ? "#FFFFFF" : "#0F172A",
            padding: "9px 18px",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: 13,
            transition: "all 0.15s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 6
          }}
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          disabled={loading}
          onMouseEnter={e => {
            if (!isEditing) {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.borderColor = '#94A3B8';
            }
          }}
          onMouseLeave={e => {
            if (!isEditing) {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }
          }}
        >
          {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Editar perfil"}
        </button>
      </div>

      {/* Grid de contenido */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        
        {/* Nivel General */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Nivel general
          </h3>
          {isEditing ? (
            <select
              value={nivel}
              onChange={e => setNivel(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontSize: 14,
                outline: 'none'
              }}
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          ) : (
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
              {user?.nivel || "Intermedio"}
            </p>
          )}
        </div>

        {/* Logros / Racha */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Racha actual
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>{rachas} días activos</span>
          </div>
        </div>

        {/* Intereses */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          gridColumn: '1 / -1'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Áreas de interés
          </h3>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={interesesText}
                onChange={e => setInteresesText(e.target.value)}
                placeholder="Ej. Python, Machine Learning, Matemáticas, React"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
              <span style={{ display: 'block', fontSize: 12, color: '#64748B', marginTop: 6 }}>
                Separa cada interés con una coma
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user?.intereses && user.intereses.length > 0 ? (
                user.intereses.map(interes => (
                  <span key={interes} style={{
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                    border: '1px solid #DBEAFE',
                    padding: '4px 12px',
                    borderRadius: 16,
                    fontSize: 13,
                    fontWeight: 600
                  }}>
                    {interes}
                  </span>
                ))
              ) : (
                <span style={{ color: '#64748B', fontSize: 13 }}>No has configurado intereses aún.</span>
              )}
            </div>
          )}
        </div>

        {/* Objetivos */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: 12,
          padding: 24,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          gridColumn: '1 / -1'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Objetivos de aprendizaje
          </h3>
          {isEditing ? (
            <textarea
              value={objetivos}
              onChange={e => setObjetivos(e.target.value)}
              placeholder="¿Qué metas o proyectos deseas alcanzar con tus estudios?"
              rows={3}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 8,
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontSize: 14,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          ) : (
            <p style={{ margin: 0, fontSize: 14, color: '#334155', lineHeight: 1.6 }}>
              {user?.objetivos || <span style={{ color: '#64748B' }}>Aún no has definido tus metas de estudio.</span>}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
