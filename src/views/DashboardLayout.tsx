import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Search, Bell, ChevronDown,
  ChevronLeft, ChevronRight as ChevRight,
  Home, Palette, LayoutGrid, Sparkles
} from "lucide-react";
import type { View, AppModule, Theme } from "../App";
import GrowWorkspace from "./apps/GrowWorkspace";
import DiscoverWorkspace from "./apps/DiscoverWorkspace";
import DeliverWorkspace from "./apps/DeliverWorkspace";
import PeopleWorkspace from "./apps/PeopleWorkspace";
import MoneyWorkspace from "./apps/MoneyWorkspace";
import ServeWorkspace from "./apps/ServeWorkspace";
import GenericAppDashboard from "./apps/GenericAppDashboard";
import { api } from "../imports/api";
import { CORE_APPS } from "../components/hub/HubData";

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const APP_CONFIGS = CORE_APPS.map(app => ({
  id: app.id as AppModule,
  name: app.name + " (" + app.label + ")",
  icon: app.icon,
  color: app.color,
  section: "Platform"
}));

const APP_MODULES: Record<string, { id: string; label: string }[]> = {
  grow: [
    { id: "dashboard", label: "Dashboard" },
    { id: "market-intelligence", label: "Market Intelligence" },
    { id: "leads", label: "Leads" },
    { id: "accounts", label: "Accounts" },
    { id: "contacts", label: "Contacts" },
    { id: "opportunities", label: "Opportunities" },
    { id: "activities", label: "Activities" },
    { id: "pipeline", label: "Pipeline" },
    { id: "proposals", label: "Proposals" },
    { id: "estimation", label: "Estimation" },
    { id: "forecast", label: "Forecast" },
    { id: "customer-intelligence", label: "Customer Intelligence" },
    { id: "ai", label: "AI" },
    { id: "reports", label: "Reports" }
  ],
  discover: [
    { id: "dashboard", label: "Dashboard" },
    { id: "discovery", label: "Discovery" },
    { id: "meetings", label: "Meetings" },
    { id: "requirements", label: "Requirements" },
    { id: "processes", label: "Processes" },
    { id: "stories", label: "User Stories" },
    { id: "solution", label: "Solution" },
    { id: "scope", label: "Scope" },
    { id: "estimation", label: "Estimation" },
    { id: "sow", label: "Proposal / SOW" },
    { id: "traceability", label: "Traceability" },
    { id: "documents", label: "Documents" },
    { id: "ai", label: "AI" },
    { id: "reports", label: "Reports" }
  ],
  deliver: [
    { id: "dashboard", label: "Dashboard" },
    { id: "portfolio", label: "Portfolio" },
    { id: "projects", label: "Projects" },
    { id: "planning", label: "Planning" },
    { id: "wbs", label: "WBS" },
    { id: "schedule", label: "Schedule" },
    { id: "agile", label: "Agile" },
    { id: "kanban", label: "Kanban" },
    { id: "tasks", label: "Tasks" },
    { id: "risks", label: "Risks" },
    { id: "issues", label: "Issues" },
    { id: "dependencies", label: "Dependencies" },
    { id: "changes", label: "Changes" },
    { id: "engineering", label: "Engineering" },
    { id: "qa", label: "QA" },
    { id: "testing", label: "Testing" },
    { id: "defects", label: "Defects" },
    { id: "uat", label: "UAT" },
    { id: "releases", label: "Releases" },
    { id: "deployment", label: "Deployment" },
    { id: "ai", label: "AI" },
    { id: "reports", label: "Reports" }
  ],
  people: [
    { id: "dashboard", label: "Dashboard" },
    { id: "employees", label: "Employees" },
    { id: "teams", label: "Teams" },
    { id: "skills", label: "Skills" },
    { id: "demand", label: "Demand" },
    { id: "capacity", label: "Capacity" },
    { id: "allocation", label: "Allocation" },
    { id: "scheduling", label: "Scheduling" },
    { id: "timesheets", label: "Timesheets" },
    { id: "expenses", label: "Expenses" },
    { id: "utilization", label: "Utilization" },
    { id: "bench", label: "Bench" },
    { id: "workforce", label: "Workforce Planning" },
    { id: "ai", label: "AI" },
    { id: "reports", label: "Reports" }
  ],
  money: [
    { id: "dashboard", label: "Dashboard" },
    { id: "commercials", label: "Commercials" },
    { id: "contracts", label: "Contracts" },
    { id: "rate-cards", label: "Rate Cards" },
    { id: "budgets", label: "Budgets" },
    { id: "costs", label: "Costs" },
    { id: "revenue", label: "Revenue" },
    { id: "billing", label: "Billing" },
    { id: "invoices", label: "Invoices" },
    { id: "receivables", label: "Receivables" },
    { id: "profitability", label: "Profitability" },
    { id: "forecast", label: "Forecast" },
    { id: "approvals", label: "Approvals" },
    { id: "ai", label: "AI" },
    { id: "reports", label: "Reports" }
  ],
  serve: [
    { id: "dashboard", label: "Dashboard" },
    { id: "customers", label: "Customers" },
    { id: "desk", label: "Service Desk" },
    { id: "tickets", label: "Tickets" },
    { id: "incidents", label: "Incidents" },
    { id: "problems", label: "Problems" },
    { id: "changes", label: "Changes" },
    { id: "slas", label: "SLAs" },
    { id: "catalog", label: "Service Catalog" },
    { id: "knowledge", label: "Knowledge" },
    { id: "success", label: "Customer Success" },
    { id: "health", label: "Customer Health" },
    { id: "warranty", label: "Warranty" },
    { id: "amc", label: "AMC" },
    { id: "escalations", label: "Escalations" },
    { id: "ai", label: "AI" },
    { id: "reports", label: "Reports" }
  ]
};

