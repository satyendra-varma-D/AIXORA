import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";

export function WorkflowExampleSection() {
  const steps = [
    "CUSTOMER CALL", "AI TRANSCRIPTION", "AI ANALYSIS", "REQUIREMENTS", "BA REVIEW", "CUSTOMER APPROVAL", "DESIGN", "CUSTOMER APPROVAL", "ENGINEERING", "QA", "DEPLOYMENT", "CUSTOMER SUPPORT"
  ];

  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          ONE CUSTOMER CONVERSATION.<br />
          <span className="text-indigo-400">A COMPLETE DELIVERY PIPELINE.</span>
        </h2>

        <div className="relative py-12 flex flex-col items-center">
          {steps.map((step, i) => (
            <div key={`${step}-${i}`} className="flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`px-6 py-3 rounded-xl border font-bold text-sm z-10 w-64 ${
                  step.includes("REVIEW") || step.includes("APPROVAL") 
                    ? "bg-slate-800 text-white border-slate-600" 
                    : step.includes("AI") 
                      ? "bg-indigo-900/30 text-indigo-300 border-indigo-500/30"
                      : "bg-slate-950 text-slate-300 border-slate-700"
                }`}
              >
                {step}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="h-8 w-px bg-slate-700 my-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BAIntelligenceSection() {
  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          TURN EVERY CONVERSATION<br />INTO BUSINESS KNOWLEDGE.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Inputs */}
          <div className="md:col-span-1 flex flex-col gap-3">
            {["CALLS", "DOCUMENTS", "EMAILS", "RFPs", "MEETINGS", "CUSTOMER FILES"].map(i => (
              <div key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400">{i}</div>
            ))}
          </div>

          <div className="hidden md:flex justify-center text-slate-600"><ArrowDown className="-rotate-90" /></div>

          {/* AI Core */}
          <div className="md:col-span-1">
            <div className="w-full aspect-square bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-indigo-400">
              ONIT AI
            </div>
          </div>

          <div className="hidden md:flex justify-center text-slate-600"><ArrowDown className="-rotate-90" /></div>

          {/* Outputs */}
          <div className="md:col-span-1 flex flex-col gap-2">
            {["BUSINESS OBJECTIVES", "PAIN POINTS", "REQUIREMENTS", "BUSINESS RULES", "PROCESSES", "ASSUMPTIONS", "DEPENDENCIES", "SCOPE", "USER STORIES", "ACCEPTANCE CRITERIA", "TRACEABILITY"].map(o => (
              <div key={o} className="px-4 py-1.5 bg-indigo-900/10 border border-indigo-500/20 rounded-lg text-[10px] font-bold text-indigo-300 uppercase">{o}</div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <ArrowDown className="text-slate-600 mb-4" />
          <div className="px-6 py-2 bg-slate-800 border border-slate-600 rounded-full text-xs font-bold text-white mb-4">HUMAN REVIEW</div>
          <ArrowDown className="text-slate-600 mb-4" />
          <div className="px-8 py-3 bg-teal-900/30 border border-teal-500/50 rounded-xl text-sm font-bold text-teal-300 uppercase">APPROVED BUSINESS DOCUMENTS</div>
        </div>

        <div className="mt-12 flex justify-center gap-8 text-sm font-bold tracking-widest text-slate-300">
          <span>AI DRAFTS.</span>
          <span>PEOPLE VALIDATE.</span>
          <span>CUSTOMERS APPROVE.</span>
        </div>
      </div>
    </section>
  );
}

export function UnifiedContextSection() {
  return (
    <section className="py-24 px-6 bg-slate-900 border-t border-slate-800 text-center overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 uppercase">
          AI THAT KNOWS THE WHOLE STORY.
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">
          AI IS ONLY AS USEFUL AS THE CONTEXT BEHIND IT. ONIT CONNECTS THE CONTEXT.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {["CUSTOMER", "CONTACT", "OPPORTUNITY", "CONTRACT", "REQUIREMENTS", "SCOPE", "DESIGN", "PROJECT", "CODE", "TEST", "RELEASE", "INVOICE", "SUPPORT", "CUSTOMER SUCCESS"].map((item, i, arr) => (
             <div key={item} className="flex items-center gap-3">
               <span className="text-xs font-bold text-slate-500">{item}</span>
               {i < arr.length - 1 && <ArrowDown size={12} className="-rotate-90 text-slate-700" />}
             </div>
          ))}
        </div>

        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-left max-w-3xl mx-auto flex flex-col gap-6 relative">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-xs">C</div>
            <div className="bg-slate-800 p-4 rounded-xl rounded-tl-none text-sm text-white">
              "Can you add another approval level?"
            </div>
          </div>

          <div className="pl-12 flex flex-wrap gap-2 text-[10px] text-indigo-400 uppercase font-bold">
            <span>Checking Contract...</span>
            <span>Checking Scope...</span>
            <span>Checking Requirements...</span>
            <span>Checking Project Status...</span>
            <span>Checking Effort & Cost...</span>
          </div>

          <div className="flex gap-4 items-start flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 text-xs text-white font-bold">AI</div>
            <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-xl rounded-tr-none text-sm text-indigo-100 flex flex-col gap-2">
              <p>"This appears to be outside the approved scope."</p>
              <p className="font-bold">"Create a change request?"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HumanPlusAISection() {
  const steps = [
    { ai: "AI RESEARCH", hum: "HUMAN APPROVAL" },
    { ai: "AI SALES ASSISTANCE", hum: "BDE DECISION" },
    { ai: "AI REQUIREMENTS", hum: "BA REVIEW → CUSTOMER APPROVAL" },
    { ai: "AI DESIGN", hum: "PRODUCT REVIEW → CUSTOMER APPROVAL" },
    { ai: "AI CODE", hum: "ENGINEERING REVIEW" },
    { ai: "AI DEPLOYMENT", hum: "POLICY CHECK → AUTHORIZED APPROVAL" },
    { ai: "AI CUSTOMER SUPPORT", hum: "CONFIDENCE CHECK → HUMAN ESCALATION" }
  ];

  return (
    <section className="py-24 px-6 bg-slate-950 border-t border-slate-900 text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-16 uppercase">
          AI DOES THE HEAVY LIFTING.<br />
          <span className="text-indigo-400">PEOPLE KEEP THE CONTROL.</span>
        </h2>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex-1 text-right text-xs font-bold text-indigo-400 uppercase w-full sm:w-auto">{s.ai}</div>
              <ArrowDown className="-rotate-90 text-slate-600 hidden sm:block" size={16} />
              <ArrowDown className="text-slate-600 sm:hidden" size={16} />
              <div className="flex-1 text-left text-xs font-bold text-white uppercase w-full sm:w-auto flex items-center gap-2">
                <CheckCircle2 size={14} className="text-teal-500" /> {s.hum}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
