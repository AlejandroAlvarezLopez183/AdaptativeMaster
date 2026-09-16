import React, { useState } from "react";

interface Ejercicio {
  frase: string;
  respuesta: string;
  opciones: string[];
}

interface RellenarGameProps {
  datos: { ejercicios: Ejercicio[] };
  onComplete: (score: number) => void;
}

export function RellenarGame({ datos, onComplete }: RellenarGameProps) {
  const ejercicios = datos.ejercicios || [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  const ejercicio = ejercicios[index];

  const handleSeleccionar = (opcion: string) => {
    if (confirmado) return;
    setSeleccion(opcion);
  };

  const handleConfirmar = () => {
    if (!seleccion || confirmado) return;
    setConfirmado(true);
    if (seleccion === ejercicio.respuesta) {
      setScore(s => s + 100);
    }
    setTimeout(() => {
      if (index + 1 >= ejercicios.length) {
        onComplete(seleccion === ejercicio.respuesta ? score + 100 : score);
      } else {
        setIndex(i => i + 1);
        setSeleccion(null);
        setConfirmado(false);
      }
    }, 1500);
  };

  // Resaltar el ___ en la frase
  const partes = ejercicio.frase.split("___");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center", width: "100%", maxWidth: 680, margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", color: "#8FA8AA", fontSize: 14, fontWeight: 600 }}>
        <span>Pregunta {index + 1} de {ejercicios.length}</span>
        <span>💎 {score} XP</span>
      </div>

      {/* Frase con hueco */}
      <div style={{
        background: "rgba(23,60,62,0.4)", border: "1px solid rgba(245,243,238,0.08)",
        borderRadius: 20, padding: "36px 32px", width: "100%", textAlign: "center"
      }}>
        <p style={{ color: "#F5F3EE", fontSize: 22, lineHeight: 1.8, fontWeight: 500, margin: 0 }}>
          {partes[0]}
          <span style={{
            display: "inline-block", minWidth: 120, borderBottom: `3px solid ${confirmado ? (seleccion === ejercicio.respuesta ? "#45C893" : "#F2637B") : "#E8B94A"}`,
            color: confirmado ? (seleccion === ejercicio.respuesta ? "#45C893" : "#F2637B") : "#E8B94A",
            padding: "0 12px", fontWeight: 700, transition: "all 0.3s"
          }}>
            {seleccion || " "}
          </span>
          {partes[1]}
        </p>
        {confirmado && (
          <p style={{ color: seleccion === ejercicio.respuesta ? "#45C893" : "#F2637B", marginTop: 16, fontSize: 14 }}>
            {seleccion === ejercicio.respuesta ? "✅ ¡Correcto!" : `❌ La respuesta correcta era: "${ejercicio.respuesta}"`}
          </p>
        )}
      </div>

      {/* Opciones */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%" }}>
        {ejercicio.opciones.map(op => {
          let bg = "rgba(23,60,62,0.4)";
          let border = "rgba(245,243,238,0.1)";
          let color = "#F5F3EE";
          if (confirmado) {
            if (op === ejercicio.respuesta) { bg = "rgba(69,200,147,0.15)"; border = "#45C893"; color = "#45C893"; }
            else if (op === seleccion) { bg = "rgba(242,99,123,0.15)"; border = "#F2637B"; color = "#F2637B"; }
          } else if (op === seleccion) {
            bg = "rgba(232,185,74,0.15)"; border = "#E8B94A"; color = "#E8B94A";
          }
          return (
            <button key={op} onClick={() => handleSeleccionar(op)} disabled={confirmado}
              style={{
                background: bg, border: `2px solid ${border}`, borderRadius: 12, padding: "16px",
                color, fontSize: 16, fontWeight: 600, cursor: confirmado ? "default" : "pointer",
                transition: "all 0.2s", fontFamily: "Inter, sans-serif"
              }}>
              {op}
            </button>
          );
        })}
      </div>

      {/* Confirmar */}
      <button
        onClick={handleConfirmar}
        disabled={!seleccion || confirmado}
        style={{
          background: seleccion && !confirmado ? "#E8B94A" : "rgba(23,60,62,0.4)",
          color: seleccion && !confirmado ? "#0F2A2E" : "#8FA8AA",
          border: "none", borderRadius: 12, padding: "14px 48px",
          fontSize: 16, fontWeight: 700, cursor: seleccion && !confirmado ? "pointer" : "default",
          transition: "all 0.2s"
        }}>
        Confirmar →
      </button>
    </div>
  );
}
