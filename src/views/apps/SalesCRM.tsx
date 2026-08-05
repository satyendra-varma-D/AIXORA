import { useState, useEffect } from "react";
import { 
  Plus, Search, Filter, MoreHorizontal, Phone, Mail, Calendar, 
  TrendingUp, Users, DollarSign, Target, Briefcase, FileText, 
  MapPin, Settings as SettingsIcon, CheckCircle, AlertTriangle, 
  Zap, Share2, Trash2, Edit3, Archive, Copy, Clock, MessageSquare, 
  Layers, Download, RefreshCw, BarChart2, ShieldAlert, Award,
  ChevronLeft
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ==========================================
// MOCK DATA GENERATORS (PREMIUM CRM DATA)
// ==========================================

const INITIAL_LEADS = [
  { id: "LD-01", name: "Rian Pratama", company: "IndoAgri Perkasa", email: "rian.p@indoagri.co.id", phone: "+62 811 555 129", status: "Qualified", score: 94, source: "Web Demo Request", owner: "Sarah Chen", date: "2026-02-01", aiRemark: "Active Palm Oil processor expanding refining capacity. Legacy ERP target." },
  { id: "LD-02", name: "Nurul Aini", company: "Bumi Lestari Refineries", email: "nurul.aini@lestari.com", phone: "+62 812 555 832", status: "Prospecting", score: 82, source: "LinkedIn Outreach", owner: "Michael Jones", date: "2026-02-03", aiRemark: "Refining Director exploring automated yield tracking systems." },
  { id: "LD-03", name: "Sanjay Kumar", company: "Borneo Oils & Fats", email: "s.kumar@borneooils.my", phone: "+60 12 555 744", status: "Contacted", score: 76, source: "Industry Event", owner: "Sarah Chen", date: "2026-02-04", aiRemark: "Interested in cloud-based ERP logistics models." },
  { id: "LD-04", name: "Dewi Susanti", company: "Sumatra Palm Refinery", email: "dewi.s@sumatrapalm.co.id", phone: "+62 813 555 901", status: "Unqualified", score: 45, source: "Cold Call", owner: "Raj Patel", date: "2026-02-02", aiRemark: "Small local mill below our $10M annual revenue threshold." }
];

const INITIAL_ACCOUNTS = [
  { id: "ACC-01", name: "IndoAgri Perkasa", industry: "Agriculture / Palm Oil", revenue: "$42.5M", employees: "1,200", hq: "Jakarta, Indonesia", stack: "SAP ECC, Oracle DB", description: "IndoAgri Perkasa is a major palm oil processing group operating three refineries in Sumatra and Java. Currently upgrading regional operational systems.", parent: "IndoAgri Group Ltd", subsidiaries: "Sumatra Processing Corp, Perkasa Logistics" },
  { id: "ACC-02", name: "Bumi Lestari Refineries", industry: "Chemicals & Refining", revenue: "$28.1M", employees: "850", hq: "Medan, Indonesia", stack: "Microsoft Dynamics, SQL Server", description: "Bumi Lestari Refineries manages multi-stage palm oil extraction plants. Focuses on exporting processed fractions to APAC markets.", parent: "None", subsidiaries: "Bumi Lestari Biofuels" },
  { id: "ACC-03", name: "Borneo Oils & Fats", industry: "Food Manufacturing", revenue: "$18.4M", employees: "620", hq: "Kuala Lumpur, Malaysia", stack: "Infor M3, Postgres", description: "Specialized food production company sourcing organic palm oil fractions. Looking for logistics automation partners.", parent: "Borneo Holdings", subsidiaries: "None" }
];

const INITIAL_CONTACTS = [
  { id: "CON-01", name: "Rian Pratama", company: "IndoAgri Perkasa", designation: "Chief Operations Officer", department: "Operations", role: "Decision Maker", email: "rian.p@indoagri.co.id", phone: "+62 811 555 129", linkedin: "https://linkedin.com/in/rian-pratama", strength: "Strong", score: 92, committee: "Primary Buyer" },
  { id: "CON-02", name: "Budi Santoso", company: "IndoAgri Perkasa", designation: "VP IT Infrastructure", department: "IT", role: "Technical Evaluator", email: "budi.s@indoagri.co.id", phone: "+62 811 555 332", linkedin: "https://linkedin.com/in/budi-santoso", strength: "Moderate", score: 78, committee: "Influencer" },
  { id: "CON-03", name: "Nurul Aini", company: "Bumi Lestari Refineries", designation: "Refining Director", department: "Refining", role: "Decision Maker", email: "nurul.aini@lestari.com", phone: "+62 812 555 832", linkedin: "https://linkedin.com/in/nurul-aini", strength: "Strong", score: 85, committee: "Primary Buyer" }
];

const INITIAL_OPPORTUNITIES = [
  { id: "OPP-01", name: "IndoAgri Refinery ERP Sync", company: "IndoAgri Perkasa", value: "$480K", stage: "Proposal Sent", probability: 75, close: "2026-03-15", owner: "Sarah Chen", score: 92, competitors: "SAP S/4HANA Cloud, Oracle Fusion" },
  { id: "OPP-02", name: "Bumi Lestari Yield Automation", company: "Bumi Lestari Refineries", value: "$280K", stage: "Qualification", probability: 45, close: "2026-04-10", owner: "Michael Jones", score: 81, competitors: "Microsoft Dynamics Upgrade" },
  { id: "OPP-03", name: "Borneo Logistics Cloud Integration", company: "Borneo Oils & Fats", value: "$180K", stage: "Prospecting", probability: 30, close: "2026-05-01", owner: "Sarah Chen", score: 68, competitors: "None" },
  { id: "OPP-04", name: "IndoAgri Sumatra Phase 2", company: "IndoAgri Perkasa", value: "$650K", stage: "Negotiation", probability: 85, close: "2026-02-28", owner: "Sarah Chen", score: 95, competitors: "None" }
];

const INITIAL_ACTIVITIES = [
  { id: "ACT-01", type: "Call", company: "IndoAgri Perkasa", contact: "Rian Pratama", text: "Discovery call regarding refinery modernization goals.", time: "2h ago", details: "Rian outlined plans to invest $1.2M in supply chain and database integrations. Main blocker is compatibility with legacy Oracle DB.", owner: "Sarah Chen" },
  { id: "ACT-02", type: "Email", company: "Bumi Lestari Refineries", contact: "Nurul Aini", text: "Refinery Yield Dashboard Mockup proposal sent.", time: "4h ago", details: "Emailed mock layouts showing real-time palm extraction metrics. Awaiting response.", owner: "Michael Jones" },
  { id: "ACT-03", type: "Meeting", company: "IndoAgri Perkasa", contact: "Budi Santoso", text: "Demo of Cloud Integration API middleware.", time: "Yesterday", details: "Technical walk-through with IT team. Budi raised queries about data isolation and network latency in remote Sumatra mills.", owner: "Sarah Chen" },
  { id: "ACT-04", type: "WhatsApp", company: "Borneo Oils & Fats", contact: "Sanjay Kumar", text: "Follow-up on pricing proposal schedules.", time: "2 days ago", details: "Sanjay requested a modular pricing structure split by mill locations.", owner: "Sarah Chen" }
];

const INITIAL_QUOTES = [
  { id: "QT-2026-01", company: "IndoAgri Perkasa", value: "$480,000", discount: "$20,000", tax: "$48,000", status: "Approved", date: "2026-02-01", version: "v1.2", products: "AIXORA Core License (x500), Custom DB Middleware (x1)" },
  { id: "QT-2026-02", company: "Bumi Lestari Refineries", value: "$280,000", discount: "None", tax: "$28,000", status: "Draft", date: "2026-02-03", version: "v1.0", products: "AIXORA Core License (x300)" }
];

const REVENUE_DATA = [
  { month: "Jan", target: 800, actual: 950, pipeline: 1800 },
  { month: "Feb", target: 900, actual: 1100, pipeline: 2100 },
  { month: "Mar", target: 1000, actual: 980, pipeline: 2400 },
  { month: "Apr", target: 1100, actual: 1200, pipeline: 2900 },
  { month: "May", target: 1200, actual: 1450, pipeline: 3100 },
  { month: "Jun", target: 1300, actual: 1600, pipeline: 3600 },
];

const LEADERBOARD = [
  { rank: 1, name: "Sarah Chen", dealsClosed: 14, val: "$2.8M", target: "$2.5M", pct: 112 },
  { rank: 2, name: "Michael Jones", dealsClosed: 11, val: "$1.9M", target: "$2.0M", pct: 95 },
  { rank: 3, name: "Raj Patel", dealsClosed: 8, val: "$1.4M", target: "$1.5M", pct: 93 }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function SalesCRM({ subModule }: { subModule?: string }) {
  const activeModule = subModule || "dashboard";

  // Data States
  const [leads, setLeads] = useState<any[]>(INITIAL_LEADS);
  const [accounts, setAccounts] = useState<any[]>(INITIAL_ACCOUNTS);
  const [contacts, setContacts] = useState<any[]>(INITIAL_CONTACTS);
  const [opportunities, setOpportunities] = useState<any[]>(INITIAL_OPPORTUNITIES);
  const [activities, setActivities] = useState<any[]>(INITIAL_ACTIVITIES);
  const [quotes, setQuotes] = useState<any[]>(INITIAL_QUOTES);

  // Selection States
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<any | null>(null);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(null);
  const [selectedQuotation, setSelectedQuotation] = useState<any | null>(null);

  // Detail Page tab navigation state
  const [activeDetailTab, setActiveDetailTab] = useState<string>("overview");

  // Form Drawers
  const [drawerMode, setDrawerMode] = useState<"lead" | "account" | "contact" | "opportunity" | "quote" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Bulk selections
  const [bulkIds, setBulkIds] = useState<string[]>([]);

  // Simple Notification banner
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const handleBulkSelect = (id: string) => {
    setBulkIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Drawer form inputs (dynamic mappings)
  const [formData, setFormData] = useState<any>({});

  const handleOpenCreate = (type: "lead" | "account" | "contact" | "opportunity" | "quote") => {
    setFormData({});
    setDrawerMode(type);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (drawerMode === "lead") {
      const newLead = {
        id: `LD-0${leads.length + 1}`,
        name: formData.name || "Unnamed Contact",
        company: formData.company || "Generic Corp",
        email: formData.email || "info@domain.com",
        phone: formData.phone || "+62-xxx",
        status: "Prospecting",
        score: Math.floor(Math.random() * 40) + 60,
        source: formData.source || "Direct Search",
        owner: "Sarah Chen",
        date: new Date().toISOString().split("T")[0],
        aiRemark: "New lead initialized through Sales CRM UI."
      };
      setLeads(prev => [newLead, ...prev]);
      setNotification("Success: Lead created successfully!");
    } else if (drawerMode === "account") {
      const newAcc = {
        id: `ACC-0${accounts.length + 1}`,
        name: formData.name || "Unnamed Org",
        industry: formData.industry || "General Industry",
        revenue: formData.revenue || "$10M",
        employees: formData.employees || "100",
        hq: formData.hq || "Jakarta",
        stack: formData.stack || "Any Stack",
        description: formData.description || "Corporate entity created in CRM."
      };
      setAccounts(prev => [newAcc, ...prev]);
      setNotification("Success: Account added!");
    } else if (drawerMode === "contact") {
      const newCon = {
        id: `CON-0${contacts.length + 1}`,
        name: formData.name || "New Contact",
        company: formData.company || "IndoAgri Perkasa",
        designation: formData.designation || "Executive Representative",
        department: "Operations",
        role: "Evaluator",
        email: formData.email || "info@domain.com",
        phone: formData.phone || "+62-xxx",
        strength: "Moderate",
        score: 75,
        committee: "Influencer"
      };
      setContacts(prev => [newCon, ...prev]);
      setNotification("Success: Contact added!");
    } else if (drawerMode === "opportunity") {
      const newOpp = {
        id: `OPP-0${opportunities.length + 1}`,
        name: formData.name || "New Modernization Project",
        company: formData.company || "IndoAgri Perkasa",
        value: formData.value || "$150K",
        stage: "Prospecting",
        probability: 20,
        close: formData.close || "2026-06-30",
        owner: "Sarah Chen",
        score: 74,
        competitors: "None"
      };
      setOpportunities(prev => [newOpp, ...prev]);
      setNotification("Success: Opportunity generated!");
    } else if (drawerMode === "quote") {
      const newQuote = {
        id: `QT-2026-0${quotes.length + 1}`,
        company: formData.company || "Bumi Lestari Refineries",
        value: formData.value || "$120,000",
        discount: "None",
        tax: "$12,000",
        status: "Draft",
        date: new Date().toISOString().split("T")[0],
        version: "v1.0",
        products: formData.products || "Core Services Pack"
      };
      setQuotes(prev => [newQuote, ...prev]);
      setNotification("Success: Quotation draft initialized!");
    }
    setDrawerMode(null);
  };

  // AI Generation helpers
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummaryResult, setAiSummaryResult] = useState<string | null>(null);

  const handleGenerateAISummary = (recordName: string) => {
    setAiLoading(true);
    setAiSummaryResult(null);
    setTimeout(() => {
      setAiLoading(false);
      setAiSummaryResult(
        `AI Analysis Summary for ${recordName}: Matching technographic profiles indicate significant legacy core ERP pressure. Target has Oracle/SAP ECC configurations. Buying signals reflect a 72% likelihood of cloud modernization RFP release in next 3 months due to support phase-outs. Recommended strategy: Introduce targeted low-latency middleware architecture.`
      );
    }, 1000);
  };

  return (
    <div style={{ flex: 1, color: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 10000,
          background: notification.includes("Success") ? "#10B981" : "#EF4444",
          color: "#fff", padding: "12px 24px", borderRadius: 8, fontWeight: 700,
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)", display: "flex", gap: 10, alignItems: "center"
        }}>
          <CheckCircle size={18} />
          {notification}
        </div>
      )}

      {/* ==========================================================
          SUB-MODULES DIRECT ROUTING & LISTINGS
          ========================================================== */}
      
      {/* 1. EXECUTIVE DASHBOARD MODULE */}
      {activeModule === "dashboard" && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Executive CRM Center</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>High-level Sales KPIs, Pipeline values, and AI Insights.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setNotification("Export: Generating Exec Report (CSV)")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, cursor: "pointer" }}>
                <Download size={14} /> Export Report
              </button>
            </div>
          </div>

          {/* KPI Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { label: "Target Account Pipeline", value: "$4.1M", sub: "+18.2% vs target", icon: DollarSign, color: "var(--color-primary)" },
              { label: "AI Scored Opportunities", value: opportunities.length, sub: `${opportunities.filter(o => o.score >= 80).length} High Match`, icon: Target, color: "#7C3AED" },
              { label: "Refinery Leads Qualified", value: leads.length, sub: "87% validation rate", icon: Users, color: "#10B981" },
              { label: "Avg Win Probability", value: "72.4%", sub: "+5.1% this month", icon: TrendingUp, color: "#00D4FF" }
            ].map(kpi => (
              <div key={kpi.label} style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{kpi.label}</span>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${kpi.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <kpi.icon size={14} color={kpi.color} />
                  </div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", color: "#fff" }}>{kpi.value}</div>
                <div style={{ fontSize: 11, color: "#10B981", marginTop: 4 }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Revenue Forecast Area Chart */}
          <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr", gap: 20 }}>
            <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB" }}>Revenue & Pipeline Trend</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Visual target comparison for Q1/Q2 ($ thousands)</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPipe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid var(--color-border)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Legend tick={{ fontSize: 12 }} />
                  <Area type="monotone" dataKey="actual" stroke="var(--color-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAct)" name="Closed Revenue" />
                  <Area type="monotone" dataKey="pipeline" stroke="#7C3AED" strokeWidth={1.5} strokeDasharray="3 3" fillOpacity={1} fill="url(#colorPipe)" name="Active Pipeline" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick AI Advisor */}
            <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.03), rgba(217,70,239,0.03))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Zap size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#fff" }}>AI CRM Copilot</h3>
              </div>
              <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>
                Astra International's migration scan shows immediate technographic readiness. We suggest initializing an S/4HANA upgrade quote immediately.
              </p>
              
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Next Best Action</div>
                <div style={{ fontSize: 13, fontWeight: 650, color: "#fff", marginTop: 4 }}>Call Budi Santoso (IndoAgri)</div>
                <div style={{ fontSize: 11, color: "var(--color-primary)", marginTop: 2 }}>Demo request follow-up · High Priority</div>
              </div>

              <button 
                onClick={() => handleGenerateAISummary("Q1 Pipeline")}
                style={{ width: "100%", padding: "10px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", marginTop: "auto" }}
              >
                {aiLoading ? "Consulting..." : "Generate Pipeline Insights"}
              </button>
            </div>
          </div>

          {/* Leaderboard and Activities */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
            {/* Sales Leaderboard */}
            <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "#fff" }}>Team Leaderboard</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {LEADERBOARD.map(member => (
                  <div key={member.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#6B7280" }}>#{member.rank}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{member.name}</div>
                        <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{member.dealsClosed} deals closed</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "var(--color-primary)" }}>{member.val}</div>
                      <div style={{ fontSize: 11, color: "#10B981", marginTop: 2 }}>{member.pct}% of target</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent CRM Activities */}
            <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "#fff" }}>System Operations Logs</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activities.map(act => (
                  <div key={act.id} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: act.type === "Call" ? "#5B5CEB" : act.type === "Meeting" ? "#F59E0B" : "#10B981" }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 12, color: "#E5E7EB", fontWeight: 700 }}>{act.type} with {act.contact}</span>
                      <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>{act.text}</p>
                    </div>
                    <span style={{ fontSize: 11, color: "#6B7280" }}>{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. LEADS MODULE */}
      {activeModule === "leads" && !selectedLead && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Lead Management Directory</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Qualify target contacts, configure scores, and assign routes.</p>
            </div>
            <button onClick={() => handleOpenCreate("lead")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={14} /> Create Lead
            </button>
          </div>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: 360 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search leads by name or company..." style={{ width: "100%", padding: "8px 12px 8px 38px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, outline: "none" }} />
          </div>

          {/* Table list */}
          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px", width: 40 }}><input type="checkbox" onChange={() => setBulkIds(bulkIds.length === leads.length ? [] : leads.map(l => l.id))} checked={bulkIds.length === leads.length} /></th>
                  <th style={{ padding: "12px 16px" }}>Lead Name</th>
                  <th style={{ padding: "12px 16px" }}>Company</th>
                  <th style={{ padding: "12px 16px" }}>Email</th>
                  <th style={{ padding: "12px 16px" }}>Source</th>
                  <th style={{ padding: "12px 16px" }}>AI Qualification</th>
                  <th style={{ padding: "12px 16px" }}>Status</th>
                  <th style={{ padding: "12px 16px" }}>Owner</th>
                </tr>
              </thead>
              <tbody>
                {leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.company.toLowerCase().includes(searchQuery.toLowerCase())).map(lead => (
                  <tr key={lead.id} onClick={() => setSelectedLead(lead)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px" }} onClick={e => { e.stopPropagation(); handleBulkSelect(lead.id); }}><input type="checkbox" checked={bulkIds.includes(lead.id)} readOnly /></td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{lead.name}</td>
                    <td style={{ padding: "14px 16px" }}>{lead.company}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{lead.email}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{lead.source}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: lead.score >= 80 ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: lead.score >= 80 ? "#10B981" : "#F59E0B" }}>
                        {lead.score} Score
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 100, background: lead.status === "Qualified" ? "rgba(16,185,129,0.1)" : "rgba(56,189,248,0.1)", color: lead.status === "Qualified" ? "#10B981" : "#38BDF8" }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{lead.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ACCOUNTS MODULE */}
      {activeModule === "accounts" && !selectedAccount && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Target Organizations & Accounts</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Establish relationship maps, corporate hierarchy, and tech stacks.</p>
            </div>
            <button onClick={() => handleOpenCreate("account")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={14} /> Add Account
            </button>
          </div>

          <div style={{ position: "relative", maxWidth: 360 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search organizations..." style={{ width: "100%", padding: "8px 12px 8px 38px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, outline: "none" }} />
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px" }}>Company Name</th>
                  <th style={{ padding: "12px 16px" }}>Industry</th>
                  <th style={{ padding: "12px 16px" }}>HQ Location</th>
                  <th style={{ padding: "12px 16px" }}>Revenue Bracket</th>
                  <th style={{ padding: "12px 16px" }}>Employees</th>
                  <th style={{ padding: "12px 16px" }}>Technology Stack</th>
                </tr>
              </thead>
              <tbody>
                {accounts.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(acc => (
                  <tr key={acc.id} onClick={() => setSelectedAccount(acc)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{acc.name}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{acc.industry}</td>
                    <td style={{ padding: "14px 16px", color: "#D1D5DB" }}>{acc.hq}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>{acc.revenue}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{acc.employees}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ color: "var(--color-primary)", fontSize: 12 }}>{acc.stack}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. CONTACTS MODULE */}
      {activeModule === "people" && !selectedContact && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Contact Profiles & Committee</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Map relationship strength, email threads, and decision influence scores.</p>
            </div>
            <button onClick={() => handleOpenCreate("contact")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={14} /> Add Contact
            </button>
          </div>

          <div style={{ position: "relative", maxWidth: 360 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search contacts..." style={{ width: "100%", padding: "8px 12px 8px 38px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, outline: "none" }} />
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px" }}>Contact</th>
                  <th style={{ padding: "12px 16px" }}>Title / Role</th>
                  <th style={{ padding: "12px 16px" }}>Company</th>
                  <th style={{ padding: "12px 16px" }}>Committee Role</th>
                  <th style={{ padding: "12px 16px" }}>Relationship</th>
                  <th style={{ padding: "12px 16px" }}>Influence Score</th>
                </tr>
              </thead>
              <tbody>
                {contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(con => (
                  <tr key={con.id} onClick={() => setSelectedContact(con)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{con.name}</td>
                    <td style={{ padding: "14px 16px", color: "var(--color-primary)", fontWeight: 600 }}>{con.designation}</td>
                    <td style={{ padding: "14px 16px" }}>{con.company}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{con.committee}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, background: con.strength === "Strong" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)", color: con.strength === "Strong" ? "#10B981" : "#F59E0B" }}>
                        {con.strength}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 800, color: "var(--color-accent)" }}>{con.score} / 100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. OPPORTUNITIES MODULE */}
      {activeModule === "opportunities" && !selectedOpportunity && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Opportunity Deals & Pipelines</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Configure value brackets, monitor competitor threats, and trace win-rates.</p>
            </div>
            <button onClick={() => handleOpenCreate("opportunity")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={14} /> Add Opportunity
            </button>
          </div>

          <div style={{ position: "relative", maxWidth: 360 }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#4B5563" }} />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search deals..." style={{ width: "100%", padding: "8px 12px 8px 38px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, outline: "none" }} />
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px" }}>Project Name</th>
                  <th style={{ padding: "12px 16px" }}>Associated Company</th>
                  <th style={{ padding: "12px 16px" }}>Value</th>
                  <th style={{ padding: "12px 16px" }}>Close Target</th>
                  <th style={{ padding: "12px 16px" }}>Competitors</th>
                  <th style={{ padding: "12px 16px" }}>AI Win Prob</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase())).map(opp => (
                  <tr key={opp.id} onClick={() => setSelectedOpportunity(opp)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{opp.name}</td>
                    <td style={{ padding: "14px 16px" }}>{opp.company}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{opp.value}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{opp.close}</td>
                    <td style={{ padding: "14px 16px", color: "#D1D5DB" }}>{opp.competitors}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: opp.score >= 80 ? "rgba(16,185,129,0.12)" : "rgba(255,68,68,0.12)", color: opp.score >= 80 ? "#10B981" : "#EF4444" }}>
                        {opp.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. ACTIVITIES MODULE */}
      {activeModule === "activities" && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Communication Log & Activity Feed</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Review call records, emails, WhatsApp logs, and scheduled meetings.</p>
            </div>
            <button onClick={() => setNotification("Activity: Initiating new calendar sync")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, cursor: "pointer" }}>
              <RefreshCw size={14} /> Sync Calendar
            </button>
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            {activities.map(act => (
              <div key={act.id} style={{ display: "flex", gap: 16, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" }}>
                  <MessageSquare size={16} color="var(--color-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{act.type} with {act.contact} ({act.company})</span>
                      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>Logged by {act.owner} · {act.time}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.5, marginTop: 8, margin: "8px 0 0" }}>{act.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. QUOTATIONS MODULE */}
      {activeModule === "review" && !selectedQuotation && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>CRM Quotations & Approvals</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Create, review, and issue quotes to qualified opportunities.</p>
            </div>
            <button onClick={() => handleOpenCreate("quote")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={14} /> Create Quote
            </button>
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", color: "#6B7280" }}>
                  <th style={{ padding: "12px 16px" }}>Quote ID</th>
                  <th style={{ padding: "12px 16px" }}>Target Company</th>
                  <th style={{ padding: "12px 16px" }}>Total Value</th>
                  <th style={{ padding: "12px 16px" }}>Tax / Discount</th>
                  <th style={{ padding: "12px 16px" }}>Quote Date</th>
                  <th style={{ padding: "12px 16px" }}>Workflow Status</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map(q => (
                  <tr key={q.id} onClick={() => setSelectedQuotation(q)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.01)"} onMouseLeave={e => e.currentTarget.style.background = "none"}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{q.id}</td>
                    <td style={{ padding: "14px 16px" }}>{q.company}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: "#fff" }}>{q.value}</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>Tax: {q.tax} (Disc: {q.discount})</td>
                    <td style={{ padding: "14px 16px", color: "#9CA3AF" }}>{q.date} ({q.version})</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: q.status === "Approved" ? "rgba(16,185,129,0.15)" : "rgba(245,158,11,0.15)", color: q.status === "Approved" ? "#10B981" : "#F59E0B" }}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. REPORTS MODULE */}
      {activeModule === "history" && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Funnel Reports & Analytics</h2>
            <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Review conversions, pipeline velocity, and target account analysis.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Lead conversion metrics */}
            <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 16 }}>Lead Acquisition Funnel</div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={[
                  { stage: "Scanned", leads: 430 },
                  { stage: "Qualified", leads: 142 },
                  { stage: "Contacted", leads: 87 },
                  { stage: "Opportunities", leads: 12 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="stage" tick={{ fill: "#6B7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid var(--color-border)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Bar dataKey="leads" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sales performance chart */}
            <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#E5E7EB", marginBottom: 16 }}>Opportunity Close Forecast</div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={[
                  { name: "Week 1", value: 1200 },
                  { name: "Week 2", value: 1800 },
                  { name: "Week 3", value: 1450 },
                  { name: "Week 4", value: 2900 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6B7280", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid var(--color-border)", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#10B981" fill="rgba(16,185,129,0.12)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 9. SETTINGS MODULE */}
      {activeModule === "settings" && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 600 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Sales CRM Scoring & Integrations</h2>
            <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Establish weights for lead scores and configure organization roles.</p>
          </div>

          <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 13, color: "#fff", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>Lead Scoring Logic</div>
            {[
              { label: "Revenue above $10M threshold", weight: "40 points" },
              { label: "Target stack matches legacy ERP", weight: "30 points" },
              { label: "Primary decision maker identified", weight: "20 points" },
              { label: "APAC region target matching", weight: "10 points" }
            ].map(setting => (
              <div key={setting.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#D1D5DB" }}>{setting.label}</span>
                <span style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 700 }}>{setting.weight}</span>
              </div>
            ))}
            <button onClick={() => setNotification("Success: CRM Scoring parameters saved")} style={{ alignSelf: "flex-end", padding: "8px 16px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 12 }}>
              Save parameters
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================
          DYNAMIC DETAIL PAGES (FOR EACH ENTITY)
          ========================================================== */}

      {/* LEAD DETAIL PAGE */}
      {selectedLead && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedLead(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Listings
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => {
                const newOpp = {
                  id: `OPP-0${opportunities.length + 1}`,
                  name: `${selectedLead.company} System Upgrade`,
                  company: selectedLead.company,
                  value: "$350K",
                  stage: "Qualification",
                  probability: 45,
                  close: "2026-06-30",
                  owner: "Sarah Chen",
                  score: 82,
                  competitors: "None"
                };
                setOpportunities(prev => [newOpp, ...prev]);
                setSelectedLead(null);
                setNotification("Success: Lead converted to Account & Opportunity!");
              }} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Convert to Account / Opportunity
              </button>
              <button onClick={() => { setLeads(prev => prev.filter(l => l.id !== selectedLead.id)); setSelectedLead(null); setNotification("Success: Lead deleted!"); }} style={{ padding: "8px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", cursor: "pointer" }}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            {/* Left Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Lead Profiling</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{selectedLead.name}</h2>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>{selectedLead.company}</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 20, paddingTop: 20 }}>
                  <div>Email: <strong style={{ color: "#fff" }}>{selectedLead.email}</strong></div>
                  <div>Phone: <strong style={{ color: "#fff" }}>{selectedLead.phone}</strong></div>
                  <div>Lead Source: <strong style={{ color: "#fff" }}>{selectedLead.source}</strong></div>
                  <div>Status: <strong style={{ color: "var(--color-primary)" }}>{selectedLead.status}</strong></div>
                </div>
              </div>

              {/* Detail Tabs */}
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.05)", gap: 16, marginBottom: 16 }}>
                  {["overview", "activities", "notes"].map(tb => (
                    <button key={tb} onClick={() => setActiveDetailTab(tb)} style={{ background: "none", border: "none", color: activeDetailTab === tb ? "var(--color-primary)" : "#6B7280", fontWeight: 700, cursor: "pointer", paddingBottom: 10, borderBottom: activeDetailTab === tb ? "2px solid var(--color-primary)" : "none", textTransform: "capitalize" }}>
                      {tb}
                    </button>
                  ))}
                </div>

                {activeDetailTab === "overview" && (
                  <div>
                    <div style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.6 }}>{selectedLead.aiRemark}</div>
                  </div>
                )}

                {activeDetailTab === "activities" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {activities.filter(a => a.contact === selectedLead.name).length === 0 ? (
                      <div style={{ fontSize: 12, color: "#6B7280" }}>No logged activities for this contact yet.</div>
                    ) : (
                      activities.filter(a => a.contact === selectedLead.name).map(a => (
                        <div key={a.id} style={{ fontSize: 12, color: "#D1D5DB" }}>
                          <strong>{a.type}</strong>: {a.text} ({a.time})
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeDetailTab === "notes" && (
                  <textarea placeholder="Write operational notes here..." style={{ width: "100%", height: 100, background: "rgba(0,0,0,0.15)", border: "1px solid var(--color-border)", borderRadius: 8, color: "#fff", padding: 10 }} />
                )}
              </div>
            </div>

            {/* Right AI Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(217,70,239,0.04))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700 }}>AI Lead Qualification</span>
                  <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>96% Conf</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
                  <div style={{ fontSize: 44, fontWeight: 900, color: "var(--color-accent)" }}>{selectedLead.score}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF" }}>/ 100 Opportunity Score</div>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 16, paddingTop: 16 }}>
                  <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>AI Suggested Action</div>
                  <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.5, marginTop: 6, margin: 0 }}>
                    Create S/4HANA migration draft and trigger WhatsApp contact regarding refining automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACCOUNT DETAIL PAGE */}
      {selectedAccount && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedAccount(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Organizations
            </button>
            <button onClick={() => { setAccounts(prev => prev.filter(a => a.id !== selectedAccount.id)); setSelectedAccount(null); setNotification("Success: Account archived!"); }} style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 13, cursor: "pointer" }}>
              Archive Account
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Organization Profile</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{selectedAccount.name}</h2>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>HQ: {selectedAccount.hq} · Industry: {selectedAccount.industry}</div>

                <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.6, marginTop: 16 }}>{selectedAccount.description}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 20, paddingTop: 20 }}>
                  <div>Revenue: <strong style={{ color: "#fff" }}>{selectedAccount.revenue}</strong></div>
                  <div>Employees: <strong style={{ color: "#fff" }}>{selectedAccount.employees}</strong></div>
                  <div>Tech Stack: <strong style={{ color: "var(--color-primary)" }}>{selectedAccount.stack}</strong></div>
                  <div>Subsidiaries: <strong style={{ color: "#fff" }}>{selectedAccount.subsidiaries}</strong></div>
                </div>
              </div>

              {/* Related Contacts & Opportunities */}
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 750, color: "#fff", marginBottom: 12 }}>Associated Contacts</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {contacts.filter(c => c.company === selectedAccount.name).map(con => (
                    <div key={con.id} style={{ padding: 12, background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{con.name}</div>
                        <div style={{ fontSize: 11, color: "#6B7280" }}>{con.designation} ({con.email})</div>
                      </div>
                      <span style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 650 }}>{con.committee}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>AI Account Summary</div>
                <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.5, margin: 0 }}>
                  Target has active legacy integrations. Relationship score is **Strong** due to active communications with COO Rian Pratama. Estimated budget capability exceeds $500K for pipeline migrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT DETAIL PAGE */}
      {selectedContact && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedContact(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Contacts
            </button>
            <button onClick={() => setNotification("Action: Triggering custom email sequence to contact")} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Send Custom Outreach
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Stakeholder Profile</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{selectedContact.name}</h2>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>{selectedContact.designation} at {selectedContact.company}</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 20, paddingTop: 20 }}>
                  <div>Email: <strong style={{ color: "#fff" }}>{selectedContact.email}</strong></div>
                  <div>Phone: <strong style={{ color: "#fff" }}>{selectedContact.phone}</strong></div>
                  <div>Committee Role: <strong style={{ color: "#fff" }}>{selectedContact.committee}</strong></div>
                  <div>Relationship: <strong style={{ color: "var(--color-primary)" }}>{selectedContact.strength}</strong></div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(217,70,239,0.04))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Influence & Buying Power</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: "var(--color-accent)" }}>{selectedContact.score}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Influence Quotient (Scale 0-100)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OPPORTUNITY DETAIL PAGE */}
      {selectedOpportunity && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedOpportunity(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Pipeline
            </button>
            <button onClick={() => {
              const newQuote = {
                id: `QT-2026-0${quotes.length + 1}`,
                company: selectedOpportunity.company,
                value: selectedOpportunity.value,
                discount: "$15,000",
                tax: "$15,000",
                status: "Draft",
                date: new Date().toISOString().split("T")[0],
                version: "v1.0",
                products: "Enterprise API Connector license pack"
              };
              setQuotes(prev => [newQuote, ...prev]);
              setNotification("Success: Quotation drafted directly from Opportunity!");
            }} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Generate Quote Draft
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Deal Profile</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{selectedOpportunity.name}</h2>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Account: {selectedOpportunity.company} · Target Close: {selectedOpportunity.close}</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 20, paddingTop: 20 }}>
                  <div>Deal Value: <strong style={{ color: "#fff", fontSize: 15 }}>{selectedOpportunity.value}</strong></div>
                  <div>Current Stage: <strong style={{ color: "#fff" }}>{selectedOpportunity.stage}</strong></div>
                  <div>Win Probability: <strong style={{ color: "#10B981" }}>{selectedOpportunity.probability}%</strong></div>
                  <div>Competitors: <strong style={{ color: "#fff" }}>{selectedOpportunity.competitors}</strong></div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.04), rgba(217,70,239,0.04))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>AI Deal Prediction</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: "var(--color-accent)" }}>{selectedOpportunity.score}%</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>System Calculated Win Confidence</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUOTATION DETAIL PAGE */}
      {selectedQuotation && (
        <div style={{ padding: "28px 28px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={() => setSelectedQuotation(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
              <ChevronLeft size={16} /> Back to Quotes
            </button>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => {
                setQuotes(prev => prev.map(q => q.id === selectedQuotation.id ? { ...q, status: "Approved" } : q));
                setSelectedQuotation(prev => ({ ...prev, status: "Approved" }));
                setNotification("Success: Quotation approved in workflow!");
              }} style={{ padding: "8px 16px", borderRadius: 8, background: "#10B981", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Approve Quote
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: "rgba(22,27,38,0.7)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Quotation Details</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>{selectedQuotation.id}</h2>
                <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Account: {selectedQuotation.company} · Version: {selectedQuotation.version}</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 20, paddingTop: 20 }}>
                  <div>Total Value: <strong style={{ color: "#fff", fontSize: 15 }}>{selectedQuotation.value}</strong></div>
                  <div>Status: <strong style={{ color: "#fff" }}>{selectedQuotation.status}</strong></div>
                  <div>Tax: <strong style={{ color: "#fff" }}>{selectedQuotation.tax}</strong></div>
                  <div>Discount Applied: <strong style={{ color: "#fff" }}>{selectedQuotation.discount}</strong></div>
                  <div style={{ gridColumn: "span 2" }}>Line Items: <strong style={{ color: "var(--color-primary)" }}>{selectedQuotation.products}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          MODALS / DRAWERS (ADD WORKFLOWS)
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
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Input details to update the Sales pipeline</div>
              </div>
              <button type="button" onClick={() => setDrawerMode(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 20 }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              {drawerMode === "lead" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Lead Name</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Rian Pratama" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Company Name</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. IndoAgri Perkasa" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Email</label>
                    <input type="email" onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. rian.p@indoagri.co.id" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Lead Source</label>
                    <input type="text" onChange={e => setFormData({ ...formData, source: e.target.value })} placeholder="e.g. Web Demo Request" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}

              {drawerMode === "account" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Company Name</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. IndoAgri Perkasa" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Industry</label>
                    <input type="text" onChange={e => setFormData({ ...formData, industry: e.target.value })} placeholder="e.g. Food Refining" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>HQ Location</label>
                    <input type="text" onChange={e => setFormData({ ...formData, hq: e.target.value })} placeholder="e.g. Jakarta, Indonesia" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Technology Stack</label>
                    <input type="text" onChange={e => setFormData({ ...formData, stack: e.target.value })} placeholder="e.g. SAP ECC, Oracle DB" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}

              {drawerMode === "contact" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Contact Name</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Budi Santoso" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Designation</label>
                    <input type="text" onChange={e => setFormData({ ...formData, designation: e.target.value })} placeholder="e.g. VP IT Infrastructure" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Associated Company</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. IndoAgri Perkasa" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}

              {drawerMode === "opportunity" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Deal Name</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. IndoAgri Sumatra Upgrade" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Deal Value ($)</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, value: e.target.value })} placeholder="e.g. $450K" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Target Close Date</label>
                    <input type="date" required onChange={e => setFormData({ ...formData, close: e.target.value })} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}

              {drawerMode === "quote" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Target Company</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. IndoAgri Perkasa" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Total Value</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, value: e.target.value })} placeholder="e.g. $480,000" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Line Item Products</label>
                    <input type="text" required onChange={e => setFormData({ ...formData, products: e.target.value })} placeholder="e.g. AIXORA Core License (x500)" style={{ width: "100%", padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff" }} />
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 10 }}>
              <button type="button" onClick={() => setDrawerMode(null)} style={{ flex: 1, padding: "10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", cursor: "pointer" }}>Cancel</button>
              <button type="submit" style={{ flex: 2, padding: "10px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Save Record</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
