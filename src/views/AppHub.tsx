import { useState } from "react";
import {
  Search, Bell, ChevronDown, Clock, Pin,
  TrendingUp, Users, Sparkles, Code2,
  BarChart3, BookOpen, Settings,
  Cpu, TestTube, HeartHandshake,
  Palette
} from "lucide-react";
import type { View, AppModule, Theme } from "../App";

interface Props {
  onNavigate: (v: View, app?: AppModule) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const APPS = [
  {
    id: "market" as AppModule,
    name: "AI Market Intelligence",
    desc: "Campaigns, company/contact discovery & lead scoring",
    icon: TrendingUp, color: "#5B5CEB", category: "Pipeline",
    badge: "AI",
  },
  {
    id: "crm" as AppModule,
    name: "AI Sales CRM",
    desc: "Opportunity pipeline, quotes, AI SDR & Won closures",
    icon: Users, color: "#7C3AED", category: "Pipeline",
    badge: null,
  },
  {
    id: "discovery" as AppModule,
    name: "AI Discovery Studio",
    desc: "Meeting transcripts, BRD/FRD/SRS & user stories",
    icon: Sparkles, color: "#F59E0B", category: "Delivery",
    badge: "AI",
  },
  {
    id: "design" as AppModule,
    name: "AI Design Studio",
    desc: "User flows, wireframes, prototypes & UX reviews",
    icon: Cpu, color: "#5B5CEB", category: "Delivery",
    badge: null,
  },
  {
    id: "engineering" as AppModule,
    name: "AI Engineering Studio",
    desc: "Solution architecture, database, APIs & code gen",
    icon: Code2, color: "#00D4FF", category: "Engineering",
    badge: "AI",
  },
  {
    id: "quality" as AppModule,
    name: "AI Quality Studio",
    desc: "Test cases, UAT tracking, bugs & CI/CD release logs",
    icon: TestTube, color: "#10B981", category: "Engineering",
    badge: null,
  },
  {
    id: "success" as AppModule,
    name: "Customer Success",
    desc: "SLA incident tracking, tickets & customer health",
    icon: HeartHandshake, color: "#EF4444", category: "Operations",
    badge: null,
  },
  {
    id: "knowledge" as AppModule,
    name: "Knowledge Hub",
    desc: "Enterprise search graph, documents & project code",
    icon: BookOpen, color: "#5B5CEB", category: "Operations",
    badge: "AI",
  },
  {
    id: "executive" as AppModule,
    name: "Executive Center",
    desc: "Financial KPIs, revenue forecast & portfolio health",
    icon: BarChart3, color: "#7C3AED", category: "Operations",
    badge: null,
  },
  {
    id: "admin" as AppModule,
    name: "Administration",
    desc: "Workspace organization, RBAC security & audit logs",
    icon: Settings, color: "#6B7280", category: "Operations",
    badge: null,
  },
];

const CATEGORIES = ["All", "Pipeline", "Delivery", "Engineering", "Operations"];

const RECENT = ["AI Sales CRM", "Development Studio", "Executive Center"];

export default function AppHub({ onNavigate, theme, setTheme }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [pinned, setPinned] = useState(new Set(["executive", "crm", "development"]));
  const [themeOpen, setThemeOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const filtered = APPS.filter(a =>
    (category === "All" || a.category === category) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const toggle = (id: string) => {
    const next = new Set(pinned);
    next.has(id) ? next.delete(id) : next.add(id);
    setPinned(next);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", fontFamily: "'Inter', sans-serif", color: "#F9FAFB", transition: "background-color 0.3s ease" }}>
      {/* Header */}
      <div style={{
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(13,17,23,0.95)", backdropFilter: "blur(20px)",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M9 2L9 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M2.5 6L15.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M15.5 6L2.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.02em" }}>AIX<span style={{ color: "#5B5CEB" }}>ORA</span></span>
        </div>

        <div style={{ flex: 1, maxWidth: 480, margin: "0 32px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search applications..."
            style={{
              width: "100%", padding: "8px 12px 8px 38px", borderRadius: 9, boxSizing: "border-box",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Theme Selector */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setThemeOpen(!themeOpen)} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center", color: "#9CA3AF", transition: "all 0.2s"
            }} title="Change Theme">
              <Palette size={16} />
            </button>
            {themeOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={() => setThemeOpen(false)} />
                <div className="glass-strong" style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0, width: 190,
                  borderRadius: 12, padding: 8, zIndex: 100, boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-text-3)", padding: "4px 8px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Select Theme
                  </div>
                  {[
                    { id: "cosmic" as Theme, name: "Cosmic Indigo", colors: ["#6366F1", "#06B6D4"] },
                    { id: "emerald" as Theme, name: "Emerald Aurora", colors: ["#10B981", "#F59E0B"] },
                    { id: "frost" as Theme, name: "Nordic Frost", colors: ["#38BDF8", "#2DD4BF"] },
                    { id: "amethyst" as Theme, name: "Deep Amethyst", colors: ["#8B5CF6", "#F43F5E"] }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeOpen(false);
                      }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 10,
                        padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
                        background: theme === t.id ? "rgba(255,255,255,0.08)" : "transparent",
                        color: theme === t.id ? "#F9FAFB" : "#9CA3AF",
                        fontFamily: "'Inter', sans-serif", fontSize: 13, textAlign: "left",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ display: "flex", gap: 3 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.colors[0], display: "inline-block" }} />
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.colors[1], display: "inline-block" }} />
                      </div>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}>
            <Bell size={20} />
            <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
          </button>
          <div style={{ position: "relative" }}>
            <div 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 8px", borderRadius: 8, background: userMenuOpen ? "rgba(255,255,255,0.05)" : "transparent" }}
            >
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>SC</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Sarah Chen</div>
              <ChevronDown size={14} color="#6B7280" />
            </div>
            {userMenuOpen && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={() => setUserMenuOpen(false)} />
                <div className="glass-strong" style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0, width: 180,
                  borderRadius: 12, padding: 8, zIndex: 100, boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  textAlign: "left"
                }}>
                  <div style={{ padding: "6px 8px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB" }}>Sarah Chen</div>
                    <div style={{ fontSize: 11, color: "var(--color-text-3)" }}>sarah@company.com</div>
                  </div>
                  <div style={{ height: 1, background: "var(--color-border)", margin: "4px 0" }} />
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onNavigate("landing");
                    }}
                    style={{
                      width: "100%", padding: "8px", borderRadius: 8, border: "none",
                      background: "transparent", color: "#EF4444", fontSize: 13, fontWeight: 600,
                      textAlign: "left", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                      display: "flex", alignItems: "center", gap: 8, transition: "background-color 0.2s"
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 28px" }}>
        {/* Title */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 8px" }}>Application Hub</h1>
          <p style={{ color: "#6B7280", fontSize: 16 }}>Select an application to launch your workspace</p>
        </div>

        {/* Recent */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Clock size={14} color="#6B7280" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Recently Opened</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {RECENT.map(name => {
              const app = APPS.find(a => a.name === name);
              if (!app) return null;
              return (
                <button key={name} onClick={() => onNavigate("app", app.id)} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
                  background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                  cursor: "pointer", color: "#D1D5DB", fontSize: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(91,92,235,0.1)"; e.currentTarget.style.borderColor = "rgba(91,92,235,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(22,27,38,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <app.icon size={16} color={app.color} />
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pinned */}
        {pinned.size > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Pin size={14} color="#6B7280" />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pinned</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {APPS.filter(a => pinned.has(a.id)).map(app => (
                <AppTile key={app.id} app={app} pinned={pinned.has(app.id)} onTogglePin={() => toggle(app.id)} onClick={() => onNavigate("app", app.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 600,
              border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
              background: category === c ? "#5B5CEB" : "rgba(255,255,255,0.05)",
              color: category === c ? "#fff" : "#9CA3AF",
            }}>
              {c}
            </button>
          ))}
        </div>

        {/* All apps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map(app => (
            <AppTile key={app.id} app={app} pinned={pinned.has(app.id)} onTogglePin={() => toggle(app.id)} onClick={() => onNavigate("app", app.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppTile({ app, pinned, onTogglePin, onClick }: { app: typeof APPS[0]; pinned: boolean; onTogglePin: () => void; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "rgba(28, 35, 51, 0.95)" : "rgba(22, 27, 38, 0.7)",
        border: `1px solid ${hovered ? app.color + "35" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 14, padding: "20px 20px 18px",
        cursor: "pointer", transition: "all 0.2s",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${app.color}20` : "0 2px 8px rgba(0,0,0,0.2)",
      }}
      onClick={onClick}
    >
      {/* Badge */}
      {app.badge && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: app.badge === "New" ? "rgba(16,185,129,0.15)" : "rgba(91,92,235,0.15)",
          border: `1px solid ${app.badge === "New" ? "rgba(16,185,129,0.3)" : "rgba(91,92,235,0.3)"}`,
          borderRadius: 100, padding: "2px 8px", fontSize: 10, fontWeight: 700,
          color: app.badge === "New" ? "#10B981" : "#A5A6F6", letterSpacing: "0.05em",
        }}>{app.badge}</div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          background: `${app.color}18`, border: `1px solid ${app.color}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
          boxShadow: hovered ? `0 0 16px ${app.color}30` : "none",
        }}>
          <app.icon size={24} color={app.color} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#F9FAFB", marginBottom: 4, lineHeight: 1.3 }}>{app.name}</div>
          <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{app.desc}</div>
        </div>
      </div>

      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#4B5563", fontWeight: 600, background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: 6 }}>{app.category}</span>
        <button
          onClick={e => { e.stopPropagation(); onTogglePin(); }}
          style={{
            background: "none", border: "none", cursor: "pointer", padding: 4,
            color: pinned ? "#F59E0B" : "#4B5563", transition: "color 0.15s",
            display: "flex",
          }}
        >
          <Pin size={14} fill={pinned ? "#F59E0B" : "none"} />
        </button>
      </div>
    </div>
  );
}
