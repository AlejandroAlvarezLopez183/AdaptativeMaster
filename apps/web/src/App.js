import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
// ── Navigation Bar ──────────────────────────────────────────────────────────
function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (_jsx("nav", { style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid #E2E8F0",
        }, children: _jsxs("div", { style: {
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 24px",
                height: 68,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }, children: [_jsxs(Link, { to: "/", style: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }, children: [_jsx("div", { style: {
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                background: "#EFF6FF",
                                border: "1px solid #DBEAFE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 1px 2px rgba(37, 99, 235, 0.08)"
                            }, children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M22 10v6M2 10l10-5 10 5-10 5z" }), _jsx("path", { d: "M6 12v5c3 3 9 3 12 0v-5" })] }) }), _jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 3 }, children: [_jsx("span", { style: { fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }, children: "Adaptative" }), _jsx("span", { style: { fontSize: 20, fontWeight: 700, color: "#2563EB", letterSpacing: "-0.02em" }, children: "Master" })] })] }), _jsx("div", { style: { display: "flex", alignItems: "center", gap: 32 }, className: "nav-desktop", children: [
                        { label: "Cómo funciona", href: "#como-funciona" },
                        { label: "Características", href: "#caracteristicas" },
                        { label: "Testimonios", href: "#testimonios" },
                    ].map((item) => (_jsx("a", { href: item.href, style: {
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#475569",
                            textDecoration: "none",
                            transition: "color 0.15s ease",
                        }, onMouseEnter: (e) => (e.currentTarget.style.color = "#0F172A"), onMouseLeave: (e) => (e.currentTarget.style.color = "#475569"), children: item.label }, item.label))) }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx(Link, { to: "/login", style: {
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#334155",
                                textDecoration: "none",
                                padding: "8px 16px",
                                borderRadius: 8,
                                transition: "all 0.15s ease",
                            }, onMouseEnter: (e) => {
                                e.currentTarget.style.color = "#0F172A";
                                e.currentTarget.style.background = "#F1F5F9";
                            }, onMouseLeave: (e) => {
                                e.currentTarget.style.color = "#334155";
                                e.currentTarget.style.background = "transparent";
                            }, children: "Iniciar sesi\u00F3n" }), _jsx(Link, { to: "/registro", style: {
                                fontSize: 14,
                                fontWeight: 600,
                                background: "#2563EB",
                                color: "#FFFFFF",
                                borderRadius: 8,
                                padding: "9px 20px",
                                textDecoration: "none",
                                boxShadow: "0 1px 3px rgba(37, 99, 235, 0.2)",
                                transition: "all 0.15s ease",
                                whiteSpace: "nowrap",
                            }, onMouseEnter: (e) => {
                                e.currentTarget.style.background = "#1D4ED8";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }, onMouseLeave: (e) => {
                                e.currentTarget.style.background = "#2563EB";
                                e.currentTarget.style.transform = "translateY(0)";
                            }, children: "Empezar gratis" })] })] }) }));
}
// ── Interactive Learning Path Preview (Hero Graphic) ─────────────────────────
function LearningPathPreview() {
    return (_jsxs("div", { style: {
            width: "100%",
            maxWidth: 500,
            margin: "0 auto",
            position: "relative",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 320,
                    height: 320,
                    background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                } }), _jsxs("div", { style: {
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 18,
                    boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.6)",
                    overflow: "hidden",
                    position: "relative",
                }, children: [_jsxs("div", { style: {
                            padding: "16px 20px",
                            borderBottom: "1px solid #F1F5F9",
                            background: "#FAFAFA",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [_jsxs("div", { style: { display: "flex", gap: 6 }, children: [_jsx("span", { style: { width: 10, height: 10, borderRadius: "50%", background: "#E2E8F0" } }), _jsx("span", { style: { width: 10, height: 10, borderRadius: "50%", background: "#E2E8F0" } }), _jsx("span", { style: { width: 10, height: 10, borderRadius: "50%", background: "#E2E8F0" } })] }), _jsx("span", { style: { fontSize: 13, fontWeight: 600, color: "#334155" }, children: "Python & Inteligencia Artificial" })] }), _jsx("span", { style: {
                                    fontSize: 11,
                                    fontWeight: 600,
                                    background: "#ECFDF5",
                                    color: "#059669",
                                    padding: "3px 8px",
                                    borderRadius: 6,
                                    border: "1px solid #A7F3D0"
                                }, children: "Ruta Activa" })] }), _jsxs("div", { style: { padding: "22px 24px" }, children: [_jsxs("div", { style: { marginBottom: 20 }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }, children: [_jsxs("div", { children: [_jsx("span", { style: { fontSize: 12, color: "#64748B", fontWeight: 500 }, children: "Tu progreso general" }), _jsx("div", { style: { fontSize: 18, fontWeight: 700, color: "#0F172A" }, children: "65% completado" })] }), _jsx("span", { style: { fontSize: 12, fontWeight: 600, color: "#2563EB" }, children: "Nivel 3 de 5" })] }), _jsx("div", { style: { width: "100%", height: 8, background: "#F1F5F9", borderRadius: 99, overflow: "hidden" }, children: _jsx("div", { style: { width: "65%", height: "100%", background: "#2563EB", borderRadius: 99 } }) })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [_jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "12px 14px",
                                            background: "#F8FAFC",
                                            borderRadius: 10,
                                            border: "1px solid #F1F5F9",
                                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx("div", { style: {
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: "50%",
                                                            background: "#ECFDF5",
                                                            border: "1px solid #10B981",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "#059669",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                        }, children: "\u2713" }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: "#1E293B" }, children: "01. Fundamentos & Estructuras" }), _jsx("div", { style: { fontSize: 11, color: "#64748B" }, children: "4 lecciones \u2022 100% aprobado" })] })] }), _jsx("span", { style: { fontSize: 11, color: "#059669", fontWeight: 600 }, children: "Superado" })] }), _jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "12px 14px",
                                            background: "#F8FAFC",
                                            borderRadius: 10,
                                            border: "1px solid #F1F5F9",
                                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx("div", { style: {
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: "50%",
                                                            background: "#ECFDF5",
                                                            border: "1px solid #10B981",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "#059669",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                        }, children: "\u2713" }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 13, fontWeight: 600, color: "#1E293B" }, children: "02. An\u00E1lisis con Pandas y Numpy" }), _jsx("div", { style: { fontSize: 11, color: "#64748B" }, children: "5 lecciones \u2022 1 minijuego" })] })] }), _jsx("span", { style: { fontSize: 11, color: "#059669", fontWeight: 600 }, children: "Superado" })] }), _jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "14px",
                                            background: "#EFF6FF",
                                            borderRadius: 12,
                                            border: "1.5px solid #BFDBFE",
                                            boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
                                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx("div", { style: {
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: "50%",
                                                            background: "#2563EB",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "#FFFFFF",
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                        }, children: "\u25B6" }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 13, fontWeight: 700, color: "#1E3A8A" }, children: "03. Modelos de Machine Learning" }), _jsx("div", { style: { fontSize: 11, color: "#3B82F6", fontWeight: 500 }, children: "Lecci\u00F3n 3 de 6 \u2022 En curso" })] })] }), _jsx("span", { style: {
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    background: "#2563EB",
                                                    color: "#FFFFFF",
                                                    padding: "5px 12px",
                                                    borderRadius: 6,
                                                }, children: "Continuar" })] }), _jsxs("div", { style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "12px 14px",
                                            background: "#FFFFFF",
                                            borderRadius: 10,
                                            border: "1px solid #E2E8F0",
                                            opacity: 0.65,
                                        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx("div", { style: {
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: "50%",
                                                            background: "#F1F5F9",
                                                            border: "1px solid #E2E8F0",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            color: "#94A3B8",
                                                            fontSize: 11,
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                        }, children: "\uD83D\uDD12" }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 13, fontWeight: 500, color: "#475569" }, children: "04. Redes Neuronales y Proyecto Final" }), _jsx("div", { style: { fontSize: 11, color: "#94A3B8" }, children: "Se desbloquea al aprobar el m\u00F3dulo 3" })] })] }), _jsx("span", { style: { fontSize: 11, color: "#94A3B8" }, children: "Bloqueado" })] })] })] }), _jsxs("div", { style: {
                            margin: "0 16px 16px",
                            padding: "12px 16px",
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                        }, children: [_jsx("div", { style: {
                                    width: 28,
                                    height: 28,
                                    borderRadius: 8,
                                    background: "#EFF6FF",
                                    border: "1px solid #DBEAFE",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    marginTop: 2,
                                }, children: _jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2.2", children: _jsx("path", { d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" }) }) }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 12, fontWeight: 700, color: "#0F172A", marginBottom: 2 }, children: "Tutor IA calibr\u00F3 tu ruta" }), _jsx("div", { style: { fontSize: 11.5, color: "#475569", lineHeight: 1.45 }, children: "Detectamos alto dominio en \u00E1lgebra lineal; omitimos 3 lecciones te\u00F3ricas y agregamos ejercicios de c\u00F3digo directo." })] })] })] }), _jsxs("div", { style: {
                    position: "absolute",
                    bottom: -16,
                    right: -10,
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 12,
                    padding: "10px 14px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }, children: [_jsx("span", { style: { fontSize: 18 }, children: "\uD83D\uDD25" }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 11, fontWeight: 700, color: "#0F172A" }, children: "Racha activa" }), _jsx("div", { style: { fontSize: 11, color: "#64748B" }, children: "12 d\u00EDas seguidos" })] })] })] }));
}
// ── Hero Section ────────────────────────────────────────────────────────────
function Hero() {
    return (_jsxs("section", { style: {
            padding: "140px 24px 80px",
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            alignItems: "center",
            gap: 60,
        }, className: "hero-grid", children: [_jsxs("div", { children: [_jsxs("div", { style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#EFF6FF",
                            border: "1px solid #DBEAFE",
                            borderRadius: 20,
                            padding: "6px 14px",
                            marginBottom: 24,
                        }, children: [_jsx("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#2563EB" } }), _jsx("span", { style: { fontSize: 12.5, fontWeight: 600, color: "#1D4ED8" }, children: "Plataforma de Aprendizaje Adaptativo con IA" })] }), _jsxs("h1", { style: {
                            fontSize: "clamp(36px, 4.5vw, 54px)",
                            fontWeight: 800,
                            color: "#0F172A",
                            margin: "0 0 16px",
                            lineHeight: 1.15,
                            letterSpacing: "-0.03em",
                        }, children: ["Aprende a tu ritmo, ", _jsx("br", {}), _jsx("span", { style: { color: "#2563EB" }, children: "no al de todos." })] }), _jsx("p", { style: {
                            fontSize: 18,
                            color: "#475569",
                            lineHeight: 1.65,
                            margin: "0 0 36px",
                            maxWidth: 520,
                        }, children: "Adaptative Master analiza lo que ya sabes y genera un sendero de estudio hecho a tu medida. Sin cursos gen\u00E9ricos ni horas perdidas en temas que ya dominas." }), _jsxs("div", { style: { display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }, children: [_jsx(Link, { to: "/registro", style: {
                                    fontSize: 15,
                                    fontWeight: 600,
                                    background: "#2563EB",
                                    color: "#FFFFFF",
                                    borderRadius: 10,
                                    padding: "14px 28px",
                                    textDecoration: "none",
                                    boxShadow: "0 2px 6px rgba(37,99,235,0.25)",
                                    transition: "all 0.15s ease",
                                }, onMouseEnter: (e) => {
                                    e.currentTarget.style.background = "#1D4ED8";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.background = "#2563EB";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }, children: "Crear mi ruta gratis \u2192" }), _jsx("a", { href: "#como-funciona", style: {
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "#334155",
                                    background: "#FFFFFF",
                                    border: "1px solid #CBD5E1",
                                    borderRadius: 10,
                                    padding: "14px 24px",
                                    textDecoration: "none",
                                    transition: "all 0.15s ease",
                                }, onMouseEnter: (e) => {
                                    e.currentTarget.style.background = "#F8FAFC";
                                    e.currentTarget.style.borderColor = "#94A3B8";
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.background = "#FFFFFF";
                                    e.currentTarget.style.borderColor = "#CBD5E1";
                                }, children: "Ver c\u00F3mo funciona" })] }), _jsxs("div", { style: { marginTop: 44, display: "flex", alignItems: "center", gap: 18 }, children: [_jsx("div", { style: { display: "flex" }, children: [
                                    { text: "MR", bg: "#EFF6FF", color: "#1D4ED8" },
                                    { text: "CA", bg: "#FDF2F8", color: "#DB2777" },
                                    { text: "JP", bg: "#ECFDF5", color: "#059669" },
                                    { text: "LV", bg: "#FFFBEB", color: "#D97706" },
                                    { text: "SO", bg: "#F3E8FF", color: "#7E22CE" },
                                ].map((user, i) => (_jsx("div", { style: {
                                        width: 34,
                                        height: 34,
                                        borderRadius: "50%",
                                        background: user.bg,
                                        color: user.color,
                                        border: "2.5px solid #FFFFFF",
                                        marginLeft: i === 0 ? 0 : -8,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                                    }, children: user.text }, i))) }), _jsxs("div", { children: [_jsx("div", { style: { display: "flex", gap: 3, marginBottom: 2 }, children: Array.from({ length: 5 }).map((_, i) => (_jsx("svg", { width: "14", height: "14", viewBox: "0 0 20 20", fill: "#F59E0B", children: _jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, i))) }), _jsxs("p", { style: { fontSize: 13, color: "#64748B", margin: 0 }, children: [_jsx("strong", { style: { color: "#0F172A", fontWeight: 700 }, children: "+12,000 estudiantes" }), " progresando hoy"] })] })] })] }), _jsx("div", { className: "hero-trail", style: { display: "flex", justifyContent: "center" }, children: _jsx(LearningPathPreview, {}) })] }));
}
// ── Stats Banner ────────────────────────────────────────────────────────────
const STATS = [
    { value: "12,000+", label: "Estudiantes activos", desc: "Aprendiendo a su propio ritmo" },
    { value: "94%", label: "Tasa de finalización", desc: "En rutas adaptativas completadas" },
    { value: "3.2×", label: "Mayor retención", desc: "Comparado con temarios estáticos" },
    { value: "48+", label: "Áreas de estudio", desc: "Desde programación hasta idiomas" },
];
function StatsBanner() {
    return (_jsx("section", { id: "metricas", style: {
            background: "#F8FAFC",
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
            padding: "48px 24px",
        }, children: _jsx("div", { style: {
                maxWidth: 1200,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 32,
                textAlign: "center",
            }, className: "stats-grid", children: STATS.map((s, i) => (_jsxs("div", { children: [_jsx("div", { style: { fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", marginBottom: 4 }, children: s.value }), _jsx("div", { style: { fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 2 }, children: s.label }), _jsx("div", { style: { fontSize: 12, color: "#64748B" }, children: s.desc })] }, i))) }) }));
}
// ── How It Works ────────────────────────────────────────────────────────────
const STEPS = [
    {
        num: "01",
        title: "Diagnóstico inicial inteligente",
        body: "Responde unas preguntas interactivas. La IA evalúa tus fundamentos, detecta qué ya dominas y qué conceptos conviene repasar.",
        badge: "Evaluación inicial",
        icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "m4.93 4.93 4.24 4.24" }), _jsx("path", { d: "m14.83 9.17 4.24-4.24" }), _jsx("path", { d: "m14.83 14.83 4.24 4.24" }), _jsx("path", { d: "m9.17 14.83-4.24 4.24" }), _jsx("circle", { cx: "12", cy: "12", r: "4" })] })),
    },
    {
        num: "02",
        title: "Tu sendero se genera al instante",
        body: "Recibe una ruta estructurada paso a paso: lecciones breves, ejercicios prácticos y evaluaciones ajustadas a tu meta y tiempo disponible.",
        badge: "Ruta personalizada",
        icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M3 17h6l3 3 5-5H3z" }), _jsx("path", { d: "M14 6l7 7-4 4" }), _jsx("path", { d: "M9 3v4" })] })),
    },
    {
        num: "03",
        title: "Ajuste continuo en tiempo real",
        body: "Si un tema te resulta sencillo, avanzas de inmediato. Si te cuesta, la IA te ofrece explicaciones alternativas y ejemplos claros hasta dominarlo.",
        badge: "Adaptación en vivo",
        icon: (_jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" }) })),
    },
];
function HowItWorks() {
    return (_jsxs("section", { id: "como-funciona", style: { padding: "90px 24px", maxWidth: 1200, margin: "0 auto" }, children: [_jsxs("div", { style: { maxWidth: 600, marginBottom: 54 }, children: [_jsx("div", { style: {
                            display: "inline-block",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#2563EB",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 10,
                        }, children: "Metodolog\u00EDa" }), _jsx("h2", { style: {
                            fontSize: "clamp(28px, 3.5vw, 42px)",
                            fontWeight: 800,
                            color: "#0F172A",
                            margin: "0 0 14px",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                        }, children: "Aprende con efectividad en tres pasos" }), _jsx("p", { style: { fontSize: 16, color: "#64748B", margin: 0, lineHeight: 1.6 }, children: "Dise\u00F1ado para que aproveches cada minuto de estudio sin frustraci\u00F3n ni repeticiones innecesarias." })] }), _jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }, className: "steps-grid", children: STEPS.map((s, i) => (_jsxs("div", { style: {
                        background: "#FFFFFF",
                        borderRadius: 16,
                        padding: "32px 28px",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                    }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [_jsx("div", { style: {
                                        width: 44,
                                        height: 44,
                                        borderRadius: 12,
                                        background: "#EFF6FF",
                                        border: "1px solid #DBEAFE",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }, children: s.icon }), _jsxs("span", { style: { fontSize: 14, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.05em" }, children: ["PASO ", s.num] })] }), _jsx("h3", { style: { fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 10px", lineHeight: 1.3 }, children: s.title }), _jsx("p", { style: { fontSize: 14, color: "#64748B", lineHeight: 1.6, margin: 0 }, children: s.body })] }, i))) })] }));
}
// ── Features Section ────────────────────────────────────────────────────────
const FEATURES = [
    {
        title: "Tutor IA disponible 24/7",
        desc: "Pregunta cualquier duda en el momento. Tu tutor conoce exactamente tu avance y te explica con analogías claras.",
        icon: (_jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) })),
    },
    {
        title: "Cero currículos estáticos",
        desc: "Olvídate de listas de 80 videos idénticos para todos. Cada lección se genera según lo que de verdad requieres.",
        icon: (_jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) })),
    },
    {
        title: "Minijuegos y práctica interactiva",
        desc: "Refuerza conceptos clave con retos de emparejamiento, verdadero o falso y simulaciones dinámicas.",
        icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "2", y: "6", width: "20", height: "12", rx: "2" }), _jsx("path", { d: "M6 12h4m-2-2v4m9-3h.01M15 13h.01" })] })),
    },
    {
        title: "Progreso visible y métricas claras",
        desc: "Visualiza tus horas de concentración, rachas consecutivas, nivel de dominio y los hitos alcanzados.",
        icon: (_jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M18 20V10M12 20V4M6 20v-6" }) })),
    },
    {
        title: "Cualquier tema o disciplina",
        desc: "Programación, matemáticas, finanzas, idiomas o ciencias. Escribe lo que deseas aprender y se creará tu ruta.",
        icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" })] })),
    },
    {
        title: "Estudio colaborativo y social",
        desc: "Conecta con compañeros de ruta, comparte recomendaciones y motívate celebrando avances en comunidad.",
        icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] })),
    },
];
function Features() {
    return (_jsx("section", { id: "caracteristicas", style: {
            padding: "90px 24px",
            background: "#F8FAFC",
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
        }, children: _jsxs("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [_jsxs("div", { style: { maxWidth: 600, marginBottom: 54 }, children: [_jsx("div", { style: {
                                display: "inline-block",
                                fontSize: 12,
                                fontWeight: 700,
                                color: "#2563EB",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                marginBottom: 10,
                            }, children: "Caracter\u00EDsticas" }), _jsx("h2", { style: {
                                fontSize: "clamp(28px, 3.5vw, 42px)",
                                fontWeight: 800,
                                color: "#0F172A",
                                margin: "0 0 14px",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }, children: "Todo lo necesario para dominar habilidades reales" }), _jsx("p", { style: { fontSize: 16, color: "#64748B", margin: 0, lineHeight: 1.6 }, children: "Herramientas dise\u00F1adas para mantenerte enfocado, motivado y en constante evoluci\u00F3n." })] }), _jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }, className: "features-grid", children: FEATURES.map((f, i) => (_jsxs("div", { style: {
                            background: "#FFFFFF",
                            borderRadius: 14,
                            padding: "26px",
                            border: "1px solid #E2E8F0",
                            transition: "all 0.15s ease",
                        }, onMouseEnter: (e) => {
                            e.currentTarget.style.borderColor = "#CBD5E1";
                            e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,23,42,0.04)";
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.borderColor = "#E2E8F0";
                            e.currentTarget.style.boxShadow = "none";
                        }, children: [_jsx("div", { style: {
                                    width: 42,
                                    height: 42,
                                    borderRadius: 10,
                                    background: "#EFF6FF",
                                    border: "1px solid #DBEAFE",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 16,
                                }, children: f.icon }), _jsx("h3", { style: { fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 8px" }, children: f.title }), _jsx("p", { style: { fontSize: 13.5, color: "#64748B", lineHeight: 1.55, margin: 0 }, children: f.desc })] }, i))) })] }) }));
}
// ── Testimonials ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
    {
        quote: "Llevaba meses intentando aprender cálculo por mi cuenta y me atascaba siempre en las mismas derivadas. Con la ruta adaptativa entendí los vacíos que tenía y en 3 semanas aprobé.",
        name: "Marcos Reyes",
        role: "Estudiante de Ingeniería",
        initials: "MR",
        color: "#2563EB",
    },
    {
        quote: "Lo que más valoro es que no me hace perder tiempo con lo que ya conozco. En inglés técnico saltó directamente a vocabulario profesional y análisis de casos reales.",
        name: "Carla Andrade",
        role: "Analista de Datos",
        initials: "CA",
        color: "#059669",
    },
    {
        quote: "El Tutor IA es muy superior a un chatbot ordinario: sabe exactamente en qué lección voy, qué dudas tuve ayer y cómo explicarme las cosas paso por paso.",
        name: "Jorge Palacios",
        role: "Docente de Ciencias",
        initials: "JP",
        color: "#7C3AED",
    },
];
function Testimonials() {
    return (_jsxs("section", { id: "testimonios", style: { padding: "90px 24px", maxWidth: 1200, margin: "0 auto" }, children: [_jsxs("div", { style: { maxWidth: 600, marginBottom: 54 }, children: [_jsx("div", { style: {
                            display: "inline-block",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#2563EB",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 10,
                        }, children: "Testimonios" }), _jsx("h2", { style: {
                            fontSize: "clamp(28px, 3.5vw, 42px)",
                            fontWeight: 800,
                            color: "#0F172A",
                            margin: "0 0 14px",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                        }, children: "Historias de quienes ya recorren su ruta" }), _jsx("p", { style: { fontSize: 16, color: "#64748B", margin: 0, lineHeight: 1.6 }, children: "Estudiantes y profesionales que transformaron su forma de aprender." })] }), _jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }, className: "testimonials-grid", children: TESTIMONIALS.map((t, i) => (_jsxs("div", { style: {
                        background: "#FFFFFF",
                        borderRadius: 16,
                        padding: "30px 26px",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }, children: [_jsxs("div", { children: [_jsx("div", { style: { display: "flex", gap: 3, marginBottom: 16 }, children: Array.from({ length: 5 }).map((_, j) => (_jsx("svg", { width: "15", height: "15", viewBox: "0 0 20 20", fill: "#F59E0B", children: _jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, j))) }), _jsxs("p", { style: {
                                        fontSize: 14.5,
                                        color: "#334155",
                                        lineHeight: 1.6,
                                        margin: "0 0 24px",
                                        fontStyle: "italic",
                                    }, children: ["\"", t.quote, "\""] })] }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #F1F5F9" }, children: [_jsx("div", { style: {
                                        width: 38,
                                        height: 38,
                                        borderRadius: "50%",
                                        background: "#EFF6FF",
                                        border: `1.5px solid ${t.color}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: t.color,
                                    }, children: t.initials }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 13.5, fontWeight: 700, color: "#0F172A" }, children: t.name }), _jsx("div", { style: { fontSize: 12, color: "#64748B" }, children: t.role })] })] })] }, i))) })] }));
}
// ── Final CTA ───────────────────────────────────────────────────────────────
function FinalCTA() {
    return (_jsx("section", { style: { padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }, children: _jsx("div", { style: {
                background: "#0F172A",
                borderRadius: 24,
                padding: "64px 36px",
                textAlign: "center",
                color: "#FFFFFF",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.2)",
            }, children: _jsxs("div", { style: { maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 2 }, children: [_jsx("div", { style: {
                            display: "inline-block",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#60A5FA",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: 16,
                        }, children: "Comienza hoy mismo" }), _jsxs("h2", { style: {
                            fontSize: "clamp(30px, 4vw, 44px)",
                            fontWeight: 800,
                            margin: "0 0 16px",
                            lineHeight: 1.15,
                            letterSpacing: "-0.02em",
                        }, children: ["Deja de estudiar a ciegas. ", _jsx("br", {}), "Descubre tu propia ruta."] }), _jsx("p", { style: {
                            fontSize: 16,
                            color: "#94A3B8",
                            lineHeight: 1.6,
                            margin: "0 0 36px",
                        }, children: "Diagn\u00F3stico gratuito en menos de 2 minutos. Sin tarjeta de cr\u00E9dito requerida." }), _jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", alignItems: "center" }, children: [_jsx(Link, { to: "/registro", style: {
                                    fontSize: 15,
                                    fontWeight: 600,
                                    background: "#2563EB",
                                    color: "#FFFFFF",
                                    borderRadius: 10,
                                    padding: "14px 32px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                                    transition: "all 0.15s ease",
                                }, onMouseEnter: (e) => {
                                    e.currentTarget.style.background = "#1D4ED8";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }, onMouseLeave: (e) => {
                                    e.currentTarget.style.background = "#2563EB";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }, children: "Crear mi primera ruta gratis \u2192" }), _jsx(Link, { to: "/login", style: {
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: "#CBD5E1",
                                    textDecoration: "none",
                                    padding: "14px 20px",
                                }, onMouseEnter: (e) => (e.currentTarget.style.color = "#FFFFFF"), onMouseLeave: (e) => (e.currentTarget.style.color = "#CBD5E1"), children: "Ya tengo cuenta: Iniciar sesi\u00F3n" })] })] }) }) }));
}
// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
    return (_jsx("footer", { style: {
            borderTop: "1px solid #E2E8F0",
            padding: "44px 24px",
            background: "#FFFFFF",
        }, children: _jsxs("div", { style: {
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
            }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [_jsx("div", { style: {
                                width: 28,
                                height: 28,
                                borderRadius: 7,
                                background: "#EFF6FF",
                                border: "1px solid #DBEAFE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }, children: _jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2.2", children: [_jsx("path", { d: "M22 10v6M2 10l10-5 10 5-10 5z" }), _jsx("path", { d: "M6 12v5c3 3 9 3 12 0v-5" })] }) }), _jsx("span", { style: { fontSize: 15, fontWeight: 800, color: "#0F172A" }, children: "Adaptative" }), _jsx("span", { style: { fontSize: 15, fontWeight: 700, color: "#2563EB" }, children: "Master" })] }), _jsx("div", { style: { display: "flex", gap: 24 }, children: ["Privacidad", "Términos de servicio", "Soporte", "Contacto"].map((item) => (_jsx("a", { href: "#", style: {
                            fontSize: 13,
                            color: "#64748B",
                            textDecoration: "none",
                            transition: "color 0.15s ease",
                        }, onMouseEnter: (e) => (e.currentTarget.style.color = "#0F172A"), onMouseLeave: (e) => (e.currentTarget.style.color = "#64748B"), children: item }, item))) }), _jsx("p", { style: { fontSize: 13, color: "#94A3B8", margin: 0 }, children: "\u00A9 2026 Adaptative Master. Todos los derechos reservados." })] }) }));
}
// ── Landing Page Wrapper ────────────────────────────────────────────────────
function Landing() {
    return (_jsxs("div", { style: { background: "#FFFFFF", minHeight: "100vh", color: "#0F172A" }, children: [_jsx(Nav, {}), _jsx(Hero, {}), _jsx(StatsBanner, {}), _jsx(HowItWorks, {}), _jsx(Features, {}), _jsx(Testimonials, {}), _jsx(FinalCTA, {}), _jsx(Footer, {})] }));
}
// ── Main App Router ─────────────────────────────────────────────────────────
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/registro", element: _jsx(Register, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) })] }) }));
}
