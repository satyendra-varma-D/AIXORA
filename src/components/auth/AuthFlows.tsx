import { useState } from "react";
import { Search, ArrowRight, Building2, CheckCircle2 } from "lucide-react";

export function WorkspaceSelector({ onSelect, onBack }: any) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const workspaces = [
    { id: "w1", name: "ACME TECHNOLOGIES", type: "Enterprise Workspace", lastAccessed: "Today", env: "Production" },
    { id: "w2", name: "NOVA DIGITAL", type: "Development Workspace", lastAccessed: "2 days ago", env: "Sandbox" }
  ];

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 600); // Simulate loading transition
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-2 uppercase">Select your workspace</h1>
        <p className="text-sm text-slate-400 font-medium">Choose the workspace you want to continue to.</p>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search workspaces..."
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-4">
        {workspaces.filter(w => w.name.toLowerCase().includes(search.toLowerCase())).map(w => (
          <div 
            key={w.id}
            onClick={() => handleSelect(w.id)}
            className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
              selected === w.id 
                ? 'bg-indigo-600 border-indigo-500' 
                : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50'
            }`}
          >
            {selected === w.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-600 z-10 animate-in fade-in duration-300">
                <span className="text-white font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Opening Workspace...
                </span>
              </div>
            )}
            
            <div className={`flex items-start justify-between ${selected === w.id ? 'opacity-0' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-slate-950 flex items-center justify-center border border-slate-800 shadow-sm">
                  <Building2 size={20} className="text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{w.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-indigo-400">{w.type}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500">Last accessed: {w.lastAccessed}</span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${
                w.env === 'Production' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                {w.env}
              </div>
            </div>

            <div className={`mt-4 flex items-center justify-between text-xs font-bold ${selected === w.id ? 'opacity-0' : 'text-slate-400'}`}>
              <span className="group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                OPEN WORKSPACE <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={onBack} className="mt-8 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors py-2 block text-center w-full">
        Sign in as a different user
      </button>
    </div>
  );
}

export function OnboardingFlow({ onComplete }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(onComplete, 1200);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Welcome to ONIT.</h1>
        <p className="text-sm text-slate-400 font-medium">Let's get your workspace ready.</p>
      </div>

      {step === 1 && (
        <div className="animate-in slide-in-from-right-4">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Step 1: What best describes your role?</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {["CEO / Executive", "Sales", "Business Analyst", "Project Manager", "Engineering", "Resource Management", "Finance", "Customer Success"].map(role => (
              <button key={role} onClick={handleNext} className="p-3 bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-lg text-sm text-slate-300 font-medium text-left transition-colors">
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in slide-in-from-right-4">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Step 2: What would you like to start with?</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {["GROW", "DISCOVER", "DELIVER", "PEOPLE", "MONEY", "SERVE"].map(mod => (
              <button key={mod} onClick={handleNext} className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-500/10 rounded-lg flex items-center justify-center text-sm text-white font-bold tracking-widest uppercase transition-colors">
                {mod}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in slide-in-from-right-4">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Step 3: Connect your tools (Optional)</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {["Salesforce", "Jira", "GitHub", "Figma", "Slack"].map(tool => (
              <button key={tool} className="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-sm text-slate-300 font-medium flex items-center justify-between group transition-colors">
                {tool}
                <div className="w-5 h-5 rounded-full border border-slate-700 group-hover:border-indigo-500 flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-slate-900 opacity-0" />
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            <button onClick={handleNext} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center">
              {loading ? "Preparing Workspace..." : "ENTER ONIT"}
            </button>
          </div>
          {!loading && (
            <button onClick={handleNext} className="w-full mt-4 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors">
              Skip for now
            </button>
          )}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-8">
        <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
        <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
        <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-indigo-500' : 'bg-slate-800'}`}></div>
      </div>
    </div>
  );
}
