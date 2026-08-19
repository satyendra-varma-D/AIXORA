import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Users, DollarSign, Activity, ArrowUpRight } from "lucide-react";

const REVENUE_DATA = [
  { month: "Jan", revenue: 1.8, target: 1.6 },
  { month: "Feb", revenue: 2.1, target: 1.9 },
  { month: "Mar", revenue: 1.9, target: 2.0 },
  { month: "Apr", revenue: 2.4, target: 2.2 },
  { month: "May", revenue: 2.7, target: 2.4 },
  { month: "Jun", revenue: 2.5, target: 2.6 },
  { month: "Jul", revenue: 3.1, target: 2.8 },
  { month: "Aug", revenue: 3.4, target: 3.0 },
  { month: "Sep", revenue: 3.2, target: 3.2 },
  { month: "Oct", revenue: 3.8, target: 3.4 },
  { month: "Nov", revenue: 4.1, target: 3.6 },
  { month: "Dec", revenue: 4.4, target: 3.8 },
];

const DELIVERY_DATA = [
  { sprint: "S1", onTime: 88, atRisk: 8, delayed: 4 },
  { sprint: "S2", onTime: 82, atRisk: 12, delayed: 6 },
  { sprint: "S3", onTime: 91, atRisk: 6, delayed: 3 },
  { sprint: "S4", onTime: 85, atRisk: 10, delayed: 5 },
  { sprint: "S5", onTime: 94, atRisk: 4, delayed: 2 },
  { sprint: "S6", onTime: 90, atRisk: 7, delayed: 3 },
];

const PIPELINE = [
  { name: "Prospecting", value: 42, color: "#5B5CEB", amount: "$8.4M" },
  { name: "Discovery", value: 28, color: "#7C3AED", amount: "$5.6M" },
  { name: "Proposal", value: 18, color: "#00D4FF", amount: "$3.6M" },
  { name: "Negotiation", value: 8, color: "#10B981", amount: "$1.6M" },
  { name: "Closed", value: 4, color: "#F59E0B", amount: "$0.8M" },
];

const PROJECTS = [
  { name: "FinTech Portal v2", client: "Nexus Bank", health: 92, status: "On Track", risk: "low", team: 8, deadline: "Feb 14" },
  { name: "ERP Migration", client: "RetailCorp", health: 68, status: "At Risk", risk: "high", team: 12, deadline: "Mar 02" },
  { name: "AI Recommendation Engine", client: "ShopGlobal", health: 85, status: "On Track", risk: "low", team: 6, deadline: "Jan 28" },
  { name: "Cloud Infrastructure", client: "HealthNet", health: 74, status: "At Risk", risk: "medium", team: 10, deadline: "Feb 20" },
  { name: "Mobile Banking App", client: "Apex Bank", health: 96, status: "Ahead", risk: "low", team: 9, deadline: "Apr 10" },
];

const KPIS = [
  { label: "Revenue MTD", value: "$4.4M", delta: "+18.4%", up: true, icon: DollarSign, color: "#10B981" },
  { label: "Active Projects", value: "47", delta: "+6 this quarter", up: true, icon: Activity, color: "#5B5CEB" },
  { label: "Delivery Health", value: "92%", delta: "+3.2% vs last month", up: true, icon: CheckCircle, color: "#00D4FF" },
  { label: "Resource Util.", value: "87%", delta: "Optimal range", up: true, icon: Users, color: "#7C3AED" },
  { label: "Open Risks", value: "8", delta: "-2 resolved this week", up: false, icon: AlertTriangle, color: "#F59E0B" },
  { label: "Client NPS", value: "74", delta: "+5 points YoY", up: true, icon: TrendingUp, color: "#EF4444" },
];

