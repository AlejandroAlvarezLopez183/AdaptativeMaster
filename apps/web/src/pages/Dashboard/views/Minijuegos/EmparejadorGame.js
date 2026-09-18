import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export function EmparejadorGame({ datos, onComplete }) {
    const pares = datos.pares || [];
    const [cards, setCards] = useState(() => {
        const terms = pares.map((p, i) => ({
            id: `t${i}`, text: p.termino, type: 'term', pairId: `p${i}`, isMatched: false
        }));
        const defs = pares.map((p, i) => ({
            id: `d${i}`, text: p.definicion, type: 'definition', pairId: `p${i}`, isMatched: false
        }));
        return [...terms, ...defs];
    });
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedDef, setSelectedDef] = useState(null);
    const [combo, setCombo] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [finished, setFinished] = useState(false);
    // Timer
    useEffect(() => {
        if (finished || timeLeft <= 0) {
            if (timeLeft <= 0 && !finished) {
                setFinished(true);
                onComplete(score);
            }
            return;
        }
        const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
        return () => clearInterval(t);
    }, [timeLeft, finished]);
    // Check match
    useEffect(() => {
        if (!selectedTerm || !selectedDef)
            return;
        if (selectedTerm.pairId === selectedDef.pairId) {
            const newScore = score + 100 + (combo * 50);
            setCards(prev => prev.map(c => c.id === selectedTerm.id || c.id === selectedDef.id ? { ...c, isMatched: true } : c));
            setCombo(c => c + 1);
            setScore(newScore);
            setSelectedTerm(null);
            setSelectedDef(null);
        }
        else {
            setCombo(0);
            setTimeout(() => { setSelectedTerm(null); setSelectedDef(null); }, 600);
        }
    }, [selectedTerm, selectedDef]);
    // Victory check
    useEffect(() => {
        if (cards.length > 0 && cards.every(c => c.isMatched)) {
            setFinished(true);
            onComplete(score + timeLeft * 10);
        }
    }, [cards]);
    const handleClick = (card) => {
        if (card.isMatched || finished)
            return;
        if (card.type === 'term')
            setSelectedTerm(card.id === selectedTerm?.id ? null : card);
        else
            setSelectedDef(card.id === selectedDef?.id ? null : card);
    };
    const terms = cards.filter(c => c.type === 'term');
    const defs = cards.filter(c => c.type === 'definition');
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 24, width: "100%" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [_jsx("span", { children: "\uD83D\uDD25" }), _jsxs("span", { style: { color: combo > 1 ? "#E8B94A" : "#8FA8AA", fontWeight: 700 }, children: ["x", combo] })] }), _jsxs("div", { style: { color: "#F5F3EE", fontWeight: 700 }, children: ["\uD83D\uDC8E ", score, " XP"] }), _jsxs("div", { style: {
                            background: timeLeft <= 10 ? "rgba(242,99,123,0.1)" : "rgba(23,60,62,0.4)",
                            border: `2px solid ${timeLeft <= 10 ? "#F2637B" : "rgba(245,243,238,0.2)"}`,
                            padding: "6px 18px", borderRadius: 20, display: "flex", alignItems: "center", gap: 8
                        }, children: [_jsx("span", { children: "\u23F3" }), _jsxs("span", { style: { fontWeight: 800, color: timeLeft <= 10 ? "#F2637B" : "#F5F3EE" }, children: [timeLeft, "s"] })] })] }), _jsxs("div", { style: { display: "flex", gap: 32 }, children: [_jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 12 }, children: [_jsx("h3", { style: { color: "#E8B94A", textAlign: "center", margin: "0 0 8px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }, children: "T\u00E9rminos" }), terms.map(card => {
                                const isSelected = selectedTerm?.id === card.id;
                                const isError = selectedTerm && selectedDef && selectedTerm.pairId !== selectedDef.pairId && isSelected;
                                return (_jsx("button", { onClick: () => handleClick(card), disabled: card.isMatched, style: {
                                        background: card.isMatched ? "transparent" : isSelected ? "rgba(232,185,74,0.15)" : "rgba(23,60,62,0.4)",
                                        border: `2px solid ${card.isMatched ? "rgba(245,243,238,0.05)" : isError ? "#F2637B" : isSelected ? "#E8B94A" : "rgba(245,243,238,0.1)"}`,
                                        color: card.isMatched ? "rgba(245,243,238,0.2)" : "#F5F3EE",
                                        padding: "20px", borderRadius: 14, fontSize: 16, fontWeight: 600,
                                        cursor: card.isMatched ? "default" : "pointer", transition: "all 0.2s",
                                        transform: isSelected && !isError ? "scale(1.02)" : "scale(1)",
                                    }, children: card.text }, card.id));
                            })] }), _jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 12 }, children: [_jsx("h3", { style: { color: "#45C893", textAlign: "center", margin: "0 0 8px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }, children: "Definiciones" }), defs.map(card => {
                                const isSelected = selectedDef?.id === card.id;
                                const isError = selectedTerm && selectedDef && selectedTerm.pairId !== selectedDef.pairId && isSelected;
                                return (_jsx("button", { onClick: () => handleClick(card), disabled: card.isMatched, style: {
                                        background: card.isMatched ? "transparent" : isSelected ? "rgba(69,200,147,0.15)" : "rgba(23,60,62,0.4)",
                                        border: `2px solid ${card.isMatched ? "rgba(245,243,238,0.05)" : isError ? "#F2637B" : isSelected ? "#45C893" : "rgba(245,243,238,0.1)"}`,
                                        color: card.isMatched ? "rgba(245,243,238,0.2)" : "#F5F3EE",
                                        padding: "20px", borderRadius: 14, fontSize: 14, fontWeight: 400,
                                        cursor: card.isMatched ? "default" : "pointer", transition: "all 0.2s", textAlign: "left", lineHeight: 1.4,
                                        transform: isSelected && !isError ? "scale(1.02)" : "scale(1)",
                                    }, children: card.text }, card.id));
                            })] })] })] }));
}
