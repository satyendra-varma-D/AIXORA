import { useState } from "react";
import { Sparkles, Layers, Eye, ShieldCheck, Plus, Check } from "lucide-react";

const FLOWS = [
  { name: "Auth & MFA verification flow", screenCount: 3, updated: "2h ago", status: "Approved" },
  { name: "Checkout & Stripe split payment", screenCount: 5, updated: "Yesterday", status: "Under Review" },
  { name: "Admin Audit Logging Grid", screenCount: 2, updated: "3d ago", status: "Draft" },
];

const WIREFRAMES = [
  { name: "Landing Page Wireframe", version: "v1.0", comments: 3, author: "Sarah Chen" },
  { name: "CRM Opportunity Kanban Dashboard", version: "v1.2", comments: 12, author: "Sarah Chen" },
  { name: "Admin API Key Management drawer", version: "v0.8", comments: 0, author: "Sarah Chen" },
];

type DesignTab = "flows" | "wireframes" | "reviews";

export default function DesignStudio({ subModule }: { subModule?: string }) {
  const [localTab, setLocalTab] = useState<DesignTab>("flows");
  const tab = (subModule && ["flows", "wireframes", "reviews"].includes(subModule)) ? (subModule as DesignTab) : localTab;
  const setTab = setLocalTab;
  const [prompt, setPrompt] = useState("");
  const [aiFlow, setAiFlow] = useState<string[] | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setAiFlow([
        "User lands on landing page",
        "Clicks 'Sign In' → redirects to /auth",
        "Enters varma@yopmail.com / admin",
        "Redirects to MFA verification screen",
        "Enters 6-digit PIN (909090)",
        "Redirects to App Hub dashboard"
      ]);
    }, 1500);
  };

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Design Studio</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Map user journeys, structural wireframes, mockups, and client design systems.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--color-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Sparkles size={14} /> AI Wireframe Draft
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif" }}>
            <Plus size={14} /> New Wireframe
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, width: "fit-content", marginBottom: 20 }}>
        {[
          { id: "flows" as DesignTab, label: "User Flows", icon: Layers },
          { id: "wireframes" as DesignTab, label: "Wireframes & Mockups", icon: Eye },
          { id: "reviews" as DesignTab, label: "Design Reviews", icon: ShieldCheck }
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
        {tab === "flows" && (
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Generate user onboarding flow mapping..."
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
                {generating ? "Mapping..." : "Map Flow"}
              </button>
            </div>

            {aiFlow ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
                {aiFlow.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>{idx + 1}</div>
                    <div style={{ flex: 1, padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--color-border)", fontSize: 13 }}>{step}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {FLOWS.map(f => (
                  <div key={f.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{f.name}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{f.screenCount} screens · updated {f.updated}</div>
                    </div>
                    <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, background: f.status === "Approved" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: f.status === "Approved" ? "#10B981" : "#F59E0B", fontWeight: 600 }}>{f.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "wireframes" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Prototype Mockups</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {WIREFRAMES.map(w => (
                <div key={w.name} style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#F9FAFB" }}>{w.version}</span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>{w.comments} comments</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 16 }}>{w.name}</div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, fontSize: 12, color: "#6B7280" }}>
                    Designer: {w.author}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Pending Design Approvals</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(16,185,129,0.03)", borderRadius: 12, border: "1px solid rgba(16,185,129,0.15)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981" }}>UX Audit - Passed Compliance</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Contrast ratios, keyboard focus indicators, and screen reader labels verified.</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#10B981", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Check size={14} /> Approve</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
