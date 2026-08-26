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
  const [nivel, setNivel] = useState(user?.nivel || "Principiante");
  const [interesesText, setInteresesText] = useState(user?.intereses?.join(", ") || "");
  const [objetivos, setObjetivos] = useState(user?.objetivos || "");

  const nombre = user?.nombre?.split(" ")[0] || "Usuario";
  
  // Datos extra
  const rachas = "0"; 

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

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
    <div className="animate-fade-in" style={{ maxWidth: '720px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E8B94A, #F2637B)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#0F2A2E",
            textTransform: "uppercase",
            boxShadow: "0 8px 24px rgba(232,185,74,0.2)"
          }}>
            {user?.nombre ? user.nombre.substring(0, 2) : "US"}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#F5F3EE", margin: "0 0 4px" }}>
              {nombre}
            </h1>
            <p style={{ margin: 0, color: "#8FA8AA", fontSize: 14 }}>{user?.email}</p>
          </div>
        </div>

        <button style={{
          background: isEditing ? "#E8B94A" : "transparent",
          border: isEditing ? "none" : "1px solid rgba(232,185,74,0.4)",
          color: isEditing ? "#0F2A2E" : "#E8B94A",
          padding: "10px 20px",
          borderRadius: 10,
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 600,
          fontSize: 14,
          transition: "all 0.2s"
        }}
        onClick={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
        >
          {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Editar perfil"}
        </button>
      </div>

      {/* Grid de contenido */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        
        {/* Nivel General */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nivel general</h3>
          {isEditing ? (
            <select
              value={nivel}
              onChange={e => setNivel(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(245,243,238,0.2)', color: '#F5F3EE', outline: 'none' }}
            >
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          ) : (
            <p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: '#E8B94A' }}>{user?.nivel || "No definido"}</p>
          )}
        </div>

        {/* Logros / Racha */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: '0 0 8px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logros y Rachas</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <span style={{ fontSize: 20, fontWeight: 600, color: '#F5F3EE' }}>{rachas} días</span>
          </div>
        </div>

        {/* Intereses */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24, gridColumn: '1 / -1' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intereses</h3>
          {isEditing ? (
            <input
              type="text"
              value={interesesText}
              onChange={e => setInteresesText(e.target.value)}
              placeholder="Ej. Python, APIs, React"
              style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(245,243,238,0.2)', color: '#F5F3EE', outline: 'none' }}
            />
          ) : (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {user?.intereses && user.intereses.length > 0 ? (
                user.intereses.map(interes => (
                  <span key={interes} style={{ background: 'rgba(232,185,74,0.15)', color: '#E8B94A', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
                    {interes}
                  </span>
                ))
              ) : (
                <span style={{ color: '#8FA8AA' }}>Ninguno definido aún.</span>
              )}
            </div>
          )}
        </div>

        {/* Objetivos */}
        <div style={{ background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 16, padding: 24, gridColumn: '1 / -1' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 13, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Objetivos</h3>
          {isEditing ? (
            <textarea
              value={objetivos}
              onChange={e => setObjetivos(e.target.value)}
              placeholder="¿Qué quieres lograr con EstudiLab?"
              rows={3}
              style={{ width: '100%', padding: '12px', borderRadius: 8, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(245,243,238,0.2)', color: '#F5F3EE', outline: 'none', resize: 'vertical' }}
            />
          ) : (
            <p style={{ margin: 0, fontSize: 16, color: '#F5F3EE', lineHeight: 1.5 }}>
              {user?.objetivos || <span style={{ color: '#8FA8AA' }}>Ninguno definido aún.</span>}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
