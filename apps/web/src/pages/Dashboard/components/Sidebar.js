import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const NAV_MAIN = [
    {
        id: "inicio",
        label: "Inicio",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), _jsx("polyline", { points: "9 22 9 12 15 12 15 22" })] })),
    },
    {
        id: "aprendizaje",
        label: "Mi aprendizaje",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), _jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })] })),
    },
    {
        id: "social",
        label: "Aprender con otros",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }), _jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })] })),
        live: true,
    },
    {
        id: "tutor",
        label: "Tutor IA",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "10", rx: "2" }), _jsx("circle", { cx: "12", cy: "5", r: "2" }), _jsx("path", { d: "M12 7v4" }), _jsx("line", { x1: "8", y1: "16", x2: "8", y2: "16" }), _jsx("line", { x1: "16", y1: "16", x2: "16", y2: "16" })] })),
    },
    {
        id: "progreso",
        label: "Mi progreso",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "20", x2: "18", y2: "10" }), _jsx("line", { x1: "12", y1: "20", x2: "12", y2: "4" }), _jsx("line", { x1: "6", y1: "20", x2: "6", y2: "14" })] })),
    },
];
const NAV_BOTTOM = [
    {
        id: "config",
        label: "Configuración",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "3" }), _jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })] })),
    },
    {
        id: "ayuda",
        label: "Centro de ayuda",
        icon: (active) => (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: active ? "#2563EB" : "#64748B", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }), _jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })] })),
    },
];
function NavItem({ id, label, icon, badge, live, active, onClick, small }) {
    const [hovered, setHovered] = useState(false);
    return (_jsxs("button", { onClick: onClick, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), style: {
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            padding: small ? "8px 12px" : "10px 12px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: active
                ? "#EFF6FF"
                : hovered
                    ? "#F8FAFC"
                    : "transparent",
            color: active ? "#1D4ED8" : hovered ? "#0F172A" : "#475569",
            transition: "all 0.15s ease",
            textAlign: "left",
            position: "relative",
            fontWeight: active ? 600 : 500,
            fontSize: small ? 13 : 14,
            fontFamily: "'Open Sans', system-ui, sans-serif",
        }, children: [_jsx("div", { style: {
                    position: "absolute",
                    left: 0,
                    top: "22%",
                    bottom: "22%",
                    width: 3,
                    borderRadius: "0 3px 3px 0",
                    background: "#2563EB",
                    opacity: active ? 1 : 0,
                    transition: "opacity 0.15s",
                } }), _jsx("span", { style: {
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                }, children: icon(active) }), _jsx("span", { style: {
                    flex: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }, children: label }), badge !== undefined && (_jsx("span", { style: {
                    background: "#EFF6FF",
                    color: "#2563EB",
                    border: "1px solid #DBEAFE",
                    borderRadius: 12,
                    padding: "1px 7px",
                    fontSize: 11,
                    fontWeight: 600,
                    flexShrink: 0,
                }, children: badge })), live && (_jsxs("span", { style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "#ECFDF5",
                    color: "#047857",
                    border: "1px solid #A7F3D0",
                    borderRadius: 10,
                    padding: "2px 6px",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    flexShrink: 0,
                }, children: [_jsx("span", { style: {
                            width: 5,
                            height: 5,
                            background: "#10B981",
                            borderRadius: "50%",
                            display: "inline-block",
                        } }), "Pronto"] }))] }));
}
export function Sidebar({ active, setActive, user, onLogout }) {
    return (_jsxs("aside", { style: {
            width: 260,
            background: "#FFFFFF",
            borderRight: "1px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            height: "100%",
            flexShrink: 0,
            userSelect: "none"
        }, children: [_jsx("div", { style: {
                    padding: "20px 20px 18px",
                    borderBottom: "1px solid #F1F5F9",
                }, children: _jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [_jsx("div", { style: {
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: "#EFF6FF",
                                border: "1px solid #DBEAFE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }, children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "#2563EB", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M22 10v6M2 10l10-5 10 5-10 5z" }), _jsx("path", { d: "M6 12v5c3 3 9 3 12 0v-5" })] }) }), _jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 3 }, children: [_jsx("span", { style: { fontSize: 16, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.01em" }, children: "Adaptative" }), _jsx("span", { style: { fontSize: 16, fontWeight: 700, color: "#2563EB" }, children: "Master" })] }), _jsx("span", { style: { fontSize: 11, color: "#64748B", fontWeight: 500 }, children: "EstudiLab AI" })] })] }) }), _jsxs("div", { style: { flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }, children: [_jsx("div", { style: { padding: "4px 10px 8px", fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }, children: "Men\u00FA principal" }), NAV_MAIN.map((item) => (_jsx(NavItem, { ...item, active: active === item.id, onClick: () => setActive(item.id) }, item.id)))] }), _jsxs("div", { style: { borderTop: "1px solid #F1F5F9", padding: "12px 12px 6px", display: "flex", flexDirection: "column", gap: 2 }, children: [_jsx("div", { style: { padding: "4px 10px 6px", fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }, children: "Preferencias" }), NAV_BOTTOM.map((item) => (_jsx(NavItem, { ...item, active: active === item.id, onClick: () => setActive(item.id), small: true }, item.id)))] }), _jsxs("div", { style: {
                    margin: "8px 12px 16px",
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }, children: [_jsxs("div", { onClick: () => setActive("perfil"), style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            flex: 1,
                            minWidth: 0,
                            cursor: "pointer",
                        }, title: "Ver perfil", children: [_jsx("div", { style: {
                                    width: 34,
                                    height: 34,
                                    borderRadius: "50%",
                                    background: "#EFF6FF",
                                    border: "1px solid #DBEAFE",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "#2563EB",
                                    flexShrink: 0,
                                    textTransform: "uppercase",
                                }, children: user?.nombre ? user.nombre.substring(0, 2) : 'US' }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("p", { style: { fontSize: 13, fontWeight: 600, color: "#0F172A", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: user?.nombre || "Usuario" }), _jsx("p", { style: { fontSize: 11, color: "#64748B", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: user?.email || "estudiante@estudilab.ai" })] })] }), _jsx("button", { onClick: onLogout, title: "Cerrar sesi\u00F3n", style: {
                            background: "transparent",
                            border: "none",
                            color: "#94A3B8",
                            cursor: "pointer",
                            padding: 6,
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s ease",
                        }, onMouseEnter: (e) => {
                            e.currentTarget.style.color = "#DC2626";
                            e.currentTarget.style.background = "#FEF2F2";
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.color = "#94A3B8";
                            e.currentTarget.style.background = "transparent";
                        }, children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), _jsx("polyline", { points: "16 17 21 12 16 7" }), _jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })] }) })] })] }));
}
