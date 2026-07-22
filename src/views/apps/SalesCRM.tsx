import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Phone, Mail, Calendar, TrendingUp, Users, DollarSign, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const STAGES = [
  { id: "prospect", name: "Prospecting", color: "#5B5CEB", count: 24, value: "$4.8M" },
  { id: "qualify", name: "Qualification", color: "#7C3AED", count: 18, value: "$3.6M" },
  { id: "proposal", name: "Proposal Sent", color: "#00D4FF", count: 12, value: "$2.4M" },
  { id: "negotiate", name: "Negotiation", color: "#F59E0B", count: 7, value: "$1.4M" },
  { id: "won", name: "Closed Won", color: "#10B981", count: 5, value: "$1.0M" },
];

const OPPORTUNITIES = [
  { company: "Nexus Financial", contact: "David Kim", value: "$480K", stage: "Proposal Sent", probability: 72, close: "Jan 30", owner: "SC", score: 89 },
  { company: "RetailGlobal Corp", contact: "Lisa Zhang", value: "$820K", stage: "Negotiation", probability: 85, close: "Feb 14", owner: "MJ", score: 94 },
  { company: "HealthBridge Systems", contact: "Tom Walsh", value: "$360K", stage: "Qualification", probability: 45, close: "Mar 01", owner: "SC", score: 62 },
  { company: "AeroTech Solutions", contact: "Priya Sharma", value: "$1.2M", stage: "Proposal Sent", probability: 60, close: "Feb 28", owner: "RK", score: 78 },
  { company: "CloudStream Inc", contact: "James O'Brien", value: "$240K", stage: "Prospecting", probability: 30, close: "Apr 15", owner: "MJ", score: 55 },
  { company: "BankTech Global", contact: "Sarah Lee", value: "$680K", stage: "Closed Won", probability: 100, close: "Jan 15", owner: "SC", score: 100 },
];

const ACTIVITIES = [
  { type: "call", text: "Discovery call with Nexus Financial", time: "2h ago", icon: Phone, color: "#5B5CEB" },
  { type: "email", text: "Proposal sent to RetailGlobal Corp", time: "4h ago", icon: Mail, color: "#10B981" },
  { type: "meeting", text: "Product demo scheduled - AeroTech", time: "Yesterday", icon: Calendar, color: "#F59E0B" },
  { type: "call", text: "Follow-up call - HealthBridge Systems", time: "Yesterday", icon: Phone, color: "#5B5CEB" },
  { type: "email", text: "Contract review - BankTech Global", time: "2 days ago", icon: Mail, color: "#10B981" },
];

const FORECAST_DATA = [
  { week: "W1", commit: 1.2, best: 1.8, pipeline: 2.6 },
  { week: "W2", commit: 1.4, best: 2.0, pipeline: 2.9 },
  { week: "W3", commit: 1.1, best: 1.7, pipeline: 2.4 },
  { week: "W4", commit: 1.6, best: 2.3, pipeline: 3.1 },
  { week: "W5", commit: 1.8, best: 2.6, pipeline: 3.4 },
  { week: "W6", commit: 2.0, best: 2.8, pipeline: 3.8 },
];

const KPIS = [
  { label: "Pipeline Value", value: "$13.2M", delta: "+22%", icon: DollarSign, color: "#5B5CEB" },
  { label: "Opportunities", value: "66", delta: "+12 this month", icon: Target, color: "#7C3AED" },
  { label: "Win Rate", value: "34%", delta: "+4% vs last Q", icon: TrendingUp, color: "#10B981" },
  { label: "Avg Deal Size", value: "$198K", delta: "+$32K YoY", icon: Users, color: "#00D4FF" },
];

type CrmTab = "pipeline" | "kanban" | "forecast";

