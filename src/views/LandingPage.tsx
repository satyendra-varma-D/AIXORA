import { useNavigate } from "react-router-dom";
import { HeroSection, RealityTodaySection, OnitDifferenceSection } from "../components/landing/LandingHero";
import { OperatingModelSection, BusinessJourneySection, AIWorkerLayerSection } from "../components/landing/LandingPlatform";
import { WorkflowExampleSection, BAIntelligenceSection, UnifiedContextSection, HumanPlusAISection } from "../components/landing/LandingWorkflows";
import { ExistingToolsSection, ModularAdoptionSection, BeforeAfterSection, BusinessOutcomesSection, ExecutiveControlTowerSection } from "../components/landing/LandingEnterprise";
import { TargetAudienceSection, RoleBasedValueSection, SecurityGovernanceSection, FinalCTASection, FooterSection } from "../components/landing/LandingValue";
import type { Theme } from "../App";

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export default function LandingPage({ theme, setTheme }: Props) {
  const navigate = useNavigate();

  // We map the old onNavigate("auth") to navigate("/auth") for compatibility with the child components
  const handleNavigate = (view: string) => {
    if (view === "auth") navigate("/auth");
    if (view === "hub") navigate("/hub");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black tracking-tighter">
              ON
            </div>
            <span className="font-black text-xl text-white tracking-tighter">ON<span className="text-cyan-400">IT</span></span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#applications" className="hover:text-white transition-colors">Applications</a>
            <a href="#ai-workers" className="hover:text-white transition-colors">AI Workers</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
            <a href="#outcomes" className="hover:text-white transition-colors">Outcomes</a>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/auth")} className="text-sm font-bold text-white hover:text-indigo-300 transition-colors">
              Sign In
            </button>
            <button onClick={() => navigate("/auth")} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors">
              REQUEST A DEMO
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Assembly */}
      <main>
        {/* Step 1: The Problem */}
        <HeroSection onNavigate={handleNavigate as any} />
        <RealityTodaySection />
        
        {/* Step 2: The Difference */}
        <OnitDifferenceSection />
        
        {/* Step 3: Platform Architecture */}
        <div id="platform">
          <OperatingModelSection />
        </div>
        
        <BusinessJourneySection />
        
        <div id="ai-workers">
          <AIWorkerLayerSection />
        </div>

        {/* Step 4: Workflows in Action */}
        <div id="how-it-works">
          <WorkflowExampleSection />
          <BAIntelligenceSection />
          <UnifiedContextSection />
          <HumanPlusAISection />
        </div>

        {/* Step 5: Integration & Adoption */}
        <div id="integrations">
          <ExistingToolsSection />
        </div>
        <ModularAdoptionSection />

        {/* Step 6: Value & Outcomes */}
        <div id="outcomes">
          <BeforeAfterSection />
          <BusinessOutcomesSection />
          <ExecutiveControlTowerSection />
        </div>

        {/* Step 7: Roles & Governance */}
        <TargetAudienceSection />
        <RoleBasedValueSection />
        <SecurityGovernanceSection />

        {/* Final CTA */}
        <FinalCTASection onNavigate={handleNavigate as any} />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
