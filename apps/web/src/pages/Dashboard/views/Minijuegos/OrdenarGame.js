import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function OrdenarGame({ datos, onComplete }) {
    const { fragmentos, orden_correcto } = datos;
    // Estado: lista de ítems en el orden actual (guardamos índices originales)
    const [items, setItems] = useState(() => [...Array(fragmentos.length).keys()].sort(() => Math.random() - 0.5));
    const [dragIndex, setDragIndex] = useState(null);
    const [verificado, setVerificado] = useState(false);
    const [esCorrecto, setEsCorrecto] = useState(false);
    const handleDragStart = (i) => setDragIndex(i);
    const handleDragOver = (e, i) => {
        e.preventDefault();
        if (dragIndex === null || dragIndex === i)
            return;
        const newItems = [...items];
        const [removed] = newItems.splice(dragIndex, 1);
        newItems.splice(i, 0, removed);
        setItems(newItems);
        setDragIndex(i);
    };
    const handleDragEnd = () => setDragIndex(null);
    const handleVerificar = () => {
        const esOk = items.every((itemIdx, pos) => orden_correcto[pos] === itemIdx);
        setEsCorrecto(esOk);
        setVerificado(true);
        setTimeout(() => {
            onComplete(esOk ? 300 : 50);
        }, 2000);
    };
    return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 20, width: "100%", maxWidth: 680, margin: "0 auto" }, children: [_jsx("div", { style: { textAlign: "center" }, children: _jsx("p", { style: { color: "#8FA8AA", fontSize: 14, margin: 0 }, children: "\uD83D\uDDB1\uFE0F Arrastra los fragmentos para ordenarlos correctamente" }) }), _jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: items.map((itemIdx, pos) => {
                    const isCorrect = verificado && orden_correcto[pos] === itemIdx;
                    const isWrong = verificado && orden_correcto[pos] !== itemIdx;
                    return (_jsxs("div", { draggable: !verificado, onDragStart: () => handleDragStart(pos), onDragOver: (e) => handleDragOver(e, pos), onDragEnd: handleDragEnd, style: {
                            background: isCorrect ? "rgba(69,200,147,0.12)" : isWrong ? "rgba(242,99,123,0.12)" : dragIndex === pos ? "rgba(232,185,74,0.15)" : "rgba(23,60,62,0.5)",
                            border: `2px solid ${isCorrect ? "#45C893" : isWrong ? "#F2637B" : dragIndex === pos ? "#E8B94A" : "rgba(245,243,238,0.1)"}`,
                            borderRadius: 12, padding: "14px 20px",
                            display: "flex", alignItems: "center", gap: 16,
                            cursor: verificado ? "default" : "grab",
                            transition: "all 0.2s",
                            userSelect: "none",
                        }, children: [_jsx("span", { style: { color: "#8FA8AA", fontWeight: 700, minWidth: 24 }, children: pos + 1 }), _jsx("code", { style: {
                                    fontFamily: "'Fira Code', 'Courier New', monospace",
                                    fontSize: 14, color: isCorrect ? "#45C893" : isWrong ? "#F2637B" : "#F5F3EE",
                                    flex: 1, lineHeight: 1.5
                                }, children: fragmentos[itemIdx] }), !verificado && _jsx("span", { style: { color: "#8FA8AA", fontSize: 18 }, children: "\u283F" }), isCorrect && _jsx("span", { children: "\u2705" }), isWrong && _jsx("span", { children: "\u274C" })] }, itemIdx));
                }) }), verificado ? (_jsx("div", { style: { textAlign: "center", color: esCorrecto ? "#45C893" : "#F2637B", fontWeight: 700, fontSize: 18 }, children: esCorrecto ? "🎉 ¡Orden perfecto!" : "❌ Orden incorrecto. ¡Sigue practicando!" })) : (_jsx("button", { onClick: handleVerificar, style: {
                    background: "#E8B94A", color: "#0F2A2E", border: "none", borderRadius: 12,
                    padding: "14px 48px", fontSize: 16, fontWeight: 700, cursor: "pointer",
                    alignSelf: "center", transition: "transform 0.2s"
                }, onMouseEnter: e => e.currentTarget.style.transform = "scale(1.03)", onMouseLeave: e => e.currentTarget.style.transform = "scale(1)", children: "Verificar Orden \u2192" }))] }));
}
