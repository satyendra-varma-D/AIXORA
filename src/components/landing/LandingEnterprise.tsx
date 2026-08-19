import { motion } from "framer-motion";
import { ArrowDown, Check, LayoutDashboard } from "lucide-react";

export function ExistingToolsSection() {
  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase">
          YOUR TOOLS CAN STAY.<br />
          <span className="text-indigo-400">NO RIP-AND-REPLACE REQUIRED.</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
          ONIT is designed to work with the systems your organization already depends on.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-left">
          <IntegrationCategory title="CRM" tools={["Salesforce", "HubSpot"]} />
          <IntegrationCategory title="Project" tools={["Jira", "Azure DevOps"]} />
          <IntegrationCategory title="Design" tools={["Figma", "Miro"]} />
          <IntegrationCategory title="Engineering" tools={["GitHub", "GitLab"]} />
          <IntegrationCategory title="Communication" tools={["Slack", "Microsoft Teams"]} />
          <IntegrationCategory title="Finance" tools={["SAP", "Oracle", "NetSuite", "Tally"]} />
          <IntegrationCategory title="ITSM" tools={["ServiceNow"]} />
          <IntegrationCategory title="Cloud" tools={["AWS", "Azure", "Google Cloud"]} />
        </div>

        <div className="flex flex-col items-center">
          <div className="px-6 py-2 bg-slate-800 rounded-lg text-xs font-bold text-slate-400 border border-slate-700">EXISTING SYSTEMS</div>
          <ArrowDown className="text-slate-600 my-2" size={16} />
          <div className="px-6 py-2 bg-indigo-900/30 rounded-lg text-xs font-bold text-indigo-300 border border-indigo-500/30">ONIT INTEGRATION HUB</div>
          <ArrowDown className="text-slate-600 my-2" size={16} />
          <div className="px-6 py-2 bg-indigo-600 rounded-lg text-xs font-bold text-white shadow-lg">UNIFIED BUSINESS CONTEXT</div>
          <ArrowDown className="text-slate-600 my-2" size={16} />
          <div className="flex gap-4">
            <div className="px-6 py-2 bg-slate-900 rounded-lg text-xs font-bold text-slate-300 border border-slate-700">ONIT APPLICATIONS</div>
            <div className="px-6 py-2 bg-slate-900 rounded-lg text-xs font-bold text-slate-300 border border-slate-700">AI WORKERS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegrationCategory({ title, tools }: { title: string, tools: string[] }) {
  return (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-widest">{title}</div>
      <div className="flex flex-col gap-2">
        {tools.map(t => (
          <div key={t} className="text-sm font-bold text-slate-300">{t}</div>
        ))}
      </div>
    </div>
  );
}

export function ModularAdoptionSection() {
  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase">
          START SMALL.<br />
          <span className="text-indigo-400">SCALE WITHOUT REBUILDING.</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16 font-bold tracking-widest uppercase">
          YOUR BUSINESS. YOUR STACK. YOUR PACE.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdoptionCard 
            title="Already using Salesforce?" 
            use={["DISCOVER", "DELIVER", "PEOPLE", "MONEY", "SERVE"]} 
          />
          <AdoptionCard 
            title="Already using Jira?" 
            use={["GROW", "DISCOVER", "PEOPLE", "MONEY", "SERVE"]} 
          />
          <AdoptionCard 
            title="Need only AI Research?" 
            use={["RESEARCH ASSISTANT"]} 
          />
          <AdoptionCard 
            title="Need customer support automation?" 
            use={["CUSTOMER AGENT"]} 
          />
          <AdoptionCard 
            title="Want the complete operating layer?" 
            use={["GROW + DISCOVER + DELIVER + PEOPLE + MONEY + SERVE"]} 
            isHighlight
          />
        </div>
      </div>
    </section>
  );
}

