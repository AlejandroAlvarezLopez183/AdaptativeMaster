import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
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
        "Ponme un ejercicio",
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
        // Agregar mensaje local optimista
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
        // Buscar la última palabra escrita
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
        // Para devolver el foco al input se puede hacer con un ref, pero por simplicidad de la plantilla:
    };
    if (loading) {
        return (_jsx("div", { style: { color: "#E8B94A", textAlign: "center", marginTop: 40 }, children: "Conectando con tu tutor IA..." }));
    }
    if (!ruta || !activeLeccionId) {
        return (_jsxs("div", { style: { color: "#F2637B", textAlign: "center", marginTop: 40 }, children: ["No se pudo cargar la lecci\u00F3n. ", _jsx("button", { onClick: () => setActive?.('ruta_detalle'), style: { background: 'none', border: 'none', color: '#E8B94A', cursor: 'pointer', textDecoration: 'underline' }, children: "Volver" })] }));
    }
    const leccionActiva = ruta.temario?.find(t => t.id === activeLeccionId);
    return (_jsxs("div", { className: "animate-fade-in", style: { maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }, children: [_jsxs("button", { onClick: () => setActive?.('ruta_detalle'), style: { background: 'transparent', border: 'none', color: '#8FA8AA', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: 0, fontSize: 15, fontWeight: 500 }, onMouseEnter: e => e.currentTarget.style.color = '#F5F3EE', onMouseLeave: e => e.currentTarget.style.color = '#8FA8AA', children: [_jsx("span", { children: "\u2190" }), " Volver al temario"] }), _jsx("div", { style: { background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(245,243,238,0.06)', borderRadius: 12, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }, children: _jsxs("div", { style: { flex: 1, display: 'flex', gap: 32 }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }, children: [_jsx("span", { style: { fontSize: 11, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Contexto: Ruta" }), _jsxs("select", { value: activeRutaId || '', onChange: (e) => setActiveRutaId(e.target.value), style: {
                                        background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(245,243,238,0.1)',
                                        color: '#F5F3EE', padding: '8px 12px', borderRadius: 8, fontSize: 14, outline: 'none',
                                        cursor: 'pointer'
                                    }, children: [_jsx("option", { value: ruta.id, style: { background: '#0F2A2E', color: '#F5F3EE' }, children: ruta.titulo }), todasLasRutas.filter(r => r.id !== ruta.id).map(r => (_jsx("option", { value: r.id, style: { background: '#0F2A2E', color: '#F5F3EE' }, children: r.titulo }, r.id))), _jsx("option", { value: "frontend", style: { background: '#0F2A2E', color: '#F5F3EE' }, children: "Frontend React Experto (Ejemplo)" })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }, children: [_jsx("span", { style: { fontSize: 11, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: "Contexto: Lecci\u00F3n Actual" }), _jsx("select", { value: activeLeccionId || '', onChange: (e) => setActiveLeccionId(e.target.value), style: {
                                        background: 'rgba(23,60,62,0.4)', border: '1px solid rgba(232,185,74,0.3)',
                                        color: '#E8B94A', padding: '8px 12px', borderRadius: 8, fontSize: 14, outline: 'none',
                                        cursor: 'pointer', fontWeight: 600
                                    }, children: ruta.temario?.map(t => (_jsx("option", { value: t.id, style: { background: '#0F2A2E', color: '#E8B94A' }, children: t.nombre }, t.id))) })] })] }) }), _jsxs("div", { style: { flex: 1, overflowY: 'auto', marginBottom: 24, padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 16 }, children: [mensajes.length === 0 ? (_jsxs("div", { style: { textAlign: 'center', color: '#8FA8AA', marginTop: 'auto', marginBottom: 'auto' }, children: [_jsx("div", { style: { fontSize: 40, marginBottom: 16 }, children: "\u2728" }), _jsx("h3", { style: { margin: '0 0 8px', color: '#F5F3EE' }, children: "\u00A1Hola! Soy tu Tutor IA" }), _jsxs("p", { style: { margin: 0 }, children: ["\u00BFEn qu\u00E9 te puedo ayudar con ", _jsx("strong", { children: leccionActiva?.nombre }), "?"] }), _jsx("div", { style: { display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 32 }, children: sugerencias.map((sug, idx) => (_jsx("button", { onClick: () => handleSend(sug), style: {
                                        background: 'rgba(23,60,62,0.4)',
                                        border: '1px solid rgba(245,243,238,0.1)',
                                        color: '#F5F3EE',
                                        padding: '10px 16px',
                                        borderRadius: 20,
                                        fontSize: 13,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }, onMouseEnter: e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.color = '#E8B94A'; }, onMouseLeave: e => { e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)'; e.currentTarget.style.color = '#F5F3EE'; }, children: sug }, idx))) })] })) : (mensajes.map((msg, idx) => (_jsx("div", { style: {
                            alignSelf: msg.rol === 'user' ? 'flex-end' : 'flex-start',
                            background: msg.rol === 'user' ? 'rgba(232,185,74,0.15)' : 'rgba(23,60,62,0.6)',
                            border: msg.rol === 'user' ? '1px solid rgba(232,185,74,0.3)' : '1px solid rgba(245,243,238,0.06)',
                            padding: '16px 20px',
                            borderRadius: 16,
                            maxWidth: '80%',
                            color: msg.rol === 'user' ? '#E8B94A' : '#F5F3EE',
                            lineHeight: 1.6,
                            fontSize: 15,
                        }, children: _jsx("div", { className: "markdown-content", children: _jsx(ReactMarkdown, { children: msg.text || '' }) }) }, msg.id || idx)))), sending && (_jsxs("div", { style: {
                            alignSelf: 'flex-start',
                            background: 'rgba(23,60,62,0.6)',
                            border: '1px solid rgba(245,243,238,0.06)',
                            padding: '16px 20px',
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }, children: [_jsx("span", { style: { color: '#E8B94A', fontSize: 14, fontWeight: 500, marginRight: '8px' }, children: "Pensando" }), _jsx("style", { children: `
              @keyframes bounce {
                0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                40% { transform: translateY(-4px); opacity: 1; }
              }
              .dot {
                width: 6px;
                height: 6px;
                background-color: #E8B94A;
                border-radius: 50%;
                display: inline-block;
                animation: bounce 1.4s infinite ease-in-out both;
              }
              .dot1 { animation-delay: -0.32s; }
              .dot2 { animation-delay: -0.16s; }
            ` }), _jsx("div", { className: "dot dot1" }), _jsx("div", { className: "dot dot2" }), _jsx("div", { className: "dot dot3" })] })), _jsx("div", { ref: chatEndRef })] }), _jsxs("div", { style: { position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', marginTop: 'auto' }, children: [showMentions && filteredMentions.length > 0 && (_jsxs("div", { style: {
                            position: 'absolute',
                            bottom: '100%',
                            left: 24,
                            marginBottom: 8,
                            background: '#173C3E',
                            border: '1px solid rgba(232,185,74,0.3)',
                            borderRadius: 12,
                            padding: '8px 0',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                            zIndex: 50,
                            minWidth: 250
                        }, children: [_jsx("div", { style: { padding: '0 16px 8px', fontSize: 12, color: '#8FA8AA', borderBottom: '1px solid rgba(245,243,238,0.1)', marginBottom: 4 }, children: "Sugerencias de contexto" }), filteredMentions.map(m => (_jsxs("div", { onClick: () => handleMentionSelect(m.label), style: {
                                    padding: '10px 16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4
                                }, onMouseEnter: e => e.currentTarget.style.background = 'rgba(232,185,74,0.1)', onMouseLeave: e => e.currentTarget.style.background = 'transparent', children: [_jsx("span", { style: { color: '#E8B94A', fontWeight: 600, fontSize: 14 }, children: m.label }), _jsx("span", { style: { color: '#8FA8AA', fontSize: 12 }, children: m.desc })] }, m.id)))] })), _jsx("input", { type: "text", placeholder: `Pregúntame sobre ${leccionActiva?.nombre || 'esta lección'}...`, value: inputMsg, onChange: handleInputChange, onKeyDown: handleKeyDown, disabled: sending, style: {
                            width: '100%',
                            background: 'linear-gradient(145deg, rgba(23,60,62,0.8) 0%, rgba(15,42,46,0.9) 100%)',
                            border: '1px solid rgba(232,185,74,0.3)',
                            borderRadius: 20,
                            padding: '20px 24px 20px 24px',
                            color: '#F5F3EE',
                            fontSize: 16,
                            outline: 'none',
                            transition: 'all 0.3s'
                        }, onFocus: e => { e.currentTarget.style.borderColor = '#E8B94A'; e.currentTarget.style.boxShadow = '0 0 20px rgba(232,185,74,0.15)'; }, onBlur: e => { e.currentTarget.style.borderColor = 'rgba(232,185,74,0.3)'; e.currentTarget.style.boxShadow = 'none'; } }), _jsx("button", { onClick: () => handleSend(inputMsg), disabled: sending || !inputMsg.trim(), style: {
                            position: 'absolute',
                            right: 12,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: sending || !inputMsg.trim() ? 'rgba(245,243,238,0.1)' : '#E8B94A',
                            color: sending || !inputMsg.trim() ? 'rgba(245,243,238,0.3)' : '#0F2A2E',
                            border: 'none',
                            borderRadius: 12,
                            padding: '10px 20px',
                            fontSize: 14,
                            fontWeight: 700,
                            cursor: sending || !inputMsg.trim() ? 'not-allowed' : 'pointer',
                            transition: 'transform 0.2s',
                        }, children: "Enviar" })] })] }));
}
