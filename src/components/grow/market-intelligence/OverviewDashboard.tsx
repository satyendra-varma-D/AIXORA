import React from 'react';
import { TargetAccount, Signal } from '../../../services/db';
import { accountIntelligenceService } from '../../../services/accountIntelligenceService';
import { signalService } from '../../../services/signalService';
import { BarChart2, Users, Search, Target, CheckCircle2, ChevronRight, Activity, TrendingUp } from 'lucide-react';

export const OverviewDashboard: React.FC<{
  onNavigate: (view: string) => void;
}> = ({ onNavigate }) => {
  const accounts = accountIntelligenceService.getAllAccounts();
  const signals = signalService.getAllSignals();

  const kpis = [
    { label: "Target Accounts", value: accounts.length, icon: <Target className="w-5 h-5" />, view: "accounts", color: "text-blue-500" },
    { label: "High Priority", value: accounts.filter(a => a.priority === 'HIGH').length, icon: <Activity className="w-5 h-5" />, view: "accounts", color: "text-rose-500" },
    { label: "New Signals", value: signals.filter(s => s.status === 'NEW' || s.status === 'VALIDATED').length, icon: <TrendingUp className="w-5 h-5" />, view: "signals", color: "text-emerald-500" },
    { label: "Needs Review", value: accounts.filter(a => a.status === 'UNDER REVIEW').length, icon: <CheckCircle2 className="w-5 h-5" />, view: "review", color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Market Intelligence</h1>
        <p className="mt-2 text-sm text-slate-400">
          Discover the right markets, identify high-value accounts, understand buying signals, and tell Sales where to focus.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="flex gap-4">
        <button 
          onClick={() => onNavigate("discover")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md hover:bg-emerald-500/20 transition-colors"
        >
          <Search className="w-4 h-4" />
          Discover Accounts
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div 
            key={idx} 
            onClick={() => onNavigate(kpi.view)}
            className="p-5 bg-slate-900 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-slate-800 ${kpi.color}`}>
                {kpi.icon}
              </div>
              <span className="text-2xl font-semibold text-slate-100">{kpi.value}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-400">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Intelligence Funnel */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-slate-100 mb-4">Intelligence Funnel</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-px bg-slate-800 -z-10" />
            
            {[
              { step: 'Accounts Discovered', value: 1420 },
              { step: 'ICP Matches', value: 385 },
              { step: 'Validated Accounts', value: 112 },
              { step: 'Sales-Ready', value: 45 },
              { step: 'Leads Activated', value: 18 }
            ].map((stage, idx) => (
              <div key={idx} className="flex flex-col items-center bg-slate-900 px-4">
                <div className="w-12 h-12 rounded-full border-2 border-slate-700 bg-slate-800 flex items-center justify-center text-slate-200 font-semibold shadow-lg">
                  {stage.value}
                </div>
                <span className="mt-3 text-xs font-medium text-slate-400 uppercase tracking-wider text-center w-24">
                  {stage.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity / Recommendations could go here */}
      <div className="mt-8 p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-emerald-500/20 rounded-full text-emerald-400 mt-1">
            <SparklesIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-wider">AI Recommendation</h3>
            <p className="text-slate-200 mt-1">
              <strong>12 accounts</strong> became high priority this week. <br/>
              Astra International has 2 new transformation signals.
            </p>
            <button 
              onClick={() => onNavigate("accounts")}
              className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center"
            >
              Review High Priority Accounts <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lucide React doesn't export Sparkles directly if we just imported above, so let's make sure it's valid:
import { Sparkles as SparklesIcon } from 'lucide-react';
