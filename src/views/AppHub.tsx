import { useState } from "react";
import type { Theme } from "../App";
import { GlobalHeader } from "../components/hub/GlobalHeader";
import { HubDashboard } from "../components/hub/HubDashboard";

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export default function AppHub({ theme, setTheme }: Props) {
  // We no longer need activeTab since the Sidebar is gone and it's a single grid view,
  // but we can keep the state if we want to expand later.
  const [activeTab, setActiveTab] = useState("BUSINESS");

  return (
    <div className="flex h-screen bg-slate-950 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <GlobalHeader theme={theme} setTheme={setTheme} />
        
        {/* Main Content Area - Full Width */}
        <main className="flex-1 overflow-y-auto relative">
          <HubDashboard activeTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
