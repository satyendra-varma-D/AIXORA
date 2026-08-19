import React, { useState } from "react";
import { ArrowLeft, MoreHorizontal, Clock, Activity } from "lucide-react";

interface DetailLayoutProps {
  title: string;
  status?: { label: string; colorClass: string };
  onBack?: () => void;
  tabs: string[];
  children: (activeTab: string) => React.ReactNode;
}

export function DetailLayout({ title, status, onBack, tabs, children }: DetailLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-col h-full bg-[#030712] text-white">
      {/* Header */}
      <div className="px-8 pt-8 pb-0 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-6">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors -ml-2">
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="flex items-center gap-3 flex-1">
            <h1 className="text-2xl font-black tracking-tight">{title}</h1>
            {status && (
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${status.colorClass}`}>
                {status.label}
              </span>
            )}
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-transparent">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab 
                  ? "border-indigo-500 text-indigo-400" 
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto flex gap-8">
        <div className="flex-1">
          {children(activeTab)}
        </div>
        
        {/* Universal Activity Sidebar for Detail Views */}
        <div className="w-80 shrink-0 border-l border-white/5 pl-8 hidden xl:block">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-widest mb-6">
            <Activity size={14} className="text-indigo-400" />
            Activity
          </div>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {/* Mock Timeline Item */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-[#030712] bg-indigo-500 shadow shrink-0 z-10 -ml-2" />
              <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02] ml-4 md:ml-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-sm text-slate-200">System</div>
                  <time className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock size={10} /> Just now
                  </time>
                </div>
                <div className="text-xs text-slate-400">Record viewed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
