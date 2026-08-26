import React, { useState, useRef, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type NodeStatus = "done" | "active" | "locked";

interface Lesson {
  id: number;
  title: string;
  status: NodeStatus;
  xp: number;
  type: "lesson" | "quiz" | "boss" | "checkpoint";
}

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  lessons: Lesson[];
}

// ── Data (Plantilla) ──────────────────────────────────────────────────────────
const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Fundamentos",
    subtitle: "Álgebra básica",
    color: "#E8B94A",
    lessons: [
      { id: 1, title: "Variables y expresiones", status: "done", xp: 20, type: "lesson" },
      { id: 2, title: "Operaciones básicas", status: "done", xp: 20, type: "lesson" },
      { id: 3, title: "Fracciones y decimales", status: "done", xp: 20, type: "lesson" },
      { id: 4, title: "Quiz rápido", status: "done", xp: 30, type: "quiz" },
      { id: 5, title: "Punto de control", status: "done", xp: 50, type: "checkpoint" },
    ],
  },
  {
    id: 2,
    title: "Ecuaciones",
    subtitle: "Lineales y cuadráticas",
    color: "#7EC8C8",
    lessons: [
      { id: 6, title: "Ecuaciones de primer grado", status: "done", xp: 20, type: "lesson" },
      { id: 7, title: "Sistemas de ecuaciones", status: "active", xp: 20, type: "lesson" },
      { id: 8, title: "Ecuaciones cuadráticas", status: "locked", xp: 20, type: "lesson" },
      { id: 9, title: "Desafío jefe", status: "locked", xp: 60, type: "boss" },
    ],
  },
  {
    id: 3,
    title: "Geometría",
    subtitle: "Formas y espacios",
    color: "#F2637B",
    lessons: [
      { id: 10, title: "Ángulos y triángulos", status: "locked", xp: 20, type: "lesson" },
      { id: 11, title: "Áreas y perímetros", status: "locked", xp: 20, type: "lesson" },
      { id: 12, title: "Geometría analítica", status: "locked", xp: 25, type: "lesson" },
      { id: 13, title: "Quiz rápido", status: "locked", xp: 30, type: "quiz" },
    ],
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconLesson({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 5H18M4 9H14M4 13H16M4 17H11" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function IconQuiz({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M11 11V13M11 15V15.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function IconBoss({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <polygon points="11,2 13.5,8 20,8.5 15,13 17,19.5 11,16 5,19.5 7,13 2,8.5 8.5,8" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function IconCheckpoint({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M5 11L9 15L17 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function NodeIcon({ type, color }: { type: Lesson["type"]; color: string }) {
  if (type === "quiz") return <IconQuiz color={color} />;
  if (type === "boss") return <IconBoss color={color} />;
  if (type === "checkpoint") return <IconCheckpoint color={color} />;
  return <IconLesson color={color} />;
}

// ── Node positions ────────────────────────────────────────────────────────────
// Offsets are now on the Y axis
const OFFSETS = [0, 72, 0, -72, 0, 72, 0, -72, 0, 72, 0, -72, 0];

// ── Lesson Node ───────────────────────────────────────────────────────────────
function LessonNode({
  lesson,
  chapterColor,
  offset,
  isLast,
  onActivate,
}: {
  lesson: Lesson;
  chapterColor: string;
  offset: number;
  isLast: boolean;
  onActivate: (id: number) => void;
}) {
  const [tooltip, setTooltip] = useState(false);
  const { status, type } = lesson;

  const isDone = status === "done";
  const isActive = status === "active";
  const isLocked = status === "locked";

  const isBoss = type === "boss";
  const isCheckpoint = type === "checkpoint";
  const size = isBoss || isCheckpoint ? 72 : 64;

  const bg = isDone ? chapterColor : isActive ? chapterColor : "#1E4A4D";
  const borderColor = isDone ? chapterColor : isActive ? chapterColor : "rgba(245,243,238,0.12)";
  const iconColor = isDone || isActive ? "#0F2A2E" : "rgba(245,243,238,0.25)";

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "relative" }}>
      {!isLast && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: size,
          transform: "translateY(-50%)",
          height: 3,
          width: 48,
          background: isDone
            ? `linear-gradient(to right, ${chapterColor}, ${chapterColor}88)`
            : "rgba(245,243,238,0.08)",
          borderRadius: 4,
          zIndex: 0,
        }} />
      )}

      <div
        style={{ transform: `translateY(${offset}px)`, position: "relative", zIndex: 1 }}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        {isActive && (
          <>
            <div style={{ position: "absolute", inset: -14, borderRadius: "50%", background: `${chapterColor}10` }} />
            <div style={{ position: "absolute", inset: -7, borderRadius: "50%", background: `${chapterColor}18` }} />
          </>
        )}

        <button
          onClick={() => !isLocked && onActivate(lesson.id)}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: bg,
            border: `3px solid ${borderColor}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isLocked ? "default" : "pointer",
            transition: "transform 0.18s, box-shadow 0.18s",
            boxShadow: isActive
              ? `0 0 0 4px ${chapterColor}30, 0 8px 24px rgba(0,0,0,0.4)`
              : isDone
              ? `0 4px 16px rgba(0,0,0,0.3)`
              : "none",
            outline: "none",
            position: "relative",
          }}
          className={isActive ? "node-active-pulse" : ""}
          onMouseEnter={e => { if (!isLocked) (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          {isDone ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12L10 17L19 7" stroke="#0F2A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : isLocked ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="4" y="9" width="12" height="9" rx="2" stroke="rgba(245,243,238,0.2)" strokeWidth="1.5" fill="none"/>
              <path d="M7 9V6C7 4.3 8.3 3 10 3C11.7 3 13 4.3 13 6V9" stroke="rgba(245,243,238,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <NodeIcon type={type} color={iconColor} />
          )}
        </button>

        {tooltip && (
          <div style={{
            position: "absolute",
            bottom: size + 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#173C3E",
            border: `1px solid ${isLocked ? "rgba(245,243,238,0.1)" : chapterColor + "50"}`,
            borderRadius: 12,
            padding: "10px 14px",
            minWidth: 170,
            zIndex: 20,
            pointerEvents: "none",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: 10, color: isLocked ? "#8FA8AA" : chapterColor,
              letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: "0 0 4px",
            }}>
              {type === "boss" ? "Desafío jefe" : type === "checkpoint" ? "Punto de control" : type === "quiz" ? "Quiz" : "Lección"}
              {isLocked && " · Bloqueado"}
            </p>
            <p style={{
              fontFamily: "'Fraunces', Georgia, serif", fontSize: 14, fontWeight: 600,
              color: "#F5F3EE", margin: "0 0 6px", lineHeight: 1.3,
            }}>
              {lesson.title}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "#8FA8AA", margin: 0 }}>
              +{lesson.xp} XP
            </p>
            <div style={{
              position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%) rotate(45deg)",
              width: 10, height: 10, background: "#173C3E",
              borderRight: `1px solid ${isLocked ? "rgba(245,243,238,0.1)" : chapterColor + "50"}`,
              borderBottom: `1px solid ${isLocked ? "rgba(245,243,238,0.1)" : chapterColor + "50"}`,
            }} />
          </div>
        )}

        {isActive && (
          <div style={{
            position: "absolute", top: size + 14, left: "50%",
            transform: "translateX(-50%)", zIndex: 10, whiteSpace: "nowrap",
          }}>
            <button style={{
              background: chapterColor, color: "#0F2A2E", border: "none",
              borderRadius: 10, padding: "9px 16px", fontFamily: "Inter, sans-serif",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              boxShadow: `0 4px 20px ${chapterColor}40`, letterSpacing: "0.01em", transition: "opacity 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              onClick={() => onActivate(lesson.id)}
            >
              Continuar lección →
            </button>
          </div>
        )}
      </div>

      {!isLast && <div style={{ width: 48 }} />}
    </div>
  );
}

// ── Chapter Header ─────────────────────────────────────────────────────────────
function ChapterHeader({ chapter, isFirst }: { chapter: Chapter; isFirst: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginRight: 32, marginLeft: isFirst ? 0 : 48, position: "relative" }}>
      <div style={{
        background: `${chapter.color}15`, border: `1px solid ${chapter.color}35`,
        borderRadius: 14, padding: "14px 28px", textAlign: "center", position: "relative", overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${chapter.color}12 0%, transparent 60%)` }} />
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: 10, color: chapter.color,
          letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 4px", position: "relative",
        }}>
          Sección {chapter.id}
        </p>
        <h3 style={{
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 20, fontWeight: 800,
          color: "#F5F3EE", margin: "0 0 2px", letterSpacing: "-0.01em", position: "relative",
        }}>
          {chapter.title}
        </h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8FA8AA", margin: 0, position: "relative" }}>
          {chapter.subtitle}
        </p>
      </div>
      <div style={{ height: 3, width: 28, background: `${chapter.color}40`, borderRadius: 4, marginLeft: 0 }} />
    </div>
  );
}

