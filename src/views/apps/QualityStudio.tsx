import { useState } from "react";
import { CheckCircle2, Play, AlertTriangle, Bug, Terminal, Activity } from "lucide-react";

const CASES = [
  { id: "TC-201", title: "MFA code verification under incorrect PIN", type: "Automation", status: "Passed", suite: "Security Suite" },
  { id: "TC-202", title: "JWT token validation on expired headers", type: "Automation", status: "Passed", suite: "Security Suite" },
  { id: "TC-203", title: "Ledger transaction database locks", type: "Manual", status: "Pending", suite: "Transaction Suite" },
  { id: "TC-204", title: "Audit logs retention verification", type: "Regression", status: "Failed", suite: "Compliance Suite" },
];

const BUGS = [
  { id: "BUG-401", title: "Token refresh causes memory leak in socket connection pool", priority: "Critical", status: "Open" },
  { id: "BUG-402", title: "Theme toggler fails to preserve colors on workspace page reload", priority: "Medium", status: "In Progress" },
];

type QualTab = "tests" | "bugs" | "deployments";

export default function QualityStudio({ subModule }: { subModule?: string }) {
  const [localTab, setLocalTab] = useState<QualTab>("tests");
  const tab = (subModule && ["tests", "bugs", "deployments"].includes(subModule)) ? (subModule as QualTab) : localTab;
  const setTab = setLocalTab;
  const [runningTest, setRunningTest] = useState(false);
  const [testLog, setTestLog] = useState<string | null>(null);

  const runAllTests = () => {
    setRunningTest(true);
    setTestLog("Initializing test runner...\nLoading test suites...\nRunning Security Suite (2/2 Passed)\nRunning Transaction Suite (1/1 Pending)\nRunning Compliance Suite (0/1 Failed)\nTest run completed. 3 Passed, 1 Failed.");
    setTimeout(() => {
      setRunningTest(false);
    }, 1500);
  };

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Quality Studio</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Review automated test suites, UAT checks, bug tracking, and CI/CD pipelines.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={runAllTests} disabled={runningTest} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10B981", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Play size={14} /> {runningTest ? "Running..." : "Run Test Suites"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, width: "fit-content", marginBottom: 20 }}>
        {[
          { id: "tests" as QualTab, label: "Test Cases", icon: CheckSquareIcon },
          { id: "bugs" as QualTab, label: "Bug Tracking", icon: Bug },
          { id: "deployments" as QualTab, label: "CI/CD & Deployments", icon: Activity }
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
        {tab === "tests" && (
          <div style={{ padding: 24 }}>
            {testLog && (
              <pre style={{
                background: "rgba(0,0,0,0.2)", border: "1px solid var(--color-border)",
                borderRadius: 10, padding: 20, color: "#10B981", fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap",
                lineHeight: 1.6, marginBottom: 24
              }}>
                <Terminal size={14} style={{ display: "inline", marginRight: 8, verticalAlign: "middle" }} />
                {testLog}
              </pre>
            )}

            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Core Test Suites</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CASES.map(c => (
                <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: c.status === "Passed" ? "rgba(16,185,129,0.1)" : c.status === "Failed" ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: c.status === "Passed" ? "#10B981" : c.status === "Failed" ? "#EF4444" : "#9CA3AF" }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{c.id} · {c.type} · Suite: {c.suite}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, background: c.status === "Passed" ? "rgba(16,185,129,0.1)" : c.status === "Failed" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", color: c.status === "Passed" ? "#10B981" : c.status === "Failed" ? "#EF4444" : "#F59E0B", fontWeight: 600 }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "bugs" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Active Defect Tracker</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {BUGS.map(b => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: b.priority === "Critical" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: b.priority === "Critical" ? "#EF4444" : "#F59E0B" }}>
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{b.id} · Priority: {b.priority}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "#F9FAFB" }}>{b.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "deployments" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>CI/CD Pipeline Telemetry</h3>
            <div style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Staging Deployment (v2.15.0-rc1)</span>
                <span style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>Active</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 12 }}>
                <div style={{ height: "100%", width: "85%", background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))", borderRadius: 3 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6B7280" }}>
                <span>Build completed successfully</span>
                <span>85% (Staging deployment in progress...)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckSquareIcon(props: any) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><polyline points="9 11 12 14 22 4" /></svg>
  );
}
