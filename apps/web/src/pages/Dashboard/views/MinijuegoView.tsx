import React, { useState } from "react";
import { progresoClient } from '@adaptativemaster/shared';
import { EmparejadorGame } from "./Minijuegos/EmparejadorGame";
import { VerdaderoFalsoGame } from "./Minijuegos/VerdaderoFalsoGame";
import { RellenarGame } from "./Minijuegos/RellenarGame";
import { OrdenarGame } from "./Minijuegos/OrdenarGame";

type TipoMinijuego = "EMPAREJAR" | "VERDADERO_FALSO" | "RELLENAR" | "ORDENAR";

interface MinijuegoViewProps {
  leccionId: string | null;
  onBack: () => void;
  onComplete: () => void;
  tipoMinijuego?: TipoMinijuego;
  datosMinijuego?: any;
  titulo?: string;
}

const TIPO_META: Record<TipoMinijuego, { nombre: string; descripcion: string }> = {
  EMPAREJAR:       { nombre: "Batalla de Conceptos", descripcion: "Empareja cada término con su definición correcta." },
  VERDADERO_FALSO: { nombre: "¿Verdadero o Falso?", descripcion: "Evalúa con agilidad si las siguientes afirmaciones son ciertas." },
  RELLENAR:        { nombre: "Completa la frase",   descripcion: "Elige el término adecuado que completa el enunciado." },
  ORDENAR:         { nombre: "Secuencia lógica",     descripcion: "Ordena los fragmentos en la secuencia correcta." },
};

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

export function MinijuegoView({ leccionId, onBack, onComplete, tipoMinijuego, datosMinijuego, titulo }: MinijuegoViewProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);

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
        height: "100%", gap: 24, fontFamily: "'Open Sans', system-ui, sans-serif", padding: "60px 20px"
      }}>
        <div style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: "48px 36px",
          maxWidth: 480,
          width: "100%",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          textAlign: "center"
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: victory ? "#ECFDF5" : "#FEF2F2",
            color: victory ? "#059669" : "#DC2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px"
          }}>
            {victory ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </div>

          <h1 style={{
            fontSize: 24, margin: "0 0 8px", fontWeight: 700,
            color: "#0F172A"
          }}>
            {victory ? "¡Práctica superada!" : "¡Sigue practicando!"}
          </h1>
          <p style={{ color: "#64748B", fontSize: 15, margin: "0 0 28px" }}>
            Puntuación obtenida: <strong style={{ color: "#0F172A" }}>{finalScore} XP</strong>
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            {!victory && (
              <button onClick={onBack}
                style={{
                  background: "#FFFFFF", color: "#475569",
                  border: "1px solid #CBD5E1", borderRadius: 8,
                  padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer"
                }}>
                Volver
              </button>
            )}
            <button onClick={async () => {
              if (victory && leccionId) {
                const token = localStorage.getItem('token');
                if (token) {
                  try {
                    await progresoClient.completarLeccion(leccionId, token);
                  } catch (e) {
                    console.error(e);
                  }
                }
              }
              onComplete();
            }}
              style={{
                background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: 8,
                padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s ease"
              }}>
              Continuar la ruta →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de presentación del minijuego
  if (!gameStarted) {
    return (
      <div className="animate-fade-in" style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", gap: 20, fontFamily: "'Open Sans', system-ui, sans-serif", padding: "60px 20px"
      }}>
        <div style={{
          background: "#FFFFFF", border: "1px solid #E2E8F0",
          borderRadius: 16, padding: "40px 32px", textAlign: "center", maxWidth: 480,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#EFF6FF",
            color: "#1D4ED8",
            border: "1px solid #DBEAFE",
            borderRadius: 6,
            padding: "3px 10px",
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: 16
          }}>
            Práctica interactiva
          </span>

          <h1 style={{ fontSize: 24, color: "#0F172A", margin: "0 0 10px", fontWeight: 700 }}>
            {titulo || meta.nombre}
          </h1>
          <p style={{ color: "#64748B", fontSize: 14, margin: "0 0 28px", lineHeight: 1.5 }}>
            {meta.descripcion}
          </p>
          <button
            onClick={() => setGameStarted(true)}
            style={{
              background: "#0F172A", color: "#FFFFFF", border: "none", borderRadius: 8,
              padding: "12px 36px", fontSize: 14, fontWeight: 600, cursor: "pointer",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#1E293B")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0F172A")}
          >
            Comenzar actividad
          </button>
        </div>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
          ← Volver a la ruta
        </button>
      </div>
    );
  }

  // Pantalla de juego activo
  return (
    <div className="animate-fade-in" style={{
      maxWidth: "800px", width: "100%", margin: "0 auto",
      display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Open Sans', system-ui, sans-serif",
      padding: "20px 0"
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{
          background: "#F1F5F9", border: "none", color: "#475569", cursor: "pointer",
          width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 14, fontWeight: 700
        }}>
          ←
        </button>
        <div>
          <div style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Práctica interactiva</div>
          <div style={{ fontSize: 18, color: "#0F172A", fontWeight: 700 }}>
            {titulo || meta.nombre}
          </div>
        </div>
      </div>

      {/* Área del juego */}
      <div style={{
        background: "#FFFFFF", border: "1px solid #E2E8F0",
        borderRadius: 14, padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        {tipo === "EMPAREJAR" && (
          <EmparejadorGame datos={datos} onComplete={handleComplete} />
        )}
        {tipo === "VERDADERO_FALSO" && (
          <VerdaderoFalsoGame datos={datos} onComplete={handleComplete} />
        )}
        {tipo === "RELLENAR" && (
          <RellenarGame datos={datos} onComplete={handleComplete} />
        )}
        {tipo === "ORDENAR" && (
          <OrdenarGame datos={datos} onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}
