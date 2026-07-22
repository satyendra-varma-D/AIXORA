import { useState, useEffect } from "react";
import LandingPage from "./views/LandingPage";
import AuthPage from "./views/AuthPage";
import AppHub from "./views/AppHub";
import DashboardLayout from "./views/DashboardLayout";

export type View = "landing" | "auth" | "hub" | "app";
export type AppModule =
  | "market"
  | "crm"
  | "discovery"
  | "design"
  | "engineering"
  | "quality"
  | "success"
  | "knowledge"
  | "executive"
  | "admin";

export type Theme = "cosmic" | "emerald" | "frost" | "amethyst";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [activeApp, setActiveApp] = useState<AppModule>("market");
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("aixora-theme");
    return (saved as Theme) || "cosmic";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("aixora-theme", t);
  };

  const navigate = (v: View, app?: AppModule) => {
    setView(v);
    if (app) setActiveApp(app);
  };

  if (view === "landing") return <LandingPage onNavigate={navigate} theme={theme} setTheme={setTheme} />;
  if (view === "auth") return <AuthPage onNavigate={navigate} />;
  if (view === "hub") return <AppHub onNavigate={navigate} theme={theme} setTheme={setTheme} />;
  return (
    <DashboardLayout
      activeApp={activeApp}
      onNavigate={navigate}
      onSwitchApp={(app: AppModule) => setActiveApp(app)}
      theme={theme}
      setTheme={setTheme}
    />
  );
}
