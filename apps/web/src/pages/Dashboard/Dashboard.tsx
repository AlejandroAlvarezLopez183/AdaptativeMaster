import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, UserResponse } from '@adaptativemaster/shared';

// Componentes modulares
import { Sidebar } from './components/Sidebar';
import { AyudaView } from './views/AyudaView';
import { InicioView } from './views/InicioView';
import { ConfigView } from './views/ConfigView';
import { PerfilView } from './views/PerfilView';
import { ProgresoView } from './views/ProgresoView';
import { AprendizajeView } from './views/AprendizajeView';
import { RutaDetalleView } from './views/RutaDetalleView';
import { SocialView } from './views/SocialView';
import { TutorView } from './views/TutorView';
import { LeccionDuolingoView } from './views/LeccionDuolingoView';
import { LeccionContenidoView } from './views/LeccionContenidoView';
import { NuevaRutaWizard } from './views/NuevaRutaWizard';
import { ExamenView } from './views/ExamenView';
import { MinijuegoView } from './views/MinijuegoView';

export default function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("inicio");
  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(null);
  const [selectedLeccionId, setSelectedLeccionId] = useState<string | null>(null);
  const [selectedMinijuego, setSelectedMinijuego] = useState<{ tipo?: string; datos?: any; titulo?: string } | null>(null);
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userData = await auth.getMe(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dashboard-root" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F8FAFC',
        color: '#0F172A',
        fontFamily: "'Open Sans', system-ui, sans-serif"
      }}>
        <div style={{
          width: 44,
          height: 44,
          border: '3px solid #E2E8F0',
          borderTopColor: '#2563EB',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: 16
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0F172A' }}>Cargando tu entorno de estudio...</p>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748B' }}>Un momento, estamos preparando tus rutas personalizadas.</p>
      </div>
    );
  }

  // Nombre de sección para el topbar breadcrumb
  const sectionTitles: Record<string, string> = {
    inicio: 'Inicio',
    aprendizaje: 'Mi aprendizaje',
    social: 'Aprender con otros',
    tutor: 'Tutor IA',
    progreso: 'Mi progreso',
    config: 'Configuración',
    ayuda: 'Centro de ayuda',
    perfil: 'Perfil del estudiante',
    ruta_detalle: 'Detalle de la ruta',
    nueva_ruta_wizard: 'Nueva ruta adaptativa',
    leccion_duolingo: 'Mapa de lecciones',
    leccion_contenido: 'Contenido de la lección',
    examen: 'Evaluación',
    minijuego: 'Práctica interactiva'
  };

  return (
    <div className="dashboard-root" style={{
      height: "100vh",
      overflow: "hidden",
      background: "#F8FAFC",
      display: "flex",
      color: "#0F172A",
      fontFamily: "'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Sidebar Modularizado */}
      <Sidebar 
        active={active} 
        setActive={setActive} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        
        {/* Top Bar Header */}
        <header style={{
          height: 56,
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>Panel</span>
            <span style={{ fontSize: 12, color: "#CBD5E1" }}>/</span>
            <span style={{ fontSize: 13, color: "#0F172A", fontWeight: 600 }}>
              {sectionTitles[active] || 'Dashboard'}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 500,
              color: "#047857",
              background: "#ECFDF5",
              border: "1px solid #A7F3D0",
              padding: "4px 10px",
              borderRadius: 16
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              Sesión activa
            </span>
          </div>
        </header>

        {/* Scrollable View Area */}
        <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto", background: "#F8FAFC" }}>
          {active === "ayuda" ? (
            <AyudaView />
          ) : active === "config" ? (
            <ConfigView onLogout={handleLogout} user={user} onUpdateUser={setUser} />
          ) : active === "perfil" ? (
            <PerfilView user={user} />
          ) : active === "progreso" ? (
            <ProgresoView />
          ) : active === "social" ? (
            <SocialView user={user} />
          ) : active === "leccion_duolingo" ? (
            <LeccionDuolingoView 
              rutaId={selectedRutaId}
              leccionId={selectedLeccionId} 
              onOpenLesson={(id) => { setSelectedLeccionId(id); setActive("leccion_contenido"); }} 
              onOpenQuiz={(id) => { setSelectedLeccionId(id); setActive("examen"); }}
              onOpenBoss={(id) => { setSelectedLeccionId(id); setActive("examen"); }}
              onOpenMinijuego={(id, tipo, datos, titulo) => { 
                setSelectedLeccionId(id); 
                setSelectedMinijuego({ tipo, datos, titulo });
                setActive("minijuego"); 
              }}
            />
          ) : active === "examen" ? (
            <ExamenView onBack={() => setActive("leccion_duolingo")} onComplete={() => setActive("leccion_duolingo")} />
          ) : active === "minijuego" ? (
            <MinijuegoView
              leccionId={selectedLeccionId}
              onBack={() => setActive("leccion_duolingo")}
              onComplete={() => setActive("leccion_duolingo")}
              tipoMinijuego={selectedMinijuego?.tipo as any}
              datosMinijuego={selectedMinijuego?.datos}
              titulo={selectedMinijuego?.titulo}
            />
          ) : active === "leccion_contenido" ? (
            <LeccionContenidoView 
              leccionId={selectedLeccionId} 
              onGoBack={() => setActive("leccion_duolingo")} 
              onOpenTutor={() => setActive("tutor")} 
              onComplete={() => setActive("leccion_duolingo")}
            />
          ) : active === "tutor" ? (
            <TutorView rutaId={selectedRutaId} leccionId={selectedLeccionId} />
          ) : active === "ruta_detalle" ? (
            <RutaDetalleView setActive={setActive} rutaId={selectedRutaId} onSelectLeccion={setSelectedLeccionId} />
          ) : active === "aprendizaje" ? (
            <AprendizajeView setActive={setActive} onSelectRuta={setSelectedRutaId} />
          ) : active === "nueva_ruta_wizard" ? (
            <NuevaRutaWizard 
              onCancel={() => setActive("aprendizaje")}
              onComplete={() => setActive("aprendizaje")}
            />
          ) : active === "inicio" ? (
            <InicioView user={user} setActive={setActive} onSelectRuta={setSelectedRutaId} />
          ) : (
            <div className="animate-fade-in" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
              <div style={{ textAlign: "center", maxWidth: 400, background: "#FFFFFF", padding: 32, borderRadius: 12, border: "1px solid #E2E8F0" }}>
                <p style={{ color: "#0F172A", fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>Sección en desarrollo</p>
                <p style={{ color: "#64748B", fontSize: 14, margin: 0 }}>
                  El contenido para <strong style={{ color: "#2563EB" }}>{sectionTitles[active] || active}</strong> estará disponible próximamente.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
