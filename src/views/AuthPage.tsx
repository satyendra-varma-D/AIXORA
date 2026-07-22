import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Fingerprint } from "lucide-react";
import type { View } from "../App";

interface Props { onNavigate: (v: View) => void; }

type AuthMode = "login" | "signup" | "forgot" | "mfa";

export default function AuthPage({ onNavigate }: Props) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (mode === "login") {
      if (!email.trim() || !password) {
        setError("Please enter both email and password.");
        return;
      }
      if (email.trim() !== "varma@yopmail.com" || password !== "admin") {
        setError("Invalid email or password. Please try again.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setMode("mfa");
      }, 1200);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onNavigate("hub");
      }, 1200);
    }
  };

  const handleMFA = () => {
    setError("");
    const pin = otp.join("");
    if (pin.length < 6) {
      setError("Please enter the complete 6-digit PIN.");
      return;
    }
    if (pin !== "909090") {
      setError("Invalid PIN. Please try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("hub");
    }, 1000);
  };

  const handleOtp = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return;
    const next = [...otp];
    next[i] = v.slice(-1);
    setOtp(next);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--color-bg)", display: "flex",
      fontFamily: "'Inter', sans-serif", color: "#F9FAFB",
      transition: "background-color 0.3s ease",
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "48px 48px", position: "relative", overflow: "hidden",
      }}>
        {/* Ambient */}
        <div style={{ position: "absolute", top: "20%", left: "20%", width: 400, height: 400, background: "radial-gradient(ellipse, rgba(91,92,235,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 300, height: 300, background: "radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        {/* Logo */}
        <div style={{ position: "absolute", top: 32, left: 40, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M9 2L9 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M2.5 6L15.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M15.5 6L2.5 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>AIX<span style={{ color: "#5B5CEB" }}>ORA</span></span>
        </div>

        <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
          {mode === "mfa" ? <MFAPanel otp={otp} onOtp={handleOtp} onSubmit={handleMFA} loading={loading} onNavigate={onNavigate} error={error} /> : (
            <div style={{ background: "rgba(22, 27, 38, 0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px 32px" }}>
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px" }}>
                  {mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}
                </h1>
                <p style={{ color: "#6B7280", fontSize: 14 }}>
                  {mode === "login" ? "Sign in to your AIXORA workspace" : mode === "signup" ? "Start your 14-day free trial" : "Enter your email to receive a reset link"}
                </p>
              </div>

              {error && (
                <div style={{
                  background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: 10, padding: "10px 14px", color: "#EF4444", fontSize: 13,
                  fontWeight: 500, marginBottom: 20, textAlign: "left"
                }}>
                  {error}
                </div>
              )}

              {mode !== "forgot" && (
                <>
                  <SSOButton icon={<GoogleIcon />} label="Continue with Google" />
                  <SSOButton icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>} label="Continue with GitHub" />
                  <SSOButton icon={<MsIcon />} label="Continue with Microsoft" />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                    <span style={{ fontSize: 12, color: "#4B5563" }}>or continue with email</span>
                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                  </div>
                </>
              )}

              {mode === "signup" && (
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Full Name</label>
                  <input placeholder="Sarah Chen" style={inputStyle} />
                </div>
              )}

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#D1D5DB", marginBottom: 6 }}>Work Email</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="sarah@company.com" style={inputStyle}
                />
              </div>

              {mode !== "forgot" && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#D1D5DB" }}>Password</label>
                    {mode === "login" && (
                      <button onClick={() => setMode("forgot")} style={{ fontSize: 12, color: "#5B5CEB", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Forgot password?</button>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPwd ? "text" : "password"} value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      style={{ ...inputStyle, paddingRight: 44 }}
                    />
                    <button onClick={() => setShowPwd(!showPwd)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}>
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === "forgot" && <div style={{ marginBottom: 20 }} />}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%", padding: "13px", borderRadius: 10, border: "none",
                  background: loading ? "rgba(91,92,235,0.5)" : "linear-gradient(135deg, #5B5CEB, #7C3AED)",
                  color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 4px 20px rgba(91,92,235,0.35)", transition: "all 0.2s",
                }}
              >
                {loading ? <Spinner /> : (
                  <>
                    {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#6B7280" }}>
                {mode === "login" ? (
                  <>Don't have an account? <button onClick={() => setMode("signup")} style={linkBtn}>Sign up free</button></>
                ) : mode === "signup" ? (
                  <>Already have an account? <button onClick={() => setMode("login")} style={linkBtn}>Sign in</button></>
                ) : (
                  <button onClick={() => setMode("login")} style={linkBtn}>← Back to sign in</button>
                )}
              </p>

              {mode === "login" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 16, color: "#4B5563", fontSize: 12 }}>
                  <Shield size={12} />
                  Enterprise SSO available · SOC 2 Certified
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right panel — decorative */}
      <div style={{
        width: "45%", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: 48, position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, rgba(91,92,235,0.08), rgba(124,58,237,0.06))",
        borderLeft: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ position: "absolute", top: "15%", right: "15%", width: 300, height: 300, border: "1px solid rgba(91,92,235,0.15)", borderRadius: "50%" }} className="animate-spin-slow" />
        <div style={{ position: "absolute", top: "25%", right: "25%", width: 160, height: 160, border: "1px solid rgba(0,212,255,0.1)", borderRadius: "50%" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 360, textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 24 }} className="animate-float">⚡</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
            The AI OS for<br />Software Delivery
          </h2>
          <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
            15 integrated applications. AI-powered workflows. Enterprise-grade security.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🧠", text: "AI-generated BRDs, FRDs & User Stories" },
              { icon: "⚡", text: "Automated test suites & CI/CD pipelines" },
              { icon: "📊", text: "Real-time executive intelligence dashboards" },
              { icon: "🔒", text: "SSO, MFA, RBAC & full audit logging" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.06)", textAlign: "left" }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: "#9CA3AF" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MFAPanel({ otp, onOtp, onSubmit, loading, onNavigate, error }: any) {
  return (
    <div style={{ background: "rgba(22, 27, 38, 0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(91,92,235,0.15)", border: "1px solid rgba(91,92,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <Fingerprint size={28} color="#5B5CEB" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 8px" }}>Two-Factor Authentication</h2>
      <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 20 }}>Enter the 6-digit code from your authenticator app</p>
      {error && (
        <div style={{
          background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: 10, padding: "10px 14px", color: "#EF4444", fontSize: 13,
          fontWeight: 500, marginBottom: 20, textAlign: "center"
        }}>
          {error}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32 }}>
        {otp.map((v: string, i: number) => (
          <input
            key={i}
            id={`otp-${i}`}
            value={v}
            onChange={e => onOtp(i, e.target.value)}
            maxLength={1}
            style={{
              width: 52, height: 56, textAlign: "center", fontSize: 22, fontWeight: 700,
              background: "rgba(255,255,255,0.04)", border: `2px solid ${v ? "#5B5CEB" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 10, color: "#F9FAFB", outline: "none", fontFamily: "'JetBrains Mono', monospace",
              transition: "border-color 0.2s",
            }}
          />
        ))}
      </div>
      <button onClick={onSubmit} disabled={loading} style={{
        width: "100%", padding: "13px", borderRadius: 10, border: "none",
        background: "linear-gradient(135deg, #5B5CEB, #7C3AED)", color: "#fff",
        fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {loading ? <Spinner /> : <><Shield size={16} /> Verify & Sign In</>}
      </button>
      <button onClick={() => onNavigate("landing")} style={{ marginTop: 16, fontSize: 13, color: "#6B7280", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
        ← Back
      </button>
    </div>
  );
}

function SSOButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
        padding: "10px 16px", borderRadius: 9, marginBottom: 10,
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)", color: "#D1D5DB", fontSize: 14, fontWeight: 500,
        cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
      }}
    >
      {icon} {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function MsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function Spinner() {
  return <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin-slow 0.7s linear infinite" }} />;
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", borderRadius: 9,
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif",
  transition: "border-color 0.2s", boxSizing: "border-box",
};

const linkBtn: React.CSSProperties = {
  background: "none", border: "none", color: "#5B5CEB", cursor: "pointer",
  fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif",
};
