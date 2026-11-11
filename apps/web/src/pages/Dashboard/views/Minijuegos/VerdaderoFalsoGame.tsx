import React, { useState, useEffect } from "react";

interface Pregunta {
  afirmacion: string;
  es_verdad: boolean;
  explicacion: string;
}

interface VerdaderoFalsoGameProps {
  datos: { preguntas: Pregunta[] };
  onComplete: (score: number) => void;
}

export function VerdaderoFalsoGame({ datos, onComplete }: VerdaderoFalsoGameProps) {
  const preguntas = datos.preguntas || [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(8);
  const [resultado, setResultado] = useState<"correcto" | "error" | null>(null);
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState(0);

  const preguntaActual = preguntas[index];

  useEffect(() => {
    if (resultado || finished) return;
    if (timeLeft <= 0) {
      handleRespuesta(null);
      return;
    }
    const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, resultado, finished]);

  const handleRespuesta = (respuestaUsuario: boolean | null) => {
    if (resultado !== null) return;
    const esCorrecto = respuestaUsuario !== null && respuestaUsuario === preguntaActual.es_verdad;
    setResultado(esCorrecto ? "correcto" : "error");

    if (esCorrecto) {
      const nuevoStreak = streak + 1;
      setStreak(nuevoStreak);
      setScore(s => s + 50 + nuevoStreak * 10);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (index + 1 < preguntas.length) {
        setIndex(i => i + 1);
        setTimeLeft(8);
        setResultado(null);
      } else {
        setFinished(true);
        onComplete(score + (esCorrecto ? 50 : 0));
      }
    }, 1800);
  };

  if (!preguntaActual) return null;

  const timerPercent = (timeLeft / 8) * 100;
  const timerColor = timeLeft <= 3 ? "#DC2626" : timeLeft <= 5 ? "#D97706" : "#059669";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center", width: "100%", maxWidth: 640, margin: "0 auto", fontFamily: "'Open Sans', system-ui, sans-serif" }}>
      {/* HUD */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <div style={{ color: "#64748B", fontSize: 13, fontWeight: 600 }}>
          Pregunta {index + 1} de {preguntas.length}
        </div>
        {streak > 1 && (
          <div style={{ color: "#2563EB", fontWeight: 700, fontSize: 13 }}>Racha x{streak}</div>
        )}
        <div style={{ color: "#0F172A", fontWeight: 700, fontSize: 13 }}>{score} XP</div>
      </div>

      {/* Timer bar */}
      <div style={{ width: "100%", height: 6, background: "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${timerPercent}%`, height: "100%", background: timerColor, transition: "width 1s linear, background 0.5s" }} />
      </div>

      {/* Afirmación */}
      <div style={{
        background: resultado === "correcto" ? "#ECFDF5" : resultado === "error" ? "#FEF2F2" : "#F8FAFC",
        border: `1.5px solid ${resultado === "correcto" ? "#059669" : resultado === "error" ? "#DC2626" : "#E2E8F0"}`,
        borderRadius: 14, padding: "32px 28px", textAlign: "center", width: "100%",
        transition: "all 0.2s ease",
      }}>
        <p style={{ color: "#0F172A", fontSize: 18, fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
          {preguntaActual.afirmacion}
        </p>
        {resultado && (
          <p style={{ color: resultado === "correcto" ? "#047857" : "#B91C1C", marginTop: 14, fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>
            {resultado === "correcto" ? "✓ " : "✕ "}{preguntaActual.explicacion}
          </p>
        )}
      </div>

      {/* Botones */}
      <div style={{ display: "flex", gap: 14, width: "100%" }}>
        <button
          onClick={() => handleRespuesta(true)}
          disabled={!!resultado}
          style={{
            flex: 1, padding: "16px 0", borderRadius: 10, border: "1.5px solid #A7F3D0",
            background: "#ECFDF5", color: "#047857", fontSize: 16, fontWeight: 700,
            cursor: resultado ? "default" : "pointer", transition: "all 0.15s ease", opacity: resultado ? 0.6 : 1
          }}
          onMouseEnter={e => { if (!resultado) e.currentTarget.style.background = '#D1FAE5'; }}
          onMouseLeave={e => { if (!resultado) e.currentTarget.style.background = '#ECFDF5'; }}
        >
          Verdadero
        </button>
        <button
          onClick={() => handleRespuesta(false)}
          disabled={!!resultado}
          style={{
            flex: 1, padding: "16px 0", borderRadius: 10, border: "1.5px solid #FECACA",
            background: "#FEF2F2", color: "#DC2626", fontSize: 16, fontWeight: 700,
            cursor: resultado ? "default" : "pointer", transition: "all 0.15s ease", opacity: resultado ? 0.6 : 1
          }}
          onMouseEnter={e => { if (!resultado) e.currentTarget.style.background = '#FEE2E2'; }}
          onMouseLeave={e => { if (!resultado) e.currentTarget.style.background = '#FEF2F2'; }}
        >
          Falso
        </button>
      </div>
    </div>
  );
}
