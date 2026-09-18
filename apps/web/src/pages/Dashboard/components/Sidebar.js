import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const NAV_MAIN = [
    {
        id: "inicio",
        label: "Inicio",
        icon: (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: _jsx("path", { d: "M2 7.5L9 2L16 7.5V16H11.5V12H6.5V16H2V7.5Z", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round", fill: "none" }) })),
    },
    {
        id: "aprendizaje",
        label: "Mi aprendizaje",
        icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [_jsx("path", { d: "M9 2L16 5.5V9C16 12.5 13 15.5 9 17C5 15.5 2 12.5 2 9V5.5L9 2Z", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round", fill: "none" }), _jsx("path", { d: "M6 9L8 11L12 7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })] })),
        badge: 3,
    },
    {
        id: "social",
        label: "Aprender con otros",
        icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [_jsx("circle", { cx: "6.5", cy: "6", r: "2.5", stroke: "currentColor", strokeWidth: "1.6", fill: "none" }), _jsx("circle", { cx: "11.5", cy: "6", r: "2.5", stroke: "currentColor", strokeWidth: "1.6", fill: "none" }), _jsx("path", { d: "M1 15C1 12.5 3.5 11 6.5 11", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }), _jsx("path", { d: "M17 15C17 12.5 14.5 11 11.5 11C10.5 11 9.5 11.3 8.7 11.7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" })] })),
        live: true,
    },
    {
        id: "tutor",
        label: "Tutor IA",
        icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [_jsx("rect", { x: "2", y: "2", width: "14", height: "10", rx: "3", stroke: "currentColor", strokeWidth: "1.6", fill: "none" }), _jsx("path", { d: "M5 16L9 13L13 16", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("circle", { cx: "6", cy: "7", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "9", cy: "7", r: "1", fill: "currentColor" }), _jsx("circle", { cx: "12", cy: "7", r: "1", fill: "currentColor" })] })),
    },
    {
        id: "progreso",
        label: "Mi progreso",
        icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [_jsx("polyline", { points: "2,14 6,9 9,11 13,5 16,7", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }), _jsx("circle", { cx: "16", cy: "7", r: "1.5", fill: "currentColor" })] })),
    },
];
const NAV_BOTTOM = [
    {
        id: "config",
        label: "Configuración",
        icon: (_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 17 17", fill: "none", children: [_jsx("circle", { cx: "8.5", cy: "8.5", r: "2.5", stroke: "currentColor", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M8.5 1.5V3M8.5 14V15.5M1.5 8.5H3M14 8.5H15.5M3.6 3.6L4.7 4.7M12.3 12.3L13.4 13.4M3.6 13.4L4.7 12.3M12.3 4.7L13.4 3.6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })] })),
    },
    {
        id: "ayuda",
        label: "Ayuda",
        icon: (_jsxs("svg", { width: "17", height: "17", viewBox: "0 0 17 17", fill: "none", children: [_jsx("circle", { cx: "8.5", cy: "8.5", r: "7", stroke: "currentColor", strokeWidth: "1.5", fill: "none" }), _jsx("path", { d: "M6.5 6.5C6.5 5.4 7.4 4.5 8.5 4.5C9.6 4.5 10.5 5.4 10.5 6.5C10.5 7.6 8.5 8.5 8.5 9.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }), _jsx("circle", { cx: "8.5", cy: "12", r: "0.8", fill: "currentColor" })] })),
    },
];
function NavItem({ id, label, icon, badge, live, active, onClick, small }) {
    const [hovered, setHovered] = useState(false);
    return (_jsxs("button", { onClick: onClick, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            padding: small ? "9px 14px" : "11px 14px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: active
                ? "rgba(232,185,74,0.12)"
                : hovered
                    ? "rgba(245,243,238,0.05)"
                    : "transparent",
            color: active ? "#E8B94A" : hovered ? "#F5F3EE" : "#8FA8AA",
            transition: "background 0.18s, color 0.18s",
            textAlign: "left",
            position: "relative",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    left: 0,
                    top: "20%",
                    bottom: "20%",
                    width: 3,
                    borderRadius: 4,
                    background: "#E8B94A",
                    opacity: active ? 1 : 0,
                    transition: "opacity 0.18s",
                } }), _jsx("span", { style: {
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: active ? "rgba(232,185,74,0.15)" : "transparent",
                    transition: "background 0.18s",
                }, children: icon }), _jsx("span", { style: {
                    fontFamily: "Inter, sans-serif",
                    fontSize: small ? 13 : 14,
                    fontWeight: active ? 600 : 400,
                    letterSpacing: "0.01em",
                    flex: 1,
                    transition: "font-weight 0.1s",
                }, children: label }), badge && (_jsx("span", { style: {
                    background: "#E8B94A",
                    color: "#0F2A2E",
                    borderRadius: 10,
                    padding: "2px 7px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                }, children: badge })), live && (_jsxs("span", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "rgba(242,99,123,0.15)",
                    borderRadius: 10,
                    padding: "2px 8px",
                    flexShrink: 0,
                }, children: [_jsx("span", { style: {
                            width: 5,
                            height: 5,
                            background: "#F2637B",
                            borderRadius: "50%",
                            display: "inline-block",
                        } }), _jsx("span", { style: { fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 600, color: "#F2637B", letterSpacing: "0.06em" }, children: "EN VIVO" })] }))] }));
}
export function Sidebar({ active, setActive, user, onLogout }) {
    return (_jsxs("aside", { style: {
            width: 256,
            background: "#0F2A2E",
            borderRight: "1px solid rgba(245,243,238,0.07)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        }, children: [_jsx("div", { style: {
                    padding: "24px 20px 20px",
                    borderBottom: "1px solid rgba(245,243,238,0.06)",
                }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [_jsx("div", { style: {
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background: "linear-gradient(135deg, #E8B94A 0%, #C49A33 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }, children: _jsxs("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [_jsx("path", { d: "M3 14 C3 9 6 6 9 3 C12 6 15 9 15 14", stroke: "#0F2A2E", strokeWidth: "2", strokeLinecap: "round", fill: "none" }), _jsx("circle", { cx: "9", cy: "14", r: "2", fill: "#0F2A2E" })] }) }), _jsxs("div", { children: [_jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 4 }, children: [_jsx("span", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, fontWeight: 900, color: "#F5F3EE", letterSpacing: "-0.02em" }, children: "Adaptative" }), _jsx("span", { style: { fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, fontWeight: 400, fontStyle: "italic", color: "#E8B94A", letterSpacing: "-0.01em" }, children: "Master" })] }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 10, color: "#8FA8AA", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }, children: "Tu ruta personalizada" })] })] }) }), _jsx("nav", { style: { flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }, children: NAV_MAIN.map((item) => (_jsx(NavItem, { ...item, active: active === item.id, onClick: () => setActive(item.id) }, item.id))) }), _jsx("div", { style: { borderTop: "1px solid rgba(245,243,238,0.06)", padding: "10px 10px 8px", display: "flex", flexDirection: "column", gap: 2 }, children: NAV_BOTTOM.map((item) => (_jsx(NavItem, { ...item, active: active === item.id, onClick: () => setActive(item.id), small: true }, item.id))) }), _jsxs("div", { style: {
                    margin: "6px 10px 12px",
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#173C3E",
                    border: "1px solid rgba(245,243,238,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    transition: "background 0.18s",
                }, onMouseEnter: e => (e.currentTarget.style.background = "#1E4A4D"), onMouseLeave: e => (e.currentTarget.style.background = "#173C3E"), onClick: () => setActive("perfil"), title: "Ver perfil", children: [_jsx("div", { style: {
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #E8B94A, #F2637B)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Inter, sans-serif",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#0F2A2E",
                            flexShrink: 0,
                            textTransform: "uppercase",
                        }, children: user?.nombre ? user.nombre.substring(0, 2) : 'US' }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600, color: "#F5F3EE", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: user?.nombre }), _jsx("p", { style: { fontFamily: "Inter, sans-serif", fontSize: 11, color: "#8FA8AA", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: user?.email })] }), _jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", style: { flexShrink: 0, color: "#8FA8AA" }, children: _jsx("path", { d: "M5 3L9 7L5 11", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) })] })] }));
}
