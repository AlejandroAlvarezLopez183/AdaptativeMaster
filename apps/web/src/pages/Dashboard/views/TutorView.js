import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { iaClient } from "@adaptativemaster/shared";
export function TutorView({ setActive, rutaId, leccionId }) {
    const [mensajes, setMensajes] = useState([]);
    const [ruta, setRuta] = useState(null);
    const [inputMsg, setInputMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const chatEndRef = useRef(null);
    const [activeRutaId, setActiveRutaId] = useState(rutaId || null);
    const [activeLeccionId, setActiveLeccionId] = useState(leccionId || null);
    const [todasLasRutas, setTodasLasRutas] = useState([]);
    // Menciones state
    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState("");
    const [mentionIndex, setMentionIndex] = useState(-1);
    const MENTIONS = [
        { id: "ruta_actual", label: "@ruta_actual", desc: "Contexto de tu ruta completa" },
        { id: "leccion_actual", label: "@leccion_actual", desc: "Contexto de la lección actual" },
        { id: "mis_errores", label: "@mis_errores", desc: "Análisis de tus fallos recientes" },
    ];
    const filteredMentions = MENTIONS.filter(m => m.id.toLowerCase().includes(mentionQuery.toLowerCase()));
    const sugerencias = [
        "Explícame los conceptos básicos",
        "Ponme un ejercicio práctico",
        "Ayúdame con una duda",
        "Evalúa lo que aprendí",
    ];
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const rutasAll = await iaClient.getRutas(token);
                const rutasEnCurso = rutasAll?.en_curso || [];
                setTodasLasRutas(rutasEnCurso);
                let targetRutaId = rutaId || (rutasEnCurso.length > 0 ? rutasEnCurso[0].id : null);
                if (targetRutaId) {
                    setActiveRutaId(targetRutaId);
                    const rutaData = await iaClient.getRutaDetalle(targetRutaId, token);
                    setRuta(rutaData);
                    let targetLeccionId = leccionId || (rutaData.temario?.length > 0 ? rutaData.temario[0].id : null);
                    if (targetLeccionId) {
                        setActiveLeccionId(targetLeccionId);
                        const msgsData = await iaClient.getHistorialChat(targetLeccionId, token);
                        setMensajes(msgsData);
                    }
                }
            }
            catch (error) {
                console.error("Error inicializando tutor", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [rutaId, leccionId]);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mensajes]);
    const handleSend = async (text) => {
        if (!text.trim() || !activeLeccionId)
            return;
        const token = localStorage.getItem("token");
        if (!token)
            return;
        const tempId = Date.now().toString();
        setMensajes(prev => [...prev, {
                id: tempId,
                leccion_id: activeLeccionId,
                rol: 'user',
                text: text,
                creado_en: new Date().toISOString()
            }]);
        setInputMsg("");
        setSending(true);
        try {
            const res = await iaClient.chatTutor(activeLeccionId, { text }, token);
            setMensajes(prev => [...prev, res]);
        }
        catch (error) {
            console.error("Error al enviar mensaje", error);
        }
        finally {
            setSending(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend(inputMsg);
        }
    };
    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputMsg(val);
        const words = val.split(' ');
        const lastWord = words[words.length - 1];
        if (lastWord.startsWith('@')) {
            setShowMentions(true);
            setMentionQuery(lastWord.substring(1));
            setMentionIndex(val.lastIndexOf(lastWord));
        }
        else {
            setShowMentions(false);
        }
    };
    const handleMentionSelect = (mentionLabel) => {
        if (mentionIndex !== -1) {
            const before = inputMsg.substring(0, mentionIndex);
            setInputMsg(before + mentionLabel + " ");
        }
        setShowMentions(false);
    };
    if (loading) {
        return (_jsx("div", { style: { color: "#64748B", textAlign: "center", padding: "60px 0", fontSize: 14 }, children: "Conectando con tu tutor IA..." }));
    }
    if (!ruta || !activeLeccionId) {
        return (_jsxs("div", { style: { textAlign: "center", padding: "60px 0" }, children: [_jsx("p", { style: { color: "#DC2626", margin: "0 0 12px", fontSize: 15 }, children: "No se pudo cargar el contexto de la lecci\u00F3n." }), _jsx("button", { onClick: () => setActive?.('ruta_detalle'), style: { background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }, children: "Volver al temario" })] }));
    }
    const leccionActiva = ruta.temario?.find(t => t.id === activeLeccionId);
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '860px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif", display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }, children: [_jsxs("button", { onClick: () => setActive?.('ruta_detalle'), style: {
                    background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: 0,
                    fontSize: 14, fontWeight: 500, alignSelf: 'flex-start'
                }, onMouseEnter: e => (e.currentTarget.style.color = '#0F172A'), onMouseLeave: e => (e.currentTarget.style.color = '#64748B'), children: [_jsx("span", { children: "\u2190" }), " Volver al temario"] }), _jsx("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    marginBottom: 16,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }, children: _jsxs("div", { style: { flex: 1, display: 'flex', gap: 20, flexWrap: 'wrap' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }, children: [_jsx("span", { style: { fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }, children: "Ruta activa" }), _jsxs("select", { value: activeRutaId || '', onChange: (e) => setActiveRutaId(e.target.value), style: {
                                        background: '#F8FAFC', border: '1px solid #CBD5E1',
                                        color: '#0F172A', padding: '7px 12px', borderRadius: 8, fontSize: 13, outline: 'none',
                                        cursor: 'pointer'
                                    }, children: [_jsx("option", { value: ruta.id, children: ruta.titulo }), todasLasRutas.filter(r => r.id !== ruta.id).map(r => (_jsx("option", { value: r.id, children: r.titulo }, r.id)))] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 200 }, children: [_jsx("span", { style: { fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }, children: "Lecci\u00F3n en consulta" }), _jsx("select", { value: activeLeccionId || '', onChange: (e) => setActiveLeccionId(e.target.value), style: {
                                        background: '#EFF6FF', border: '1px solid #BFDBFE',
                                        color: '#1D4ED8', padding: '7px 12px', borderRadius: 8, fontSize: 13, outline: 'none',
                                        cursor: 'pointer', fontWeight: 600
                                    }, children: ruta.temario?.map(t => (_jsx("option", { value: t.id, children: t.nombre }, t.id))) })] })] }) }), _jsxs("div", { style: {
                    flex: 1,
                    overflowY: 'auto',
                    marginBottom: 16,
                    padding: '12px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14
                }, children: [mensajes.length === 0 ? (_jsxs("div", { style: { textAlign: 'center', color: '#64748B', marginTop: 'auto', marginBottom: 'auto', padding: '20px' }, children: [_jsx("div", { style: {
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    background: '#EFF6FF',
                                    color: '#2563EB',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                }, children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "3", y: "11", width: "18", height: "10", rx: "2" }), _jsx("circle", { cx: "12", cy: "5", r: "2" }), _jsx("path", { d: "M12 7v4" })] }) }), _jsx("h3", { style: { margin: '0 0 6px', color: '#0F172A', fontSize: 18, fontWeight: 700 }, children: "Tutor IA de estudio" }), _jsxs("p", { style: { margin: 0, fontSize: 14 }, children: ["\u00BFTienes dudas sobre ", _jsx("strong", { children: leccionActiva?.nombre }), "? Elige una opci\u00F3n o escribe tu pregunta."] }), _jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 24 }, children: sugerencias.map((sug, idx) => (_jsx("button", { onClick: () => handleSend(sug), style: {
                                        background: '#FFFFFF',
                                        border: '1px solid #CBD5E1',
                                        color: '#0F172A',
                                        padding: '8px 14px',
                                        borderRadius: 20,
                                        fontSize: 13,
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                        transition: 'all 0.15s ease'
                                    }, onMouseEnter: e => {
                                        e.currentTarget.style.borderColor = '#2563EB';
                                        e.currentTarget.style.color = '#2563EB';
                                        e.currentTarget.style.background = '#EFF6FF';
                                    }, onMouseLeave: e => {
                                        e.currentTarget.style.borderColor = '#CBD5E1';
                                        e.currentTarget.style.color = '#0F172A';
                                        e.currentTarget.style.background = '#FFFFFF';
                                    }, children: sug }, idx))) })] })) : (mensajes.map((msg, idx) => (_jsx("div", { style: {
                            alignSelf: msg.rol === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.rol === 'user' ? '#0F172A' : '#FFFFFF',
                            border: msg.rol === 'user' ? 'none' : '1px solid #E2E8F0',
                            padding: '14px 18px',
                            borderRadius: msg.rol === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                            maxWidth: '82%',
                            color: msg.rol === 'user' ? '#FFFFFF' : '#0F172A',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                            lineHeight: 1.6,
                            fontSize: 14,
                        }, children: _jsx("div", { className: "markdown-content", children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: msg.text || '' }) }) }, msg.id || idx)))), sending && (_jsxs("div", { style: {
                            alignSelf: 'flex-start',
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            padding: '12px 18px',
                            borderRadius: '14px 14px 14px 2px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                        }, children: [_jsx("span", { style: { color: '#64748B', fontSize: 13, fontWeight: 500 }, children: "El tutor est\u00E1 respondiendo" }), _jsxs("div", { style: { display: 'flex', gap: 4 }, children: [_jsx("span", { style: { width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite' } }), _jsx("span", { style: { width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite 0.2s' } }), _jsx("span", { style: { width: 6, height: 6, borderRadius: '50%', background: '#2563EB', animation: 'pulse 1s infinite 0.4s' } })] })] })), _jsx("div", { ref: chatEndRef })] }), _jsxs("div", { style: { position: 'relative', marginTop: 'auto' }, children: [showMentions && filteredMentions.length > 0 && (_jsxs("div", { style: {
                            position: 'absolute',
                            bottom: '100%',
                            left: 0,
                            marginBottom: 8,
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            borderRadius: 10,
                            padding: '6px 0',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            zIndex: 50,
                            minWidth: 260
                        }, children: [_jsx("div", { style: { padding: '4px 14px 6px', fontSize: 11, color: '#94A3B8', fontWeight: 600, borderBottom: '1px solid #F1F5F9', textTransform: 'uppercase' }, children: "Atajos de contexto" }), filteredMentions.map(m => (_jsxs("div", { onClick: () => handleMentionSelect(m.label), style: {
                                    padding: '8px 14px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }, onMouseEnter: e => (e.currentTarget.style.background = '#F8FAFC'), onMouseLeave: e => (e.currentTarget.style.background = 'transparent'), children: [_jsx("span", { style: { color: '#2563EB', fontWeight: 600, fontSize: 13 }, children: m.label }), _jsx("span", { style: { color: '#64748B', fontSize: 11 }, children: m.desc })] }, m.id)))] })), _jsxs("div", { style: {
                            display: 'flex',
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            borderRadius: 12,
                            padding: '6px 8px 6px 16px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            alignItems: 'center'
                        }, children: [_jsx("input", { type: "text", placeholder: `Escribe tu consulta sobre ${leccionActiva?.nombre || 'la lección'}... (usa @ para contexto)`, value: inputMsg, onChange: handleInputChange, onKeyDown: handleKeyDown, disabled: sending, style: {
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#0F172A',
                                    fontSize: 14,
                                    outline: 'none',
                                    padding: '8px 0'
                                } }), _jsx("button", { onClick: () => handleSend(inputMsg), disabled: sending || !inputMsg.trim(), style: {
                                    background: sending || !inputMsg.trim() ? '#F1F5F9' : '#0F172A',
                                    color: sending || !inputMsg.trim() ? '#94A3B8' : '#FFFFFF',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '9px 18px',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: sending || !inputMsg.trim() ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.15s ease'
                                }, children: "Enviar" })] })] })] }));
}
