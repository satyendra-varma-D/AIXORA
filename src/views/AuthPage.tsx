import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../imports/api";
import { AuthLayout } from "../components/auth/AuthLayout";
import { SignInForm, SSOForm, ForgotPasswordForm, MFAForm } from "../components/auth/AuthForms";
import { WorkspaceSelector, OnboardingFlow } from "../components/auth/AuthFlows";

type AuthMode = "login" | "sso" | "forgot" | "mfa" | "workspace" | "onboarding";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Standard Email/Password Login
  const handleLogin = async (e: string, p: string) => {
    setError("");
    setLoading(true);
    try {
      const data = await api.auth.login(e, p);
      setLoading(false);
      if (data.requiresMFA) {
        setMode("mfa");
      } else {
        checkWorkspacesAndOnboarding();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Invalid credentials.");
    }
  };

  // Enterprise SSO
  const handleSSO = async (domain: string) => {
    setError("");
    setLoading(true);
    // Simulate SSO Provider Redirect
    setTimeout(() => {
      setLoading(false);
      checkWorkspacesAndOnboarding();
    }, 1500);
  };

  // Forgot Password
  const handleForgot = async (e: string) => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForgotSuccess(true);
    }, 1000);
  };

  // MFA
  const handleMFA = async (code: string) => {
    setError("");
    setLoading(true);
    try {
      await api.auth.verifyMfa(email, code);
      setLoading(false);
      checkWorkspacesAndOnboarding();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "MFA validation failed.");
    }
  };

  // Check workspaces and onboarding
  const checkWorkspacesAndOnboarding = () => {
    // In a real app, this logic comes from the user profile data.
    // Simulating a scenario where user has multiple workspaces:
    setMode("workspace");
  };

  const handleWorkspaceSelected = (id: string) => {
    // Simulate checking if this is first login to this workspace
    // Let's assume w1 is existing, w2 is new
    if (id === "w2") {
      setMode("onboarding");
    } else {
      navigate("/hub");
    }
  };

  const handleOnboardingComplete = () => {
    navigate("/hub");
  };

  return (
    <AuthLayout>
      {mode === "login" && (
        <SignInForm 
          email={email}
          setEmail={setEmail}
          onSubmit={handleLogin}
          onForgot={() => setMode("forgot")}
          onSSO={() => setMode("sso")}
          loading={loading}
          error={error}
        />
      )}

      {mode === "sso" && (
        <SSOForm 
          defaultEmail={email}
          onSubmit={handleSSO}
          onBack={() => setMode("login")}
          loading={loading}
          error={error}
        />
      )}

      {mode === "forgot" && (
        <ForgotPasswordForm 
          onSubmit={handleForgot}
          onBack={() => { setMode("login"); setForgotSuccess(false); }}
          loading={loading}
          error={error}
          success={forgotSuccess}
        />
      )}

      {mode === "mfa" && (
        <MFAForm 
          onSubmit={handleMFA}
          onBack={() => setMode("login")}
          loading={loading}
          error={error}
        />
      )}

      {mode === "workspace" && (
        <WorkspaceSelector 
          onSelect={handleWorkspaceSelected}
          onBack={() => setMode("login")}
        />
      )}

      {mode === "onboarding" && (
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
        />
      )}
    </AuthLayout>
  );
}
