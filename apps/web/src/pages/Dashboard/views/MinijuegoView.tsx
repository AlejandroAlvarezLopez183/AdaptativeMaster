import React, { useState, useEffect } from "react";

interface MinijuegoViewProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Card {
  id: string;
  text: string;
  type: 'term' | 'definition';
  pairId: string;
  isMatched: boolean;
}

export function MinijuegoView({ onBack, onComplete }: MinijuegoViewProps) {
  const [timeLeft, setTimeLeft] = useState(45);
  const [combo, setCombo] = useState(0);
  const [score, setScore] = useState(0);
  
  const [selectedTerm, setSelectedTerm] = useState<Card | null>(null);
  const [selectedDef, setSelectedDef] = useState<Card | null>(null);

  const [finished, setFinished] = useState(false);
  const [victory, setVictory] = useState(false);

  // Generamos un estado estático para la demo (normalmente esto viene del backend mezclado)
  const [cards, setCards] = useState<Card[]>([
    { id: 't1', text: 'State', type: 'term', pairId: 'p1', isMatched: false },
    { id: 'd2', text: 'Pasar datos de un componente padre a un hijo.', type: 'definition', pairId: 'p2', isMatched: false },
    { id: 't3', text: 'Effect', type: 'term', pairId: 'p3', isMatched: false },
    { id: 'd1', text: 'Memoria interna de un componente React.', type: 'definition', pairId: 'p1', isMatched: false },
    { id: 't2', text: 'Props', type: 'term', pairId: 'p2', isMatched: false },
    { id: 'd3', text: 'Operaciones fuera del ciclo de renderizado.', type: 'definition', pairId: 'p3', isMatched: false },
  ]);

  // Timer
  useEffect(() => {
    if (finished || timeLeft <= 0) {
      if (timeLeft <= 0 && !victory) setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, finished, victory]);

  // Chequear pares
  useEffect(() => {
    if (selectedTerm && selectedDef) {
      if (selectedTerm.pairId === selectedDef.pairId) {
        // MATCH!
        setCards(prev => prev.map(c => 
          c.id === selectedTerm.id || c.id === selectedDef.id 
            ? { ...c, isMatched: true } 
            : c
        ));
        setCombo(c => c + 1);
        setScore(s => s + 100 + (combo * 50)); // Puntos base + bono de combo
        setSelectedTerm(null);
        setSelectedDef(null);
      } else {
        // ERROR!
        setCombo(0);
        setTimeout(() => {
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 600); // Pequeña pausa para ver el error
      }
    }
  }, [selectedTerm, selectedDef, combo]);

  // Chequear victoria
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setVictory(true);
      setFinished(true);
    }
  }, [cards]);

  const handleCardClick = (card: Card) => {
    if (card.isMatched || finished) return;
    
    if (card.type === 'term') {
      setSelectedTerm(card.id === selectedTerm?.id ? null : card); // toggle off si es el mismo
    } else {
      setSelectedDef(card.id === selectedDef?.id ? null : card);
    }
  };

  if (finished) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#F5F3EE' }}>
        <span style={{ fontSize: 72, marginBottom: 16 }}>{victory ? '🎉' : '⏳'}</span>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 48, margin: '0 0 16px', color: victory ? '#E8B94A' : '#F2637B' }}>
          {victory ? '¡Desafío Superado!' : '¡Tiempo Agotado!'}
        </h1>
        <p style={{ fontSize: 20, color: '#8FA8AA', marginBottom: 10 }}>
          Puntuación Final: <strong style={{ color: '#F5F3EE' }}>{score} XP</strong>
        </p>
        {victory && (
           <p style={{ fontSize: 16, color: '#45C893', marginBottom: 40 }}>
             Bono de tiempo: +{timeLeft * 10} XP
           </p>
        )}
        {!victory && (
           <p style={{ fontSize: 16, color: '#8FA8AA', marginBottom: 40 }}>
             Inténtalo de nuevo para dominar los conceptos.
           </p>
        )}
        <div style={{ display: 'flex', gap: 16 }}>
          {!victory && (
            <button 
              onClick={() => window.location.reload()} // Hack rápido para reintentar (plantilla)
              style={{
                background: 'rgba(23,60,62,0.4)', color: '#F5F3EE', border: '1px solid rgba(245,243,238,0.2)', padding: '16px 32px',
                borderRadius: 12, fontSize: 18, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,243,238,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(23,60,62,0.4)'}
            >
              Reintentar
            </button>
          )}
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
            Continuar Ruta
          </button>
        </div>
      </div>
    );
  }

  // Render cards
  const terms = cards.filter(c => c.type === 'term');
  const defs = cards.filter(c => c.type === 'definition');

  return (
    <div className="animate-fade-in" style={{ 
      maxWidth: '1000px', width: '100%', margin: '0 auto', fontFamily: 'Inter, sans-serif',
      display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 40px'
    }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#8FA8AA', cursor: 'pointer', fontSize: 20 }}>
          ← Salir
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {/* Combo Meter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <div>
              <div style={{ fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Combo</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: combo > 1 ? '#E8B94A' : '#F5F3EE' }}>x{combo}</div>
            </div>
          </div>
          
          {/* Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>💎</span>
            <div>
              <div style={{ fontSize: 12, color: '#8FA8AA', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Score</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5F3EE' }}>{score}</div>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div style={{ 
          background: timeLeft <= 10 ? 'rgba(242,99,123,0.1)' : 'rgba(23,60,62,0.4)', 
          border: `2px solid ${timeLeft <= 10 ? '#F2637B' : 'rgba(245,243,238,0.2)'}`,
          padding: '10px 24px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 12
        }}>
          <span style={{ fontSize: 20 }}>⏳</span>
          <span style={{ fontSize: 28, fontWeight: 800, color: timeLeft <= 10 ? '#F2637B' : '#F5F3EE', fontFamily: "'Fraunces', Georgia, serif" }}>
            00:{timeLeft.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 800, color: '#F5F3EE', margin: '0 0 8px' }}>
          Batalla de Conceptos
        </h1>
        <p style={{ color: '#8FA8AA' }}>Empareja los términos con sus definiciones antes de que se acabe el tiempo.</p>
      </div>

      {/* Play Area */}
      <div style={{ display: 'flex', gap: 40, flex: 1 }}>
        {/* Términos (Izquierda) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ color: '#E8B94A', textAlign: 'center', margin: '0 0 16px', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 14 }}>Términos</h3>
          {terms.map(card => {
            const isSelected = selectedTerm?.id === card.id;
            // Estado de error si están ambos seleccionados pero no hacen match y este está seleccionado
            const isError = selectedTerm && selectedDef && selectedTerm.pairId !== selectedDef.pairId && isSelected;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched}
                style={{
                  background: card.isMatched ? 'transparent' : isSelected ? 'rgba(232,185,74,0.15)' : 'rgba(23,60,62,0.4)',
                  border: `2px solid ${card.isMatched ? 'rgba(245,243,238,0.05)' : isError ? '#F2637B' : isSelected ? '#E8B94A' : 'rgba(245,243,238,0.1)'}`,
                  color: card.isMatched ? 'rgba(245,243,238,0.2)' : '#F5F3EE',
                  padding: '24px', borderRadius: 16, fontSize: 20, fontWeight: 600, cursor: card.isMatched ? 'default' : 'pointer',
                  transition: 'all 0.2s', textAlign: 'center',
                  transform: isSelected && !isError ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {card.text}
              </button>
            )
          })}
        </div>

        {/* Definiciones (Derecha) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h3 style={{ color: '#45C893', textAlign: 'center', margin: '0 0 16px', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 14 }}>Definiciones</h3>
          {defs.map(card => {
            const isSelected = selectedDef?.id === card.id;
            const isError = selectedTerm && selectedDef && selectedTerm.pairId !== selectedDef.pairId && isSelected;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched}
                style={{
                  background: card.isMatched ? 'transparent' : isSelected ? 'rgba(69,200,147,0.15)' : 'rgba(23,60,62,0.4)',
                  border: `2px solid ${card.isMatched ? 'rgba(245,243,238,0.05)' : isError ? '#F2637B' : isSelected ? '#45C893' : 'rgba(245,243,238,0.1)'}`,
                  color: card.isMatched ? 'rgba(245,243,238,0.2)' : '#F5F3EE',
                  padding: '24px', borderRadius: 16, fontSize: 16, fontWeight: 400, cursor: card.isMatched ? 'default' : 'pointer',
                  transition: 'all 0.2s', textAlign: 'left', lineHeight: 1.4,
                  transform: isSelected && !isError ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                {card.text}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
