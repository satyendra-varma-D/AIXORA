import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import AuthPage from "./views/AuthPage";
import AppHub from "./views/AppHub";
import DashboardLayout from "./views/DashboardLayout";
import { setSessionExpiredHandler } from "./imports/api";

export type View = "landing" | "auth" | "hub" | "app";
export type AppModule =
  | "grow"
  | "discover"
  | "deliver"
  | "people"
  | "money"
  | "serve";

export type Theme = "cosmic" | "emerald" | "frost" | "amethyst";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("onit-theme");
    return (saved as Theme) || "cosmic";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Set up global session expiration handler
  useEffect(() => {
    setSessionExpiredHandler(() => {
      navigate("/auth");
    });
  }, [navigate]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("onit-theme", t);
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("onit_jwt");
    if (!token) {
      return <Navigate to="/auth" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route 
        path="/hub" 
        element={
          <ProtectedRoute>
            <AppHub theme={theme} setTheme={setTheme} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/app/:appId/:moduleId/:recordId?" 
        element={
          <ProtectedRoute>
            <DashboardLayout theme={theme} setTheme={setTheme} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/app/:appId" 
        element={<Navigate to={`/app/${location.pathname.split('/')[2]}/dashboard`} replace />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
