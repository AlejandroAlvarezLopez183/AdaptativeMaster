import React, { useState } from "react";
import { EmparejadorGame } from "./Minijuegos/EmparejadorGame";
import { VerdaderoFalsoGame } from "./Minijuegos/VerdaderoFalsoGame";
import { RellenarGame } from "./Minijuegos/RellenarGame";
import { OrdenarGame } from "./Minijuegos/OrdenarGame";

type TipoMinijuego = "EMPAREJAR" | "VERDADERO_FALSO" | "RELLENAR" | "ORDENAR";

interface MinijuegoViewProps {
  onBack: () => void;
  onComplete: () => void;
  tipoMinijuego?: TipoMinijuego;
  datosMinijuego?: any;
  titulo?: string;
}

const TIPO_META: Record<TipoMinijuego, { emoji: string; nombre: string; descripcion: string }> = {
  EMPAREJAR:       { emoji: "🔗", nombre: "Batalla de Conceptos", descripcion: "Empareja los términos con sus definiciones." },
  VERDADERO_FALSO: { emoji: "⚡", nombre: "¿Verdadero o Falso?", descripcion: "Decide rápido si las afirmaciones son ciertas." },
  RELLENAR:        { emoji: "✏️", nombre: "Rellena el Espacio",   descripcion: "Elige la palabra que completa la frase." },
  ORDENAR:         { emoji: "🧩", nombre: "Ordena el Código",     descripcion: "Arrastra los fragmentos al lugar correcto." },
};

// Datos de demo para cuando no hay datos reales (preview de la plantilla)
const DEMO_DATA: Record<TipoMinijuego, any> = {
  EMPAREJAR: {
    pares: [
      { termino: "useState", definicion: "Maneja el estado interno de un componente React." },
      { termino: "useEffect", definicion: "Ejecuta efectos secundarios al montar o actualizar." },
      { termino: "Props", definicion: "Datos que pasa el componente padre al hijo." },
    ]
  },
  VERDADERO_FALSO: {
    preguntas: [
      { afirmacion: "React es una librería de JavaScript.", es_verdad: true, explicacion: "Correcto. React es una librería, no un framework completo." },
      { afirmacion: "useEffect se ejecuta antes del renderizado.", es_verdad: false, explicacion: "En realidad se ejecuta después del renderizado del DOM." },
      { afirmacion: "Los componentes funcionales no pueden tener estado.", es_verdad: false, explicacion: "Con Hooks como useState, sí pueden tener estado." },
    ]
  },
  RELLENAR: {
    ejercicios: [
      { frase: "La función ___ se usa para declarar estado en React", respuesta: "useState", opciones: ["useState", "useEffect", "useRef", "useContext"] },
      { frase: "___ permite ejecutar efectos secundarios", respuesta: "useEffect", opciones: ["useState", "useEffect", "useMemo", "useCallback"] },
      { frase: "Para acceder a un elemento del DOM se usa ___", respuesta: "useRef", opciones: ["useState", "useEffect", "useRef", "useId"] },
    ]
  },
  ORDENAR: {
    fragmentos: [
      "import React, { useState } from 'react';",
      "function Counter() {",
      "  const [count, setCount] = useState(0);",
      "  return <button onClick={() => setCount(count + 1)}>{count}</button>;",
      "}",
    ],
    orden_correcto: [0, 1, 2, 3, 4]
  },
};

export function MinijuegoView({ onBack, onComplete, tipoMinijuego, datosMinijuego, titulo }: MinijuegoViewProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);

  // Determinar tipo (default EMPAREJAR si no hay info del backend)
  const tipo: TipoMinijuego = tipoMinijuego || "EMPAREJAR";
  const datos = datosMinijuego || DEMO_DATA[tipo];
  const meta = TIPO_META[tipo];

  const handleComplete = (score: number) => {
    setFinalScore(score);
    setVictory(score > 0);
  };

  // Pantalla de victoria/derrota
  if (finalScore !== null) {
    return (
      <div className="animate-fade-in" style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", gap: 24, fontFamily: "Inter, sans-serif"
      }}>
        <span style={{ fontSize: 72 }}>{victory ? "🎉" : "😤"}</span>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 44, margin: "0",
          color: victory ? "#E8B94A" : "#F2637B"
        }}>
          {victory ? "¡Superado!" : "¡Inténtalo de nuevo!"}
        </h1>
        <p style={{ color: "#8FA8AA", fontSize: 18 }}>
          Puntuación: <strong style={{ color: "#F5F3EE" }}>{finalScore} XP</strong>
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {!victory && (
            <button onClick={onBack}
              style={{
                background: "rgba(23,60,62,0.4)", color: "#F5F3EE",
                border: "1px solid rgba(245,243,238,0.15)", borderRadius: 12,
                padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer"
              }}>
              ← Salir
            </button>
          )}
          <button onClick={onComplete}
            style={{
              background: "#E8B94A", color: "#0F2A2E", border: "none", borderRadius: 12,
              padding: "14px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(232,185,74,0.3)"
            }}>
            Continuar Ruta →
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de presentación del minijuego
  if (!gameStarted) {
    return (
      <div className="animate-fade-in" style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", gap: 28, fontFamily: "Inter, sans-serif"
      }}>
        <div style={{
          background: "rgba(23,60,62,0.5)", border: "1px solid rgba(232,185,74,0.2)",
          borderRadius: 24, padding: "48px", textAlign: "center", maxWidth: 480,
          boxShadow: "0 16px 48px rgba(0,0,0,0.3)"
        }}>
          <span style={{ fontSize: 64 }}>{meta.emoji}</span>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, color: "#F5F3EE", margin: "16px 0 8px" }}>
            {titulo || meta.nombre}
          </h1>
          <p style={{ color: "#8FA8AA", fontSize: 16, margin: "0 0 32px" }}>{meta.descripcion}</p>
          <button
            onClick={() => setGameStarted(true)}
            style={{
              background: "#E8B94A", color: "#0F2A2E", border: "none", borderRadius: 12,
              padding: "16px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(232,185,74,0.4)", transition: "transform 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            ¡Comenzar! 🚀
          </button>
        </div>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#8FA8AA", cursor: "pointer", fontSize: 15 }}>
          ← Volver a la ruta
        </button>
      </div>
    );
  }

  // Pantalla de juego activo
  return (
    <div className="animate-fade-in" style={{
      maxWidth: "900px", width: "100%", margin: "0 auto",
      display: "flex", flexDirection: "column", gap: 32, fontFamily: "Inter, sans-serif"
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#8FA8AA", cursor: "pointer", fontSize: 20 }}>←</button>
        <div>
          <div style={{ fontSize: 12, color: "#8FA8AA", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>Minijuego</div>
          <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 22, color: "#F5F3EE", fontWeight: 700 }}>
            {meta.emoji} {titulo || meta.nombre}
          </div>
        </div>
      </div>

      {/* Renderizar el juego correspondiente */}
      {tipo === "EMPAREJAR"       && <EmparejadorGame       datos={datos} onComplete={handleComplete} />}
      {tipo === "VERDADERO_FALSO" && <VerdaderoFalsoGame    datos={datos} onComplete={handleComplete} />}
      {tipo === "RELLENAR"        && <RellenarGame          datos={datos} onComplete={handleComplete} />}
      {tipo === "ORDENAR"         && <OrdenarGame           datos={datos} onComplete={handleComplete} />}
    </div>
  );
}
