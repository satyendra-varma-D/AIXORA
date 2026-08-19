import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface UniversalRecordDetailProps {
  title: string;
  subtitle?: string;
  statusBadge?: React.ReactNode;
  onBack: () => void;
  primaryActions?: { label: string; onClick: () => void; primary?: boolean }[];
  tabs: TabDef[];
}

export function UniversalRecordDetail({
  title,
  subtitle,
  statusBadge,
  onBack,
  primaryActions,
  tabs
}: UniversalRecordDetailProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const activeContent = tabs.find(t => t.id === activeTab)?.content;

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-slate-950">
      {/* Header */}
      <div className="shrink-0 px-8 py-6 border-b border-white/10 bg-slate-950/80 sticky top-0 z-10">
        
        {/* Breadcrumb / Back */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 cursor-pointer hover:text-white transition-colors w-fit" onClick={onBack}>
          <ArrowLeft size={14} />
          Back to List
        </div>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-black text-white tracking-tight">{title}</h1>
              {statusBadge}
            </div>
            {subtitle && <p className="text-sm text-slate-400 font-medium">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {primaryActions?.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors shadow-sm ${
                  action.primary 
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {action.label}
              </button>
            ))}
            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors border border-transparent hover:border-white/10">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mt-8 -mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8 relative">
        <div className="max-w-6xl">
          {activeContent}
        </div>
      </div>
    </div>
  );
}
