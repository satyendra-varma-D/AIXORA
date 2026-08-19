import { Search, ChevronDown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Theme } from "../../App";
import { api } from "../../imports/api";

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export function GlobalHeader({ theme, setTheme }: Props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.auth.logout();
    navigate("/");
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-20 flex-shrink-0 shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center p-0.5">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-black text-white uppercase tracking-widest">ONIT</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applications</span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-2xl mx-8 hidden md:block">
        <div className="relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Application" 
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:bg-slate-900 rounded-md pl-11 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="flex items-center gap-3 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-slate-700 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
            <User size={14} />
          </div>
          <ChevronDown size={14} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}