export default function DashboardLayout({ theme, setTheme }: Props) {
  const navigate = useNavigate();
  const { appId = "grow", moduleId = "dashboard", recordId } = useParams();
  
  const [collapsed, setCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [aiMsg, setAiMsg] = useState("");
  const [aiHistory, setAiHistory] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your ON IT AI Assistant. I can help you generate documents, analyze data, create tasks, summarize meetings, and navigate the platform. What would you like to do?" }
  ]);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string }>({ name: "Sarah Chen", email: "sarah@company.com" });

  useEffect(() => {
    const saved = localStorage.getItem("onit_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const currentApp = APP_CONFIGS.find(a => a.id === appId) || APP_CONFIGS[0];
  const currentModules = APP_MODULES[appId] || APP_MODULES["grow"];
  const currentModuleLabel = currentModules.find(m => m.id === moduleId)?.label || "Dashboard";

  const sendAI = () => {
    if (!aiMsg.trim()) return;
    const msg = aiMsg;
    setAiMsg("");
    setAiHistory(h => [...h, { role: "user", text: msg }]);
    setTimeout(() => {
      setAiHistory(h => [...h, { role: "ai", text: generateAIResponse(msg) }]);
    }, 800);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--color-bg)", fontFamily: "'Inter', sans-serif", color: "#F9FAFB", overflow: "hidden" }}>
      
      {/* MODULE SIDEBAR (Current Application Navigation) */}
      <aside style={{
        width: collapsed ? 58 : 220, flexShrink: 0, background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        display: "flex", flexDirection: "column",
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)", overflow: "hidden",
        position: "relative", zIndex: 30,
      }}>
        {/* Logo Header */}
        <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 14px", gap: 10, borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M9 2L9 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M2.5 6L15.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M15.5 6L2.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          </div>
          {!collapsed && <span style={{ fontSize: 14, fontWeight: 850, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>ON<span style={{ color: "var(--color-primary)" }}> IT</span></span>}
        </div>

        {/* Navigation list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "16px 8px", overflowY: "auto" }}>
          {/* App Hub Link */}
          <NavItem icon={Home} label="App Hub" collapsed={collapsed} active={false} color="#9CA3AF" onClick={() => navigate("/hub")} />
          
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "8px 12px" }} />

          {/* Current app name header */}
          {!collapsed && (
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--color-text-3)", textTransform: "uppercase", paddingLeft: 8, letterSpacing: "0.08em", marginBottom: 8, marginTop: 4 }}>
              {currentApp.name}
            </div>
          )}

          {currentModules.map(m => (
            <button
              key={m.id}
              onClick={() => navigate(`/app/${appId}/${m.id}`)}
              style={{
                width: "100%", display: "flex", alignItems: "center", 
                padding: collapsed ? "10px 14px" : "8px 12px", 
                borderRadius: 8,
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: moduleId === m.id ? 600 : 500,
                background: moduleId === m.id ? "rgba(255,255,255,0.06)" : "transparent",
                color: moduleId === m.id ? "#F9FAFB" : "#9CA3AF",
                textAlign: "left", transition: "all 0.15s",
                justifyContent: collapsed ? "center" : "flex-start"
              }}
              title={collapsed ? m.label : undefined}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: moduleId === m.id ? currentApp.color : "transparent", marginRight: collapsed ? 0 : 10, display: "inline-block" }} />
              {!collapsed && m.label}
            </button>
          ))}
        </div>

        {/* Collapse toggle */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "12px 14px" }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start",
            gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "#6B7280", fontFamily: "'Inter', sans-serif", fontSize: 13, transition: "all 0.2s",
          }}>
            {collapsed ? <ChevRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* 3. MAIN WORKSPACE WITH TOP HEADER */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        
        {/* Top Header */}
        <header style={{
          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(13,17,23,0.8)", backdropFilter: "blur(16px)",
          flexShrink: 0, gap: 16, zIndex: 40
        }}>
          {/* Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <currentApp.icon size={18} color={currentApp.color} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#F9FAFB" }}>{currentApp.name}</span>
            <span style={{ color: "#374151", fontSize: 14 }}>/</span>
            <span style={{ color: "#9CA3AF", fontSize: 14 }}>{currentModuleLabel}</span>
          </div>

          {/* Header Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Global Search */}
            <button onClick={() => setCmdOpen(!cmdOpen)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 14px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8, color: "#6B7280", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>
              <Search size={14} />
              <span>Search...</span>
              <kbd style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "1px 5px", fontSize: 11 }}>⌘K</kbd>
            </button>

            {/* Theme Selector Dropdown */}
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

            {/* APPLICATION SWITCHER (3x3 grid) */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setSwitcherOpen(!switcherOpen)} style={{
                background: switcherOpen ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                border: switcherOpen ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", color: switcherOpen ? "var(--color-primary)" : "#9CA3AF", transition: "all 0.2s"
              }} title="Application Switcher">
                <LayoutGrid size={16} />
              </button>
              {switcherOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={() => setSwitcherOpen(false)} />
                  <div className="glass-strong" style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0, width: 480,
                    borderRadius: 16, padding: 24, zIndex: 100, boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                    display: "flex", flexDirection: "column", gap: 20
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-3)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8 }}>
                      Application Switcher Mega Menu
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {CORE_APPS.map(app => (
                          <button
                            key={app.id}
                            onClick={() => {
                              navigate(`/app/${app.id}/dashboard`);
                              setSwitcherOpen(false);
                            }}
                            style={{
                              display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8,
                              border: "none", cursor: "pointer", background: appId === app.id ? "rgba(99,102,241,0.12)" : "transparent",
                              color: appId === app.id ? "#F9FAFB" : "#9CA3AF", textAlign: "left", fontFamily: "'Inter', sans-serif", fontSize: 12
                            }}
                          >
                            <app.icon size={14} color={app.color} />
                            <span>{app.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6B7280" }}>
                      <span>Recent: AI Market Intelligence</span>
                      <span>Favorite: Engineering Studio</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <button style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, width: 34, height: 34, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280", position: "relative" }}>
              <Bell size={16} />
              <span style={{ position: "absolute", top: 6, right: 6, width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />
            </button>

            {/* AI Copilot Toggle */}
            <button onClick={() => setAiOpen(!aiOpen)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 12px",
              background: aiOpen ? "rgba(91,92,235,0.2)" : "rgba(91,92,235,0.1)", border: `1px solid rgba(91,92,235,${aiOpen ? "0.5" : "0.25"})`,
              borderRadius: 8, color: "#A5A6F6", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s",
            }}>
              <Sparkles size={14} /> AI
            </button>

            {/* User Profile Menu */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 8px", borderRadius: 8, background: userMenuOpen ? "rgba(255,255,255,0.05)" : "transparent" }}
              >
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                  {currentUser.name ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase() : "SC"}
                </div>
                <ChevronDown size={13} color="#6B7280" />
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
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#F9FAFB" }}>{currentUser.name}</div>
                      <div style={{ fontSize: 11, color: "var(--color-text-3)" }}>{currentUser.email}</div>
                    </div>
                    <div style={{ height: 1, background: "var(--color-border)", margin: "4px 0" }} />
                    <button
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await api.auth.logout();
                        navigate("/");
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
        </header>

        {/* Content Workspace Area */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
            <AppContent appId={appId} moduleId={moduleId} recordId={recordId} />
          </main>

          {/* AI Panel */}
          {aiOpen && (
            <div style={{
              width: 340, borderLeft: "1px solid rgba(255,255,255,0.06)",
              background: "#0D1117", display: "flex", flexDirection: "column",
              animation: "slideInRight 0.25s ease-out",
            }}>
              <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Sparkles size={14} color="white" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>ON IT AI</div>
                    <div style={{ fontSize: 11, color: "#10B981", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                      Online
                    </div>
                  </div>
                  <button onClick={() => setAiOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 18, lineHeight: 1 }}>×</button>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
                {aiHistory.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{
                      maxWidth: "85%", padding: "10px 13px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                      background: m.role === "user" ? "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" : "rgba(22,27,38,0.8)",
                      border: m.role === "ai" ? "1px solid rgba(255,255,255,0.06)" : "none",
                      fontSize: 13, lineHeight: 1.6, color: "#E5E7EB",
                    }}>{m.text}</div>
                  </div>
                ))}
              </div>
              {/* Quick actions */}
              <div style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {["Generate BRD", "Summarize", "Create Tasks", "Analyze"].map(a => (
                  <button key={a} onClick={() => { setAiMsg(a); }} style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 100, background: "rgba(91,92,235,0.1)",
                    border: "1px solid rgba(91,92,235,0.2)", color: "#A5A6F6", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  }}>{a}</button>
                ))}
              </div>
              <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
                <input
                  value={aiMsg} onChange={e => setAiMsg(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendAI()}
                  placeholder="Ask ON IT AI..."
                  style={{
                    flex: 1, padding: "9px 13px", borderRadius: 9, background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)", color: "#F9FAFB", fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif",
                  }}
                />
                <button onClick={sendAI} style={{
                  width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, collapsed, active, color, onClick }: { icon: any; label: string; collapsed: boolean; active: boolean; color: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: collapsed ? "9px 14px" : "8px 16px",
        margin: "1px 8px", borderRadius: 8, cursor: "pointer",
        justifyContent: collapsed ? "center" : "flex-start",
        background: active ? "rgba(99,102,241,0.12)" : hovered ? "rgba(255,255,255,0.04)" : "transparent",
        borderLeft: active ? `2px solid ${color}` : "2px solid transparent",
        transition: "all 0.15s",
      }}
    >
      <Icon size={16} color={active ? color : hovered ? "#9CA3AF" : "#4B5563"} style={{ flexShrink: 0 }} />
      {!collapsed && (
        <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#F9FAFB" : hovered ? "#D1D5DB" : "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {label}
        </span>
      )}
    </div>
  );
}

function AppContent({ appId, moduleId, recordId }: { appId: string; moduleId: string; recordId?: string }) {
  const renderAppContent = () => {
    switch (appId) {
      case "grow": return <GrowWorkspace subModule={moduleId} recordId={recordId} />;
      case "discover": return <DiscoverWorkspace subModule={moduleId} />;
      case "deliver": return <DeliverWorkspace subModule={moduleId} />;
      case "people": return <PeopleWorkspace subModule={moduleId} />;
      case "money": return <MoneyWorkspace subModule={moduleId} />;
      case "serve": return <ServeWorkspace subModule={moduleId} />;
      default: return <GenericAppDashboard appId={appId as AppModule} />;
    }
  };
  return renderAppContent();
}

function generateAIResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("brd")) return "I'll generate a Business Requirements Document based on the current project context. Would you like me to include stakeholder analysis, functional requirements, and acceptance criteria?";
  if (lower.includes("summar")) return "I've analyzed the recent meeting recordings and can provide a summary with action items, decisions made, and follow-up tasks. Should I also create tasks in the sprint board?";
  if (lower.includes("task")) return "I can create tasks from the requirements. I've identified 8 actionable items from the latest discovery session. Shall I assign them to the current sprint?";
  if (lower.includes("analyz")) return "Running analysis on your delivery pipeline... I can see 3 at-risk projects, 2 resource bottlenecks, and predict a 94% on-time delivery probability for the current sprint.";
  return "I understand. Let me process that and provide you with the most relevant insights from your ON IT workspace. Is there anything specific you'd like me to focus on?";
}
