import { 
  Home, Bot, Plug, Settings, 
  HelpCircle, User, Users, Crosshair,
  Search, Network, BarChart3, HeartHandshake
} from "lucide-react";
import type { View, AppModule } from "../../App";
import { CORE_APPS, mockEntitlements } from "./HubData";

interface Props {
  onNavigate: (v: View, app?: AppModule) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ onNavigate, activeTab, setActiveTab }: Props) {
  const NavItem = ({ label, icon: Icon, tabId, indent = false, isApp = false }: any) => {
    const isActive = activeTab === tabId;
    return (
      <button 
        onClick={() => {
          if (isApp) {
            onNavigate("app", tabId as AppModule);
          } else {
            setActiveTab(tabId);
          }
        }}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${indent ? 'ml-2 w-[calc(100%-8px)]' : ''} ${
          isActive 
            ? 'bg-indigo-600/10 text-indigo-400' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
        }`}
      >
        <Icon size={16} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
        {label}
      </button>
    );
  };

  const SectionHeader = ({ label }: { label: string }) => (
    <div className="px-3 py-2 mt-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">
      {label}
    </div>
  );

  // Dynamic applications based on user permissions & organization entitlements
  const visibleApps = CORE_APPS.filter(app => mockEntitlements.userPermissions.includes(app.id));

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/50 hidden md:flex flex-col h-[calc(100vh-56px)] sticky top-14 overflow-y-auto">
      <div className="p-3 flex-1">
        <NavItem label="Overview" icon={Home} tabId="BUSINESS" />
        
        <SectionHeader label="My Workspace" />
        <NavItem label="My Work" icon={Search} tabId="MY_WORK" indent />
        <NavItem label="Approvals" icon={Search} tabId="APPROVALS" indent />

        <SectionHeader label="Applications" />
        {visibleApps.map(app => (
          <NavItem key={app.id} label={app.name} icon={app.icon} tabId={app.id} isApp indent />
        ))}

        <SectionHeader label="AI Workers" />
        <NavItem label="AI Workspace" icon={Bot} tabId="AI WORKERS" />

        <SectionHeader label="Ecosystem" />
        <NavItem label="Connected Systems" icon={Plug} tabId="CONNECTED" />

        <SectionHeader label="Administration" />
        <NavItem label="Platform Settings" icon={Settings} tabId="PLATFORM" />
      </div>

      <div className="p-3 border-t border-slate-800 mt-auto">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
          <HelpCircle size={16} className="text-slate-500" />
          Help & Support
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
          <Settings size={16} className="text-slate-500" />
          Preferences
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
          <User size={16} className="text-slate-500" />
          Profile
        </button>
      </div>
    </aside>
  );
}
