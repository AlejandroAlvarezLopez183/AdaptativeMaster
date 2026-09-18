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
            handleRespuesta(null); // Tiempo agotado
            return;
        }
        const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, resultado, finished]);
    const handleRespuesta = (respuesta) => {
        if (resultado)
            return;
        const esCorrecta = respuesta === preguntaActual.es_verdad;
        const nuevaStreak = esCorrecta ? streak + 1 : 0;
        setStreak(nuevaStreak);
        if (esCorrecta)
            setScore(s => s + 100 + (nuevaStreak > 1 ? nuevaStreak * 30 : 0));
        setResultado(esCorrecta ? "correcto" : "error");
        setTimeout(() => {
            if (index + 1 >= preguntas.length) {
                setFinished(true);
            }
            else {
                setIndex(i => i + 1);
                setTimeLeft(8);
                setResultado(null);
            }
        }, 1800);
    };
    if (finished) {
        onComplete(score);
        return null;
    }
    const timerPercent = (timeLeft / 8) * 100;
    const timerColor = timeLeft <= 3 ? "#F2637B" : timeLeft <= 5 ? "#E8B94A" : "#45C893";
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 24, alignItems: "center", width: "100%", maxWidth: 640, margin: "0 auto" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }, children: [_jsxs("div", { style: { color: "#8FA8AA", fontSize: 14, fontWeight: 600 }, children: [index + 1, " / ", preguntas.length] }), streak > 1 && (_jsxs("div", { style: { color: "#E8B94A", fontWeight: 700, fontSize: 14 }, children: ["\uD83D\uDD25 Racha x", streak] })), _jsxs("div", { style: { color: "#F5F3EE", fontWeight: 700, fontSize: 14 }, children: ["\uD83D\uDC8E ", score, " XP"] })] }), _jsx("div", { style: { width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }, children: _jsx("div", { style: { width: `${timerPercent}%`, height: "100%", background: timerColor, transition: "width 1s linear, background 0.5s" } }) }), _jsxs("div", { style: {
                    background: resultado === "correcto" ? "rgba(69,200,147,0.1)" : resultado === "error" ? "rgba(242,99,123,0.1)" : "rgba(23,60,62,0.4)",
                    border: `2px solid ${resultado === "correcto" ? "#45C893" : resultado === "error" ? "#F2637B" : "rgba(245,243,238,0.1)"}`,
                    borderRadius: 20, padding: "36px 32px", textAlign: "center", width: "100%",
                    transition: "all 0.3s",
                }, children: [_jsx("p", { style: { color: "#F5F3EE", fontSize: 22, fontWeight: 600, lineHeight: 1.5, margin: 0 }, children: preguntaActual.afirmacion }), resultado && (_jsxs("p", { style: { color: resultado === "correcto" ? "#45C893" : "#F2637B", marginTop: 16, fontSize: 14, lineHeight: 1.5 }, children: [resultado === "correcto" ? "✅ " : "❌ ", preguntaActual.explicacion] }))] }), _jsxs("div", { style: { display: "flex", gap: 16, width: "100%" }, children: [_jsx("button", { onClick: () => handleRespuesta(true), disabled: !!resultado, style: {
                            flex: 1, padding: "20px 0", borderRadius: 16, border: "2px solid rgba(69,200,147,0.3)",
                            background: "rgba(69,200,147,0.1)", color: "#45C893", fontSize: 20, fontWeight: 700,
                            cursor: resultado ? "default" : "pointer", transition: "all 0.2s", opacity: resultado ? 0.5 : 1
                        }, children: "\u2705 Verdadero" }), _jsx("button", { onClick: () => handleRespuesta(false), disabled: !!resultado, style: {
                            flex: 1, padding: "20px 0", borderRadius: 16, border: "2px solid rgba(242,99,123,0.3)",
                            background: "rgba(242,99,123,0.1)", color: "#F2637B", fontSize: 20, fontWeight: 700,
                            cursor: resultado ? "default" : "pointer", transition: "all 0.2s", opacity: resultado ? 0.5 : 1
                        }, children: "\u274C Falso" })] })] }));
}
