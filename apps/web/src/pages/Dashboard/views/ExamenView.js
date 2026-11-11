import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function ExamenView({ onBack, onComplete }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const questions = [
        {
            question: "¿Cuál es el propósito principal de React.useEffect?",
            options: [
                "Manejar el renderizado condicional de componentes",
                "Ejecutar efectos secundarios como llamadas a APIs o suscripciones",
                "Definir el estado local de un componente",
                "Optimizar el rendimiento de funciones pesadas"
            ],
            correctIndex: 1
        },
        {
            question: "¿Qué valor devuelve useState por defecto?",
            options: [
                "Un objeto con métodos get y set",
                "Solo el valor actual del estado",
                "Un arreglo con el valor actual y una función para actualizarlo",
                "Una promesa que resuelve el estado"
            ],
            correctIndex: 2
        },
        {
            question: "¿Qué es JSX en el ecosistema de React?",
            options: [
                "Una extensión de sintaxis que permite escribir elementos similares a HTML en JavaScript",
                "Un nuevo motor de base de datos para aplicaciones web",
                "Un lenguaje de estilos alternativo a CSS",
                "Un compilador de TypeScript integrado"
            ],
            correctIndex: 0
        }
    ];
    const handleSelect = (index) => {
        if (isAnswered)
            return;
        setSelectedOption(index);
        setIsAnswered(true);
        const isCorrect = index === questions[currentQuestion].correctIndex;
        if (isCorrect) {
            setScore(s => s + 1);
        }
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(c => c + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            }
            else {
                setFinished(true);
            }
        }, 1200);
    };
    if (finished) {
        return (_jsx("div", { className: "animate-fade-in", style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 20px', textAlign: 'center', fontFamily: "'Open Sans', system-ui, sans-serif" }, children: _jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: '48px 36px',
                    maxWidth: 480,
                    width: '100%',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }, children: [_jsx("div", { style: {
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            background: '#ECFDF5',
                            color: '#059669',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 16
                        }, children: _jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) }) }), _jsx("h1", { style: { fontSize: 24, margin: '0 0 8px', color: '#0F172A', fontWeight: 700 }, children: "\u00A1Evaluaci\u00F3n completada!" }), _jsxs("p", { style: { fontSize: 15, color: '#64748B', margin: '0 0 28px' }, children: ["Obtuviste ", _jsxs("strong", { style: { color: '#0F172A' }, children: [score, " de ", questions.length] }), " aciertos."] }), _jsx("button", { onClick: onComplete, style: {
                            background: '#0F172A', color: '#FFFFFF', border: 'none', padding: '12px 28px',
                            borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }, onMouseEnter: e => (e.currentTarget.style.background = '#1E293B'), onMouseLeave: e => (e.currentTarget.style.background = '#0F172A'), children: "Volver a la ruta" })] }) }));
    }
    const currentQ = questions[currentQuestion];
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    return (_jsxs("div", { className: "animate-fade-in", style: {
            maxWidth: '720px', width: '100%', margin: '0 auto', fontFamily: "'Open Sans', system-ui, sans-serif",
            display: 'flex', flexDirection: 'column', minHeight: '60vh', padding: '24px 20px'
        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }, children: [_jsx("button", { onClick: onBack, style: {
                            background: '#F1F5F9', border: 'none', color: '#475569',
                            cursor: 'pointer', width: 32, height: 32, borderRadius: 8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16, fontWeight: 700
                        }, title: "Salir", children: "\u2715" }), _jsx("div", { style: { flex: 1, background: '#E2E8F0', height: 8, borderRadius: 4, overflow: 'hidden' }, children: _jsx("div", { style: {
                                height: '100%', width: `${progressPercent}%`, background: '#2563EB',
                                borderRadius: 4, transition: 'width 0.3s ease-out'
                            } }) }), _jsxs("span", { style: { color: '#0F172A', fontWeight: 600, fontSize: 13 }, children: [currentQuestion + 1, " de ", questions.length] })] }), _jsxs("div", { style: {
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '32px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 24
                }, children: [_jsx("h2", { style: {
                            fontSize: 20, fontWeight: 700, color: '#0F172A',
                            margin: 0, lineHeight: 1.4, textAlign: 'center'
                        }, children: currentQ.question }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 }, children: currentQ.options.map((opt, idx) => {
                            const isSelected = selectedOption === idx;
                            const isCorrect = idx === currentQ.correctIndex;
                            let bg = '#FFFFFF';
                            let border = '1px solid #CBD5E1';
                            let color = '#0F172A';
                            if (isAnswered) {
                                if (isCorrect) {
                                    bg = '#ECFDF5';
                                    border = '1.5px solid #059669';
                                    color = '#047857';
                                }
                                else if (isSelected && !isCorrect) {
                                    bg = '#FEF2F2';
                                    border = '1.5px solid #DC2626';
                                    color = '#B91C1C';
                                }
                                else {
                                    color = '#94A3B8';
                                    border = '1px solid #E2E8F0';
                                    bg = '#F8FAFC';
                                }
                            }
                            return (_jsxs("button", { onClick: () => handleSelect(idx), style: {
                                    background: bg,
                                    border: border,
                                    color: color,
                                    borderRadius: 10,
                                    padding: '16px 20px',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    textAlign: 'left',
                                    cursor: isAnswered ? 'default' : 'pointer',
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 12
                                }, onMouseEnter: e => {
                                    if (!isAnswered) {
                                        e.currentTarget.style.background = '#F8FAFC';
                                        e.currentTarget.style.borderColor = '#2563EB';
                                    }
                                }, onMouseLeave: e => {
                                    if (!isAnswered) {
                                        e.currentTarget.style.background = '#FFFFFF';
                                        e.currentTarget.style.borderColor = '#CBD5E1';
                                    }
                                }, children: [_jsx("span", { children: opt }), isAnswered && isCorrect && _jsx("span", { style: { color: '#059669', fontWeight: 700 }, children: "\u2713" }), isAnswered && isSelected && !isCorrect && _jsx("span", { style: { color: '#DC2626', fontWeight: 700 }, children: "\u2715" })] }, idx));
                        }) })] })] }));
}
