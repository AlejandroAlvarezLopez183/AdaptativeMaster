import React, { useState } from "react";

interface ExamenViewProps {
  onBack: () => void;
  onComplete: () => void;
}

export function ExamenView({ onBack, onComplete }: ExamenViewProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Mock data para el examen
  const questions = [
    {
      id: 1,
      question: "¿Cuál es la ventaja principal del Virtual DOM en React?",
      options: [
        "Reemplaza por completo el backend",
        "Optimiza el rendimiento agrupando actualizaciones del DOM real",
        "Permite escribir código en Python",
        "Hace que la aplicación sea automáticamente segura contra hackeos",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "¿Qué hook se utiliza para manejar efectos secundarios (como llamadas a API)?",
      options: ["useState", "useContext", "useEffect", "useReducer"],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "¿Cómo se pasan datos de un componente padre a un hijo en React?",
      options: ["Usando Props", "A través de LocalStorage", "Usando Hooks de estado", "Con Redux obligatoriamente"],
      correctIndex: 0,
    }
  ];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === questions[currentQuestion].correctIndex) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(curr => curr + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setFinished(true);
      }
    }, 1500); // 1.5s para ver la respuesta correcta/incorrecta
  };

  if (finished) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#F5F3EE' }}>
        <span style={{ fontSize: 72, marginBottom: 16 }}>🏆</span>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 48, margin: '0 0 16px', color: '#E8B94A' }}>
          ¡Examen Completado!
        </h1>
        <p style={{ fontSize: 20, color: '#8FA8AA', marginBottom: 40 }}>
          Puntuación: <strong style={{ color: '#F5F3EE' }}>{score} / {questions.length}</strong>
        </p>
        <button 
          onClick={onComplete}
          style={{
            background: '#E8B94A', color: '#0F2A2E', border: 'none', padding: '16px 32px',
            borderRadius: 12, fontSize: 18, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(232,185,74,0.3)', transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Volver a la Ruta
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progressPercent = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="animate-fade-in" style={{ 
      maxWidth: '800px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif',
      display: 'flex', flexDirection: 'column', minHeight: '60vh', padding: '40px 20px'
    }}>
      
      {/* HEADER / PROGRESS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#8FA8AA', cursor: 'pointer', fontSize: 24 }}>
          ×
        </button>
        <div style={{ flex: 1, background: 'rgba(245,243,238,0.1)', height: 12, borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', width: `${progressPercent}%`, background: '#E8B94A', 
            borderRadius: 6, transition: 'width 0.3s ease-out' 
          }} />
        </div>
        <span style={{ color: '#E8B94A', fontWeight: 700, fontSize: 14 }}>
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      {/* QUESTION */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ 
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 700, color: '#F5F3EE', 
          marginBottom: 40, lineHeight: 1.3, textAlign: 'center' 
        }}>
          {currentQ.question}
        </h2>

        {/* OPTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            
            let bg = 'rgba(23,60,62,0.4)';
            let border = '2px solid rgba(245,243,238,0.1)';
            let color = '#F5F3EE';

            if (isAnswered) {
              if (isCorrect) {
                bg = 'rgba(69,200,147,0.15)'; // Verde suave
                border = '2px solid #45C893'; // Borde verde
                color = '#45C893';
              } else if (isSelected && !isCorrect) {
                bg = 'rgba(242,99,123,0.15)'; // Rojo suave
                border = '2px solid #F2637B'; // Borde rojo
                color = '#F2637B';
              } else {
                // Las que no se eligieron y no son correctas se atenúan
                color = 'rgba(245,243,238,0.3)';
                border = '2px solid transparent';
              }
            } else if (isSelected) {
              // (Nunca entra aquí realmente porque isAnswered se pone true de inmediato, pero lo dejamos por si acaso)
              border = '2px solid #E8B94A';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                style={{
                  background: bg,
                  border: border,
                  color: color,
                  borderRadius: 16,
                  padding: '20px 24px',
                  fontSize: 18,
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={e => {
                  if (!isAnswered) {
                    e.currentTarget.style.background = 'rgba(23,60,62,0.8)';
                    e.currentTarget.style.borderColor = 'rgba(232,185,74,0.5)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isAnswered) {
                    e.currentTarget.style.background = 'rgba(23,60,62,0.4)';
                    e.currentTarget.style.borderColor = 'rgba(245,243,238,0.1)';
                  }
                }}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <span style={{ fontSize: 24 }}>✅</span>}
                {isAnswered && isSelected && !isCorrect && <span style={{ fontSize: 24 }}>❌</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
