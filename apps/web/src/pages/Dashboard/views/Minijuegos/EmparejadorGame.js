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
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20, width: "100%", fontFamily: "'Open Sans', system-ui, sans-serif" }, children: [_jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F5F9", paddingBottom: 16 }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [_jsx("span", { style: { fontSize: 13, color: "#64748B", fontWeight: 600 }, children: "Racha:" }), _jsxs("span", { style: { color: combo > 1 ? "#2563EB" : "#64748B", fontWeight: 700, fontSize: 14 }, children: ["x", combo] })] }), _jsxs("div", { style: { color: "#0F172A", fontWeight: 700, fontSize: 14 }, children: [score, " XP"] }), _jsx("div", { style: {
                            background: timeLeft <= 10 ? "#FEF2F2" : "#F8FAFC",
                            border: `1px solid ${timeLeft <= 10 ? "#FECACA" : "#E2E8F0"}`,
                            padding: "4px 14px", borderRadius: 20, display: "flex", alignItems: "center", gap: 6
                        }, children: _jsxs("span", { style: { fontWeight: 700, fontSize: 13, color: timeLeft <= 10 ? "#DC2626" : "#0F172A" }, children: [timeLeft, "s"] }) })] }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [_jsx("h3", { style: { color: "#2563EB", textAlign: "center", margin: "0 0 6px", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 700 }, children: "T\u00E9rminos" }), terms.map(card => {
                                const isSelected = selectedTerm?.id === card.id;
                                const isError = selectedTerm && selectedDef && selectedTerm.pairId !== selectedDef.pairId && isSelected;
                                let bg = "#FFFFFF";
                                let border = "#CBD5E1";
                                let color = "#0F172A";
                                if (card.isMatched) {
                                    bg = "#F8FAFC";
                                    border = "#E2E8F0";
                                    color = "#94A3B8";
                                }
                                else if (isError) {
                                    bg = "#FEF2F2";
                                    border = "#DC2626";
                                    color = "#DC2626";
                                }
                                else if (isSelected) {
                                    bg = "#EFF6FF";
                                    border = "#2563EB";
                                    color = "#1D4ED8";
                                }
                                return (_jsx("button", { onClick: () => handleClick(card), disabled: card.isMatched, style: {
                                        background: bg,
                                        border: `1.5px solid ${border}`,
                                        color: color,
                                        padding: "16px", borderRadius: 10, fontSize: 14, fontWeight: 600,
                                        cursor: card.isMatched ? "default" : "pointer", transition: "all 0.15s ease",
                                        textAlign: "center"
                                    }, children: card.text }, card.id));
                            })] }), _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [_jsx("h3", { style: { color: "#059669", textAlign: "center", margin: "0 0 6px", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 700 }, children: "Definiciones" }), defs.map(card => {
                                const isSelected = selectedDef?.id === card.id;
                                const isError = selectedTerm && selectedDef && selectedTerm.pairId !== selectedDef.pairId && isSelected;
                                let bg = "#FFFFFF";
                                let border = "#CBD5E1";
                                let color = "#0F172A";
                                if (card.isMatched) {
                                    bg = "#F8FAFC";
                                    border = "#E2E8F0";
                                    color = "#94A3B8";
                                }
                                else if (isError) {
                                    bg = "#FEF2F2";
                                    border = "#DC2626";
                                    color = "#DC2626";
                                }
                                else if (isSelected) {
                                    bg = "#ECFDF5";
                                    border = "#059669";
                                    color = "#047857";
                                }
                                return (_jsx("button", { onClick: () => handleClick(card), disabled: card.isMatched, style: {
                                        background: bg,
                                        border: `1.5px solid ${border}`,
                                        color: color,
                                        padding: "16px", borderRadius: 10, fontSize: 13, fontWeight: 400,
                                        cursor: card.isMatched ? "default" : "pointer", transition: "all 0.15s ease",
                                        textAlign: "left", lineHeight: 1.5
                                    }, children: card.text }, card.id));
                            })] })] })] }));
}
