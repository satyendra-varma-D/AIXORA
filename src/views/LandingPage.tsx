import { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, Zap, Globe, ChevronRight, Star,
  BarChart3, Code2, Users, Brain, Layers, Shield,
  Play, Sparkles, TrendingUp, Activity, Palette,
  Database, Cpu, MessageSquare, Terminal, Award, HelpCircle,
  Network, Share2, Server, Key, Eye, CheckCircle2, X
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import type { View, Theme } from "../App";

interface Props {
  onNavigate: (v: View) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

// ==========================================
// STATIC DATA & CONFIGS
// ==========================================

const NAV_LINKS = [
  { label: "Architecture", target: "architecture" },
  { label: "Studios", target: "studios" },
  { label: "Intelligence Logs", target: "command-center" },
  { label: "Technology Stack", target: "tech-showcase" }
];

const INTEGRATIONS = [
  "SAP", "Oracle", "Microsoft", "Salesforce", "HubSpot", "Jira", "GitHub", 
  "Slack", "Teams", "Zoom", "AWS", "Azure", "GCP", "Snowflake", "Power BI", 
  "Tableau", "Confluence", "ServiceNow", "Zendesk", "Workday"
];

const TECH_CATEGORIES = [
  {
    title: "AI Orchestration Layer",
    techs: ["CrewAI", "LangGraph", "Semantic Kernel", "Claude 3.5 Sonnet", "GPT-4o", "DeepSeek-R1", "Gemini 1.5 Pro", "Llama 3.3"]
  },
  {
    title: "Knowledge & Memory Fabric",
    techs: ["Qdrant", "Pinecone", "pgvector", "Knowledge Graphs", "Hybrid Vector Search", "Contextual RAG"]
  },
  {
    title: "Enterprise Core Stack",
    techs: ["React 19", "Vite", "TypeScript", "Tailwind CSS v4", "FastAPI", "Express Serverless", "Docker & K8s"]
  },
  {
    title: "Compliance & Security",
    techs: ["SOC 2 Type II", "AES-256 Encryption", "RBAC", "SAML SSO", "Audit Logs", "JWT Authentication"]
  }
];

const PLATFORM_MODULES = [
  { id: "market", name: "Market Intelligence Studio", desc: "Autonomous scanning of competitor pricing, market shifts, and regional demand dynamics.", aiCap: "Sentiment Analysis & Trend Prediction", color: "#5B5CEB" },
  { id: "crm", name: "Sales Intelligence Studio", desc: "Enterprise CRM with automated lead scoring, opportunity tracking, and quotation drafts.", aiCap: "Autonomous Deal Confidence Scoring", color: "#7C3AED" },
  { id: "discovery", name: "Discovery Studio", desc: "Replace workshops by converting natural conversation into epic, feature, and story backlogs.", aiCap: "Contextual Acceptance Criteria Generation", color: "#00D4FF" },
  { id: "design", name: "Solution Architecture Studio", desc: "Generate complete design system guidelines, database schemas, and API contracts.", aiCap: "Schema Mapping & API Syncing", color: "#10B981" },
  { id: "engineering", name: "Engineering Studio", desc: "Automate code reviews, boilerplate generation, and legacy refactoring workflows.", aiCap: "Autonomous Coding & Refactoring Agents", color: "#F59E0B" },
  { id: "quality", name: "Quality Studio", desc: "Generates automated Cypress/Selenium test suites directly from requirements specifications.", aiCap: "Self-healing Test Runner Agents", color: "#EF4444" },
  { id: "success", name: "Customer Success Studio", desc: "Monitor support ticketing streams, client health scores, and customer churn risk indicators.", aiCap: "Proactive Escalation Warnings", color: "#EC4899" },
  { id: "knowledge", name: "Knowledge Hub", desc: "Unified enterprise memory. Automatically ingest documents, databases, and chats into one RAG layer.", aiCap: "Knowledge Graph Generation", color: "#6366F1" },
  { id: "executive", name: "Executive Center", desc: "Unified dashboards tracing delivery velocity, forecast accuracies, and operational bottlenecks.", aiCap: "Revenue Velocity Projection", color: "#14B8A6" },
  { id: "admin", name: "Administration Studio", desc: "Enterprise configuration center. Establish SSO, audit logs, and custom workflow policies.", aiCap: "System Security Auditing", color: "#8B5CF6" }
];

const COMPARISONS = {
  traditional: [
    "Disconnected SaaS silos",
    "Manual data copying & entry",
    "No contextual business memory",
    "Context-switching between 14 tools",
    "Reactive, delayed decision making"
  ],
  aixora: [
    "Unified system topology",
    "Autonomous agent orchestration",
    "Global Knowledge & Memory Fabric",
    "One dashboard for all workflows",
    "Proactive, continuous intelligence"
  ]
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function LandingPage({ onNavigate, theme, setTheme }: Props) {
  const [themeOpen, setThemeOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [commandLogs, setCommandLogs] = useState<any[]>([]);

  // Simulate command center real-time ticker
  useEffect(() => {
    const systems = ["SAP ERP", "Salesforce CRM", "GitHub Repos", "Jira Backlog", "Slack Channel"];
    const actions = ["Ingested ledger balance sheet", "Updated opportunity score to 92%", "Reviewed pull request #409", "Drafted epic user stories", "Summarized stakeholder transcript"];
    
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toLocaleTimeString(),
        system: systems[Math.floor(Math.random() * systems.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        tokens: Math.floor(Math.random() * 8000) + 1200,
        status: Math.random() > 0.15 ? "SUCCESS" : "AUDITED"
      };
      setCommandLogs(prev => [newLog, ...prev.slice(0, 7)]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ 
      background: "#06080F", 
      color: "#F9FAFB", 
      minHeight: "100vh", 
      fontFamily: "'Outfit', 'Inter', sans-serif", 
      overflowX: "hidden",
      backgroundSize: "40px 40px",
      backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)"
    }}>
      
      {/* Background Neural Particles */}
      <NeuralNetworkBackground />

      {/* Top Reading Progress Bar */}
      <motion.div 
        style={{ scaleX: scaleProgress, transformOrigin: "0%", height: 3, background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }} 
      />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(6, 8, 15, 0.7)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          
          <LogoMark />
          
          {/* Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 auto" }}>
            {NAV_LINKS.map(l => (
              <button 
                key={l.label} 
                onClick={() => scrollToSection(l.target)}
                style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 8, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Theme Selector */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setThemeOpen(!themeOpen)} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9, width: 38, height: 38, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", color: "#9CA3AF", transition: "all 0.2s"
              }}>
                <Palette size={16} />
              </button>
              {themeOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={() => setThemeOpen(false)} />
                  <div className="glass-strong" style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0, width: 190,
                    borderRadius: 12, padding: 8, zIndex: 100, boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    textAlign: "left"
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

            <button onClick={() => onNavigate("auth")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#F9FAFB", fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 10, cursor: "pointer", transition: "all 0.2s" }}>Sign In</button>
            <button onClick={() => onNavigate("auth")} style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff",
              fontSize: 13, fontWeight: 700, padding: "9px 22px", borderRadius: 10, cursor: "pointer", border: "none",
              boxShadow: "0 4px 20px rgba(99,102,241,0.25)", transition: "all 0.2s",
            }}>Start Building</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{ position: "relative", zIndex: 1, padding: "160px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "6px 18px", marginBottom: 32, color: "#A5A6F6", fontSize: 13, fontWeight: 600 }}
          >
            <Sparkles size={14} className="animate-spin" style={{ color: "var(--color-primary)" }} />
            The Operating System for Enterprise AI
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ fontSize: "clamp(46px, 7.5vw, 92px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.04em", margin: "0 auto 24px", maxWidth: 1050 }}
          >
            The Enterprise<br />
            <span style={{ background: "linear-gradient(135deg, #6366F1 0%, #06B6D4 50%, #8B5CF6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Intelligence Layer
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: 20, color: "#9CA3AF", maxWidth: 740, margin: "0 auto 48px", lineHeight: 1.65, fontWeight: 400 }}
          >
            Connect every enterprise system. Orchestrate autonomous AI agents. Transform data into decisions. Run your business through one intelligence platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}
          >
            <button onClick={() => onNavigate("auth")} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff",
              fontSize: 15, fontWeight: 700, padding: "16px 36px", borderRadius: 12, cursor: "pointer", border: "none",
              boxShadow: "0 10px 30px rgba(99,102,241,0.35)", transition: "all 0.2s"
            }}>
              Start Building <ArrowRight size={16} />
            </button>
            <button onClick={() => onNavigate("hub")} style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.03)", color: "#F9FAFB", border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 15, fontWeight: 700, padding: "16px 36px", borderRadius: 12, cursor: "pointer", transition: "all 0.2s"
            }}>
              Book Executive Demo
            </button>
          </motion.div>

          {/* Interactive Topology Data Flow Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ position: "relative", maxWidth: 1050, margin: "0 auto", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(11, 15, 26, 0.65)", backdropFilter: "blur(24px)", padding: 40 }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 28 }}>
              Continuous Autonomous Execution Visualization
            </h3>
            <HeroTopologyFlow />
          </motion.div>
        </div>
      </section>

      {/* CONTINUOUS LOGO WALL */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(6, 8, 15, 0.4)", overflow: "hidden" }}>
        <div style={{ display: "flex", width: "200%", gap: 50 }} className="animate-logo-scroll">
          <div style={{ display: "flex", justifyContent: "space-around", width: "50%", gap: 40, flexShrink: 0 }}>
            {INTEGRATIONS.map((logo, idx) => (
              <span key={idx} style={{ fontSize: 15, fontWeight: 850, color: "#4B5563", letterSpacing: "-0.02em" }}>{logo}</span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", width: "50%", gap: 40, flexShrink: 0 }}>
            {INTEGRATIONS.map((logo, idx) => (
              <span key={`dup-${idx}`} style={{ fontSize: 15, fontWeight: 850, color: "#4B5563", letterSpacing: "-0.02em" }}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING (Traditional vs AIXORA) */}
      <section id="positioning" style={{ position: "relative", zIndex: 1, padding: "120px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Product Positioning</span>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
              The Composable Enterprise Core
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div style={{ background: "rgba(239, 68, 68, 0.02)", border: "1px solid rgba(239, 68, 68, 0.12)", borderRadius: 20, padding: 36 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#EF4444", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <X size={18} /> Traditional Stack
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {COMPARISONS.traditional.map((item, idx) => (
                  <div key={idx} style={{ fontSize: 14, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(16, 185, 129, 0.02)", border: "1px solid rgba(16, 185, 129, 0.15)", borderRadius: 20, padding: 36, boxShadow: "0 10px 40px rgba(16, 185, 129, 0.05)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#10B981", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={18} /> AIXORA Intelligence
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {COMPARISONS.aixora.map((item, idx) => (
                  <div key={idx} style={{ fontSize: 14, color: "#E5E7EB", display: "flex", alignItems: "center", gap: 12, fontWeight: 600 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE ARCHITECTURE LAYERED DIAGRAM */}
      <section id="architecture" style={{ position: "relative", zIndex: 1, padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>System Architecture</span>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
              Enterprise Intelligence Schema
            </h2>
            <p style={{ color: "#6B7280", fontSize: 16, marginTop: 8 }}>How AIXORA connects multi-layer architectures from data source to executive outcomes.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "Layer 5: Business Outcomes", items: ["Sales CRM Boost", "Automated QA Suites", "Predictive Logistics", "Executive Dashboards", "Engineering Studio"], color: "#10B981" },
              { title: "Layer 4: Agent Reasoning Engine", items: ["CrewAI Planning", "LangGraph State Managers", "Decision Workflows", "Execution Handlers"], color: "#F59E0B" },
              { title: "Layer 3: Knowledge Fabric & Vector DBs", items: ["Hybrid RAG System", "pgvector Memory", "Knowledge Graphs", "Qdrant Clusters"], color: "#00D4FF" },
              { title: "Layer 2: AIXORA Intelligence Core", items: ["Model Router", "LLM APIs (Claude, GPT, DeepSeek)", "Semantic Parsers"], color: "#7C3AED" },
              { title: "Layer 1: Connected Enterprise Systems", items: ["SAP ERP", "Salesforce Cloud", "Jira API", "GitHub Repos", "Database Nodes"], color: "#5B5CEB" }
            ].map((layer, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.005, y: -2 }}
                style={{ 
                  background: "rgba(17, 24, 39, 0.6)", 
                  border: `1px solid rgba(255,255,255,0.06)`, 
                  borderRadius: 16, 
                  padding: "24px 30px", 
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                  <strong style={{ fontSize: 15, color: layer.color, minWidth: 260 }}>{layer.title}</strong>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {layer.items.map(item => (
                      <span key={item} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#D1D5DB" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM MODULES (ENTERPRISE STUDIOS) */}
      <section id="studios" style={{ position: "relative", zIndex: 1, padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Unified Product Center</span>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
              Enterprise Intelligence Studios
            </h2>
            <p style={{ color: "#6B7280", fontSize: 17, marginTop: 10 }}>Every business department powered by dedicated autonomous workspaces.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {PLATFORM_MODULES.map(studio => (
              <motion.div 
                key={studio.id}
                whileHover={{ y: -4 }}
                style={{ 
                  background: "rgba(17, 24, 39, 0.65)", 
                  border: "1px solid rgba(255,255,255,0.06)", 
                  borderRadius: 18, 
                  padding: 28,
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Glowing Corner Badge */}
                <div style={{ position: "absolute", top: 12, right: 12, fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 4, background: `${studio.color}15`, color: studio.color, border: `1px solid ${studio.color}30` }}>
                  ACTIVE STUDIO
                </div>

                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${studio.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Brain size={20} color={studio.color} />
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{studio.name}</h3>
                <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.6, marginBottom: 20 }}>{studio.desc}</p>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 14, fontSize: 11, color: "var(--color-primary)", display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                  <Zap size={11} /> AI Capability: {studio.aiCap}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE COMMAND CENTER */}
      <section id="command-center" style={{ position: "relative", zIndex: 1, padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Real-time Operations</span>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
              Live Platform Operations Log
            </h2>
            <p style={{ color: "#6B7280", fontSize: 16, marginTop: 10 }}>Trace continuous AI queries, memory utilization, and active pipeline metrics.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            {/* Live Counters */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Active Agent Sessions", val: "1,492", change: "+12% this hour" },
                { label: "Connected System Nodes", val: "228", change: "100% operational" },
                { label: "AI Workflows Processed", val: "4.2M", change: "Avg latency: 42ms" }
              ].map((c, idx) => (
                <div key={idx} style={{ background: "rgba(17, 24, 39, 0.7)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 22 }}>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>{c.label}</span>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginTop: 6 }}>{c.val}</div>
                  <span style={{ fontSize: 11, color: "#10B981", marginTop: 4, display: "block" }}>{c.change}</span>
                </div>
              ))}
            </div>

            {/* Live Log Ticker */}
            <div style={{ background: "#090C15", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14, fontFamily: "'JetBrains Mono', monospace" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)" }}>SYSTEM OUTPUTS STREAM</span>
                <span style={{ fontSize: 11, color: "#10B981" }}>● SYSTEM NORMAL</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 280 }}>
                {commandLogs.length === 0 ? (
                  <div style={{ color: "#4B5563", fontSize: 12 }}>Awaiting incoming server queries...</div>
                ) : (
                  commandLogs.map((log, idx) => (
                    <div key={idx} style={{ fontSize: 11, color: "#9CA3AF", display: "flex", justifyContent: "space-between", borderBottom: "1px dotted rgba(255,255,255,0.03)", paddingBottom: 6 }}>
                      <span>[{log.time}] <strong style={{ color: "#fff" }}>{log.system}</strong>: {log.action}</span>
                      <span style={{ color: log.status === "SUCCESS" ? "#10B981" : "#F59E0B" }}>{log.status} ({log.tokens} tk)</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT TECHNOLOGY SHOWCASE */}
      <section id="tech-showcase" style={{ position: "relative", zIndex: 1, padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Technology Stack</span>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
              Celebrated Enterprise Stack
            </h2>
            <p style={{ color: "#6B7280", fontSize: 16, marginTop: 10 }}>Engineered on enterprise-grade infrastructure with maximum zero-trust security compliance.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {TECH_CATEGORIES.map((cat, idx) => (
              <div key={idx} style={{ background: "rgba(17, 24, 39, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 28 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat.title}</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {cat.techs.map(t => (
                    <span key={t} style={{ fontSize: 11, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "#D1D5DB" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 24px 140px" }}>
        <div style={{
          maxWidth: 960, margin: "0 auto", textAlign: "center", padding: "80px 48px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(124,58,237,0.06))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: 24,
          boxShadow: "0 0 100px rgba(99,102,241,0.15)",
        }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 16px" }}>
            The future of enterprise<br />intelligence is composable.
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 18, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
            Initialize your custom intelligence workflows. Establish autonomous agent topologies in minutes.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => onNavigate("auth")} style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff",
              fontSize: 15, fontWeight: 700, padding: "16px 40px", borderRadius: 12, cursor: "pointer", border: "none",
              boxShadow: "0 8px 30px rgba(99,102,241,0.4)"
            }}>
              Start Free Build
            </button>
            <button onClick={() => onNavigate("auth")} style={{
              background: "rgba(255,255,255,0.03)", color: "#fff", border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 15, fontWeight: 700, padding: "16px 40px", borderRadius: 12, cursor: "pointer"
            }}>
              Book Architecture Session
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <LogoMark />
          <div style={{ color: "#4B5563", fontSize: 12 }}>© 2026 AIXORA, Inc. All rights reserved. SOC 2 Type II Certified.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Trust Center", "API Docs"].map(l => (
              <button key={l} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

function LogoMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
      }}>
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M9 2L9 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M2.5 6L15.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M15.5 6L2.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      </div>
      <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.03em", color: "#F9FAFB" }}>
        AIX<span style={{ color: "var(--color-primary)" }}>ORA</span>
      </span>
    </div>
  );
}

// Neural Interactive Background Canvas
function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(99, 102, 241, 0.03)";
      ctx.strokeStyle = "rgba(99, 102, 241, 0.03)";

      for (let i = 0; i < count; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.lineWidth = (1 - dist / 130) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.8 }} 
    />
  );
}

// Hero Interactive Flow Diagram (Canvas / SVG node connections)
function HeroTopologyFlow() {
  const nodes = [
    { label: "SAP / SF", x: 100, y: 150, color: "#5B5CEB" },
    { label: "GitHub", x: 100, y: 220, color: "#7C3AED" },
    { label: "Databases", x: 100, y: 290, color: "#00D4FF" },
    { label: "AIXORA Core", x: 450, y: 220, color: "var(--color-primary)" },
    { label: "Reasoning Agents", x: 750, y: 150, color: "#F59E0B" },
    { label: "Autonomous Actions", x: 750, y: 290, color: "#10B981" }
  ];

  return (
    <div style={{ position: "relative", height: 420, width: "100%", overflow: "hidden" }}>
      {/* Connector lines SVG */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* Source nodes to AIXORA Core */}
        <motion.path 
          d="M 170 150 L 450 220" 
          stroke="rgba(99, 102, 241, 0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
        <motion.path 
          d="M 170 220 L 450 220" 
          stroke="rgba(99, 102, 241, 0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
        <motion.path 
          d="M 170 290 L 450 220" 
          stroke="rgba(99, 102, 241, 0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />

        {/* AIXORA Core to Agents & Actions */}
        <motion.path 
          d="M 450 220 L 750 150" 
          stroke="rgba(245, 158, 11, 0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
        <motion.path 
          d="M 450 220 L 750 290" 
          stroke="rgba(16, 185, 129, 0.4)" 
          strokeWidth="2" 
          fill="none" 
          strokeDasharray="8 6"
          animate={{ strokeDashoffset: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        />
      </svg>

      {/* Nodes mapping */}
      {nodes.map((node, idx) => (
        <motion.div 
          key={idx}
          style={{
            position: "absolute",
            left: `${node.x}px`,
            top: `${node.y}px`,
            transform: "translate(-50%, -50%)",
            background: "rgba(17, 24, 39, 0.9)",
            border: `2px solid ${node.color}`,
            borderRadius: 12,
            padding: "10px 18px",
            boxShadow: `0 0 15px ${node.color}30`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer"
          }}
          whileHover={{ scale: 1.08 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: node.color }} />
          <span style={{ fontSize: 12, fontWeight: 750, color: "#fff", letterSpacing: "0.02em" }}>{node.label}</span>
        </motion.div>
      ))}

      {/* Glow pulse indicators */}
      <motion.div 
        style={{
          position: "absolute",
          left: "450px",
          top: "220px",
          transform: "translate(-50%, -50%)",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          zIndex: -1
        }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </div>
  );
}
