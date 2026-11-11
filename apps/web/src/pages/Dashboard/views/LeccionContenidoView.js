import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { iaClient, progresoClient } from "@adaptativemaster/shared";
export function LeccionContenidoView({ leccionId, onGoBack, onOpenTutor, onComplete }) {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    useEffect(() => {
        const fetchLeccion = async () => {
            if (!leccionId)
                return;
            const token = localStorage.getItem("token");
            if (!token)
                return;
            try {
                setLoading(true);
                const data = await iaClient.getLeccion(leccionId, token);
                setLesson(data);
                // Si no tiene contenido teórico y video_url, llamar a generar
                if (!data.contenido?.teoria) {
                    setIsGenerating(true);
                    try {
                        const updated = await iaClient.generarContenidoLeccion(leccionId, token);
                        setLesson(updated);
                    }
                    catch (genError) {
                        console.error("Error generando contenido de lección:", genError);
                    }
                    finally {
                        setIsGenerating(false);
                    }
                }
            }
            catch (error) {
                console.error("Error al obtener la lección:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchLeccion();
    }, [leccionId]);
    if (loading || isGenerating) {
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: '#0F172A', gap: 16 }, children: [_jsx("div", { style: {
                        width: 44,
                        height: 44,
                        border: '3px solid #E2E8F0',
                        borderTopColor: '#2563EB',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    } }), _jsx("p", { style: { fontSize: 16, fontWeight: 600, color: '#0F172A', margin: 0 }, children: isGenerating ? "Generando contenido personalizado de la lección..." : "Cargando lección..." })] }));
    }
    if (!lesson) {
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0', color: '#64748B' }, children: [_jsx("p", { children: "No se pudo cargar la informaci\u00F3n de la lecci\u00F3n." }), _jsx("button", { onClick: onGoBack, style: { marginTop: 16, padding: '9px 18px', background: '#0F172A', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600 }, children: "Volver al mapa" })] }));
    }
    return (_jsxs("div", { className: "animate-fade-in", style: {
            maxWidth: '860px',
            width: '100%',
            margin: '0 auto',
            padding: '24px 20px 48px',
            fontFamily: "'Open Sans', system-ui, sans-serif"
        }, children: [_jsxs("button", { onClick: onGoBack, style: {
                    background: 'transparent',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 24,
                    padding: 0,
                    fontSize: 14,
                    fontWeight: 500
                }, onMouseEnter: e => (e.currentTarget.style.color = '#0F172A'), onMouseLeave: e => (e.currentTarget.style.color = '#64748B'), children: [_jsx("span", { children: "\u2190" }), " Volver al mapa de la ruta"] }), _jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '28px 32px',
                    marginBottom: 24,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }, children: [_jsxs("div", { style: { display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }, children: [_jsx("span", { style: {
                                    fontSize: 11, fontWeight: 600, color: '#1D4ED8',
                                    background: '#EFF6FF', border: '1px solid #DBEAFE', padding: '3px 10px',
                                    borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em'
                                }, children: "Lecci\u00F3n te\u00F3rica" }), _jsxs("span", { style: { fontSize: 13, color: '#64748B', fontWeight: 500 }, children: ["M\u00F3dulo ", lesson.orden, " \u00B7 Nivel: ", lesson.dificultad] })] }), _jsx("h1", { style: {
                            fontSize: 26, fontWeight: 700, color: '#0F172A', margin: '0 0 12px',
                            letterSpacing: '-0.01em'
                        }, children: lesson.titulo }), _jsxs("div", { style: { display: 'flex', gap: 20, color: '#64748B', fontSize: 13 }, children: [_jsx("span", { children: "Duraci\u00F3n estimada: 15 min" }), _jsx("span", { children: "\u00B7" }), _jsx("span", { children: "Recompensa: +20 XP" })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }, children: [lesson.contenido?.video_url && (_jsx("div", { style: {
                            width: '100%', aspectRatio: '16/9', background: '#0F172A',
                            borderRadius: 14, overflow: 'hidden', border: '1px solid #E2E8F0',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                        }, children: _jsx("iframe", { width: "100%", height: "100%", src: lesson.contenido.video_url.replace("watch?v=", "embed/"), title: "Video de la lecci\u00F3n", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) })), _jsxs("div", { style: {
                            background: '#FFFFFF', borderRadius: 14, padding: '32px',
                            border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsx("h3", { style: { margin: '0 0 20px', fontSize: 18, color: '#0F172A', fontWeight: 700 }, children: "Contenido de estudio" }), _jsx("div", { className: "markdown-content", style: { color: '#334155', fontSize: 15, lineHeight: 1.8 }, children: lesson.contenido?.teoria ? (_jsx(ReactMarkdown, { children: lesson.contenido.teoria })) : ("No hay teoría disponible para esta lección.") })] }), lesson.contenido?.recursos_extra && lesson.contenido.recursos_extra.length > 0 && (_jsxs("div", { style: {
                            background: '#FFFFFF', borderRadius: 14, padding: 28,
                            border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsx("h3", { style: { margin: '0 0 16px', fontSize: 16, color: '#0F172A', fontWeight: 700 }, children: "Recursos de lectura recomendados" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 10 }, children: lesson.contenido.recursos_extra.map((rec, idx) => (_jsxs("a", { href: rec.url, target: "_blank", rel: "noreferrer", style: {
                                        display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                                        background: '#F8FAFC', borderRadius: 8, textDecoration: 'none',
                                        border: '1px solid #E2E8F0', transition: 'all 0.15s ease'
                                    }, onMouseEnter: e => {
                                        e.currentTarget.style.background = '#EFF6FF';
                                        e.currentTarget.style.borderColor = '#DBEAFE';
                                    }, onMouseLeave: e => {
                                        e.currentTarget.style.background = '#F8FAFC';
                                        e.currentTarget.style.borderColor = '#E2E8F0';
                                    }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsx("h4", { style: { margin: '0 0 2px', color: '#1D4ED8', fontSize: 14, fontWeight: 600 }, children: rec.titulo }), _jsx("p", { style: { margin: 0, color: '#64748B', fontSize: 12 }, children: rec.descripcion })] }), _jsx("span", { style: { color: '#94A3B8', fontSize: 16 }, children: "\u2197" })] }, idx))) })] }))] }), _jsxs("div", { style: {
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14,
                    paddingTop: 24, borderTop: '1px solid #E2E8F0'
                }, children: [_jsx("button", { style: {
                            background: '#FFFFFF',
                            color: '#0F172A',
                            border: '1px solid #CBD5E1',
                            borderRadius: 8,
                            padding: '12px 20px',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            transition: 'all 0.15s ease'
                        }, onMouseEnter: e => {
                            e.currentTarget.style.background = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#94A3B8';
                        }, onMouseLeave: e => {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#CBD5E1';
                        }, onClick: onOpenTutor, children: "Consultar dudas con Tutor IA" }), _jsx("button", { style: {
                            background: '#0F172A',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: 8,
                            padding: '12px 20px',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), onClick: async () => {
                            if (!leccionId)
                                return;
                            const token = localStorage.getItem('token');
                            if (!token)
                                return;
                            try {
                                await progresoClient.completarLeccion(leccionId, token);
                                onComplete();
                            }
                            catch (error) {
                                console.error("Error completando la lección:", error);
                                onComplete();
                            }
                        }, children: "Marcar lecci\u00F3n como completada" })] })] }));
}
