import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@adaptativemaster/shared';
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
    const [selectedRutaId, setSelectedRutaId] = useState(null);
    const [selectedLeccionId, setSelectedLeccionId] = useState(null);
    const [selectedMinijuego, setSelectedMinijuego] = useState(null);
    const [user, setUser] = useState(null);
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
            }
            catch (error) {
                console.error("Error fetching user data:", error);
                localStorage.removeItem('token');
                navigate('/login');
            }
            finally {
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
        return (_jsx("div", { style: { background: '#0F2A2E', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8B94A' }, children: _jsx("p", { children: "Cargando tu entorno..." }) }));
    }
    return (_jsxs("div", { style: {
            height: "100vh",
            overflow: "hidden",
            background: "#0F2A2E",
            display: "flex",
            fontFamily: "Inter, sans-serif",
        }, children: [_jsx(Sidebar, { active: active, setActive: setActive, user: user, onLogout: handleLogout }), _jsx("main", { style: { flex: 1, padding: "40px", display: "flex", flexDirection: "column", overflowY: "auto" }, children: active === "ayuda" ? (_jsx(AyudaView, {})) : active === "config" ? (_jsx(ConfigView, { onLogout: handleLogout, user: user, onUpdateUser: setUser })) : active === "perfil" ? (_jsx(PerfilView, { user: user })) : active === "progreso" ? (_jsx(ProgresoView, {})) : active === "social" ? (_jsx(SocialView, {})) : active === "leccion_duolingo" ? (_jsx(LeccionDuolingoView, { rutaId: selectedRutaId, leccionId: selectedLeccionId, onOpenLesson: (id) => { setSelectedLeccionId(id); setActive("leccion_contenido"); }, onOpenQuiz: (id) => { setSelectedLeccionId(id); setActive("examen"); }, onOpenBoss: (id) => { setSelectedLeccionId(id); setActive("examen"); }, onOpenMinijuego: (id, tipo, datos, titulo) => {
                        setSelectedLeccionId(id);
                        setSelectedMinijuego({ tipo, datos, titulo });
                        setActive("minijuego");
                    } })) : active === "examen" ? (_jsx(ExamenView, { onBack: () => setActive("leccion_duolingo"), onComplete: () => setActive("leccion_duolingo") })) : active === "minijuego" ? (_jsx(MinijuegoView, { leccionId: selectedLeccionId, onBack: () => setActive("leccion_duolingo"), onComplete: () => setActive("leccion_duolingo"), tipoMinijuego: selectedMinijuego?.tipo, datosMinijuego: selectedMinijuego?.datos, titulo: selectedMinijuego?.titulo })) : active === "leccion_contenido" ? (_jsx(LeccionContenidoView, { leccionId: selectedLeccionId, onGoBack: () => setActive("leccion_duolingo"), onOpenTutor: () => setActive("tutor"), onComplete: () => setActive("leccion_duolingo") })) : active === "tutor" ? (_jsx(TutorView, { rutaId: selectedRutaId, leccionId: selectedLeccionId })) : active === "ruta_detalle" ? (_jsx(RutaDetalleView, { setActive: setActive, rutaId: selectedRutaId, onSelectLeccion: setSelectedLeccionId })) : active === "aprendizaje" ? (_jsx(AprendizajeView, { setActive: setActive, onSelectRuta: setSelectedRutaId })) : active === "nueva_ruta_wizard" ? (_jsx(NuevaRutaWizard, { onCancel: () => setActive("aprendizaje"), onComplete: () => setActive("aprendizaje") })) : active === "inicio" ? (_jsx(InicioView, { user: user, setActive: setActive, onSelectRuta: setSelectedRutaId })) : (_jsx("div", { className: "animate-fade-in", style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }, children: _jsxs("p", { style: { color: "rgba(245,243,238,0.3)", fontSize: '18px' }, children: ["Contenido de ", _jsx("span", { style: { color: '#E8B94A' }, children: active }), " pr\u00F3ximamente..."] }) })) })] }));
}