export default function SalesCRM({ subModule }: { subModule?: string }) {
  const [localTab, setLocalTab] = useState<CrmTab>("pipeline");
  const tab = (subModule === "kanban" || subModule === "forecast" || subModule === "pipeline") ? (subModule as CrmTab) : localTab;
  const setTab = setLocalTab;
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Sales CRM</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Pipeline · 66 opportunities · Q4 2025</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Filter size={14} /> Filters
          </button>
          <button onClick={() => setDrawerOpen(true)} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9,
            background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif",
          }}>
            <Plus size={16} /> Add Opportunity
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {KPIS.map(k => (
          <div key={k.label} style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "#6B7280" }}>{k.label}</span>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon size={14} color={k.color} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 4 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: "#10B981" }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, width: "fit-content", marginBottom: 20 }}>
        {(["pipeline", "kanban", "forecast"] as CrmTab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "7px 18px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, textTransform: "capitalize", transition: "all 0.15s",
            background: tab === t ? "#5B5CEB" : "transparent", color: tab === t ? "#fff" : "#6B7280",
          }}>{t}</button>
        ))}
      </div>

      {tab === "pipeline" && (
        <>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 18, maxWidth: 360 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search opportunities..." style={{
              width: "100%", padding: "9px 12px 9px 38px", boxSizing: "border-box",
              borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#F9FAFB", fontSize: 13, outline: "none", fontFamily: "'Inter', sans-serif",
            }} />
          </div>

          {/* Table */}
          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  {["Company", "Contact", "Value", "Stage", "Probability", "AI Score", "Close Date", "Owner", ""].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OPPORTUNITIES.filter(o => o.company.toLowerCase().includes(search.toLowerCase())).map((o, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 600, color: "#E5E7EB" }}>{o.company}</td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#9CA3AF" }}>{o.contact}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 700, color: "#F9FAFB" }}>{o.value}</td>
                    <td style={{ padding: "13px 16px" }}><StagePill stage={o.stage} /></td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 48, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${o.probability}%`, background: o.probability >= 70 ? "#10B981" : o.probability >= 40 ? "#F59E0B" : "#EF4444", borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF" }}>{o.probability}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      <AiScore score={o.score} />
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 13, color: "#6B7280" }}>{o.close}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{o.owner}</div>
                    </td>
                    <td style={{ padding: "13px 8px" }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4B5563", display: "flex" }}><MoreHorizontal size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "kanban" && (
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 16 }}>
          {STAGES.map(stage => (
            <div key={stage.id} style={{ flexShrink: 0, width: 280 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: stage.color }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#E5E7EB" }}>{stage.name}</span>
                  <span style={{ fontSize: 11, background: "rgba(255,255,255,0.06)", color: "#6B7280", borderRadius: 100, padding: "1px 7px", fontWeight: 600 }}>{stage.count}</span>
                </div>
                <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{stage.value}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {OPPORTUNITIES.filter(o => o.stage === stage.name).map((o, i) => (
                  <div key={i} style={{
                    background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 12, padding: "14px 14px",
                    transition: "all 0.2s", cursor: "pointer",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${stage.color}30`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#E5E7EB", marginBottom: 4 }}>{o.company}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{o.contact}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: "#F9FAFB" }}>{o.value}</span>
                      <AiScore score={o.score} />
                    </div>
                    <div style={{ marginTop: 10, height: 3, background: "rgba(255,255,255,0.04)", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${o.probability}%`, background: stage.color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
                <button style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: 10, borderRadius: 10, border: `1px dashed rgba(${stage.color === "#5B5CEB" ? "91,92,235" : "255,255,255"},0.15)`,
                  background: "transparent", color: "#4B5563", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif",
                }}>
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "forecast" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px" }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 4 }}>Revenue Forecast · Q4 2025</div>
              <div style={{ fontSize: 12, color: "#4B5563" }}>Commit vs Best Case vs Pipeline · $ millions</div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={FORECAST_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="week" tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1C2333", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#F9FAFB", fontSize: 12 }} />
                <Line type="monotone" dataKey="commit" stroke="#10B981" strokeWidth={2.5} dot={false} name="Commit" />
                <Line type="monotone" dataKey="best" stroke="#5B5CEB" strokeWidth={2.5} dot={false} name="Best Case" />
                <Line type="monotone" dataKey="pipeline" stroke="#7C3AED" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Pipeline" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Commit", value: "$2.0M", color: "#10B981", pct: "53%" },
              { label: "Best Case", value: "$2.8M", color: "#5B5CEB", pct: "74%" },
              { label: "Pipeline", value: "$3.8M", color: "#7C3AED", pct: "100%" },
              { label: "Target", value: "$3.8M", color: "#F59E0B", pct: "100%" },
            ].map(f => (
              <div key={f.label} style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", color: "#F9FAFB", marginBottom: 8 }}>{f.value}</div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: f.pct, background: f.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity feed */}
      <div style={{ marginTop: 20, background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 16 }}>Recent Activity</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {ACTIVITIES.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < ACTIVITIES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <a.icon size={15} color={a.color} />
              </div>
              <div style={{ flex: 1, fontSize: 13, color: "#9CA3AF" }}>{a.text}</div>
              <div style={{ fontSize: 12, color: "#4B5563", flexShrink: 0 }}>{a.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right drawer */}
      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={() => setDrawerOpen(false)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <div
            style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: 480,
              background: "#111827", borderLeft: "1px solid rgba(255,255,255,0.08)",
              display: "flex", flexDirection: "column", animation: "slideInRight 0.25s ease-out",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>New Opportunity</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Add a new deal to your pipeline</div>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 20 }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              {[
                { label: "Company Name", placeholder: "e.g. Acme Corporation", type: "text" },
                { label: "Contact Name", placeholder: "e.g. John Smith", type: "text" },
                { label: "Deal Value ($)", placeholder: "e.g. 250000", type: "number" },
                { label: "Close Date", placeholder: "", type: "date" },
              ].map(f => (
                <div key={f.label} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{
                    width: "100%", padding: "10px 13px", borderRadius: 9, boxSizing: "border-box",
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif",
                  }} />
                </div>
              ))}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Stage</label>
                <select style={{ width: "100%", padding: "10px 13px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif" }}>
                  {STAGES.map(s => <option key={s.id} value={s.id} style={{ background: "#111827" }}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
              <button onClick={() => setDrawerOpen(false)} style={{ flex: 1, padding: "11px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14 }}>Cancel</button>
              <button onClick={() => setDrawerOpen(false)} style={{ flex: 2, padding: "11px", borderRadius: 9, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14 }}>Save Opportunity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StagePill({ stage }: { stage: string }) {
  const map: Record<string, string> = {
    "Prospecting": "#5B5CEB", "Qualification": "#7C3AED", "Proposal Sent": "#00D4FF",
    "Negotiation": "#F59E0B", "Closed Won": "#10B981",
  };
  const color = map[stage] || "#6B7280";
  return <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 100, background: `${color}18`, color, border: `1px solid ${color}30` }}>{stage}</span>;
}

function AiScore({ score }: { score: number }) {
  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ width: 24, height: 24, borderRadius: 6, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 9, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace" }}>{score}</span>
      </div>
    </div>
  );
}
