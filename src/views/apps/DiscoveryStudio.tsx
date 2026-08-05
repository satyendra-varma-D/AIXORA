import { useState, useEffect } from "react";
import { 
  Sparkles, Mic, FileText, CheckSquare, Plus, Video, Play, 
  ChevronLeft, Trash2, Edit3, ArrowRight, UserPlus, CheckCircle, 
  Clock, ShieldAlert, Award, FileSpreadsheet, Download, RefreshCw, 
  Search, Database, Cpu, MessageSquare, Zap, Eye, Save, HelpCircle, Layers
} from "lucide-react";

// ==========================================
// MOCK ENTERPRISE PRODUCT DISCOVERY DATA
// ==========================================

const INITIAL_SESSIONS = [
  { 
    id: "DS-101", 
    title: "FinTech Core Ledger Migration", 
    domain: "Banking & Financial Services", 
    client: "Nexus Global Bank", 
    owner: "Sarah Chen", 
    progress: 85, 
    date: "2026-02-05", 
    completion: "85%",
    goals: [
      { id: "G-1", goal: "Reduce ledger latency below 50ms", problem: "Current database locking causes 2.4s peaks", kpi: "P99 transaction latency", driver: "Regulatory compliance & user retention" },
      { id: "G-2", goal: "Enable multi-tenant schema isolation", problem: "Co-mingled tenant databases raise compliance flags", kpi: "Zero data leakage audits", driver: "GDPR / MAS compliance" }
    ],
    stakeholders: [
      { name: "Rian Pratama", role: "Sponsor / VP Tech", dept: "Architecture", pain: "High infrastructure maintenance cost", influence: "High", authority: "Sign-off Authority" },
      { name: "Nurul Aini", role: "SME / Lead Auditor", dept: "Compliance", pain: "Difficulty generating real-time audit logs", influence: "Medium", authority: "Consulted" }
    ],
    requirements: [
      { id: "FR-01", category: "Transactions", desc: "System must process ledger debit/credit postings in isolated ACID transactions", priority: "Critical", value: "High", status: "Approved" },
      { id: "FR-02", category: "Auditability", desc: "Immutable write-ahead audit logs stored in secure object storage with WORM policies", priority: "High", value: "High", status: "Draft" }
    ],
    nonFunctional: [
      { id: "NFR-01", type: "Performance", desc: "API response time P95 < 100ms under 10,000 concurrent requests/sec", priority: "Critical" },
      { id: "NFR-02", type: "Security", desc: "Data encrypted at rest using AES-256 and in transit via TLS 1.3 with PFS", priority: "Critical" }
    ],
    currentProcess: "Clients send HTTP REST request -> Ledger Database locks tables -> Write ledger log -> Unlock tables -> Await callback response.",
    futureProcess: "Clients send request via gRPC -> Async ingestion queue (Kafka) -> Isolated Ledger service writes concurrently using optimistic locking -> Event hub notifies client."
  },
  { 
    id: "DS-102", 
    title: "Logistics Cloud Delivery System", 
    domain: "Supply Chain", 
    client: "IndoAgri Perkasa", 
    owner: "Michael Jones", 
    progress: 40, 
    date: "2026-02-04", 
    completion: "40%",
    goals: [],
    stakeholders: [],
    requirements: [],
    nonFunctional: [],
    currentProcess: "",
    futureProcess: ""
  }
];

const INITIAL_DOCUMENTS = [
  { type: "BRD", title: "Business Requirements Document - FinTech Core v2", version: "v2.1", author: "Sarah Chen", date: "2h ago", status: "Approved" },
  { type: "FRD", title: "Functional Requirements Document - Security Suite", version: "v1.4", author: "Sarah Chen", date: "1d ago", status: "Under Review" },
  { type: "SRS", title: "Software Requirements Specification - Ledger API", version: "v0.9", author: "Sarah Chen", date: "3d ago", status: "Draft" },
];

const INITIAL_STORIES = [
  { id: "US-101", epic: "Security", feature: "OAuth2", title: "As a ledger manager, I want to authenticate via OAuth2/MFA so my account is secure", points: 8, status: "Approved", owner: "Sarah Chen", criteria: "1. MFA code requested upon password entry. 2. JWT token expires in 15 mins." },
  { id: "US-102", epic: "Transactions", feature: "Programmatic Ledger", title: "As a developer, I want to initiate ledger transfers programmatically via gRPC API", points: 13, status: "Approved", owner: "Michael Jones", criteria: "1. Payload signature validated. 2. Handshake must complete under 30ms." },
  { id: "US-103", epic: "Auditability", feature: "Compliance Logs", title: "As an auditor, I want to pull ledger logs for security compliance reports in CSV format", points: 5, status: "Draft", owner: "Sarah Chen", criteria: "1. Export includes date range filters. 2. File size limit up to 100MB." }
];