function AdoptionCard({ title, use, isHighlight = false }: { title: string, use: string[], isHighlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border text-left flex flex-col justify-between ${isHighlight ? 'bg-indigo-900/20 border-indigo-500/40 md:col-span-2' : 'bg-slate-900 border-slate-800'}`}>
      <div className="text-sm font-bold text-slate-300 mb-4">{title}</div>
      <div>
        <div className="text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">Start With</div>
        <div className="flex flex-wrap gap-2">
          {use.map(u => (
            <span key={u} className="px-3 py-1 bg-slate-950 border border-slate-700 rounded text-xs font-bold text-indigo-400">{u}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const items = [
    { b: "Manual lead research", a: "AI-assisted research" },
    { b: "Disconnected CRM", a: "Connected customer context" },
    { b: "Manual call notes", a: "AI call intelligence" },
    { b: "Manual requirements", a: "AI-assisted documentation" },
    { b: "Repeated documentation", a: "Continuous traceability" },
    { b: "Disconnected design", a: "Requirements-driven design" },
    { b: "Requirement interpretation gaps", a: "Connected delivery context" },
    { b: "Manual project coordination", a: "AI-assisted project intelligence" },
    { b: "Limited resource visibility", a: "Real-time capacity visibility" },
    { b: "Financial surprises", a: "Margin intelligence" },
    { b: "Reactive support", a: "Context-aware customer support" }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          SEE THE DIFFERENCE.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
            <div className="text-xl font-black text-slate-500 mb-8 uppercase tracking-widest">Before ONIT</div>
            <div className="flex flex-col gap-4 text-left">
              {items.map(i => (
                <div key={i.b} className="text-sm text-slate-400 pb-4 border-b border-slate-900 last:border-0">{i.b}</div>
              ))}
            </div>
          </div>
          <div className="bg-indigo-900/10 p-8 rounded-2xl border border-indigo-500/20 shadow-[inset_0_0_50px_rgba(79,70,229,0.05)]">
            <div className="text-xl font-black text-indigo-400 mb-8 uppercase tracking-widest">After ONIT</div>
            <div className="flex flex-col gap-4 text-left">
              {items.map(i => (
                <div key={i.a} className="text-sm font-bold text-white flex items-center gap-2 pb-4 border-b border-indigo-500/10 last:border-0">
                  <Check size={14} className="text-teal-500" /> {i.a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BusinessOutcomesSection() {
  const outcomes = [
    { title: "SALES", items: ["Better lead quality", "Faster qualification", "Better sales productivity"] },
    { title: "DISCOVERY", items: ["Faster requirements", "Better documentation", "Better scope clarity"] },
    { title: "DELIVERY", items: ["Better predictability", "Earlier risk detection", "Better quality"] },
    { title: "PEOPLE", items: ["Better utilization", "Faster staffing", "Better workforce visibility"] },
    { title: "MONEY", items: ["Better margin control", "Better forecasting", "Better billing visibility"] },
    { title: "CUSTOMERS", items: ["Faster support", "Better experience", "Higher retention", "Expansion opportunities"] }
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase">
          THE GOAL ISN'T MORE SOFTWARE.<br />
          <span className="text-indigo-400">THE GOAL IS A BETTER IT BUSINESS.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {outcomes.map(o => (
            <div key={o.title} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-left">
              <div className="text-lg font-black text-white mb-4 uppercase">{o.title}</div>
              <ul className="flex flex-col gap-3">
                {o.items.map(i => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <Check size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExecutiveControlTowerSection() {
  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          SEE THE BUSINESS.<br />
          <span className="text-indigo-400">NOT JUST THE TASKS.</span>
        </h2>

        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl text-left">
          <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center gap-3">
            <LayoutDashboard className="text-indigo-400" size={20} />
            <div className="text-sm font-bold text-white tracking-widest uppercase">Executive Control Tower</div>
          </div>
          
          <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricBox label="Revenue" value="$12.4M" />
            <MetricBox label="Pipeline" value="$4.2M" />
            <MetricBox label="Margin at Risk" value="$180K" bad />
            <MetricBox label="Resource Utilization" value="86%" />
            <MetricBox label="Projects at Risk" value="7" bad />
            <MetricBox label="CSAT" value="4.8/5" />
            <MetricBox label="Pending Approvals" value="12" />
            <MetricBox label="AI Automation" value="42%" />
          </div>

          <div className="p-8 bg-slate-900 border-t border-slate-800">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">U</div>
                <div className="bg-slate-800 p-4 rounded-xl rounded-tl-none text-sm text-white">
                  "Which projects are likely to miss their deadlines?"
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">AI</div>
                <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-xl rounded-tr-none text-sm text-indigo-100 flex flex-col gap-3">
                  <p className="font-bold">"7 projects show schedule risk."</p>
                  <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                    <div className="text-xs font-bold text-white">Project Alpha (Red)</div>
                    <div className="text-xs text-slate-400 mt-1">Reason: Key database engineer on PTO.</div>
                    <div className="text-xs text-indigo-400 mt-1 font-semibold">Recommended Action: Reassign task to Engineer Beta.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricBox({ label, value, bad = false }: { label: string, value: string, bad?: boolean }) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
      <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-2">{label}</div>
      <div className={`text-2xl font-black ${bad ? 'text-red-400' : 'text-white'}`}>{value}</div>
    </div>
  );
}
