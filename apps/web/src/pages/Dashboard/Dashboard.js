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
        return (_jsxs("div", { className: "dashboard-root", style: {
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F8FAFC',
                color: '#0F172A',
                fontFamily: "'Open Sans', system-ui, sans-serif"
            }, children: [_jsx("div", { style: {
                        width: 44,
                        height: 44,
                        border: '3px solid #E2E8F0',
                        borderTopColor: '#2563EB',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        marginBottom: 16
                    } }), _jsx("style", { children: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }), _jsx("p", { style: { margin: 0, fontSize: 15, fontWeight: 600, color: '#0F172A' }, children: "Cargando tu entorno de estudio..." }), _jsx("p", { style: { margin: '6px 0 0', fontSize: 13, color: '#64748B' }, children: "Un momento, estamos preparando tus rutas personalizadas." })] }));
    }
    // Nombre de sección para el topbar breadcrumb
    const sectionTitles = {
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
    return (_jsxs("div", { className: "dashboard-root", style: {
            height: "100vh",
            overflow: "hidden",
            background: "#F8FAFC",
            display: "flex",
            color: "#0F172A",
            fontFamily: "'Open Sans', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }, children: [_jsx(Sidebar, { active: active, setActive: setActive, user: user, onLogout: handleLogout }), _jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }, children: [_jsxs("header", { style: {
                            height: 56,
                            background: "#FFFFFF",
                            borderBottom: "1px solid #E2E8F0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 32px",
                            flexShrink: 0
                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [_jsx("span", { style: { fontSize: 13, color: "#64748B", fontWeight: 500 }, children: "Panel" }), _jsx("span", { style: { fontSize: 12, color: "#CBD5E1" }, children: "/" }), _jsx("span", { style: { fontSize: 13, color: "#0F172A", fontWeight: 600 }, children: sectionTitles[active] || 'Dashboard' })] }), _jsx("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: _jsxs("span", { style: {
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
                                    }, children: [_jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#10B981" } }), "Sesi\u00F3n activa"] }) })] }), _jsx("main", { style: { flex: 1, padding: "32px 40px", overflowY: "auto", background: "#F8FAFC" }, children: active === "ayuda" ? (_jsx(AyudaView, {})) : active === "config" ? (_jsx(ConfigView, { onLogout: handleLogout, user: user, onUpdateUser: setUser })) : active === "perfil" ? (_jsx(PerfilView, { user: user })) : active === "progreso" ? (_jsx(ProgresoView, {})) : active === "social" ? (_jsx(SocialView, { user: user })) : active === "leccion_duolingo" ? (_jsx(LeccionDuolingoView, { rutaId: selectedRutaId, leccionId: selectedLeccionId, onOpenLesson: (id) => { setSelectedLeccionId(id); setActive("leccion_contenido"); }, onOpenQuiz: (id) => { setSelectedLeccionId(id); setActive("examen"); }, onOpenBoss: (id) => { setSelectedLeccionId(id); setActive("examen"); }, onOpenMinijuego: (id, tipo, datos, titulo) => {
                                setSelectedLeccionId(id);
                                setSelectedMinijuego({ tipo, datos, titulo });
                                setActive("minijuego");
                            } })) : active === "examen" ? (_jsx(ExamenView, { onBack: () => setActive("leccion_duolingo"), onComplete: () => setActive("leccion_duolingo") })) : active === "minijuego" ? (_jsx(MinijuegoView, { leccionId: selectedLeccionId, onBack: () => setActive("leccion_duolingo"), onComplete: () => setActive("leccion_duolingo"), tipoMinijuego: selectedMinijuego?.tipo, datosMinijuego: selectedMinijuego?.datos, titulo: selectedMinijuego?.titulo })) : active === "leccion_contenido" ? (_jsx(LeccionContenidoView, { leccionId: selectedLeccionId, onGoBack: () => setActive("leccion_duolingo"), onOpenTutor: () => setActive("tutor"), onComplete: () => setActive("leccion_duolingo") })) : active === "tutor" ? (_jsx(TutorView, { rutaId: selectedRutaId, leccionId: selectedLeccionId })) : active === "ruta_detalle" ? (_jsx(RutaDetalleView, { setActive: setActive, rutaId: selectedRutaId, onSelectLeccion: setSelectedLeccionId })) : active === "aprendizaje" ? (_jsx(AprendizajeView, { setActive: setActive, onSelectRuta: setSelectedRutaId })) : active === "nueva_ruta_wizard" ? (_jsx(NuevaRutaWizard, { onCancel: () => setActive("aprendizaje"), onComplete: () => setActive("aprendizaje") })) : active === "inicio" ? (_jsx(InicioView, { user: user, setActive: setActive, onSelectRuta: setSelectedRutaId })) : (_jsx("div", { className: "animate-fade-in", style: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }, children: _jsxs("div", { style: { textAlign: "center", maxWidth: 400, background: "#FFFFFF", padding: 32, borderRadius: 12, border: "1px solid #E2E8F0" }, children: [_jsx("p", { style: { color: "#0F172A", fontSize: 16, fontWeight: 600, margin: "0 0 6px" }, children: "Secci\u00F3n en desarrollo" }), _jsxs("p", { style: { color: "#64748B", fontSize: 14, margin: 0 }, children: ["El contenido para ", _jsx("strong", { style: { color: "#2563EB" }, children: sectionTitles[active] || active }), " estar\u00E1 disponible pr\u00F3ximamente."] })] }) })) })] })] }));
}