export default function DiscoveryStudio({ subModule }: { subModule?: string }) {
  const [localTab, setLocalTab] = useState<string>("sessions");
  const tab = (subModule && ["sessions", "documents", "stories", "ai"].includes(subModule)) ? subModule : localTab;
  const setTab = setLocalTab;

  // Data States
  const [sessions, setSessions] = useState<any[]>(INITIAL_SESSIONS);
  const [documents, setDocuments] = useState<any[]>(INITIAL_DOCUMENTS);
  const [stories, setStories] = useState<any[]>(INITIAL_STORIES);

  // Selection states for Master-Detail views
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [selectedStory, setSelectedStory] = useState<any | null>(null);
  const [activeSessionSubView, setActiveSessionSubView] = useState<string>("goals");

  // Create forms & drawers
  const [drawerMode, setDrawerMode] = useState<"session" | "requirement" | "story" | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // AI assistants
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAssistantOutput, setAiAssistantOutput] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  useEffect(() => {
    setSelectedSession(null);
    setSelectedStory(null);
  }, [tab]);


  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (drawerMode === "session") {
      const newSession = {
        id: `DS-10${sessions.length + 1}`,
        title: formData.title || "New Initiative",
        domain: formData.domain || "Technology",
        client: formData.client || "Self",
        owner: "Sarah Chen",
        progress: 10,
        date: new Date().toISOString().split("T")[0],
        completion: "10%",
        goals: [],
        stakeholders: [],
        requirements: [],
        nonFunctional: []
      };
      setSessions(prev => [...prev, newSession]);
      setNotification("Success: Discovery Session initialized!");
    } else if (drawerMode === "requirement") {
      if (!selectedSession) return;
      const newReq = {
        id: `FR-0${(selectedSession.requirements?.length || 0) + 1}`,
        category: formData.category || "General",
        desc: formData.desc || "Req Description",
        priority: formData.priority || "High",
        value: "High",
        status: "Draft"
      };
      setSelectedSession((prev: any) => ({
        ...prev,
        requirements: [...(prev.requirements || []), newReq]
      }));
      setNotification("Success: Requirement added to active session!");
    } else if (drawerMode === "story") {
      const newStory = {
        id: `US-10${stories.length + 1}`,
        epic: formData.epic || "Core Capability",
        feature: formData.feature || "Integrations",
        title: formData.title || "As a user, I want to execute tasks...",
        points: parseInt(formData.points || "5"),
        status: "Draft",
        owner: "Sarah Chen",
        criteria: formData.criteria || "Awaiting verification rules."
      };
      setStories(prev => [...prev, newStory]);
      setNotification("Success: User Story logged to backlog!");
    }
    setDrawerMode(null);
  };

  // AI capabilities inside Discovery Studio
  const handleAIGenerateDoc = (type: string) => {
    setAiLoading(true);
    setAiAssistantOutput(null);
    setTimeout(() => {
      setAiLoading(false);
      setAiAssistantOutput(
        `# AI Generated ${type} Specification Draft\n\n` +
        `## 1. System Context & Topology\n` +
        `The system interfaces with gRPC/REST clients under high throughput conditions. Standard authentication token lifetimes are set to 900 seconds.\n\n` +
        `## 2. Security Bounds\n` +
        `- [SEC-01] Isolated tenant partition validation rules are enforced at database transaction locks.\n` +
        `- [SEC-02] Audit trail logs are signed via SHA-256 for non-repudiation.`
      );
    }, 1200);
  };

  const handleAISuggestRequirements = () => {
    if (!selectedSession) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      const suggested = [
        { id: `FR-0${(selectedSession.requirements?.length || 0) + 1}`, category: "Data Safety", desc: "Real-time automated failover replication to secondary region under 15s latency SLA.", priority: "Critical", value: "High", status: "Draft" }
      ];
      setSelectedSession((prev: any) => ({
        ...prev,
        requirements: [...(prev.requirements || []), ...suggested]
      }));
      setNotification("AI Suggestion: Automatically identified and added missing failover requirements!");
    }, 1000);
  };

  return (
    <div style={{ flex: 1, color: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 10000,
          background: notification.includes("Success") ? "#10B981" : "#F59E0B",
          color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 700,
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)", display: "flex", gap: 10, alignItems: "center"
        }}>
          <CheckCircle size={18} />
          {notification}
        </div>
      )}

      {/* Main Studio Header */}
      {!selectedSession && !selectedStory && (
        <div style={{ padding: "28px 28px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Discovery Studio</h1>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Unify business goals, optimization flows, requirements engineering, and handoff backlog mapping.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleAIGenerateDoc("BRD")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--color-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Sparkles size={14} /> AI Document Builder
              </button>
              <button onClick={() => handleOpenCreate("session")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none" }}>
                <Plus size={14} /> New Workshop Session
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, width: "fit-content", marginBottom: 24 }}>
            {[
              { id: "sessions", label: "Discovery Workshops", icon: Video },
              { id: "documents", label: "BRD / FRD / SRS", icon: FileText },
              { id: "stories", label: "Requirements Backlog", icon: CheckSquare },
              { id: "ai", label: "AI Writing Assistant", icon: Sparkles }
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer",
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                background: tab === t.id ? "var(--color-primary)" : "transparent", color: tab === t.id ? "#fff" : "#6B7280",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================
          SUB-PANEL VIEWS
          ========================================================== */}
      
      {/* 1. DISCOVERY WORKSHOPS MODULE */}
      {tab === "sessions" && !selectedSession && (
        <div style={{ padding: "0 28px 40px" }}>
          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px" }}>Session / Initiative Name</th>
                  <th style={{ padding: "12px 16px" }}>Domain</th>
                  <th style={{ padding: "12px 16px" }}>Target Client</th>
                  <th style={{ padding: "12px 16px" }}>Completion %</th>
                  <th style={{ padding: "12px 16px" }}>Session Date</th>
                  <th style={{ padding: "12px 16px" }}>Initiative Lead</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id} onClick={() => setSelectedSession(s)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{s.title}</td>
                    <td style={{ padding: "14px 16px", color: "var(--color-primary)" }}>{s.domain}</td>
                    <td style={{ padding: "14px 16px" }}>{s.client}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 64, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${s.progress}%`, background: "var(--color-primary)", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>{s.completion}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{s.date}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{s.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DISCOVERY WORKSHOP DETAILED WORKSPACE */}
      {selectedSession && tab === "sessions" && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedSession(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Sessions
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleAISuggestRequirements} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--color-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Sparkles size={14} /> AI Audit Gaps
              </button>
              <button onClick={() => handleOpenCreate("requirement")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
                <Plus size={14} /> Add Requirement
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            {/* Left Detail Panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Discovery Workspace</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#fff" }}>{selectedSession.title}</h2>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Client: {selectedSession.client} · Domain: {selectedSession.domain}</div>
              </div>

              {/* Sub-navigation tabs within session detail workspace */}
              <div style={{ display: "flex", gap: 16, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>
                {[
                  { id: "goals", label: "Business Goals" },
                  { id: "stakeholders", label: "Stakeholder Matrix" },
                  { id: "process", label: "Business Process map" },
                  { id: "requirements", label: "Functional Specs" }
                ].map(sub => (
                  <button key={sub.id} onClick={() => setActiveSessionSubView(sub.id)} style={{ background: "none", border: "none", color: activeSessionSubView === sub.id ? "var(--color-primary)" : "#6B7280", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* Business Goals Context */}
              {activeSessionSubView === "goals" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(selectedSession.goals || []).map((g: any) => (
                    <div key={g.id} style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 18 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)" }}>{g.id}</span>
                      </div>
                      <h4 style={{ fontSize: 14, fontWeight: 750, color: "#fff", margin: "8px 0" }}>{g.goal}</h4>
                      <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 10px" }}>Problem Statement: {g.problem}</p>
                      <div style={{ fontSize: 12, color: "#D1D5DB" }}>Success Metric: <strong style={{ color: "#10B981" }}>{g.kpi}</strong></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stakeholders Matrix */}
              {activeSessionSubView === "stakeholders" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(selectedSession.stakeholders || []).map((sh: any) => (
                    <div key={sh.name} style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <strong style={{ fontSize: 14, color: "#fff" }}>{sh.name}</strong>
                        <span style={{ fontSize: 11, color: "var(--color-primary)" }}>{sh.role}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>Department: {sh.dept}</div>
                      <p style={{ fontSize: 13, color: "#D1D5DB", marginTop: 10, margin: "10px 0 0" }}>Pain Points: {sh.pain}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Business Process Flow Map */}
              {activeSessionSubView === "process" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#EF4444", textTransform: "uppercase", marginBottom: 12 }}>Current State Process</div>
                    <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>{selectedSession.currentProcess || "No current state process mapped yet."}</p>
                  </div>

                  <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.03), rgba(16,185,129,0.03))", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 14, padding: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#10B981", textTransform: "uppercase", marginBottom: 12 }}>Future AI-Optimized Process</div>
                    <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>{selectedSession.futureProcess || "Awaiting optimization rules."}</p>
                  </div>
                </div>
              )}

              {/* Functional Requirements */}
              {activeSessionSubView === "requirements" && (
                <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                        <th style={{ padding: "12px 16px" }}>Req ID</th>
                        <th style={{ padding: "12px 16px" }}>Category</th>
                        <th style={{ padding: "12px 16px" }}>Description</th>
                        <th style={{ padding: "12px 16px" }}>Priority</th>
                        <th style={{ padding: "12px 16px" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedSession.requirements || []).map((req: any) => (
                        <tr key={req.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{req.id}</td>
                          <td style={{ padding: "14px 16px" }}>{req.category}</td>
                          <td style={{ padding: "14px 16px", color: "#D1D5DB" }}>{req.desc}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: req.priority === "Critical" ? "#EF4444" : "var(--color-primary)" }}>{req.priority}</span>
                          </td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: req.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: req.status === "Approved" ? "#10B981" : "#9CA3AF" }}>{req.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Right Assistant Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.03), rgba(217,70,239,0.03))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <Sparkles size={16} color="var(--color-primary)" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>AI Discovery Advisor</span>
                </div>
                <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>
                  This ledger modernization targets MAS compliance. The audit trail storage policy should enforce WORM to prevent non-compliance penalties.
                </p>
                <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
                  <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>AI Suggested NFRs</div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 650, marginTop: 6 }}>1. Multi-region Replication (RTO &lt; 5m)</div>
                  <div style={{ fontSize: 13, color: "#fff", fontWeight: 650, marginTop: 4 }}>2. Automated failover validation logs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BRD / FRD / SRS DOCUMENT EXPLORER */}
      {tab === "documents" && (
        <div style={{ padding: "0 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {documents.map(d => (
              <div key={d.title} style={{ padding: 20, background: "rgba(22,27,38,0.7)", borderRadius: 12, border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#F9FAFB" }}>{d.type}</span>
                    <span style={{ fontSize: 12, color: d.status === "Approved" ? "#10B981" : "#F59E0B", fontWeight: 600 }}>{d.status}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 16 }}>{d.title}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, fontSize: 12, color: "#6B7280" }}>
                  <span>Author: {d.author}</span>
                  <span>{d.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. REQUIREMENTS & USER STORIES BACKLOG */}
      {tab === "stories" && !selectedStory && (
        <div style={{ padding: "0 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ position: "relative", width: 360 }}>
              <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search backlog..." style={{ width: "100%", padding: "8px 12px 8px 38px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, outline: "none" }} />
            </div>
            <button onClick={() => handleOpenCreate("story")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={14} /> Create Story
            </button>
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px" }}>Story ID</th>
                  <th style={{ padding: "12px 16px" }}>Epic / Feature</th>
                  <th style={{ padding: "12px 16px" }}>Title / Requirement</th>
                  <th style={{ padding: "12px 16px" }}>Story Points</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {stories.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())).map(story => (
                  <tr key={story.id} onClick={() => setSelectedStory(story)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{story.id}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "var(--color-primary)" }}>{story.epic}</span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#fff" }}>{story.title}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{story.points} SP</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: story.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: story.status === "Approved" ? "#10B981" : "#9CA3AF" }}>
                        {story.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* USER STORY DETAILED WORKSPACE */}
      {selectedStory && tab === "stories" && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedStory(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Stories
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button 
                onClick={() => {
                  setNotification("AI Assistant: Automated acceptance criteria successfully generated!");
                  setSelectedStory((prev: any) => ({ ...prev, criteria: prev.criteria + "\n3. Negative Case: Payload schema validation failure raises HTTP 422." }));
                }}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--color-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                <Sparkles size={14} /> Generate Acceptance Criteria
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            {/* Left Story Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{selectedStory.id} · Epic: {selectedStory.epic}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#fff", lineHeight: 1.4 }}>{selectedStory.title}</h3>
              </div>

              {/* Acceptance Criteria */}
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <h4 style={{ fontSize: 14, fontWeight: 750, color: "#fff", marginBottom: 12 }}>Acceptance Criteria Specifications</h4>
                <pre style={{ background: "rgba(0,0,0,0.15)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 16, color: "#D1D5DB", fontSize: 13, fontFamily: "inherit", whiteSpace: "pre-wrap", margin: 0 }}>
                  {selectedStory.criteria}
                </pre>
              </div>

              {/* Technical Handoff Mapping */}
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <h4 style={{ fontSize: 14, fontWeight: 750, color: "#fff", marginBottom: 12 }}>Technical Tasks & API Mappings</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ padding: 12, background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>gRPC API Mapping</div>
                    <code style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, display: "block" }}>rpc TransferLedger(LedgerPayload) returns (Response);</code>
                  </div>
                  <div style={{ padding: 12, background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>Database Constraint</div>
                    <span style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4, display: "block" }}>transaction_locks table mapping isolation level = SERIALIZABLE.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Estimator */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Backlog Estimate</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: "var(--color-accent)" }}>{selectedStory.points} SP</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Estimated Story Points</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. AI WRITING ASSISTANT */}
      {tab === "ai" && (
        <div style={{ padding: "0 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 16 }}>Context-Aware Requirements Assisting</h3>
            
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <input 
                value={aiPrompt} 
                onChange={e => setAiPrompt(e.target.value)} 
                placeholder="Suggest microservice schema details for FinTech Core migration session..." 
                style={{ flex: 1, padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, outline: "none" }} 
              />
              <button 
                onClick={() => handleAIGenerateDoc(aiPrompt)}
                disabled={aiLoading}
                style={{ padding: "0 24px", borderRadius: 10, background: "var(--color-primary)", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 13 }}
              >
                {aiLoading ? "Consulting..." : "Analyze Session Context"}
              </button>
            </div>

            {aiAssistantOutput && (
              <pre style={{ background: "rgba(0,0,0,0.15)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 20, color: "#D1D5DB", fontSize: 13, lineHeight: 1.6, overflowX: "auto", whiteSpace: "pre-wrap" }}>
                {aiAssistantOutput}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* ==========================================================
          MODALS / DRAWERS (DISCOVERY FORMS)
          ========================================================== */}
      {drawerMode && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000 }} onClick={() => setDrawerMode(null)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
          <form 
            onSubmit={handleSaveForm}
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 480, background: "#111827", borderLeft: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, textTransform: "capitalize" }}>Add {drawerMode}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Input details to capture structured discovery specifications</div>
              </div>
              <button type="button" onClick={() => setDrawerMode(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 20 }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              {drawerMode === "session" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Workshop Title</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Core Accounting Sync" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Business Domain</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, domain: e.target.value })} placeholder="e.g. Banking" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Client Company</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, client: e.target.value })} placeholder="e.g. Nexus Global Bank" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}

              {drawerMode === "requirement" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Requirement Category</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Compliance Logs" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Requirement Specification</label>
                    <textarea required onChange={e => setFormData({ ...formData, desc: e.target.value })} placeholder="Describe details..." style={{ width: "100%", height: 100, padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Priority</label>
                    <select onChange={e => setFormData({ ...formData, priority: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }}>
                      <option value="Critical" style={{ background: "#111827" }}>Critical</option>
                      <option value="High" style={{ background: "#111827" }}>High</option>
                      <option value="Medium" style={{ background: "#111827" }}>Medium</option>
                    </select>
                  </div>
                </>
              )}

              {drawerMode === "story" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>User Story Title</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="As a ledger manager..." style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Epic Name</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, epic: e.target.value })} placeholder="e.g. Transactions" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Feature Grouping</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, feature: e.target.value })} placeholder="e.g. Programmatic Ledger" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Acceptance Criteria</label>
                    <textarea onChange={e => setFormData({ ...formData, criteria: e.target.value })} placeholder="e.g. 1. MFA verified code..." style={{ width: "100%", height: 80, padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Story Points Estimate</label>
                    <input type="number" onChange={e => setFormData({ ...formData, points: e.target.value })} placeholder="8" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
              <button type="button" onClick={() => setDrawerMode(null)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", cursor: "pointer" }}>Cancel</button>
              <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Save Specifications</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
