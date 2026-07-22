import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Activity, ArrowUpRight, Sparkles } from "lucide-react";
import type { AppModule } from "../../App";

const APP_META: Record<AppModule, { name: string; color: string; desc: string; kpis: { label: string; value: string; delta: string }[]; actions: string[] }> = {
  market: {
    name: "AI Market Intelligence", color: "#5B5CEB", desc: "Company discovery, lead scoring & competitor analysis",
    kpis: [
      { label: "Companies Tracked", value: "24,831", delta: "+1,240 this week" },
      { label: "AI Lead Score Avg", value: "78.4", delta: "+3.2 pts vs last month" },
      { label: "Active Campaigns", value: "12", delta: "3 launched this week" },
      { label: "Signals Detected", value: "4,201", delta: "+892 today" },
    ],
    actions: ["New Research Campaign", "Import Companies", "Generate Report"],
  },
  crm: {
    name: "AI Sales CRM", color: "#7C3AED", desc: "Leads, accounts, pipeline & forecasting",
    kpis: [
      { label: "Opportunities Won", value: "14", delta: "+2 this week" },
      { label: "Pipeline Value", value: "$1.4M", delta: "+$120K vs last week" },
      { label: "AI SDR Activity", value: "84%", delta: "Engagement rate" },
      { label: "Open Deals", value: "32", delta: "8 close to Won" },
    ],
    actions: ["Create Opportunity", "Launch Call campaign", "New Quote"],
  },
  discovery: {
    name: "AI Discovery Studio", color: "#F59E0B", desc: "Meeting transcripts, BRD/FRD/SRS & user stories",
    kpis: [
      { label: "Active Sessions", value: "8", delta: "4 in progress" },
      { label: "Requirements", value: "342", delta: "+28 this sprint" },
      { label: "Scope Coverage", value: "87%", delta: "+5% vs baseline" },
      { label: "Stakeholders", value: "23", delta: "All signed off" },
    ],
    actions: ["New Discovery Session", "Generate BRD", "View Questionnaires"],
  },
  design: {
    name: "AI Design Studio", color: "#5B5CEB", desc: "User flows, wireframes, prototypes & UX review management",
    kpis: [
      { label: "Wireframes", value: "284", delta: "+18 this sprint" },
      { label: "User Flows", value: "47", delta: "12 approved" },
      { label: "Screen Versions", value: "1,240", delta: "Across all projects" },
      { label: "UX Reviews", value: "28", delta: "6 pending" },
    ],
    actions: ["New Wireframe", "Create Flow", "Request UX Review"],
  },
  engineering: {
    name: "AI Engineering Studio", color: "#00D4FF", desc: "Solution architecture, database, APIs & code gen",
    kpis: [
      { label: "Architectures", value: "34", delta: "8 active" },
      { label: "API Endpoints", value: "1,284", delta: "+84 this sprint" },
      { label: "DB Entities", value: "142", delta: "ER diagrams generated" },
      { label: "Security Score", value: "94/100", delta: "+2 vs last audit" },
    ],
    actions: ["New Architecture", "Generate API Spec", "Create ER Diagram"],
  },
  quality: {
    name: "AI Quality Studio", color: "#10B981", desc: "Test cases, UAT tracking, bugs & CI/CD release logs",
    kpis: [
      { label: "Test Cases", value: "4,284", delta: "+284 this sprint" },
      { label: "Automation Rate", value: "68%", delta: "+8% vs last sprint" },
      { label: "Open Bugs", value: "24", delta: "8 critical" },
      { label: "Test Coverage", value: "82%", delta: "Target: 85%" },
    ],
    actions: ["New Test Case", "Run Regression", "Log Bug"],
  },
  success: {
    name: "Customer Success", color: "#EF4444", desc: "Support tickets, SLA management & client health",
    kpis: [
      { label: "Open Tickets", value: "42", delta: "8 SLA at risk" },
      { label: "SLA Compliance", value: "94%", delta: "+2% this month" },
      { label: "Client Health", value: "87%", delta: "3 at-risk clients" },
      { label: "CSAT Score", value: "4.7/5", delta: "+0.2 this quarter" },
    ],
    actions: ["New Ticket", "Review SLAs", "Client Health Report"],
  },
  knowledge: {
    name: "Knowledge Hub", color: "#5B5CEB", desc: "AI knowledge graph, document library & intelligent search",
    kpis: [
      { label: "Knowledge Items", value: "12,481", delta: "+284 this week" },
      { label: "AI Searches", value: "2,840", delta: "Today" },
      { label: "Documents", value: "4,284", delta: "Indexed & searchable" },
      { label: "Contributors", value: "48", delta: "Across all teams" },
    ],
    actions: ["Add Knowledge", "Search", "Generate Summary"],
  },
  executive: {
    name: "Executive Center", color: "#7C3AED", desc: "Financial KPIs, revenue forecast & portfolio health",
    kpis: [
      { label: "Revenue MTD", value: "$420K", delta: "+12% vs last month" },
      { label: "Sales Pipeline", value: "$2.8M", delta: "+$400K this month" },
      { label: "SLA Compliance", value: "98.9%", delta: "Platform average" },
      { label: "AI Usage Rate", value: "76%", delta: "Active adoption" },
    ],
    actions: ["Export Reports", "Configure KPIs", "Audit logs"],
  },
  admin: {
    name: "Administration", color: "#6B7280", desc: "Users, teams, billing, security & platform settings",
    kpis: [
      { label: "Active Users", value: "284", delta: "+12 this month" },
      { label: "Teams", value: "18", delta: "Across 6 departments" },
      { label: "Security Score", value: "97/100", delta: "Enterprise grade" },
      { label: "API Calls Today", value: "1.2M", delta: "Within quota" },
    ],
    actions: ["Invite User", "Create Team", "View Audit Logs"],
  },
};

