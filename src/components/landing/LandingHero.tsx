import { motion } from "framer-motion";
import { ArrowRight, Database, Workflow, Cloud, Layout, CheckCircle2, X } from "lucide-react";

export function HeroSection({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-screen text-center">
      {/* Background styling */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-1.5 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold tracking-widest uppercase"
        >
          AI-Native IT Business Operating System
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight"
        >
          ONE PLATFORM.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            EVERY IT NEED.
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 max-w-3xl mb-10 leading-relaxed"
        >
          ONIT connects sales, discovery, requirements, projects, people, financials and customer service while AI workers automate the repetitive work between them.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button 
            onClick={() => onNavigate("auth")}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            REQUEST A DEMO <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById("platform");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-lg transition-colors"
          >
            EXPLORE THE PLATFORM
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-12"
        >
          MODULAR. CONNECTED. AI-NATIVE.
        </motion.div>
        
        {/* Animated Ecosystem */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] sm:h-[500px] flex items-center justify-center">
          {/* Center ONIT Logo */}
          <div className="absolute z-20 w-32 h-32 rounded-2xl bg-indigo-600 shadow-[0_0_50px_rgba(79,70,229,0.5)] flex flex-col items-center justify-center text-white font-black text-3xl tracking-tighter">
            ON<span className="text-cyan-300">IT</span>
          </div>

          {/* Orbits */}
          <div className="absolute inset-0 border border-slate-700/50 rounded-full animate-[spin_40s_linear_infinite]"></div>
          <div className="absolute inset-8 border border-slate-700/50 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
          
          {/* Interactive Nodes */}
          <EcosystemNode label="GROW" detail="Lead → Opportunity → Customer" angle={0} />
          <EcosystemNode label="DISCOVER" detail="Discovery → Requirements → Solution → Proposal" angle={60} />
          <EcosystemNode label="DELIVER" detail="Plan → Build → Test → Release" angle={120} />
          <EcosystemNode label="PEOPLE" detail="Skills → Capacity → Allocation → Utilization" angle={180} />
          <EcosystemNode label="MONEY" detail="Budget → Cost → Revenue → Margin" angle={240} />
          <EcosystemNode label="SERVE" detail="Support → Success → Renewal" angle={300} />
        </div>
      </div>
    </section>
  );
}

function EcosystemNode({ label, detail, angle }: { label: string, detail: string, angle: number }) {
  const radius = 200; // Adjust based on screen size in real implementation
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  return (
    <motion.div 
      className="absolute group z-30"
      style={{ x, y }}
    >
      <div className="relative flex flex-col items-center justify-center w-20 h-20 bg-slate-800 border border-slate-600 rounded-full cursor-pointer hover:bg-slate-700 hover:border-indigo-500 transition-all">
        <span className="text-[10px] font-bold text-slate-300 tracking-widest">{label}</span>
        
        <div className="absolute w-48 p-3 -top-16 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 pointer-events-none transition-all duration-300 bg-slate-900 border border-indigo-500/50 rounded-lg shadow-xl z-50 text-center">
          <span className="text-xs text-indigo-300 font-semibold">{detail}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function RealityTodaySection() {
  return (
    <section className="py-24 px-6 bg-slate-950 text-center border-y border-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase">
          YOUR IT BUSINESS RUNS ON DOZENS OF TOOLS.
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
          Every team has a system. Every system has information. But the business context gets lost between them.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 text-left">
          <ToolCard step="Lead" tool="CRM" />
          <ToolCard step="Requirements" tool="Word / Confluence" />
          <ToolCard step="Project" tool="Jira / DevOps" />
          <ToolCard step="Design" tool="Figma" />
          <ToolCard step="Development" tool="GitHub" />
          <ToolCard step="Testing" tool="QA tools" />
          <ToolCard step="Deployment" tool="Cloud" />
          <ToolCard step="Finance" tool="ERP" />
          <ToolCard step="Support" tool="ITSM" />
        </div>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">The Cost of Fragmentation</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left">
            <PainPoint text="Re-entering information" />
            <PainPoint text="Repeated documentation" />
            <PainPoint text="Manual handoffs" />
            <PainPoint text="Lost context" />
            <PainPoint text="Duplicate data" />
            <PainPoint text="Slow decision-making" />
            <PainPoint text="Poor traceability" />
            <PainPoint text="Limited visibility" />
            <PainPoint text="Resource inefficiency" />
            <PainPoint text="Margin leakage" />
            <PainPoint text="Customer support friction" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ step, tool }: { step: string, tool: string }) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
      <span className="text-xs font-semibold text-slate-500 uppercase">{step}</span>
      <ArrowRight size={14} className="text-slate-600" />
      <span className="text-sm font-bold text-slate-200">{tool}</span>
    </div>
  );
}

function PainPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-400 text-sm">
      <X size={14} className="text-red-500 flex-shrink-0" /> {text}
    </div>
  );
}

export function OnitDifferenceSection() {
  return (
    <section className="py-24 px-6 bg-slate-900 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          WHAT IF ALL OF IT CONNECTED?
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center mb-16">
          <div className="flex-1 bg-slate-950 p-8 rounded-2xl border border-slate-800 text-left opacity-70">
            <div className="text-xs font-black tracking-widest text-slate-500 mb-6 uppercase">Before</div>
            <FlowItem text="Multiple systems" bad />
            <FlowItem text="Manual handoffs" bad />
            <FlowItem text="Disconnected context" bad />
            <FlowItem text="Repeated work" bad />
            <FlowItem text="Delayed decisions" bad isLast />
          </div>

          <div className="flex-1 bg-indigo-900/20 p-8 rounded-2xl border border-indigo-500/30 text-left">
            <div className="text-xs font-black tracking-widest text-indigo-400 mb-6 uppercase">After ONIT</div>
            <FlowItem text="Connected systems" />
            <FlowItem text="Unified business context" />
            <FlowItem text="Automated workflows" />
            <FlowItem text="AI assistance" />
            <FlowItem text="Real-time intelligence" />
            <FlowItem text="Human-controlled decisions" isLast />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-300">
          DON'T REPLACE EVERYTHING.<br />
          <span className="text-white">CONNECT WHAT ALREADY WORKS.</span>
        </h3>
      </div>
    </section>
  );
}

function FlowItem({ text, bad = false, isLast = false }: { text: string, bad?: boolean, isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center sm:items-start">
      <div className={`text-sm font-bold px-4 py-2 rounded-lg w-full ${bad ? 'bg-slate-900 text-slate-400' : 'bg-indigo-900/50 text-indigo-200 border border-indigo-500/30'}`}>
        {text}
      </div>
      {!isLast && <div className="h-6 w-px bg-slate-700 my-1 ml-6 hidden sm:block"></div>}
      {!isLast && <div className="h-4 w-px bg-slate-700 my-1 mx-auto sm:hidden"></div>}
    </div>
  );
}
