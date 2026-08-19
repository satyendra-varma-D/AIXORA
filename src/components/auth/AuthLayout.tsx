import { ReactNode } from "react";
import { Users, Search, Crosshair, Network, BarChart3, HeartHandshake, ArrowRight } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Mobile-only Header */}
      <div className="md:hidden flex items-center justify-between p-6 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-black text-xs tracking-tighter">
            ON
          </div>
          <span className="font-black text-sm text-white tracking-tighter">
            ON<span className="text-cyan-400">IT</span>
          </span>
        </div>
        <a href="#" className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Support</a>
      </div>

      {/* Left Panel: Brand Experience (Desktop Only) */}
      <div className="hidden md:flex w-[55%] bg-slate-950 relative flex-col border-r border-slate-900 overflow-hidden">
        
        {/* Subtle Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 p-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-lg shadow-indigo-500/20">
              ON
            </div>
            <div>
              <div className="font-black text-lg text-white tracking-tighter leading-none">
                ON<span className="text-cyan-400">IT</span>
              </div>
              <div className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">
                One Platform for Every IT Need
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center p-12 lg:p-20 max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-[1.1]">
            YOUR IT BUSINESS.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              ONE CONNECTED OPERATING LAYER.
            </span>
          </h1>
          <p className="text-lg text-slate-400 mb-16 max-w-lg leading-relaxed font-medium">
            Connect sales, discovery, delivery, people, financials and customer success — with AI working across the journey.
          </p>

          {/* Ecosystem Visual */}
          <div className="relative h-64 w-full max-w-lg">
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.2))' }}>
              <path d="M 40,40 L 220,120 L 400,40" stroke="rgba(99,102,241,0.2)" strokeWidth="2" fill="none" className="path-draw" />
              <path d="M 40,200 L 220,120 L 400,200" stroke="rgba(99,102,241,0.2)" strokeWidth="2" fill="none" className="path-draw" />
              <path d="M 40,40 L 40,200" stroke="rgba(99,102,241,0.2)" strokeWidth="2" fill="none" className="path-draw" />
              <path d="M 400,40 L 400,200" stroke="rgba(99,102,241,0.2)" strokeWidth="2" fill="none" className="path-draw" />
            </svg>
            
            {/* Nodes */}
            <Node icon={Users} label="GROW" color="indigo" x={40} y={40} />
            <Node icon={Search} label="DISCOVER" color="cyan" x={400} y={40} />
            <Node icon={Crosshair} label="DELIVER" color="emerald" x={220} y={120} center />
            <Node icon={Network} label="PEOPLE" color="amber" x={40} y={200} />
            <Node icon={HeartHandshake} label="SERVE" color="pink" x={400} y={200} />
          </div>
        </div>

      </div>

      {/* Right Panel: Authentication (Desktop) / Main (Mobile) */}
      <div className="w-full md:w-[45%] bg-slate-950 flex flex-col justify-center relative min-h-[calc(100vh-73px)] md:min-h-screen">
        
        {/* Help Link Desktop */}
        <div className="hidden md:block absolute top-10 right-10 z-10">
          <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5">
            Need help? <span className="text-indigo-400">Support</span>
          </button>
        </div>

        <div className="w-full max-w-[440px] mx-auto px-6 py-12 md:p-12 relative z-10">
          {children}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 text-[11px] font-bold text-slate-600 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
        </div>
      </div>

    </div>
  );
}

function Node({ icon: Icon, label, color, x, y, center = false }: any) {
  const colorMap: any = {
    indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    pink: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  };

  return (
    <div 
      className="absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: x, top: y }}
    >
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center backdrop-blur-md shadow-lg transition-transform duration-500 ${center ? 'w-16 h-16 border-slate-700 bg-slate-900 shadow-indigo-500/10' : colorMap[color]}`}>
        <Icon size={center ? 28 : 20} className={center ? 'text-white' : ''} />
      </div>
      <div className="text-[10px] font-black tracking-widest text-slate-400 uppercase opacity-70 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
    </div>
  );
}
