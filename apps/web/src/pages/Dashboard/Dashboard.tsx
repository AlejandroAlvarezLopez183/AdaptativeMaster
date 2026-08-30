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
      <div style={{ background: '#0F2A2E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8B94A' }}>
        <p>Cargando tu entorno...</p>
      </div>
    );
  }

  return (
    <div style={{
      height: "100vh",
      overflow: "hidden",
      background: "#0F2A2E",
      display: "flex",
      fontFamily: "Inter, sans-serif",
    }}>
      {/* Sidebar Modularizado */}
      <Sidebar 
        active={active} 
        setActive={setActive} 
        user={user} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {active === "ayuda" ? (
          <AyudaView />
        ) : active === "config" ? (
          <ConfigView onLogout={handleLogout} />
        ) : active === "perfil" ? (
          <PerfilView user={user} />
        ) : active === "progreso" ? (
          <ProgresoView />
        ) : active === "social" ? (
          <SocialView />
        ) : active === "leccion_duolingo" ? (
          <LeccionDuolingoView 
            rutaId={selectedRutaId}
            leccionId={selectedLeccionId} 
            onOpenLesson={(id) => { setSelectedLeccionId(id); setActive("leccion_contenido"); }} 
            onOpenQuiz={(id) => { setSelectedLeccionId(id); setActive("examen"); }}
            onOpenBoss={(id) => { setSelectedLeccionId(id); setActive("minijuego"); }}
          />
        ) : active === "examen" ? (
          <ExamenView onBack={() => setActive("leccion_duolingo")} onComplete={() => setActive("leccion_duolingo")} />
        ) : active === "minijuego" ? (
          <MinijuegoView onBack={() => setActive("leccion_duolingo")} onComplete={() => setActive("leccion_duolingo")} />
        ) : active === "leccion_contenido" ? (
          <LeccionContenidoView 
            leccionId={selectedLeccionId} 
            onGoBack={() => setActive("leccion_duolingo")} 
            onOpenTutor={() => setActive("tutor")} 
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
            onComplete={() => setActive("aprendizaje")} // Por ahora simulamos que vuelve al inicio de aprendizaje
          />
        ) : active === "inicio" ? (
          <InicioView user={user} setActive={setActive} onSelectRuta={setSelectedRutaId} />
        ) : (
          <div className="animate-fade-in" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
             <p style={{ color: "rgba(245,243,238,0.3)", fontSize: '18px' }}>Contenido de <span style={{ color: '#E8B94A' }}>{active}</span> próximamente...</p>
          </div>
        )}
      </main>
    </div>
  );
}
