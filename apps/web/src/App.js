import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
// ── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
    const [open, setOpen] = useState(false);
    return (_jsx("nav", { style: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgba(15,42,46,0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(245,243,238,0.07)",
        }, children: _jsxs("div", { style: {
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 32px",
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }, children: [_jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 5 }, children: [_jsx("span", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 900, color: "#F5F3EE", letterSpacing: "-0.02em" }, children: "Adaptative" }), _jsx("span", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: "#E8B94A", letterSpacing: "-0.01em" }, children: "Master" })] }), _jsx("div", { style: { display: "flex", alignItems: "center", gap: 36 }, className: "nav-desktop", children: ["Cómo funciona", "Características", "Testimonios", "Precios"].map((l) => (_jsx("a", { href: "#", style: { fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A8A49C", textDecoration: "none", transition: "color 0.2s" }, onMouseEnter: e => (e.currentTarget.style.color = "#F5F3EE"), onMouseLeave: e => (e.currentTarget.style.color = "#A8A49C"), children: l }, l))) }), _jsx(Link, { to: "/registro", style: {
                        fontFamily: "Inter, sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        background: "#E8B94A",
                        color: "#0F2A2E",
                        borderRadius: 8,
                        padding: "9px 20px",
                        textDecoration: "none",
                        letterSpacing: "0.01em",
                        transition: "opacity 0.2s",
                        flexShrink: 0,
                    }, onMouseEnter: e => (e.currentTarget.style.opacity = "0.85"), onMouseLeave: e => (e.currentTarget.style.opacity = "1"), children: "Empezar gratis" })] }) }));
}
// ── Trail SVG (decorative, hero right side) ──────────────────────────────────
function TrailIllustration() {
    return (_jsxs("div", { style: { position: "relative", width: "100%", height: "100%" }, children: [_jsx("div", { style: {
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 380,
                    height: 380,
                    background: "radial-gradient(circle, rgba(232,185,74,0.12) 0%, transparent 70%)",
                    borderRadius: "50%",
                } }), _jsxs("svg", { viewBox: "0 0 440 680", width: "100%", height: "100%", xmlns: "http://www.w3.org/2000/svg", children: [[
                        "M 30 120 C 80 100 140 130 200 115 C 260 100 320 128 410 112",
                        "M 20 230 C 70 210 130 245 190 228 C 250 211 310 240 415 225",
                        "M 25 350 C 75 330 135 362 195 345 C 255 328 315 358 410 342",
                        "M 18 460 C 68 440 128 472 188 455 C 248 438 308 468 408 452",
                        "M 22 565 C 72 545 132 578 192 560 C 252 542 312 572 405 558",
                    ].map((d, i) => (_jsx("path", { d: d, fill: "none", stroke: "#2A5558", strokeWidth: "1", opacity: "0.5", strokeDasharray: "7 5" }, i))), _jsx("path", { d: "M 220 40 C 260 90 300 130 280 185 C 258 242 160 258 140 315 C 118 372 195 408 230 460", fill: "none", stroke: "#E8B94A", strokeWidth: "3.5", strokeLinecap: "round", opacity: "0.9" }), _jsx("path", { d: "M 230 460 C 268 514 310 548 295 600 C 278 652 200 668 185 640", fill: "none", stroke: "#2A5558", strokeWidth: "3", strokeLinecap: "round", strokeDasharray: "9 6", opacity: "0.65" }), [
                        { x: 280, y: 108, label: "1 km" },
                        { x: 120, y: 288, label: "2 km" },
                        { x: 255, y: 435, label: "3 km" },
                        { x: 310, y: 575, label: "4 km" },
                    ].map((m, i) => (_jsxs("g", { opacity: "0.4", children: [_jsx("line", { x1: m.x - 6, y1: m.y, x2: m.x + 6, y2: m.y, stroke: "#A8A49C", strokeWidth: "1" }), _jsx("text", { x: m.x, y: m.y - 7, fontSize: "8", fill: "#A8A49C", fontFamily: "Inter, sans-serif", textAnchor: "middle", letterSpacing: "0.06em", children: m.label })] }, i))), [
                        { x: 60, y: 185, icon: "▲" },
                        { x: 375, y: 310, icon: "◆" },
                        { x: 55, y: 500, icon: "▲" },
                    ].map((t, i) => (_jsx("text", { x: t.x, y: t.y, fontSize: "10", fill: "#2A5558", opacity: "0.6", textAnchor: "middle", fontFamily: "sans-serif", children: t.icon }, i))), [
                        { x: 220, y: 40 },
                        { x: 280, y: 182 },
                        { x: 142, y: 313 },
                    ].map((n, i) => (_jsxs("g", { children: [_jsx("circle", { cx: n.x, cy: n.y, r: 16, fill: "#E8B94A" }), _jsx("text", { x: n.x, y: n.y + 5, textAnchor: "middle", fontSize: "11", fill: "#0F2A2E", fontWeight: "700", fontFamily: "Inter, sans-serif", children: "\u2713" })] }, i))), _jsx("circle", { cx: 230, cy: 460, r: 34, fill: "rgba(232,185,74,0.08)" }), _jsx("circle", { cx: 230, cy: 460, r: 26, fill: "rgba(232,185,74,0.13)" }), _jsx("circle", { cx: 230, cy: 460, r: 20, fill: "#E8B94A", stroke: "#F5F3EE", strokeWidth: "2.5", className: "node-active-pulse" }), _jsx("text", { x: 230, y: 465, textAnchor: "middle", fontSize: "11", fill: "#0F2A2E", fontWeight: "700", fontFamily: "Inter, sans-serif", children: "4" }), [
                        { x: 295, y: 598 },
                        { x: 188, y: 638 },
                    ].map((n, i) => (_jsxs("g", { opacity: "0.4", children: [_jsx("circle", { cx: n.x, cy: n.y, r: 14, fill: "none", stroke: "#2A5558", strokeWidth: "2" }), _jsx("text", { x: n.x, y: n.y + 5, textAnchor: "middle", fontSize: "10", fill: "#A8A49C", fontFamily: "Inter, sans-serif", children: i + 5 })] }, i))), _jsxs("g", { opacity: "0.55", children: [_jsx("circle", { cx: 185, cy: 640, r: 18, fill: "none", stroke: "#E8B94A", strokeWidth: "2", strokeDasharray: "5 3" }), _jsx("text", { x: 185, y: 646, textAnchor: "middle", fontSize: "15", fill: "#E8B94A", children: "\uD83C\uDFC6" })] }), _jsxs("g", { transform: "translate(262, 420)", children: [_jsx("rect", { x: "0", y: "0", width: "136", height: "54", rx: "10", fill: "#173C3E", stroke: "rgba(232,185,74,0.4)", strokeWidth: "1" }), _jsx("text", { x: "12", y: "18", fontSize: "9", fill: "#A8A49C", fontFamily: "Inter, sans-serif", letterSpacing: "0.08em", children: "LECCI\u00D3N ACTIVA" }), _jsx("text", { x: "12", y: "34", fontSize: "13", fill: "#F5F3EE", fontFamily: "'Fraunces', Georgia, serif", fontWeight: "600", children: "C\u00E1lculo diferencial" }), _jsx("text", { x: "12", y: "48", fontSize: "10", fill: "#E8B94A", fontFamily: "Inter, sans-serif", children: "Continuar \u2192" })] })] })] }));
}
// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
    return (_jsxs("section", { style: {
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 32px 60px",
            gap: 48,
        }, className: "hero-grid", children: [_jsxs("div", { children: [_jsxs("div", { style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "rgba(232,185,74,0.1)",
                            border: "1px solid rgba(232,185,74,0.25)",
                            borderRadius: 20,
                            padding: "6px 14px",
                            marginBottom: 28,
                        }, children: [_jsx("div", { style: { width: 6, height: 6, background: "#E8B94A", borderRadius: "50%" } }), _jsx("span", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#E8B94A", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }, children: "Rutas de aprendizaje con IA" })] }), _jsx("h1", { style: {
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: "clamp(40px, 5vw, 64px)",
                            fontWeight: 900,
                            color: "#F5F3EE",
                            margin: "0 0 8px",
                            lineHeight: 1.08,
                            letterSpacing: "-0.03em",
                        }, children: "Aprende a tu ritmo," }), _jsx("h1", { style: {
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: "clamp(40px, 5vw, 64px)",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "#E8B94A",
                            margin: "0 0 28px",
                            lineHeight: 1.08,
                            letterSpacing: "-0.02em",
                        }, children: "no al de todos." }), _jsx("p", { style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: 18,
                            color: "#A8A49C",
                            lineHeight: 1.65,
                            margin: "0 0 40px",
                            maxWidth: 440,
                        }, children: "Adaptative Master analiza c\u00F3mo aprendes y construye un sendero de estudio \u00FAnico para ti \u2014 no un temario gen\u00E9rico, sino una ruta que se adapta en tiempo real." }), _jsxs("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" }, children: [_jsx(Link, { to: "/registro", style: {
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: 15,
                                    fontWeight: 700,
                                    background: "#E8B94A",
                                    color: "#0F2A2E",
                                    borderRadius: 10,
                                    padding: "14px 28px",
                                    textDecoration: "none",
                                    letterSpacing: "0.01em",
                                    transition: "opacity 0.2s, transform 0.2s",
                                }, onMouseEnter: e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }, onMouseLeave: e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }, children: "Empieza gratis" }), _jsx("a", { href: "#como-funciona", style: {
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: "#F5F3EE",
                                    border: "1px solid rgba(245,243,238,0.2)",
                                    borderRadius: 10,
                                    padding: "14px 24px",
                                    textDecoration: "none",
                                    transition: "border-color 0.2s",
                                }, onMouseEnter: e => (e.currentTarget.style.borderColor = "rgba(245,243,238,0.5)"), onMouseLeave: e => (e.currentTarget.style.borderColor = "rgba(245,243,238,0.2)"), children: "Ver c\u00F3mo funciona" })] }), _jsxs("div", { style: { marginTop: 48, display: "flex", alignItems: "center", gap: 20 }, children: [_jsx("div", { style: { display: "flex" }, children: ["#E8B94A", "#F2637B", "#7EC8C8", "#A8A49C", "#F5F3EE"].map((c, i) => (_jsx("div", { style: {
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${c}88, ${c})`,
                                        border: "2px solid #0F2A2E",
                                        marginLeft: i === 0 ? 0 : -8,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: "#0F2A2E",
                                        fontFamily: "Inter, sans-serif",
                                    }, children: ["MR", "CA", "JP", "LV", "SO"][i] }, i))) }), _jsxs("div", { children: [_jsx("div", { style: { display: "flex", gap: 2, marginBottom: 3 }, children: Array.from({ length: 5 }).map((_, i) => (_jsx("svg", { width: "12", height: "12", viewBox: "0 0 13 13", children: _jsx("polygon", { points: "6.5,1 7.9,4.8 12,5.1 9,7.8 10,12 6.5,9.7 3,12 4,7.8 1,5.1 5.1,4.8", fill: "#E8B94A" }) }, i))) }), _jsxs("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#A8A49C", margin: 0 }, children: [_jsx("strong", { style: { color: "#F5F3EE" }, children: "+12 000" }), " estudiantes ya en su ruta"] })] })] })] }), _jsx("div", { style: { height: 580, position: "relative" }, className: "hero-trail", children: _jsx(TrailIllustration, {}) })] }));
}
// ── How it works ─────────────────────────────────────────────────────────────
const STEPS = [
    {
        num: "01",
        title: "Haz el diagnóstico inicial",
        body: "Responde una evaluación breve. La IA identifica lo que ya sabes, lo que necesitas reforzar y cómo procesas mejor la información.",
        icon: "◎",
    },
    {
        num: "02",
        title: "Recibe tu sendero personalizado",
        body: "En segundos, tienes una ruta de aprendizaje única: lecciones ordenadas según tu nivel, tiempo disponible y objetivos.",
        icon: "◈",
    },
    {
        num: "03",
        title: "La ruta se adapta contigo",
        body: "Si avanzas rápido, el sistema acelera. Si algo no queda claro, refuerza antes de seguir. No hay dos senderos iguales.",
        icon: "◊",
    },
];
function HowItWorks() {
    return (_jsx("section", { id: "como-funciona", style: { padding: "100px 32px", borderTop: "1px solid rgba(245,243,238,0.06)" }, children: _jsxs("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [_jsxs("div", { style: { maxWidth: 560, marginBottom: 64 }, children: [_jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#E8B94A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 16px" }, children: "C\u00F3mo funciona" }), _jsx("h2", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: "#F5F3EE", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }, children: "Tres pasos hacia tu versi\u00F3n m\u00E1s preparada" })] }), _jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }, className: "steps-grid", children: STEPS.map((s, i) => (_jsxs("div", { style: {
                            background: "#173C3E",
                            borderRadius: 20,
                            padding: "32px 28px",
                            border: "1px solid rgba(245,243,238,0.06)",
                            position: "relative",
                            overflow: "hidden",
                        }, children: [_jsx("div", { style: {
                                    position: "absolute",
                                    top: -10,
                                    right: 20,
                                    fontFamily: "'Fraunces', Georgia, serif",
                                    fontSize: 80,
                                    fontWeight: 900,
                                    color: "rgba(245,243,238,0.04)",
                                    lineHeight: 1,
                                    userSelect: "none",
                                }, children: s.num }), _jsx("div", { style: { fontSize: 28, marginBottom: 20, color: "#E8B94A" }, children: s.icon }), _jsx("h3", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#F5F3EE", margin: "0 0 12px", lineHeight: 1.25 }, children: s.title }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 14, color: "#A8A49C", lineHeight: 1.65, margin: 0 }, children: s.body })] }, i))) })] }) }));
}
// ── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
    {
        icon: "⚡",
        color: "#F2637B",
        title: "Aprendizaje en vivo",
        body: "Únete a sesiones en tiempo real con otros estudiantes. Estudia acompañado sin perder tu ritmo personal.",
    },
    {
        icon: "✦",
        color: "#E8B94A",
        title: "Tutor de IA disponible 24/7",
        body: "Pregunta lo que sea cuando lo necesites. Tu tutor conoce exactamente dónde estás en tu sendero.",
    },
    {
        icon: "◎",
        color: "#7EC8C8",
        title: "Progreso visible",
        body: "El sendero de aprendizaje muestra dónde estás, cuánto has avanzado y qué logro te espera al final.",
    },
    {
        icon: "◆",
        color: "#E8B94A",
        title: "Contenido de cualquier área",
        body: "Matemáticas, idiomas, programación, historia. Adaptative Master genera rutas para el tema que necesites.",
    },
    {
        icon: "◈",
        color: "#F2637B",
        title: "Sin currículo genérico",
        body: "La IA descarta lo que ya sabes y se concentra en lo que te falta. Cero tiempo desperdiciado.",
    },
    {
        icon: "▲",
        color: "#7EC8C8",
        title: "Rachas y logros reales",
        body: "Cada día que estudias suma. Los hitos del sendero celebran el avance real, no el tiempo en pantalla.",
    },
];
function Features() {
    return (_jsx("section", { style: { padding: "100px 32px", background: "rgba(23,60,62,0.35)", borderTop: "1px solid rgba(245,243,238,0.06)" }, children: _jsxs("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [_jsxs("div", { style: { maxWidth: 540, marginBottom: 64 }, children: [_jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#E8B94A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 16px" }, children: "Caracter\u00EDsticas" }), _jsx("h2", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: "#F5F3EE", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }, children: "Todo lo que necesitas para aprender de verdad" })] }), _jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }, className: "features-grid", children: FEATURES.map((f, i) => (_jsxs("div", { style: {
                            padding: "28px 24px",
                            borderRadius: 16,
                            border: "1px solid rgba(245,243,238,0.07)",
                            transition: "border-color 0.2s, background 0.2s",
                            cursor: "default",
                        }, onMouseEnter: e => { e.currentTarget.style.background = "#173C3E"; e.currentTarget.style.borderColor = "rgba(245,243,238,0.12)"; }, onMouseLeave: e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(245,243,238,0.07)"; }, children: [_jsx("div", { style: {
                                    width: 42,
                                    height: 42,
                                    borderRadius: 12,
                                    background: `${f.color}18`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 20,
                                    color: f.color,
                                    marginBottom: 18,
                                }, children: f.icon }), _jsx("h3", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#F5F3EE", margin: "0 0 10px", lineHeight: 1.25 }, children: f.title }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#A8A49C", lineHeight: 1.65, margin: 0 }, children: f.body })] }, i))) })] }) }));
}
// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
    {
        quote: "Llevaba meses con el mismo libro de cálculo sin entender nada. En tres semanas con Adaptative Master llegué al punto donde me había atascado — y lo superé.",
        name: "Marcos Reyes",
        role: "Estudiante de Ingeniería, UNAM",
        initials: "MR",
        color: "#E8B94A",
    },
    {
        quote: "Lo que más me gusta es que no me hace repetir lo que ya sé. Empecé por inglés B2 y en dos semanas ya iba directo a lo que necesitaba para el examen.",
        name: "Carla Andrade",
        role: "Profesional en transición, Bogotá",
        initials: "CA",
        color: "#F2637B",
    },
    {
        quote: "El tutor de IA es distinto a cualquier chatbot que he probado. Sabe exactamente en qué lección estoy y me explica justo desde ahí, sin contexto extra.",
        name: "Jorge Palacios",
        role: "Docente de secundaria, México",
        initials: "JP",
        color: "#7EC8C8",
    },
];
function Testimonials() {
    return (_jsx("section", { style: { padding: "100px 32px", borderTop: "1px solid rgba(245,243,238,0.06)" }, children: _jsxs("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [_jsxs("div", { style: { maxWidth: 480, marginBottom: 64 }, children: [_jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#E8B94A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 16px" }, children: "Testimonios" }), _jsx("h2", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: "#F5F3EE", margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em" }, children: "Lo que dicen quienes ya recorren su sendero" })] }), _jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }, className: "testimonials-grid", children: TESTIMONIALS.map((t, i) => (_jsxs("div", { style: {
                            background: "#173C3E",
                            borderRadius: 20,
                            padding: "32px 28px",
                            border: "1px solid rgba(245,243,238,0.06)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }, children: [_jsx("div", { style: { display: "flex", gap: 3 }, children: Array.from({ length: 5 }).map((_, j) => (_jsx("svg", { width: "13", height: "13", viewBox: "0 0 13 13", children: _jsx("polygon", { points: "6.5,1 7.9,4.8 12,5.1 9,7.8 10,12 6.5,9.7 3,12 4,7.8 1,5.1 5.1,4.8", fill: "#E8B94A" }) }, j))) }), _jsxs("p", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, fontStyle: "italic", color: "#F5F3EE", lineHeight: 1.65, margin: 0, flex: 1 }, children: ["\"", t.quote, "\""] }), _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [_jsx("div", { style: {
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background: `${t.color}30`,
                                            border: `2px solid ${t.color}60`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontFamily: "Inter, sans-serif",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: t.color,
                                        }, children: t.initials }), _jsxs("div", { children: [_jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#F5F3EE", margin: 0 }, children: t.name }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#A8A49C", margin: 0 }, children: t.role })] })] })] }, i))) })] }) }));
}
// ── Stats banner ─────────────────────────────────────────────────────────────
const STATS = [
    { value: "12 000+", label: "Estudiantes activos" },
    { value: "94%", label: "Completan su primera ruta" },
    { value: "3×", label: "Más rápido que un curso genérico" },
    { value: "47", label: "Áreas de conocimiento" },
];
function StatsBanner() {
    return (_jsx("div", { style: {
            background: "#173C3E",
            borderTop: "1px solid rgba(245,243,238,0.06)",
            borderBottom: "1px solid rgba(245,243,238,0.06)",
            padding: "48px 32px",
        }, children: _jsx("div", { style: {
                maxWidth: 1200,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 24,
                textAlign: "center",
            }, className: "stats-grid", children: STATS.map((s, i) => (_jsxs("div", { children: [_jsx("p", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 900, color: "#E8B94A", margin: "0 0 6px", letterSpacing: "-0.02em" }, children: s.value }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 13, color: "#A8A49C", margin: 0, letterSpacing: "0.04em" }, children: s.label })] }, i))) }) }));
}
// ── CTA final ─────────────────────────────────────────────────────────────────
function FinalCTA() {
    return (_jsxs("section", { style: { padding: "120px 32px", textAlign: "center", position: "relative", overflow: "hidden" }, children: [_jsx("div", { style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    height: 400,
                    background: "radial-gradient(ellipse, rgba(232,185,74,0.07) 0%, transparent 65%)",
                    pointerEvents: "none",
                } }), _jsxs("div", { style: { maxWidth: 680, margin: "0 auto", position: "relative" }, children: [_jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#E8B94A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 20 }, children: "Tu ruta empieza hoy" }), _jsx("h2", { style: {
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: "clamp(34px, 5vw, 58px)",
                            fontWeight: 900,
                            color: "#F5F3EE",
                            margin: "0 0 12px",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                        }, children: "Deja de estudiar a ciegas." }), _jsx("h2", { style: {
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: "clamp(34px, 5vw, 58px)",
                            fontWeight: 400,
                            fontStyle: "italic",
                            color: "#E8B94A",
                            margin: "0 0 32px",
                            lineHeight: 1.1,
                            letterSpacing: "-0.01em",
                        }, children: "Sigue tu propio sendero." }), _jsxs("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 16, color: "#A8A49C", lineHeight: 1.65, marginBottom: 44 }, children: ["Diagn\u00F3stico gratuito. Sin tarjeta de cr\u00E9dito.", _jsx("br", {}), "Tu primera ruta en menos de 2 minutos."] }), _jsx(Link, { to: "/registro", style: {
                            display: "inline-block",
                            fontFamily: "Inter, sans-serif",
                            fontSize: 16,
                            fontWeight: 700,
                            background: "#E8B94A",
                            color: "#0F2A2E",
                            borderRadius: 12,
                            padding: "16px 36px",
                            textDecoration: "none",
                            letterSpacing: "0.01em",
                            transition: "opacity 0.2s, transform 0.2s",
                            boxShadow: "0 8px 32px rgba(232,185,74,0.25)",
                        }, onMouseEnter: e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }, onMouseLeave: e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }, children: "Crear mi ruta gratis" })] })] }));
}
// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
    return (_jsx("footer", { style: {
            borderTop: "1px solid rgba(245,243,238,0.08)",
            padding: "48px 32px",
        }, children: _jsxs("div", { style: {
                maxWidth: 1200,
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 20,
            }, children: [_jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 5 }, children: [_jsx("span", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 900, color: "#F5F3EE" }, children: "Adaptative" }), _jsx("span", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 400, fontStyle: "italic", color: "#E8B94A" }, children: "Master" })] }), _jsx("div", { style: { display: "flex", gap: 28 }, children: ["Privacidad", "Términos", "Contacto"].map((l) => (_jsx("a", { href: "#", style: { fontFamily: "Inter, sans-serif", fontSize: 13, color: "#A8A49C", textDecoration: "none" }, onMouseEnter: e => (e.currentTarget.style.color = "#F5F3EE"), onMouseLeave: e => (e.currentTarget.style.color = "#A8A49C"), children: l }, l))) }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 12, color: "#A8A49C", margin: 0 }, children: "\u00A9 2025 Adaptative Master" })] }) }));
}
// ── Root ──────────────────────────────────────────────────────────────────────
function Landing() {
    return (_jsxs("div", { style: { background: "#0F2A2E", minHeight: "100vh", color: "#F5F3EE" }, children: [_jsx(Nav, {}), _jsx(Hero, {}), _jsx(StatsBanner, {}), _jsx(HowItWorks, {}), _jsx(Features, {}), _jsx(Testimonials, {}), _jsx(FinalCTA, {}), _jsx(Footer, {})] }));
}
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/registro", element: _jsx(Register, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) })] }) }));
}
