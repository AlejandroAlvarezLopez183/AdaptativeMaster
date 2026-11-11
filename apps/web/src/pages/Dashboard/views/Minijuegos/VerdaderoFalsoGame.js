import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export function VerdaderoFalsoGame({ datos, onComplete }) {
    const preguntas = datos.preguntas || [];
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(8);
    const [resultado, setResultado] = useState(null);
    const [finished, setFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const preguntaActual = preguntas[index];
    useEffect(() => {
        if (resultado || finished)
            return;
        if (timeLeft <= 0) {
            handleRespuesta(null);
            return;
        }
        const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, resultado, finished]);
    const handleRespuesta = (respuestaUsuario) => {
        if (resultado !== null)
            return;
        const esCorrecto = respuestaUsuario !== null && respuestaUsuario === preguntaActual.es_verdad;
        setResultado(esCorrecto ? "correcto" : "error");
        if (esCorrecto) {
            const nuevoStreak = streak + 1;
            setStreak(nuevoStreak);
            setScore(s => s + 50 + nuevoStreak * 10);
        }
        else {
            setStreak(0);
        }
        setTimeout(() => {
            if (index + 1 < preguntas.length) {
                setIndex(i => i + 1);
                setTimeLeft(8);
                setResultado(null);
            }
            else {
                setFinished(true);
                onComplete(score + (esCorrecto ? 50 : 0));
            }
        }, 1800);
    };
    if (!preguntaActual)
        return null;
    const timerPercent = (timeLeft / 8) * 100;
    const timerColor = timeLeft <= 3 ? "#DC2626" : timeLeft <= 5 ? "#D97706" : "#059669";
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20, alignItems: "center", width: "100%", maxWidth: 640, margin: "0 auto", fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }, children: [_jsxs("div", { style: { color: "#64748B", fontSize: 13, fontWeight: 600 }, children: ["Pregunta ", index + 1, " de ", preguntas.length] }), streak > 1 && (_jsxs("div", { style: { color: "#2563EB", fontWeight: 700, fontSize: 13 }, children: ["Racha x", streak] })), _jsxs("div", { style: { color: "#0F172A", fontWeight: 700, fontSize: 13 }, children: [score, " XP"] })] }), _jsx("div", { style: { width: "100%", height: 6, background: "#E2E8F0", borderRadius: 4, overflow: "hidden" }, children: _jsx("div", { style: { width: `${timerPercent}%`, height: "100%", background: timerColor, transition: "width 1s linear, background 0.5s" } }) }), _jsxs("div", { style: {
                    background: resultado === "correcto" ? "#ECFDF5" : resultado === "error" ? "#FEF2F2" : "#F8FAFC",
                    border: `1.5px solid ${resultado === "correcto" ? "#059669" : resultado === "error" ? "#DC2626" : "#E2E8F0"}`,
                    borderRadius: 14, padding: "32px 28px", textAlign: "center", width: "100%",
                    transition: "all 0.2s ease",
                }, children: [_jsx("p", { style: { color: "#0F172A", fontSize: 18, fontWeight: 600, lineHeight: 1.5, margin: 0 }, children: preguntaActual.afirmacion }), resultado && (_jsxs("p", { style: { color: resultado === "correcto" ? "#047857" : "#B91C1C", marginTop: 14, fontSize: 13, lineHeight: 1.5, fontWeight: 500 }, children: [resultado === "correcto" ? "✓ " : "✕ ", preguntaActual.explicacion] }))] }), _jsxs("div", { style: { display: "flex", gap: 14, width: "100%" }, children: [_jsx("button", { onClick: () => handleRespuesta(true), disabled: !!resultado, style: {
                            flex: 1, padding: "16px 0", borderRadius: 10, border: "1.5px solid #A7F3D0",
                            background: "#ECFDF5", color: "#047857", fontSize: 16, fontWeight: 700,
                            cursor: resultado ? "default" : "pointer", transition: "all 0.15s ease", opacity: resultado ? 0.6 : 1
                        }, onMouseEnter: e => { if (!resultado)
                            e.currentTarget.style.background = '#D1FAE5'; }, onMouseLeave: e => { if (!resultado)
                            e.currentTarget.style.background = '#ECFDF5'; }, children: "Verdadero" }), _jsx("button", { onClick: () => handleRespuesta(false), disabled: !!resultado, style: {
                            flex: 1, padding: "16px 0", borderRadius: 10, border: "1.5px solid #FECACA",
                            background: "#FEF2F2", color: "#DC2626", fontSize: 16, fontWeight: 700,
                            cursor: resultado ? "default" : "pointer", transition: "all 0.15s ease", opacity: resultado ? 0.6 : 1
                        }, onMouseEnter: e => { if (!resultado)
                            e.currentTarget.style.background = '#FEE2E2'; }, onMouseLeave: e => { if (!resultado)
                            e.currentTarget.style.background = '#FEF2F2'; }, children: "Falso" })] })] }));
}
