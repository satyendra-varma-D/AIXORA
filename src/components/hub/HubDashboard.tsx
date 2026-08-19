import { useNavigate } from "react-router-dom";
import { CORE_APPS, mockEntitlements } from "./HubData";
import type { AppModule } from "../../App";

interface DashboardProps {
  activeTab: string; 
}

export function HubDashboard({ activeTab }: DashboardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      
      {/* Company Name Header (replaces ERP section) */}
      <div className="pt-8 px-6 md:px-12 lg:px-24">
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{mockEntitlements.organization}</h1>
        <div className="h-1 w-12 bg-indigo-500 mt-4 rounded-full"></div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 py-10 px-6 md:px-12 lg:px-24">
        
        {/* MY APPLICATIONS */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-xs font-black tracking-widest text-slate-500 uppercase mb-6">My Applications</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_APPS.filter(app => mockEntitlements.enabledApps.includes(app.id)).map((app) => (
              <div 
                key={app.id} 
                onClick={() => navigate(`/app/${app.id}/dashboard`)}
                className="bg-slate-900 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all border border-slate-800 hover:border-indigo-500/50 flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-500/10 text-indigo-400 uppercase tracking-wider border border-indigo-500/20">
                  Active
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: `${app.color}20`, color: app.color }}>
                    <app.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">ONIT</div>
                    <div className="text-lg font-black text-white leading-tight group-hover:text-indigo-400 transition-colors">{app.name}</div>
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {app.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* EXPLORE ONIT */}
        <div className="max-w-7xl mx-auto">
          <div className="text-xs font-black tracking-widest text-slate-500 uppercase mb-6">Explore ONIT</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-70">
            {CORE_APPS.filter(app => !mockEntitlements.enabledApps.includes(app.id)).map((app) => (
              <div 
                key={app.id} 
                className="bg-slate-900/50 rounded-xl p-6 shadow-sm border border-slate-800/50 flex flex-col group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-400 uppercase tracking-wider">
                  Available
                </div>
                <div className="flex items-center gap-4 mb-4 grayscale group-hover:grayscale-0 transition-all opacity-75">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: `${app.color}20`, color: app.color }}>
                    <app.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">ONIT</div>
                    <div className="text-lg font-black text-white leading-tight">{app.name}</div>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {app.desc}
                </p>

                <div className="mt-6">
                  <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider">
                    Request Access &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="py-6 text-center text-[10px] font-black tracking-widest text-slate-600 border-t border-slate-800 uppercase">
        Copyright 2026 © ONIT. All Rights Reserved.
      </div>

    </div>
  );
}