export default function ExecutiveDashboard() {
  const [period, setPeriod] = useState<"Q" | "Y" | "M">("Y");

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Executive Center</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Q4 2025 · Company-wide performance overview</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 9, padding: 3 }}>
            {(["M", "Q", "Y"] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: "5px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, transition: "all 0.15s",
                background: period === p ? "#5B5CEB" : "transparent", color: period === p ? "#fff" : "#6B7280",
              }}>{p}</button>
            ))}
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
        {KPIS.map(k => <KPICard key={k.label} {...k} />)}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Revenue chart */}
        <Card title="Revenue vs Target" subtitle="Monthly · $ millions" action="View Report">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5B5CEB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5B5CEB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1C2333", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#F9FAFB", fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#5B5CEB" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#7C3AED" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Target" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Pipeline donut */}
        <Card title="Pipeline Breakdown" subtitle="By stage · $19.0M total" action="">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PIPELINE.map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 12, color: "#9CA3AF" }}>{p.name}</div>
                <div style={{ width: 80, height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p.value}%`, background: p.color, borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#E5E7EB", width: 40, textAlign: "right" }}>{p.amount}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Delivery chart */}
        <Card title="Sprint Delivery Health" subtitle="Last 6 sprints" action="">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={DELIVERY_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="sprint" tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4B5563", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1C2333", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#F9FAFB", fontSize: 12 }} />
              <Bar dataKey="onTime" stackId="a" fill="#10B981" name="On Time" radius={[0, 0, 0, 0]} />
              <Bar dataKey="atRisk" stackId="a" fill="#F59E0B" name="At Risk" />
              <Bar dataKey="delayed" stackId="a" fill="#EF4444" name="Delayed" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Insights */}
        <Card title="AI Recommendations" subtitle="Powered by ON IT Intelligence" action="">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "⚡", text: "ERP Migration is 3 days behind schedule. Recommend adding 1 senior developer to unblock the database migration phase.", severity: "high" },
              { icon: "📈", text: "Revenue pipeline shows 68% probability of exceeding Q4 target by 12% based on current deal velocity.", severity: "positive" },
              { icon: "👥", text: "HealthNet project is at 87% resource utilization. Consider cross-training 2 team members from ShopGlobal.", severity: "medium" },
            ].map((insight, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, padding: "10px 12px", borderRadius: 9,
                background: insight.severity === "high" ? "rgba(239,68,68,0.06)" : insight.severity === "positive" ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.06)",
                border: `1px solid ${insight.severity === "high" ? "rgba(239,68,68,0.15)" : insight.severity === "positive" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)"}`,
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{insight.icon}</span>
                <span style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.55 }}>{insight.text}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Projects table */}
      <Card title="Active Projects" subtitle={`${PROJECTS.length} projects · sorted by health`} action="View All">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Project", "Client", "Health", "Status", "Team", "Deadline"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((p, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 12px", fontSize: 14, fontWeight: 600, color: "#E5E7EB" }}>{p.name}</td>
                  <td style={{ padding: "12px 12px", fontSize: 13, color: "#6B7280" }}>{p.client}</td>
                  <td style={{ padding: "12px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 64, height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                        <div style={{ height: "100%", width: `${p.health}%`, background: p.health >= 85 ? "#10B981" : p.health >= 70 ? "#F59E0B" : "#EF4444", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: p.health >= 85 ? "#10B981" : p.health >= 70 ? "#F59E0B" : "#EF4444" }}>{p.health}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 12px" }}>
                    <StatusBadge status={p.status} risk={p.risk} />
                  </td>
                  <td style={{ padding: "12px 12px", fontSize: 13, color: "#9CA3AF" }}>{p.team} members</td>
                  <td style={{ padding: "12px 12px", fontSize: 13, color: "#9CA3AF" }}>{p.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function KPICard({ label, value, delta, up, icon: Icon, color }: { label: string; value: string; delta: string; up: boolean; icon: any; color: string }) {
  return (
    <div style={{
      background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "18px 18px",
      display: "flex", flexDirection: "column", gap: 0,
      transition: "all 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>{label}</span>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.04em", color: "#F9FAFB", lineHeight: 1, marginBottom: 8 }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: up ? "#10B981" : "#F59E0B" }}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {delta}
      </div>
    </div>
  );
}

function Card({ title, subtitle, action, children }: { title: string; subtitle: string; action: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 2 }}>{title}</div>
          <div style={{ fontSize: 12, color: "#4B5563" }}>{subtitle}</div>
        </div>
        {action && <button style={{ fontSize: 12, color: "#5B5CEB", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          {action} <ArrowUpRight size={12} />
        </button>}
      </div>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string; risk?: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    "On Track": { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
    "Ahead": { bg: "rgba(0,212,255,0.1)", color: "#00D4FF" },
    "At Risk": { bg: "rgba(245,158,11,0.1)", color: "#F59E0B" },
    "Delayed": { bg: "rgba(239,68,68,0.1)", color: "#EF4444" },
  };
  const c = colors[status] || colors["On Track"];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 100, background: c.bg, color: c.color }}>
      {status}
    </span>
  );
}
