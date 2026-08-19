import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function OperatingModelSection() {
  const modules = [
    {
      id: "grow",
      name: "GROW",
      title: "Business Acquisition & Customer Relationship",
      desc: "Find the right opportunities, qualify prospects, manage relationships and build a predictable sales pipeline.",
      capabilities: ["Lead Management", "Account Management", "Opportunity Management", "Sales Forecasting"],
      ai: ["Research Assistant", "AI Voice Sales Agent", "BDE Copilot"],
      outcome: "Better leads. Better conversations. Better pipeline visibility."
    },
    {
      id: "discover",
      name: "DISCOVER",
      title: "Discovery, Requirements & Solutioning",
      desc: "Turn customer conversations, documents and business needs into clear, approved requirements and delivery commitments.",
      capabilities: ["Discovery", "Requirements", "Solution Design", "Estimation", "Proposal"],
      ai: ["Discovery Assistant", "BA Copilot", "Document Intelligence", "Design Agent"],
      outcome: "Faster discovery. Better requirements. Reduced ambiguity."
    },
    {
      id: "deliver",
      name: "DELIVER",
      title: "Project Planning, Execution & Delivery",
      desc: "Plan, execute, control, test and release projects with complete visibility.",
      capabilities: ["Portfolio", "Projects", "Agile", "Scrum", "Kanban", "Quality", "Release"],
      ai: ["PM Copilot", "Engineering Agent", "QA Agent", "DevOps Agent"],
      outcome: "Predictable delivery. Earlier risk detection. Better quality."
    },
    {
      id: "people",
      name: "PEOPLE",
      title: "Workforce & Resource Management",
      desc: "Understand workforce capability, demand and capacity and put the right people on the right work.",
      capabilities: ["Workforce", "Skills", "Resource Demand", "Capacity Planning", "Utilization"],
      ai: ["Resource Matching Agent", "Capacity Agent"],
      outcome: "Higher utilization. Less bench. Faster staffing."
    },
    {
      id: "money",
      name: "MONEY",
      title: "Commercial & Project Financial Management",
      desc: "Connect contracts, budgets, costs, revenue, billing and profitability.",
      capabilities: ["Commercial Management", "Project Budget", "Revenue", "Profitability", "Billing"],
      ai: ["Financial Analyst", "Margin Intelligence", "Forecasting Agent"],
      outcome: "Better margins. Better forecasting. Earlier risk detection."
    },
    {
      id: "serve",
      name: "SERVE",
      title: "Customer Service & Success",
      desc: "Support customers after delivery, resolve issues and build long-term relationships.",
      capabilities: ["Customer Workspace", "Incident Management", "SLA Management", "Customer Success"],
      ai: ["Customer Agent", "Support Agent", "Success Agent"],
      outcome: "Faster support. Better customer experience. Higher retention."
    }
  ];

  return (
    <section id="platform" className="py-24 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase mb-6">
            ONE BUSINESS.<br />
            <span className="text-indigo-400">SIX CONNECTED APPLICATIONS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-full hover:border-indigo-500/50 transition-colors group"
            >
              <div className="p-8 border-b border-slate-800 bg-slate-900/50">
                <div className="text-2xl font-black tracking-widest text-white mb-2 uppercase group-hover:text-indigo-400 transition-colors">{m.name}</div>
                <div className="text-sm font-bold text-indigo-300 mb-4">{m.title}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
              
              <div className="p-8 flex-1 flex flex-col gap-6">
                <div>
                  <div className="text-xs font-black tracking-widest text-slate-500 mb-3 uppercase">Core Capabilities</div>
                  <div className="flex flex-wrap gap-2">
                    {m.capabilities.map(c => (
                      <span key={c} className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300">{c}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-black tracking-widest text-indigo-500 mb-3 uppercase">AI Workers</div>
                  <div className="flex flex-wrap gap-2">
                    {m.ai.map(a => (
                      <span key={a} className="px-2 py-1 bg-indigo-900/20 border border-indigo-500/30 rounded text-xs text-indigo-300 font-medium">{a}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-950 border-t border-slate-800 mt-auto">
                <div className="text-xs font-black tracking-widest text-slate-500 mb-2 uppercase">Business Outcome</div>
                <div className="text-sm font-bold text-white">{m.outcome}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BusinessJourneySection() {
  const stages = [
    { step: "LEAD", app: "GROW" },
    { step: "QUALIFY", app: "GROW" },
    { step: "DISCOVER", app: "DISCOVER" },
    { step: "REQUIREMENTS", app: "DISCOVER" },
    { step: "SOLUTION", app: "DISCOVER" },
    { step: "ESTIMATE", app: "DISCOVER" },
    { step: "PROPOSAL", app: "DISCOVER" },
    { step: "CONTRACT", app: "MONEY" },
    { step: "PROJECT", app: "DELIVER" },
    { step: "PLAN", app: "DELIVER" },
    { step: "RESOURCE", app: "PEOPLE" },
    { step: "BUILD", app: "DELIVER" },
    { step: "TEST", app: "DELIVER" },
    { step: "RELEASE", app: "DELIVER" },
    { step: "BILL", app: "MONEY" },
    { step: "SUPPORT", app: "SERVE" },
    { step: "SUCCESS", app: "SERVE" },
    { step: "RENEW", app: "GROW" }
  ];

  return (
    <section className="py-24 px-6 bg-indigo-950/20 border-t border-slate-900 text-center overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          FROM FIRST CONVERSATION<br />TO LONG-TERM CUSTOMER.
        </h2>

        <div className="relative">
          {/* We'll use a flex wrap to show the journey */}
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {stages.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center group relative cursor-default">
                  <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white mb-2 z-10 hover:border-indigo-500 transition-colors">
                    {s.step}
                  </div>
                  {/* Tooltip showing which app handles it */}
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[10px] font-black tracking-widest text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded">
                    {s.app}
                  </div>
                </div>
                {i < stages.length - 1 && (
                  <ArrowDown size={14} className="text-slate-600 -rotate-90 md:rotate-0" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-sm font-bold text-slate-400 max-w-2xl mx-auto">
            Information does not disappear at each handoff. It flows continuously through one unified operating layer.
          </div>
        </div>
      </div>
    </section>
  );
}

export function AIWorkerLayerSection() {
  const workers = [
    { name: "RESEARCH ASSISTANT", desc: "Researches industries, companies, markets, decision makers and potential leads." },
    { name: "AI VOICE SALES AGENT", desc: "Calls leads, qualifies prospects, captures outcomes and updates the sales process." },
    { name: "BDE COPILOT", desc: "Listens during live conversations and provides contextual assistance, suggested questions and relevant information." },
    { name: "BA / PM COPILOT", desc: "Analyzes calls, emails and documents and creates structured business documentation." },
    { name: "DESIGN AGENT", desc: "Transforms approved requirements and business processes into structured UI/UX specifications and prompts for design tools." },
    { name: "ENGINEERING AGENT", desc: "Assists developers with implementation, code generation, testing and repository workflows." },
    { name: "QA AGENT", desc: "Assists with test scenarios, test cases, regression analysis and quality checks." },
    { name: "DEVOPS AGENT", desc: "Assists CI/CD, infrastructure, deployment, monitoring and operational workflows." },
    { name: "CUSTOMER AGENT", desc: "Understands the customer's project context and answers questions or raises issues." },
    { name: "MANAGEMENT AGENT", desc: "Analyzes business performance and highlights risks, opportunities and recommended actions." }
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase">
          AI WORKERS FOR EVERY<br />STAGE OF THE BUSINESS.
        </h2>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-16">
          ONIT does not treat AI as a chatbot sitting on the side. AI workers operate inside your business workflows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-left">
          {workers.map((w, i) => (
            <motion.div 
              key={w.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-indigo-950/20 border border-indigo-500/20 p-6 rounded-xl hover:bg-indigo-900/30 transition-colors"
            >
              <div className="text-xs font-black tracking-widest text-indigo-400 mb-4">{w.name}</div>
              <p className="text-sm text-slate-300 leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
