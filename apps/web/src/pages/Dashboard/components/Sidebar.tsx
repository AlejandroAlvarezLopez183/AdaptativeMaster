import React, { useState } from "react";
import { UserResponse } from "@adaptativemaster/shared";

interface NavItemDef {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  badge?: number;
  live?: boolean;
}

const NAV_MAIN: NavItemDef[] = [
  {
    id: "inicio",
    label: "Inicio",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "aprendizaje",
    label: "Mi aprendizaje",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Aprender con otros",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    live: true,
  },
  {
    id: "tutor",
    label: "Tutor IA",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    ),
  },
  {
    id: "progreso",
    label: "Mi progreso",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const NAV_BOTTOM: NavItemDef[] = [
  {
    id: "config",
    label: "Configuración",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    id: "ayuda",
    label: "Centro de ayuda",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#2563EB" : "#64748B"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

interface NavItemProps {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
  badge?: number;
  live?: boolean;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}

function NavItem({ id, label, icon, badge, live, active, onClick, small }: NavItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: small ? "8px 12px" : "10px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: active
          ? "#EFF6FF"
          : hovered
          ? "#F8FAFC"
          : "transparent",
        color: active ? "#1D4ED8" : hovered ? "#0F172A" : "#475569",
        transition: "all 0.15s ease",
        textAlign: "left",
        position: "relative",
        fontWeight: active ? 600 : 500,
        fontSize: small ? 13 : 14,
        fontFamily: "'Open Sans', system-ui, sans-serif",
      }}
    >
      {/* Active Left Indicator */}
      <div style={{
        position: "absolute",
        left: 0,
        top: "22%",
        bottom: "22%",
        width: 3,
        borderRadius: "0 3px 3px 0",
        background: "#2563EB",
        opacity: active ? 1 : 0,
        transition: "opacity 0.15s",
      }} />

      <span style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
      }}>
        {icon(active)}
      </span>

      <span style={{
        flex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {label}
      </span>

      {badge !== undefined && (
        <span style={{
          background: "#EFF6FF",
          color: "#2563EB",
          border: "1px solid #DBEAFE",
          borderRadius: 12,
          padding: "1px 7px",
          fontSize: 11,
          fontWeight: 600,
          flexShrink: 0,
        }}>
          {badge}
        </span>
      )}

      {live && (
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          background: "#ECFDF5",
          color: "#047857",
          border: "1px solid #A7F3D0",
          borderRadius: 10,
          padding: "2px 6px",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.02em",
          flexShrink: 0,
        }}>
          <span style={{
            width: 5,
            height: 5,
            background: "#10B981",
            borderRadius: "50%",
            display: "inline-block",
          }} />
          Pronto
        </span>
      )}
    </button>
  );
}

interface SidebarProps {
  active: string;
  setActive: (id: string) => void;
  user: UserResponse | null;
  onLogout: () => void;
}

export function Sidebar({ active, setActive, user, onLogout }: SidebarProps) {
  return (
    <aside style={{
      width: 260,
      background: "#FFFFFF",
      borderRight: "1px solid #E2E8F0",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      height: "100%",
      flexShrink: 0,
      userSelect: "none"
    }}>
      {/* Brand Header */}
      <div style={{
        padding: "20px 20px 18px",
        borderBottom: "1px solid #F1F5F9",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "#EFF6FF",
            border: "1px solid #DBEAFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.01em" }}>
                Adaptative
              </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#2563EB" }}>
                Master
              </span>
            </div>
            <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
              EstudiLab AI
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3, overflowY: "auto" }}>
        <div style={{ padding: "4px 10px 8px", fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Menú principal
        </div>

        {NAV_MAIN.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            active={active === item.id}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: "1px solid #F1F5F9", padding: "12px 12px 6px", display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ padding: "4px 10px 6px", fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Preferencias
        </div>
        {NAV_BOTTOM.map((item) => (
          <NavItem
            key={item.id}
            {...item}
            active={active === item.id}
            onClick={() => setActive(item.id)}
            small
          />
        ))}
      </div>

      {/* User Profile Card */}
      <div style={{
        margin: "8px 12px 16px",
        padding: "10px 12px",
        borderRadius: 10,
        background: "#F8FAFC",
        border: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div 
          onClick={() => setActive("perfil")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flex: 1,
            minWidth: 0,
            cursor: "pointer",
          }}
          title="Ver perfil"
        >
          <div style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#EFF6FF",
            border: "1px solid #DBEAFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#2563EB",
            flexShrink: 0,
            textTransform: "uppercase",
          }}>
            {user?.nombre ? user.nombre.substring(0, 2) : 'US'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.nombre || "Usuario"}
            </p>
            <p style={{ fontSize: 11, color: "#64748B", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user?.email || "estudiante@estudilab.ai"}
            </p>
          </div>
        </div>

        {/* Logout Quick Action */}
        <button
          onClick={onLogout}
          title="Cerrar sesión"
          style={{
            background: "transparent",
            border: "none",
            color: "#94A3B8",
            cursor: "pointer",
            padding: 6,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#DC2626";
            e.currentTarget.style.background = "#FEF2F2";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#94A3B8";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
