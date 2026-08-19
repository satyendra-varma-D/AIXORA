import React, { useState, useEffect } from 'react';
import { OverviewDashboard } from './OverviewDashboard';
import { DiscoverWizard } from './DiscoverWizard';
import { TargetAccountList } from './TargetAccountList';
import { SignalList } from './SignalList';
import { ChevronLeft } from 'lucide-react';

type ViewMode = 'overview' | 'discover' | 'accounts' | 'signals' | 'review' | 'detail';

export const MarketIntelligenceWorkspace: React.FC<{ subModule?: string, recordId?: string }> = ({ subModule, recordId }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');

  useEffect(() => {
    // We can map URL params to views if needed, for now use state
    if (subModule === 'discover') setCurrentView('discover');
    else if (subModule === 'accounts') setCurrentView('accounts');
    else if (subModule === 'signals') setCurrentView('signals');
    else setCurrentView('overview');
  }, [subModule]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Top contextual nav inside the module if not overview */}
      {currentView !== 'overview' && (
        <div className="h-14 min-h-[3.5rem] border-b border-slate-800 bg-slate-900/50 flex items-center px-4 shrink-0">
          <button 
            onClick={() => setCurrentView('overview')}
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-200"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Overview
          </button>
          
          <div className="ml-8 flex space-x-4">
            <button 
              onClick={() => setCurrentView('accounts')}
              className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${currentView === 'accounts' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              Priority Accounts
            </button>
            <button 
              onClick={() => setCurrentView('signals')}
              className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${currentView === 'signals' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              New Signals
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {currentView === 'overview' && (
          <OverviewDashboard onNavigate={(view) => setCurrentView(view as ViewMode)} />
        )}
        
        {currentView === 'discover' && (
          <DiscoverWizard 
            onComplete={() => setCurrentView('accounts')} 
            onCancel={() => setCurrentView('overview')} 
          />
        )}

        {currentView === 'accounts' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <TargetAccountList />
          </div>
        )}

        {currentView === 'signals' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <SignalList />
          </div>
        )}
      </div>
    </div>
  );
};
