import { useState } from "react";
import { Sparkles, Mic, FileText, CheckSquare, Plus, Video, Play } from "lucide-react";

const SESSIONS = [
  { id: "DS-101", title: "Core Ledger Architecture Alignment", date: "Today, 10:00 AM", duration: "45m", participants: 6, status: "Transcribed" },
  { id: "DS-102", title: "API Gateway Security Review", date: "Yesterday", duration: "1h 15m", participants: 4, status: "Transcribed" },
  { id: "DS-103", title: "User Onboarding UX Flow Mapping", date: "Oct 15, 2025", duration: "50m", participants: 8, status: "Processing" },
  { id: "DS-104", title: "Multi-tenant Billing Requirements", date: "Oct 12, 2025", duration: "1h 30m", participants: 5, status: "Draft" },
];

const DOCUMENTS = [
  { type: "BRD", title: "Business Requirements Document - FinTech Core v2", version: "v2.1", author: "Sarah Chen", date: "2h ago", status: "Approved" },
  { type: "FRD", title: "Functional Requirements Document - Security Suite", version: "v1.4", author: "Sarah Chen", date: "1d ago", status: "Under Review" },
  { type: "SRS", title: "Software Requirements Specification - Ledger API", version: "v0.9", author: "Sarah Chen", date: "3d ago", status: "Draft" },
];

const STORIES = [
  { id: "US-101", title: "As a user, I want to authenticate via OAuth2/MFA so my account is secure", points: 8, status: "Approved" },
  { id: "US-102", title: "As a ledger manager, I want to initiate ledger transfers programmatically", points: 13, status: "Approved" },
  { id: "US-103", title: "As an auditor, I want to pull ledger logs for security compliance reports", points: 5, status: "Draft" },
];

type DiscTab = "sessions" | "documents" | "stories" | "ai";

export default function DiscoveryStudio({ subModule }: { subModule?: string }) {
  const [localTab, setLocalTab] = useState<DiscTab>("sessions");
  const tab = (subModule && ["sessions", "documents", "stories", "ai"].includes(subModule)) ? (subModule as DiscTab) : localTab;
  const setTab = setLocalTab;
  const [prompt, setPrompt] = useState("");
  const [aiDoc, setAiDoc] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setAiDoc(`# AI Generated document for: ${prompt}

## 1. Executive Summary
This document outlines the detailed system integrations, functional processes, and architectural boundaries for the requested capability: "${prompt}".

## 2. Business Flow
1. User triggers action.
2. System intercepts and validates security tokens.
3. Database executes operations under ACID transaction constraints.
4. Notifications are pushed via WebSocket connections.

## 3. User Story Mapping
- **US-1**: As a developer, I want to access this capability via GraphQL queries so that I retrieve optimized payloads.
- **US-2**: As an administrator, I want to monitor API calls through telemetry dashboards.
`);
    }, 1500);
  };

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Discovery Studio</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Unify business documentation, process maps, and stakeholder alignments.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--color-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Sparkles size={14} /> AI Document Generator
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif" }}>
            <Plus size={14} /> New Session
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, width: "fit-content", marginBottom: 20 }}>
        {[
          { id: "sessions" as DiscTab, label: "Discovery Sessions", icon: Video },
          { id: "documents" as DiscTab, label: "BRD / FRD / SRS", icon: FileText },
          { id: "stories" as DiscTab, label: "User Stories", icon: CheckSquare },
          { id: "ai" as DiscTab, label: "AI Writing Assistant", icon: Sparkles }
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, transition: "all 0.15s",
            background: tab === t.id ? "var(--color-primary)" : "transparent", color: tab === t.id ? "#fff" : "#6B7280",
          }}>
            <t.icon size={14} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 14, minHeight: 400 }}>
        {tab === "sessions" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Recent Discovery Workshops</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SESSIONS.map(s => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
                      <Mic size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{s.date} · {s.duration} duration · {s.participants} participants</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, background: s.status === "Transcribed" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: s.status === "Transcribed" ? "#10B981" : "#F59E0B", fontWeight: 600 }}>{s.status}</span>
                    <button style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer" }}><Play size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "documents" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Approved Documents</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {DOCUMENTS.map(d => (
                <div key={d.title} style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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

        {tab === "stories" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>User Story Backlog</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STORIES.map(s => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flex: 1, marginRight: 24 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-primary)", marginTop: 2 }}>{s.id}</span>
                    <span style={{ fontSize: 13, color: "#D1D5DB" }}>{s.title}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "#6B7280" }}>{s.points} Story Points</span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: s.status === "Approved" ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.06)", color: s.status === "Approved" ? "#10B981" : "#9CA3AF" }}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "ai" && (
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Write BRD section for authentication gateway..."
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 9,
                  background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)",
                  color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                onClick={handleGenerate}
                disabled={generating}
                style={{
                  padding: "0 24px", borderRadius: 9, border: "none",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {generating ? "Writing..." : "Generate Docs"}
              </button>
            </div>
            {aiDoc && (
              <pre style={{
                background: "rgba(0,0,0,0.2)", border: "1px solid var(--color-border)",
                borderRadius: 10, padding: 20, color: "#9CA3AF", fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap",
                lineHeight: 1.6
              }}>
                {aiDoc}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