// ── Vista Principal de React (Exportada) ──────────────────────────────────────
interface LeccionDuolingoViewProps {
  leccionId: string | null; // La lección seleccionada en la vista anterior
  onStartTutor: (id: string) => void; // Función para finalmente ir al tutor o lección real
}

export function LeccionDuolingoView({ leccionId, onStartTutor }: LeccionDuolingoViewProps) {
  let globalIndex = 0;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Solo interceptar si hay scroll vertical
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="animate-fade-in" style={{
      width: '100%',
      height: '100%',
      display: "flex",
      flexDirection: "column",
      padding: "20px 40px",
    }}>
      {/* Titulo superior (Fijo arriba o arriba del scroll horizontal) */}
      <div style={{ textAlign: "center", marginBottom: 24, width: "100%", flexShrink: 0 }}>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 800,
          color: "#F5F3EE", margin: "0 0 8px", letterSpacing: "-0.02em",
        }}>
          Ruta Temática
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#8FA8AA", margin: 0 }}>
          Sigue el camino horizontalmente para avanzar
        </p>
      </div>

      {/* Contenedor Scroll Horizontal */}
      <div 
        ref={scrollContainerRef}
        style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
        flex: 1,
        display: "flex",
        alignItems: "center",
        paddingBottom: 20, /* Espacio para barra de scroll en SO que la muestran */
      }}>
        {/* Contenido en Fila */}
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center", 
          width: "max-content", 
          padding: "80px 40px" 
        }}>
          
          {/* Chapters */}
          {CHAPTERS.map((chapter, ci) => {
            const nodes = chapter.lessons.map((lesson, li) => {
              const idx = globalIndex++;
              const offset = OFFSETS[idx % OFFSETS.length];
              const isLast = li === chapter.lessons.length - 1;

              return (
                <LessonNode
                  key={lesson.id}
                  lesson={lesson}
                  chapterColor={chapter.color}
                  offset={offset}
                  isLast={isLast}
                  onActivate={() => onStartTutor(leccionId || "")}
                />
              );
            });

            return (
              <div key={chapter.id} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <ChapterHeader chapter={chapter} isFirst={ci === 0} />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  {nodes}
                </div>
                {ci < CHAPTERS.length - 1 && (
                  <div style={{ height: 3, width: 40, background: "rgba(245,243,238,0.06)", borderRadius: 4, margin: "0" }} />
                )}
              </div>
            );
          })}

          {/* Final */}
          <div style={{ 
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", 
            marginLeft: 48, padding: "28px 24px", background: "#173C3E", borderRadius: 18, 
            border: "1px solid rgba(232,185,74,0.2)", minWidth: 200 
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🏆</div>
            <p style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#F5F3EE", margin: "0 0 6px" }}>
              Maestría
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#8FA8AA", margin: 0 }}>
              Completa todas las secciones
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
