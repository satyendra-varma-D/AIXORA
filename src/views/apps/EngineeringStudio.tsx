import { useState } from "react";
import { Code2, Plus, Zap, Cpu, Database, Globe, Layers } from "lucide-react";

const ARCHITECTURE = [
  { service: "Payment Gateway Service", pattern: "Microservice", language: "NestJS / TypeScript", database: "PostgreSQL", status: "Designed" },
  { service: "Real-time Notification Node", pattern: "Pub/Sub Broker", language: "Node.js / Redis", database: "Redis", status: "In Development" },
  { service: "Search & Retrieval Graph", pattern: "Vector Database", language: "Python / FastAPI", database: "Pinecone", status: "Designed" },
];

const TABLES = [
  { name: "users", columns: 8, indexes: 2, engine: "PostgreSQL", relations: "Workspace, Roles" },
  { name: "transactions", columns: 12, indexes: 4, engine: "PostgreSQL", relations: "Users, Accounts" },
  { name: "audit_logs", columns: 6, indexes: 1, engine: "PostgreSQL", relations: "Users" },
];

const APIS = [
  { method: "POST", path: "/api/v1/auth/mfa/verify", desc: "MFA 2FA code validator", auth: "SSO/Public" },
  { method: "GET", path: "/api/v1/ledger/balance", desc: "Get ledger balances", auth: "Bearer Token" },
  { method: "POST", path: "/api/v1/ledger/transfer", desc: "Initiate transfer split", auth: "Bearer Token" },
];

type EngTab = "architecture" | "database" | "apis" | "coding";

export default function EngineeringStudio({ subModule }: { subModule?: string }) {
  const [localTab, setLocalTab] = useState<EngTab>("architecture");
  const tab = (subModule && ["architecture", "database", "apis", "coding"].includes(subModule)) ? (subModule as EngTab) : localTab;
  const setTab = setLocalTab;
  const [prompt, setPrompt] = useState("");
  const [aiCode, setAiCode] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateSolution = () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setAiCode(`// AI Generated Architecture solution for: ${prompt}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('api/v1/engineering')
export class ${prompt.split(" ").map(w => w[0]?.toUpperCase() + w.slice(1)).join("")}Controller {
  
  @Post('execute')
  @UseGuards(JwtAuthGuard)
  async executeSolution(@Body() payload: any): Promise<any> {
    // 1. Log transaction execution trace
    // 2. Intercept and assert database state locks
    // 3. Return sanitized response payload
    return {
      success: true,
      timestamp: new Date().toISOString(),
      details: "Completed execution successfully"
    };
  }
}`);
    }, 1500);
  };

  return (
    <div style={{ padding: "28px 28px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Engineering Studio</h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Design database schema diagrams, REST/GraphQL APIs, cloud solution architecture, and write code.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--color-primary)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <Zap size={14} /> AI Code Generation
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "'Inter', sans-serif" }}>
            <Plus size={14} /> New Architecture
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3, width: "fit-content", marginBottom: 20 }}>
        {[
          { id: "architecture" as EngTab, label: "Solution Architecture", icon: Cpu },
          { id: "database" as EngTab, label: "Database Design", icon: Database },
          { id: "apis" as EngTab, label: "API Design", icon: Globe },
          { id: "coding" as EngTab, label: "AI Coding", icon: Code2 }
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
        {tab === "architecture" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Services & Architecture Mapping</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ARCHITECTURE.map(a => (
                <div key={a.service} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)" }}>
                      <Layers size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{a.service}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{a.pattern} · Language: {a.language} · DB: {a.database}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 100, background: "rgba(255,255,255,0.05)", color: "#9CA3AF", fontWeight: 600 }}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "database" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Database Schemas</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {TABLES.map(t => (
                <div key={t.name} style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-primary)" }}>{t.name}</span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>{t.engine}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 12 }}>
                      Columns: {t.columns} · Indexes: {t.indexes}
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, fontSize: 12, color: "#6B7280" }}>
                    Relations: {t.relations}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "apis" && (
          <div style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>API Endpoints</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {APIS.map(api => (
                <div key={api.path} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 6,
                      background: api.method === "POST" ? "rgba(16,185,129,0.15)" : "rgba(59,130,246,0.15)",
                      color: api.method === "POST" ? "#10B981" : "#3B82F6"
                    }}>{api.method}</span>
                    <span style={{ fontSize: 13, color: "#F9FAFB", fontFamily: "'JetBrains Mono', monospace" }}>{api.path}</span>
                    <span style={{ fontSize: 13, color: "#6B7280" }}>— {api.desc}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>Auth: {api.auth}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "coding" && (
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Generate a TypeScript service interface for ledger updates..."
                style={{
                  flex: 1, padding: "12px 16px", borderRadius: 9,
                  background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)",
                  color: "#F9FAFB", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                onClick={generateSolution}
                disabled={generating}
                style={{
                  padding: "0 24px", borderRadius: 9, border: "none",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {generating ? "Coding..." : "Generate Code"}
              </button>
            </div>
            {aiCode && (
              <pre style={{
                background: "rgba(0,0,0,0.2)", border: "1px solid var(--color-border)",
                borderRadius: 10, padding: 20, color: "#9CA3AF", fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap",
                lineHeight: 1.6
              }}>
                {aiCode}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
