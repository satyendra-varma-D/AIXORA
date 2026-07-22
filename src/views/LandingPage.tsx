import { useState, useEffect } from "react";
import {
  ArrowRight, Zap, Globe, ChevronRight, Star,
  BarChart3, Code2, Users, Brain, Layers, Shield,
  Play, Sparkles, TrendingUp, Activity, Palette
} from "lucide-react";
import type { View, Theme } from "../App";

interface Props {
  onNavigate: (v: View) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const NAV_LINKS = ["Platform", "Applications", "Solutions", "Pricing", "Resources"];

const STATS = [
  { value: "98.9%", label: "Platform Uptime" },
  { value: "2.4M+", label: "AI Actions Daily" },
  { value: "340+", label: "Enterprise Clients" },
  { value: "68%", label: "Faster Delivery" },
];

const FEATURES = [
  {
    icon: Brain, color: "#5B5CEB",
    title: "AI-First Architecture",
    desc: "Every workflow is augmented by context-aware AI that learns your team's delivery patterns and accelerates outcomes.",
  },
  {
    icon: Layers, color: "#7C3AED",
    title: "Unified Delivery OS",
    desc: "From lead discovery to post-deployment support — one coherent platform replaces 14 disconnected tools.",
  },
  {
    icon: BarChart3, color: "#00D4FF",
    title: "Real-Time Intelligence",
    desc: "Executive dashboards, predictive forecasting, and AI-generated insights surface risk before it becomes cost.",
  },
  {
    icon: Shield, color: "#10B981",
    title: "Enterprise Security",
    desc: "SOC 2 Type II, ISO 27001, SSO/SAML, RBAC, audit logs, and zero-trust architecture built in.",
  },
  {
    icon: Code2, color: "#F59E0B",
    title: "AI Code Generation",
    desc: "Generate boilerplate, refactor debt, review PRs, and auto-document — directly from requirements to commits.",
  },
  {
    icon: Globe, color: "#EF4444",
    title: "Ecosystem Integration",
    desc: "Native connectors to GitHub, Jira, Slack, Azure, AWS, Salesforce, and 200+ enterprise tools.",
  },
];

const APPS = [
  { name: "AI Market Intelligence", icon: TrendingUp, color: "#5B5CEB" },
  { name: "AI Sales CRM", icon: Users, color: "#7C3AED" },
  { name: "AI SDR", icon: Zap, color: "#00D4FF" },
  { name: "Meeting Intelligence", icon: Activity, color: "#10B981" },
  { name: "Discovery Studio", icon: Sparkles, color: "#F59E0B" },
  { name: "Development Studio", icon: Code2, color: "#EF4444" },
  { name: "DevOps Studio", icon: Layers, color: "#5B5CEB" },
  { name: "Executive Center", icon: BarChart3, color: "#7C3AED" },
];

const TESTIMONIALS = [
  {
    quote: "AIXORA collapsed our software delivery cycle from 18 months to 6. The AI-generated BRDs and automated test suites alone saved us 3 FTEs.",
    name: "Sarah Chen", role: "CTO", company: "NovaTech Solutions", avatar: "SC",
  },
  {
    quote: "We evaluated SAP, ServiceNow, and Azure DevOps. Nothing comes close to the intelligence and cohesion AIXORA brings to an IT services business.",
    name: "Marcus Williams", role: "VP Engineering", company: "Apex Digital", avatar: "MW",
  },
  {
    quote: "The Executive Center alone justifies the investment. I can see delivery health, revenue forecast, and client satisfaction on one screen.",
    name: "Priya Patel", role: "CEO", company: "InfraCore Ltd", avatar: "PP",
  },
];

export default function LandingPage({ onNavigate, theme, setTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: "var(--color-bg)", color: "#F9FAFB", minHeight: "100vh", fontFamily: "'Inter', sans-serif", transition: "background-color 0.3s ease" }}>
      {/* Ambient background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", top: "-20%", left: "10%", width: 800, height: 800,
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "-10%", width: 600, height: 600,
          background: "radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "30%", width: 500, height: 500,
          background: "radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.3s",
        background: scrolled ? "var(--color-surface)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <LogoMark />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {NAV_LINKS.map(l => (
              <button key={l} style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 14, fontWeight: 500, padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F9FAFB")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
              >{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Theme Selector */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setThemeOpen(!themeOpen)} style={{
                background: "none", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8, width: 36, height: 36, cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", color: "#9CA3AF", transition: "all 0.2s"
              }} title="Change Theme">
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

