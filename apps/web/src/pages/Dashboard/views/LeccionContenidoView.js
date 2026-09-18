import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { iaClient, progresoClient } from '@adaptativemaster/shared';
export function LeccionContenidoView({ leccionId, onGoBack, onOpenTutor, onComplete }) {
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const generationRef = React.useRef(false);
    useEffect(() => {
        const fetchLeccion = async () => {
            if (!leccionId)
                return;
            const token = localStorage.getItem('token');
            if (!token)
                return;
            try {
                setLoading(true);
                let data = await iaClient.getLeccion(leccionId, token);
                // Si no hay teoría, la IA genera el contenido on-the-fly
                if ((!data.contenido || !data.contenido.teoria) && !generationRef.current) {
                    generationRef.current = true;
                    setIsGenerating(true);
                    try {
                        data = await iaClient.generarContenidoLeccion(leccionId, token);
                    }
                    catch (error) {
                        console.error("Error generando contenido de la lección:", error);
                    }
                    finally {
                        setIsGenerating(false);
                        generationRef.current = false;
                    }
                }
                setLesson(data);
            }
            catch (error) {
                console.error("Error fetching leccion:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchLeccion();
    }, [leccionId]);
    if (loading || isGenerating) {
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', color: '#E8B94A', gap: 16 }, children: [_jsx("span", { className: "animate-spin", style: { fontSize: 48 }, children: "\u2699\uFE0F" }), _jsx("p", { style: { fontFamily: 'Inter, sans-serif', fontSize: 18 }, children: isGenerating ? "Generando contenido de la lección..." : "Cargando lección..." })] }));
    }
    if (!lesson) {
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0', color: '#8FA8AA' }, children: [_jsx("p", { children: "No se pudo cargar la lecci\u00F3n." }), _jsx("button", { onClick: onGoBack, style: { marginTop: 20, padding: '10px 20px', background: '#173C3E', border: 'none', color: '#fff', borderRadius: 8, cursor: 'pointer' }, children: "Volver" })] }));
    }
    return (_jsxs("div", { className: "animate-fade-in", style: {
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            padding: '40px 20px',
            fontFamily: 'Inter, sans-serif'
        }, children: [_jsxs("button", { onClick: onGoBack, style: {
                    background: 'transparent',
                    border: 'none',
                    color: '#8FA8AA',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 32,
                    padding: 0,
                    fontSize: 15,
                    fontWeight: 500
                }, onMouseEnter: e => e.currentTarget.style.color = '#F5F3EE', onMouseLeave: e => e.currentTarget.style.color = '#8FA8AA', children: [_jsx("span", { children: "\u2190" }), " Volver al mapa de la ruta"] }), _jsxs("div", { style: { marginBottom: 40 }, children: [_jsxs("div", { style: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }, children: [_jsx("span", { style: {
                                    fontSize: 11, fontWeight: 700, color: '#0F2A2E',
                                    background: '#7EC8C8', padding: '4px 10px',
                                    borderRadius: 12, textTransform: 'uppercase', letterSpacing: '0.05em'
                                }, children: "Lecci\u00F3n te\u00F3rica" }), _jsxs("span", { style: { fontSize: 13, color: '#8FA8AA', fontWeight: 500 }, children: ["Lecci\u00F3n ", lesson.orden, " \u00B7 Dificultad: ", lesson.dificultad] })] }), _jsx("h1", { style: {
                            fontFamily: "'Fraunces', Georgia, serif", fontSize: 40,
                            fontWeight: 800, color: '#F5F3EE', margin: '0 0 16px',
                            letterSpacing: '-0.02em'
                        }, children: lesson.titulo }), _jsxs("div", { style: { display: 'flex', gap: 24, color: '#8FA8AA', fontSize: 14 }, children: [_jsx("span", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: "\u23F1 15 min" }), _jsx("span", { style: { display: 'flex', alignItems: 'center', gap: 6 }, children: "\u2728 +20 XP al completar" })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 40 }, children: [lesson.contenido?.video_url ? (_jsx("div", { style: {
                            width: '100%', aspectRatio: '16/9', background: '#173C3E',
                            borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(245,243,238,0.06)'
                        }, children: _jsx("iframe", { width: "100%", height: "100%", src: lesson.contenido.video_url.replace("watch?v=", "embed/"), title: "Video de la lecci\u00F3n", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) })) : (_jsx("div", { style: {
                            width: '100%', aspectRatio: '16/9', background: '#173C3E',
                            borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(245,243,238,0.06)', position: 'relative', overflow: 'hidden'
                        }, children: _jsx("p", { style: { color: '#8FA8AA' }, children: "No hay video disponible para esta lecci\u00F3n" }) })), _jsxs("div", { style: {
                            background: 'rgba(23,60,62,0.4)', borderRadius: 20, padding: 32,
                            border: '1px solid rgba(245,243,238,0.06)'
                        }, children: [_jsx("h3", { style: { margin: '0 0 16px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }, children: "Resumen de la lecci\u00F3n" }), _jsx("div", { className: "markdown-content", style: { color: '#E4EAEB', fontSize: 16, lineHeight: 1.7 }, children: lesson.contenido?.teoria ? (_jsx(ReactMarkdown, { children: lesson.contenido.teoria })) : ("No hay teoría disponible para esta lección.") })] }), lesson.contenido?.recursos_extra && lesson.contenido.recursos_extra.length > 0 && (_jsxs("div", { style: {
                            background: 'rgba(23,60,62,0.4)', borderRadius: 20, padding: 32,
                            border: '1px solid rgba(245,243,238,0.06)'
                        }, children: [_jsx("h3", { style: { margin: '0 0 16px', fontSize: 20, color: '#F5F3EE', fontWeight: 600 }, children: "Recursos adicionales" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 16 }, children: lesson.contenido.recursos_extra.map((rec, idx) => (_jsxs("a", { href: rec.url, target: "_blank", rel: "noreferrer", style: {
                                        display: 'flex', alignItems: 'center', gap: 16, padding: '16px',
                                        background: 'rgba(245,243,238,0.03)', borderRadius: 12, textDecoration: 'none',
                                        border: '1px solid rgba(245,243,238,0.05)', transition: 'background 0.2s'
                                    }, onMouseEnter: e => e.currentTarget.style.background = 'rgba(245,243,238,0.08)', onMouseLeave: e => e.currentTarget.style.background = 'rgba(245,243,238,0.03)', children: [_jsx("span", { style: { fontSize: 24 }, children: rec.tipo === 'video' ? '🎥' : rec.tipo === 'libro' ? '📘' : rec.tipo === 'herramienta' ? '🛠️' : '📄' }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 4px', color: '#7EC8C8', fontSize: 16 }, children: rec.titulo }), _jsx("p", { style: { margin: 0, color: '#8FA8AA', fontSize: 14 }, children: rec.descripcion })] })] }, idx))) })] }))] }), _jsxs("div", { style: {
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
                    paddingTop: 32, borderTop: '1px solid rgba(245,243,238,0.1)'
                }, children: [_jsxs("button", { style: {
                            background: 'transparent',
                            color: '#E8B94A',
                            border: '2px solid rgba(232,185,74,0.3)',
                            borderRadius: 14,
                            padding: '16px 24px',
                            fontSize: 16,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            transition: 'all 0.2s'
                        }, onMouseEnter: e => e.currentTarget.style.background = 'rgba(232,185,74,0.1)', onMouseLeave: e => e.currentTarget.style.background = 'transparent', onClick: onOpenTutor, children: [_jsx("span", { children: "\uD83E\uDD16" }), " Practicar con Tutor IA"] }), _jsx("button", { style: {
                            background: '#7EC8C8',
                            color: '#0F2A2E',
                            border: 'none',
                            borderRadius: 14,
                            padding: '16px 24px',
                            fontSize: 16,
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(126,200,200,0.2)',
                            transition: 'all 0.2s'
                        }, onMouseEnter: e => e.currentTarget.style.transform = 'translateY(-2px)', onMouseLeave: e => e.currentTarget.style.transform = 'translateY(0)', onClick: async () => {
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
                                // Even if it fails, let's go back so the user isn't stuck
                                onComplete();
                            }
                        }, children: "Marcar como completada \u2714" })] })] }));
}