const CHART_DATA = [
  { name: "Mon", a: 40, b: 28 }, { name: "Tue", a: 55, b: 38 }, { name: "Wed", a: 48, b: 32 },
  { name: "Thu", a: 70, b: 51 }, { name: "Fri", a: 62, b: 44 }, { name: "Sat", a: 35, b: 24 },
  { name: "Sun", a: 42, b: 30 },
];

export default function GenericAppDashboard({ appId }: { appId: AppModule }) {
  const meta = APP_META[appId];
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>{meta.name}</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>{meta.desc}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {meta.actions.slice(0, 2).map((a, i) => (
            <button key={a} onClick={() => i === 0 && setDrawerOpen(true)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9,
              background: i === 0 ? `linear-gradient(135deg, ${meta.color}, ${meta.color}CC)` : "rgba(255,255,255,0.05)",
              border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
              color: i === 0 ? "#fff" : "#9CA3AF", fontSize: 13, fontWeight: i === 0 ? 700 : 400,
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>
              {i === 0 && <Plus size={14} />} {a}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {meta.kpis.map(k => (
          <div key={k.label} style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 18px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${meta.color}30`; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 10 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", color: "#F9FAFB", marginBottom: 6 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: meta.color }}>{k.delta}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 4 }}>Weekly Activity</div>
          <div style={{ fontSize: 12, color: "#4B5563", marginBottom: 16 }}>Last 7 days</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1C2333", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#F9FAFB", fontSize: 12 }} />
              <Bar dataKey="a" fill={meta.color} radius={[3, 3, 0, 0]} name="Created" />
              <Bar dataKey="b" fill={`${meta.color}50`} radius={[3, 3, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 16 }}>AI Insights</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "📈 Activity is 34% above the 30-day average — strong momentum this week.",
              "🤖 AI has auto-generated 18 items based on recent patterns.",
              "⚡ 3 items require your attention and are approaching SLA deadlines.",
            ].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 9, border: "1px solid rgba(255,255,255,0.05)" }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Listing */}
      <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB" }}>Recent Items</div>
          <button style={{ fontSize: 12, color: meta.color, background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            View All <ArrowUpRight size={12} />
          </button>
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer", transition: "padding 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.paddingLeft = "4px")}
            onMouseLeave={e => (e.currentTarget.style.paddingLeft = "0")}
          >
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${meta.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Activity size={16} color={meta.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#E5E7EB", marginBottom: 2 }}>
                {meta.name} Item #{1000 + i * 7}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>Updated {i === 0 ? "just now" : `${i + 1}h ago`} · Assigned to team</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 100, background: i % 3 === 0 ? "rgba(16,185,129,0.1)" : i % 3 === 1 ? "rgba(91,92,235,0.1)" : "rgba(245,158,11,0.1)", color: i % 3 === 0 ? "#10B981" : i % 3 === 1 ? "#A5A6F6" : "#F59E0B", fontWeight: 600 }}>
                {i % 3 === 0 ? "Completed" : i % 3 === 1 ? "In Progress" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={() => setDrawerOpen(false)}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: 480,
            background: "#111827", borderLeft: "1px solid rgba(255,255,255,0.08)",
            display: "flex", flexDirection: "column", animation: "slideInRight 0.25s ease-out",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{meta.actions[0]}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{meta.name}</div>
              </div>
              <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 20 }}>×</button>
            </div>
            <div style={{ flex: 1, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: `${meta.color}10`, border: `1px solid ${meta.color}25`, borderRadius: 10, marginBottom: 24 }}>
                <Sparkles size={16} color={meta.color} />
                <span style={{ fontSize: 13, color: meta.color, fontWeight: 500 }}>AI can pre-fill this form based on recent activity</span>
              </div>
              {["Name / Title", "Description", "Assignee", "Priority", "Due Date"].map(f => (
                <div key={f} style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>{f}</label>
                  {f === "Description" ? (
                    <textarea style={{ width: "100%", height: 80, padding: "10px 13px", borderRadius: 9, resize: "none", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }} />
                  ) : f === "Priority" ? (
                    <select style={{ width: "100%", padding: "10px 13px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif" }}>
                      {["Critical", "High", "Medium", "Low"].map(p => <option key={p} style={{ background: "#111827" }}>{p}</option>)}
                    </select>
                  ) : (
                    <input type={f === "Due Date" ? "date" : "text"} style={{ width: "100%", padding: "10px 13px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
              <button onClick={() => setDrawerOpen(false)} style={{ flex: 1, padding: "11px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14 }}>Cancel</button>
              <button onClick={() => setDrawerOpen(false)} style={{ flex: 2, padding: "11px", borderRadius: 9, background: `linear-gradient(135deg, ${meta.color}, ${meta.color}CC)`, color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14 }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