            <button onClick={() => onNavigate("auth")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.12)", color: "#F9FAFB", fontSize: 14, fontWeight: 500, padding: "8px 18px", borderRadius: 8, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#F9FAFB"; }}
            >Sign In</button>
            <button onClick={() => onNavigate("auth")} style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff",
              fontSize: 14, fontWeight: 600, padding: "8px 20px", borderRadius: 8, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif",
              boxShadow: "0 4px 16px rgba(99,102,241,0.35)", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(99,102,241,0.35)"; }}
            >Book Demo</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: 160, paddingBottom: 120, textAlign: "center", padding: "160px 24px 120px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(91,92,235,0.12)", border: "1px solid rgba(91,92,235,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 32, color: "#A5A6F6", fontSize: 13, fontWeight: 500 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5B5CEB", display: "inline-block" }} className="animate-pulse-glow" />
          Now in general availability — AI Software Delivery Suite v3.0
          <ChevronRight size={14} />
        </div>
        <h1 style={{ fontSize: "clamp(42px, 7vw, 84px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 auto 24px", maxWidth: 900 }}>
          The AI Operating System<br />
          <span style={{ background: "linear-gradient(135deg, #5B5CEB 0%, #00D4FF 60%, #7C3AED 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            for Software Delivery
          </span>
        </h1>
        <p style={{ fontSize: 20, color: "#9CA3AF", maxWidth: 640, margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 400 }}>
          AIXORA unifies sales, discovery, architecture, development, QA, and customer success into one coherent intelligence layer — eliminating the chaos of disconnected tools.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("auth")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff",
            fontSize: 16, fontWeight: 700, padding: "14px 32px", borderRadius: 12, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif",
            boxShadow: "0 8px 32px rgba(91,92,235,0.4)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(91,92,235,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(91,92,235,0.4)"; }}
          >
            Start Free Trial <ArrowRight size={18} />
          </button>
          <button onClick={() => onNavigate("hub")} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.05)", color: "#F9FAFB", border: "1px solid rgba(255,255,255,0.12)",
            fontSize: 16, fontWeight: 600, padding: "14px 32px", borderRadius: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            <Play size={16} /> Live Demo
          </button>
        </div>

        {/* Hero Dashboard Preview */}
        <div style={{ position: "relative", maxWidth: 1100, margin: "80px auto 0", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(91,92,235,0.2)" }}>
          <HeroDashboardPreview onNavigate={onNavigate} />
        </div>
      </section>

      {/* Stats */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #5B5CEB, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
              <div style={{ color: "#6B7280", fontSize: 14, fontWeight: 500, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ position: "relative", zIndex: 1, padding: "120px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 20, color: "#00D4FF", fontSize: 13, fontWeight: 500 }}>
              Platform Capabilities
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
              Built for every stage of delivery
            </h2>
            <p style={{ color: "#6B7280", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
              15 integrated applications. One platform. Zero context switching.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* App Grid */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 12px" }}>15 Applications. Infinite Scale.</h2>
            <p style={{ color: "#6B7280", fontSize: 17 }}>Each app is enterprise-grade. Together, they're unstoppable.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {APPS.map(app => (
              <AppCard key={app.name} {...app} onClick={() => onNavigate("hub")} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 12px" }}>Trusted by Engineering Leaders</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map(t => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 24px 160px" }}>
        <div style={{
          maxWidth: 860, margin: "0 auto", textAlign: "center", padding: "80px 48px",
          background: "linear-gradient(135deg, rgba(91,92,235,0.15), rgba(124,58,237,0.1))",
          border: "1px solid rgba(91,92,235,0.25)", borderRadius: 24,
          boxShadow: "0 0 80px rgba(91,92,235,0.2)",
        }}>
          <div className="animate-pulse-glow" style={{ fontSize: 48, marginBottom: 24 }}>⚡</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            Ready to modernize<br />your delivery operation?
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 18, marginBottom: 40 }}>
            Join 340+ IT service companies already delivering 3x faster with AIXORA.
          </p>
          <button onClick={() => onNavigate("auth")} style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff",
            fontSize: 18, fontWeight: 700, padding: "16px 40px", borderRadius: 12, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif",
            boxShadow: "0 8px 40px rgba(91,92,235,0.5)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
          >
            Get Started Free <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <LogoMark />
          <div style={{ color: "#4B5563", fontSize: 13 }}>© 2025 AIXORA, Inc. All rights reserved.</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Security", "Status"].map(l => (
              <button key={l} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function LogoMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: "linear-gradient(135deg, #5B5CEB, #7C3AED)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(91,92,235,0.4)",
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M9 2L9 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M2.5 6L15.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M15.5 6L2.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        </svg>
      </div>
      <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", color: "#F9FAFB" }}>
        AIX<span style={{ color: "#5B5CEB" }}>ORA</span>
      </span>
    </div>
  );
}

function FeatureCard({ icon: Icon, color, title, desc }: { icon: any; color: string; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(28, 35, 51, 0.9)" : "rgba(22, 27, 38, 0.7)",
        border: `1px solid ${hovered ? "rgba(91,92,235,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16, padding: 28, cursor: "pointer",
        transition: "all 0.25s", transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Icon size={24} color={color} />
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#F9FAFB" }}>{title}</div>
      <div style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.65 }}>{desc}</div>
    </div>
  );
}

function AppCard({ name, icon: Icon, color, onClick }: { name: string; icon: any; color: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(28, 35, 51, 0.9)" : "rgba(22, 27, 38, 0.5)",
        border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14, padding: "20px 22px", cursor: "pointer",
        transition: "all 0.25s", display: "flex", alignItems: "center", gap: 14,
        transform: hovered ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#E5E7EB", lineHeight: 1.3 }}>{name}</div>
      {hovered && <ChevronRight size={14} color="#6B7280" style={{ marginLeft: "auto" }} />}
    </div>
  );
}

function TestimonialCard({ quote, name, role, company, avatar }: { quote: string; name: string; role: string; company: string; avatar: string }) {
  return (
    <div style={{
      background: "rgba(22, 27, 38, 0.7)", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16, padding: 28,
    }}>
      <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
      </div>
      <p style={{ color: "#D1D5DB", fontSize: 15, lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #5B5CEB, #7C3AED)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fff",
        }}>{avatar}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#F9FAFB" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#6B7280" }}>{role} · {company}</div>
        </div>
      </div>
    </div>
  );
}

function HeroDashboardPreview({ onNavigate }: { onNavigate: (v: View) => void }) {
  return (
    <div
      onClick={() => onNavigate("hub")}
      style={{
        cursor: "pointer",
        background: "#111827",
        minHeight: 480,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div style={{ height: 44, background: "#0D1117", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", paddingLeft: 16, gap: 8 }}>
        {["#EF4444", "#F59E0B", "#10B981"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 16px", fontSize: 11, color: "#4B5563" }}>
            app.aixora.io / executive-center
          </div>
        </div>
      </div>
      {/* Dashboard preview */}
      <div style={{ display: "flex", height: "calc(100% - 44px)", minHeight: 436 }}>
        {/* Sidebar */}
        <div style={{ width: 52, background: "#0D1117", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 16, gap: 12 }}>
          {["#5B5CEB", "#7C3AED", "#00D4FF", "#10B981", "#F59E0B"].map((c, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? c + "30" : "rgba(255,255,255,0.04)", border: i === 0 ? `1px solid ${c}50` : "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: i === 0 ? c : "rgba(255,255,255,0.15)" }} />
            </div>
          ))}
        </div>
        {/* Main content */}
        <div style={{ flex: 1, padding: 20, overflow: "hidden" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", marginBottom: 16 }}>Executive Center · Q4 Overview</div>
          {/* KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Revenue MTD", value: "$2.4M", delta: "+18%", color: "#10B981" },
              { label: "Active Projects", value: "47", delta: "+6", color: "#5B5CEB" },
              { label: "Delivery Health", value: "92%", delta: "+3%", color: "#00D4FF" },
              { label: "Open Risks", value: "8", delta: "-2", color: "#F59E0B" },
            ].map(k => (
              <div key={k.label} style={{ background: "rgba(22,27,38,0.8)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#F9FAFB", marginBottom: 4 }}>{k.value}</div>
                <div style={{ fontSize: 10, color: k.color, fontWeight: 600 }}>{k.delta} this month</div>
              </div>
            ))}
          </div>
          {/* Chart area */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
            <div style={{ background: "rgba(22,27,38,0.8)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 12 }}>Revenue Trend</div>
              <div style={{ height: 100, display: "flex", alignItems: "flex-end", gap: 6 }}>
                {[40, 55, 48, 70, 65, 82, 75, 90, 85, 95, 88, 100].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "linear-gradient(180deg, #5B5CEB, #7C3AED)" : "rgba(91,92,235,0.25)", borderRadius: "3px 3px 0 0", transition: "all 0.2s" }} />
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(22,27,38,0.8)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 12 }}>Pipeline by Stage</div>
              {[
                { label: "Prospecting", w: "85%", color: "#5B5CEB" },
                { label: "Proposal", w: "62%", color: "#7C3AED" },
                { label: "Negotiation", w: "40%", color: "#00D4FF" },
                { label: "Closed Won", w: "28%", color: "#10B981" },
              ].map(p => (
                <div key={p.label} style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 9, color: "#6B7280", marginBottom: 3 }}>{p.label}</div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3 }}>
                    <div style={{ height: "100%", width: p.w, background: p.color, borderRadius: 3, transition: "width 0.8s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Click overlay */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(9,12,21,0)", transition: "background 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(9,12,21,0.6)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(9,12,21,0)")}
      >
        <div style={{ background: "rgba(91,92,235,0.9)", borderRadius: 12, padding: "12px 24px", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, opacity: 0, transition: "opacity 0.2s" }}
          className="preview-enter-btn"
        >
          <Play size={16} /> Enter Platform
        </div>
      </div>
    </div>
  );
}
