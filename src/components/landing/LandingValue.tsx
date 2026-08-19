import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, Eye, Building2 } from "lucide-react";

export function TargetAudienceSection() {
  const targets = [
    "IT Services Companies", "Software Development Companies", "Digital Agencies", "Consulting Firms",
    "System Integrators", "SaaS Companies", "Managed Service Providers", "ERP Implementation Companies",
    "Cloud Service Providers", "Technology Consulting Companies"
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          BUILT FOR MODERN IT BUSINESSES.
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {targets.map(t => (
            <div key={t} className="bg-slate-900 border border-slate-800 px-6 py-4 rounded-xl flex items-center gap-3">
              <Building2 size={16} className="text-indigo-400" />
              <span className="text-sm font-bold text-slate-300">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RoleBasedValueSection() {
  const roles = [
    { role: "CEO", value: "See the entire business." },
    { role: "SALES HEAD", value: "Manage pipeline and sales intelligence." },
    { role: "BUSINESS ANALYST", value: "Turn conversations into requirements faster." },
    { role: "PROJECT MANAGER", value: "Control projects, risks, resources and delivery." },
    { role: "ENGINEERING HEAD", value: "Connect requirements, development and quality." },
    { role: "RESOURCE MANAGER", value: "Balance demand, capacity and utilization." },
    { role: "FINANCE", value: "Understand project economics and profitability." },
    { role: "CUSTOMER SUCCESS", value: "Understand customer health and support." },
    { role: "CUSTOMER", value: "Get answers, status and support." }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          ONE PLATFORM.<br />
          <span className="text-indigo-400">EVERY TEAM.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {roles.map(r => (
            <div key={r.role} className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-left">
              <div className="text-[10px] font-black tracking-widest text-indigo-400 mb-2 uppercase">{r.role}</div>
              <div className="text-sm font-bold text-white">{r.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SecurityGovernanceSection() {
  const items = [
    "Role-based access", "Permission management", "Tenant isolation", "Audit trails",
    "AI action logs", "Human approvals", "Integration security", "Data governance",
    "Environment controls", "Deployment governance"
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          AI WITH ENTERPRISE CONTROL.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map(i => (
            <div key={i} className="flex flex-col items-center gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800">
              <ShieldCheck size={20} className="text-indigo-400" />
              <div className="text-[10px] font-bold text-slate-300 uppercase text-center">{i}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTASection({ onNavigate }: { onNavigate: (v: string) => void }) {
  return (
    <section className="py-32 px-6 bg-indigo-950 border-t border-indigo-900 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/50 via-slate-950 to-slate-950 z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase">
          YOUR IT BUSINESS IS ALREADY CONNECTED BY PEOPLE.<br />
          <span className="text-indigo-400">NOW CONNECT IT BY SYSTEM.</span>
        </h2>
        
        <p className="text-xl text-slate-300 mb-12">
          Bring your teams, tools, workflows and AI together with ONIT.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button 
            onClick={() => onNavigate("auth")}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            REQUEST A DEMO <ArrowRight size={18} />
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-lg transition-colors"
          >
            EXPLORE ONIT
          </button>
        </div>

        <div className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
          ONE PLATFORM FOR EVERY IT NEED.
        </div>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="py-12 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="text-2xl font-black text-white tracking-tighter mb-2">ON<span className="text-cyan-300">IT</span></div>
          <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">One Platform for Every IT Need</div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold text-slate-400">
          <span className="hover:text-white cursor-pointer">Platform</span>
          <span className="hover:text-white cursor-pointer">Applications</span>
          <span className="hover:text-white cursor-pointer">AI Workers</span>
          <span className="hover:text-white cursor-pointer">Integrations</span>
          <span className="hover:text-white cursor-pointer">Resources</span>
          <span className="hover:text-white cursor-pointer">Company</span>
        </div>

        <div className="flex gap-6 text-xs text-slate-600">
          <span className="hover:text-slate-400 cursor-pointer">Contact</span>
          <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms</span>
          <span className="hover:text-slate-400 cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
}
