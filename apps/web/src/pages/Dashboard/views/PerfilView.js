import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { auth } from "@adaptativemaster/shared";
export function PerfilView({ user: initialUser }) {
    const [user, setUser] = useState(initialUser);
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
        }
        catch (error) {
            console.error("Error al guardar perfil", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: {
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
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 20 }, children: [_jsx("div", { style: {
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
                                }, children: user?.nombre ? user.nombre.substring(0, 2) : "US" }), _jsxs("div", { children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: "#0F172A", margin: "0 0 4px" }, children: user?.nombre || nombre }), _jsx("p", { style: { margin: 0, color: "#64748B", fontSize: 13 }, children: user?.email })] })] }), _jsx("button", { style: {
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
                        }, onClick: () => {
                            if (isEditing) {
                                handleSave();
                            }
                            else {
                                setIsEditing(true);
                            }
                        }, disabled: loading, onMouseEnter: e => {
                            if (!isEditing) {
                                e.currentTarget.style.background = '#F8FAFC';
                                e.currentTarget.style.borderColor = '#94A3B8';
                            }
                        }, onMouseLeave: e => {
                            if (!isEditing) {
                                e.currentTarget.style.background = '#FFFFFF';
                                e.currentTarget.style.borderColor = '#CBD5E1';
                            }
                        }, children: loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Editar perfil" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }, children: [_jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: 24,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsx("h3", { style: { margin: '0 0 8px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }, children: "Nivel general" }), isEditing ? (_jsxs("select", { value: nivel, onChange: e => setNivel(e.target.value), style: {
                                    width: '100%',
                                    padding: '9px 12px',
                                    borderRadius: 8,
                                    background: '#FFFFFF',
                                    border: '1px solid #CBD5E1',
                                    color: '#0F172A',
                                    fontSize: 14,
                                    outline: 'none'
                                }, children: [_jsx("option", { value: "Principiante", children: "Principiante" }), _jsx("option", { value: "Intermedio", children: "Intermedio" }), _jsx("option", { value: "Avanzado", children: "Avanzado" })] })) : (_jsx("p", { style: { margin: 0, fontSize: 18, fontWeight: 700, color: '#0F172A' }, children: user?.nivel || "Intermedio" }))] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: 24,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsx("h3", { style: { margin: '0 0 8px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }, children: "Racha actual" }), _jsx("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: _jsxs("span", { style: { fontSize: 20, fontWeight: 700, color: '#0F172A' }, children: [rachas, " d\u00EDas activos"] }) })] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: 24,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            gridColumn: '1 / -1'
                        }, children: [_jsx("h3", { style: { margin: '0 0 12px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }, children: "\u00C1reas de inter\u00E9s" }), isEditing ? (_jsxs("div", { children: [_jsx("input", { type: "text", value: interesesText, onChange: e => setInteresesText(e.target.value), placeholder: "Ej. Python, Machine Learning, Matem\u00E1ticas, React", style: {
                                            width: '100%',
                                            padding: '10px 14px',
                                            borderRadius: 8,
                                            background: '#FFFFFF',
                                            border: '1px solid #CBD5E1',
                                            color: '#0F172A',
                                            fontSize: 14,
                                            outline: 'none'
                                        } }), _jsx("span", { style: { display: 'block', fontSize: 12, color: '#64748B', marginTop: 6 }, children: "Separa cada inter\u00E9s con una coma" })] })) : (_jsx("div", { style: { display: 'flex', gap: 8, flexWrap: 'wrap' }, children: user?.intereses && user.intereses.length > 0 ? (user.intereses.map(interes => (_jsx("span", { style: {
                                        background: '#EFF6FF',
                                        color: '#1D4ED8',
                                        border: '1px solid #DBEAFE',
                                        padding: '4px 12px',
                                        borderRadius: 16,
                                        fontSize: 13,
                                        fontWeight: 600
                                    }, children: interes }, interes)))) : (_jsx("span", { style: { color: '#64748B', fontSize: 13 }, children: "No has configurado intereses a\u00FAn." })) }))] }), _jsxs("div", { style: {
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: 12,
                            padding: 24,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            gridColumn: '1 / -1'
                        }, children: [_jsx("h3", { style: { margin: '0 0 12px', fontSize: 12, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }, children: "Objetivos de aprendizaje" }), isEditing ? (_jsx("textarea", { value: objetivos, onChange: e => setObjetivos(e.target.value), placeholder: "\u00BFQu\u00E9 metas o proyectos deseas alcanzar con tus estudios?", rows: 3, style: {
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: 8,
                                    background: '#FFFFFF',
                                    border: '1px solid #CBD5E1',
                                    color: '#0F172A',
                                    fontSize: 14,
                                    outline: 'none',
                                    resize: 'vertical'
                                } })) : (_jsx("p", { style: { margin: 0, fontSize: 14, color: '#334155', lineHeight: 1.6 }, children: user?.objetivos || _jsx("span", { style: { color: '#64748B' }, children: "A\u00FAn no has definido tus metas de estudio." }) }))] })] })] }));
}
