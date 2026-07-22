import { useState } from "react";
import { Sparkles, Plus, ChevronLeft, List, Volume2, Play } from "lucide-react";

// Initial Mock Data Fallbacks
const INITIAL_CAMPAIGNS = [
  { 
    id: "RC-001", 
    name: "APAC Cloud Migration 2026", 
    objective: "Identify legacy ERP users likely to migrate to Cloud", 
    status: "Active", 
    owner: "Sarah Chen", 
    created: "Jan 10, 2026", 
    lastRun: "2h ago", 
    nextRun: "Daily, 04:00 AM", 
    companiesFound: 142, 
    qualifiedOps: 12, 
    pipelineValue: "$1.2M", 
    progress: 85 
  },
  { 
    id: "RC-002", 
    name: "Europe Digital Transformation", 
    objective: "Target mid-market retail firms with legacy codebases", 
    status: "Active", 
    owner: "Sarah Chen", 
    created: "Jan 08, 2026", 
    lastRun: "Yesterday", 
    nextRun: "Weekly, Sunday", 
    companiesFound: 98, 
    qualifiedOps: 8, 
    pipelineValue: "$820K", 
    progress: 92 
  },
  { 
    id: "RC-003", 
    name: "US Finance AI Integration", 
    objective: "Target fintech startups needing AI APIs", 
    status: "Draft", 
    owner: "Sarah Chen", 
    created: "Jan 12, 2026", 
    lastRun: "—", 
    nextRun: "Manual Run", 
    companiesFound: 0, 
    qualifiedOps: 0, 
    pipelineValue: "$0", 
    progress: 0 
  },
];

const DEFAULT_COMPANIES = [
  { 
    id: "CO-101", 
    name: "Astra International", 
    domain: "astra.co.id", 
    industry: "Manufacturing", 
    employees: "15,000+", 
    revenue: "$4.2B", 
    hq: "Jakarta, Indonesia", 
    stack: "SAP ECC, Oracle", 
    owner: "Sarah Chen",
    aiSummary: "Primary migration candidate with legacy core ERP. Likely to migrate to S/4HANA in 18 months.",
    aiScore: 94, 
    dealValue: "$350K", 
    prob: "75%", 
    services: "SAP S/4HANA Migration, Cloud Integration", 
    signals: ["SAP ECC Signature", "Cloud Adoption Strategy"], 
    reasoning: [
      "Revenue above target ($4.2B)",
      "SAP ECC environment detected",
      "15,000+ employees",
      "Recent digital expansion announced",
      "Active hiring for SAP Consultants"
    ],
    confidence: "96%"
  },
  { 
    id: "CO-102", 
    name: "Daimler Southeast", 
    domain: "daimler-se.sg", 
    industry: "Automotive", 
    employees: "8,500", 
    revenue: "$2.1B", 
    hq: "Singapore", 
    stack: "SAP ECC, Microsoft SQL", 
    owner: "Sarah Chen",
    aiSummary: "Target legacy database consolidation and cloud transformation.",
    aiScore: 89, 
    dealValue: "$280K", 
    prob: "65%", 
    services: "Azure Cloud Migration, DevOps Pipeline Setup", 
    signals: ["SAP ECC Signature", "Technology Upgrade"], 
    reasoning: [
      "ERP upgrade cycle indicates immediate action",
      "Tech stack includes end-of-support legacy DB",
      "High probability of Azure cloud selection"
    ],
    confidence: "91%"
  },
];

interface ExtractedData {
  industry: string;
  region: string;
  technologies: string;
  decisionMakers: string;
  signals: string;
  sources: string;
  rules: string;
  forecast: {
    companies: number;
    decisionMakers: number;
    opportunities: number;
    pipeline: string;
    duration: string;
    confidence: string;
  };
  sampleCompanies: any[];
}

function parsePromptToContext(prompt: string): ExtractedData {
  const p = prompt.toLowerCase();
  
  if (p.includes("health") || p.includes("hospital") || p.includes("clinic") || p.includes("medical")) {
    return {
      industry: "Healthcare & Life Sciences",
      region: p.includes("indonesia") ? "Indonesia" : p.includes("europe") ? "Europe" : "North America",
      technologies: "Epic EHR, Cerner EHR, AWS Healthcare APIs, HIPAA Gateway",
      decisionMakers: "Chief Medical Officer, CIO Healthcare, VP Clinical Applications",
      signals: "EHR Upgrade Cycles, Patient Data Audit Flags, Digital Health Mandates",
      sources: "Medical Registries, HIPAA compliance listings, Hospital bulletins",
      rules: "Hospital beds > 200 | HIPAA Certification Required | Active EHR budget",
      forecast: {
        companies: 180,
        decisionMakers: 740,
        opportunities: 9,
        pipeline: "$2.8M",
        duration: "5h 30m",
        confidence: "94%"
      },
      sampleCompanies: [
        {
          id: "CO-H01",
          name: "Siloam Health Group",
          domain: "siloamhealth.com",
          industry: "Healthcare & Life Sciences",
          employees: "5,000+",
          revenue: "$450M",
          hq: "Jakarta, Indonesia",
          stack: "Epic EHR, Cerner, Oracle DB, AWS",
          owner: "Sarah Chen",
          aiSummary: "Legacy healthcare provider requiring EHR cloud modernization and patient database synchronization.",
          aiScore: 92,
          dealValue: "$450K",
          prob: "80%",
          services: "EHR Cloud Data Migration & HIPAA Compliance Infrastructure",
          signals: ["EHR Modernization Signal", "Hiring HIPAA Engineers"],
          reasoning: [
            "Operating legacy Epic EHR systems on-premises",
            "Hospital bed capacity fits primary tier (>500 beds)",
            "Active budget allocated for digital health modernization"
          ],
          confidence: "95%"
        },
        {
          id: "CO-H02",
          name: "Medica Care Networks",
          domain: "medicacare.net",
          industry: "Healthcare & Life Sciences",
          employees: "2,200",
          revenue: "$180M",
          hq: "Chicago, IL",
          stack: "Cerner EHR, Azure Cloud",
          owner: "Sarah Chen",
          aiSummary: "Multi-facility medical network migrating patient portals to Azure Cloud.",
          aiScore: 84,
          dealValue: "$210K",
          prob: "65%",
          services: "Patient Portal Migration & Cyber Security Auditing",
          signals: ["Cloud Portal RFP", "Healthcare Security Upgrades"],
          reasoning: [
            "Recent security audits requested portal infrastructure upgrades",
            "Strong alignment with Azure clinical services templates"
          ],
          confidence: "89%"
        }
      ]
    };
  }
  
  if (p.includes("bank") || p.includes("finance") || p.includes("fintech") || p.includes("invest")) {
    return {
      industry: "Banking & Financial Services",
      region: p.includes("indonesia") ? "Indonesia" : p.includes("europe") ? "Western Europe" : "Global nodes",
      technologies: "Temenos Core Banking, SWIFT APIs, Murex, Snowflake Analytics",
      decisionMakers: "Chief Risk Officer, Head of Retail Banking, Director of Core Infrastructure",
      signals: "Core Banking Replacements, SWIFT ISO 20022 Migrations, Fintech Sandbox Funding",
      sources: "Central Bank filings, Financial Times, SWIFT register bulletins",
      rules: "Asset Base > $1B | Core System Age > 10 yrs | Active FinTech Partnerships",
      forecast: {
        companies: 110,
        decisionMakers: 520,
        opportunities: 6,
        pipeline: "$4.5M",
        duration: "3h 45m",
        confidence: "97%"
      },
      sampleCompanies: [
        {
          id: "CO-B01",
          name: "Mandiri Financial Corp",
          domain: "mandiricorp.com",
          industry: "Banking & Financial Services",
          employees: "22,000",
          revenue: "$8.4B",
          hq: "Jakarta, Indonesia",
          stack: "Temenos Core, AS400 Legacy, Snowflake",
          owner: "Sarah Chen",
          aiSummary: "Core banking modernization initiative targeting legacy mainframe system replacements.",
          aiScore: 96,
          dealValue: "$950K",
          prob: "85%",
          services: "Temenos Core Integration & Cloud Data Warehouse Migration",
          signals: ["Mainframe Retirement", "SWIFT API Upgrade"],
          reasoning: [
            "Legacy mainframe operating past standard support cycles",
            "Central bank mandates prompt ISO 20022 messaging upgrades",
            "Budget capacity exceeding $10M for transformation projects"
          ],
          confidence: "98%"
        },
        {
          id: "CO-B02",
          name: "Apex Trading Systems",
          domain: "apextrading.io",
          industry: "Banking & Financial Services",
          employees: "1,200",
          revenue: "$320M",
          hq: "London, UK",
          stack: "Murex, AWS Cloud, Python",
          owner: "Sarah Chen",
          aiSummary: "High-frequency trading desk migrating latency-critical workloads to AWS Local Zones.",
          aiScore: 88,
          dealValue: "$380K",
          prob: "70%",
          services: "AWS Low-Latency Infrastructure Engineering",
          signals: ["Trading Desk Modernization", "Hiring AWS Engineers"],
          reasoning: [
            "Hiring expansion indicates scaling of local cloud infrastructure",
            "High correlation with AWS partner blueprints for financial services"
          ],
          confidence: "93%"
        }
      ]
    };
  }

  if (p.includes("manufactur") || p.includes("factor") || p.includes("automotiv") || p.includes("car")) {
    return {
      industry: "Industrial Manufacturing & Automotive",
      region: p.includes("indonesia") ? "Indonesia" : "Asia Pacific",
      technologies: "SAP ECC, Oracle EBS, Siemens PLC Systems, AWS IoT Core",
      decisionMakers: "CIO Industrial, Head of Plant Automation, VP Supply Chain",
      signals: "SAP ECC End-of-Life, Smart Factory IoT initiatives, Industrial Automation RFPs",
      sources: "Manufacturing Directories, IoT bulletins, Press releases",
      rules: "Plant count > 2 | Legacy ERP detected | Revenue > $100M",
      forecast: {
        companies: 430,
        decisionMakers: 1850,
        opportunities: 12,
        pipeline: "$1.2M",
        duration: "4h 15m",
        confidence: "96%"
      },
      sampleCompanies: [
        {
          id: "CO-M01",
          name: "Astra International",
          domain: "astra.co.id",
          industry: "Industrial Manufacturing & Automotive",
          employees: "15,000+",
          revenue: "$4.2B",
          hq: "Jakarta, Indonesia",
          stack: "SAP ECC, Oracle",
          owner: "Sarah Chen",
          aiSummary: "Primary migration candidate with legacy core ERP. Likely to migrate to S/4HANA in 18 months.",
          aiScore: 94,
          dealValue: "$350K",
          prob: "75%",
          services: "SAP S/4HANA Migration, Cloud Integration",
          signals: ["SAP ECC Signature", "Cloud Adoption Strategy"],
          reasoning: [
            "Revenue above target ($4.2B)",
            "SAP ECC environment detected",
            "15,000+ employees",
            "Recent digital expansion announced",
            "Active hiring for SAP Consultants"
          ],
          confidence: "96%"
        },
        {
          id: "CO-M02",
          name: "Jakarta Paper Mill",
          domain: "jakartapaper.co.id",
          industry: "Industrial Manufacturing & Automotive",
          employees: "3,200",
          revenue: "$480M",
          hq: "Surabaya, Indonesia",
          stack: "SAP ECC 6.0",
          owner: "Sarah Chen",
          aiSummary: "Mid-market paper manufacturer seeking cloud database redundancy.",
          aiScore: 82,
          dealValue: "$180K",
          prob: "80%",
          services: "SAP Cloud Migration",
          signals: ["SAP ECC Signature", "Hiring"],
          reasoning: [
            "SAP ECC 6.0 requiring migration path",
            "Critical data redundancy project identified"
          ],
          confidence: "88%"
        }
      ]
    };
  }

  // Fallback SaaS/Digital Commerce context
  return {
    industry: "Enterprise SaaS & Digital Retail",
    region: "Global Market",
    technologies: "Salesforce CRM, Adobe Commerce, Java, Oracle DB, AWS",
    decisionMakers: "VP Engineering, CIO Commerce, Head of Digital Experience",
    signals: "Digital Experience Upgrades, Salesforce Consolidation, Cloud Modernization",
    sources: "Storefront codes, job portals, LinkedIn, SEC filings",
    rules: "Online store detected | Legacy CMS | Revenue > $20M",
    forecast: {
      companies: 280,
      decisionMakers: 1100,
      opportunities: 8,
      pipeline: "$950K",
      duration: "2h 30m",
      confidence: "91%"
    },
    sampleCompanies: [
      {
        id: "CO-S01",
        name: "Metro Retail Group",
        domain: "metroretail.com.ph",
        industry: "Enterprise SaaS & Digital Retail",
        employees: "5,000",
        revenue: "$890M",
        hq: "Manila, Philippines",
        stack: "Salesforce, Java, Oracle",
        owner: "Sarah Chen",
        aiSummary: "Legacy storefront integration with fragmented CMS systems requiring cloud consolidation.",
        aiScore: 78,
        dealValue: "$150K",
        prob: "45%",
        services: "Omnichannel Cloud Engineering & Salesforce Migration",
        signals: ["Salesforce Upgrade Signature", "Retail Digital Modernization"],
        reasoning: [
          "Fragile Java commerce platform detected",
          "Active recruitment for cloud database engineers"
        ],
        confidence: "90%"
      }
    ]
  };
}

type InnerModule = 
  | "dashboard"
  | "campaigns"
  | "companies"
  | "results"
  | "people"
  | "signals"
  | "review"
  | "history"
  | "settings";

type WizardScreen = 1 | 2 | 3 | 4;

export default function MarketIntelligence({ subModule }: { subModule?: string }) {
  const [localModule] = useState<InnerModule>("dashboard");
  const activeModule = (subModule && ["dashboard", "campaigns", "companies", "results", "people", "signals", "review", "history", "settings"].includes(subModule)) ? (subModule as InnerModule) : localModule;
  
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);
  const [contacts] = useState(INITIAL_CONTACTS);
  const [signals] = useState(SIGNALS);

  // View States
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<typeof DEFAULT_COMPANIES[0] | null>(null);
  
  // Selected Campaign Results Tab View
  const [selectedCampaignResults, setSelectedCampaignResults] = useState<typeof INITIAL_CAMPAIGNS[0] | null>(INITIAL_CAMPAIGNS[0]);

  // AI Wizard States
  const [isCreatingWizard, setIsCreatingWizard] = useState(false);
  const [wizardScreen, setWizardScreen] = useState<WizardScreen>(1);
  const [campaignPrompt, setCampaignPrompt] = useState("");
  
  // Dynamic Blueprint Parameters
  const [blueprintGoal, setBlueprintGoal] = useState("Find manufacturing companies in Indonesia using SAP ECC likely to migrate to S/4HANA.");
  const [blueprintIcp, setBlueprintIcp] = useState("Countries: Indonesia, Malaysia | Industries: Manufacturing | Employees: 500+");
  const [blueprintTech, setBlueprintTech] = useState("ERP: SAP ECC | Cloud: Azure | Database: Oracle");
  const [blueprintPeople, setBlueprintPeople] = useState("CIO, VP IT, Enterprise Architect");
  const [blueprintSignals, setBlueprintSignals] = useState("ERP Modernization, Cloud Migration");
  const [blueprintSources, setBlueprintSources] = useState("Websites, LinkedIn, registries, job boards");
  const [blueprintRules, setBlueprintRules] = useState("Min Revenue: $50M | Score Weight: High");
  const [blueprintForecast, setBlueprintForecast] = useState({
    companies: 430,
    decisionMakers: 1850,
    opportunities: 12,
    pipeline: "$1.2M",
    duration: "4h 15m",
    confidence: "96%"
  });
  
  // Advanced Config
  const [advOpen, setAdvOpen] = useState(false);
  const [scheduling, setScheduling] = useState("Run Once");
  const [duplicateRules, setDuplicateRules] = useState("Skip Existing");
  const [reviewPolicy, setReviewPolicy] = useState("Manual Review");
  const [automationRules, setAutomationRules] = useState("SWOT + CRM Sync");

  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [editSection, setEditSection] = useState<string | null>(null);

  const executeAICommand = () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    setTimeout(() => {
      setAiLoading(false);
      const cmd = aiInput.toLowerCase();
      if (cmd.includes("indonesia") && cmd.includes("sap")) {
        setAiResponse(`🔍 **AI Research Query Result**
Found **2 companies** in Indonesia utilizing **SAP ECC**:
1. **Astra International** (Jakarta, score: 94) - High opportunity migration deal.
2. **Jakarta Paper Mill** (Surabaya, score: 82) - Mid-market legacy ERP expansion.

*Recommendation*: Launch outreach campaign focused on our "SAP to Cloud" migration accelerators.`);
      } else if (cmd.includes("ai")) {
        setAiResponse(`🤖 **AI Insights**
Active signals detected: **SingTel Digital Assets** is hiring 14 GenAI engineers.
*Potential Deal Size*: $450,000 for team augmentation and custom LLM gateway development.
*Win Probability*: 85%.`);
      } else {
        setAiResponse(`💡 **AI recommendation**
Analysis complete for "${aiInput}". Recommendation generated:
- Focus sales discovery on cloud modernization services.
- Expected deal value: $240K average.
- Target Decision Maker: Budi Santoso (CIO, Astra International).`);
      }
    }, 1200);
  };

  const handlePushToCRM = (companyId: string) => {
    setCompanies(companies.map(c => c.id === companyId ? { ...c, owner: "Pushed to CRM" } : c));
    alert("Opportunity successfully synchronized with AI Sales CRM!");
  };

  const handleGenerateBlueprint = () => {
    if (!campaignPrompt.trim()) return;
    
    // Parse dynamic prompt context
    const context = parsePromptToContext(campaignPrompt);
    
    setBlueprintGoal(campaignPrompt);
    setBlueprintIcp(`Geography: ${context.region} | Industry: ${context.industry}`);
    setBlueprintTech(context.technologies);
    setBlueprintPeople(context.decisionMakers);
    setBlueprintSignals(context.signals);
    setBlueprintSources(context.sources);
    setBlueprintRules(context.rules);
    setBlueprintForecast(context.forecast);
    
    // Dynamically inject the sample company dataset matched to the prompt objective
    setCompanies(context.sampleCompanies);
    
    setWizardScreen(2);
  };

  const handleLaunchCampaign = () => {
    setWizardScreen(4);
    setPipelineProgress(0);
    const interval = setInterval(() => {
      setPipelineProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const newCamp = {
            id: `RC-00${campaigns.length + 1}`,
            name: `AI Research - ${blueprintGoal.split(" ").slice(0, 4).join(" ")}...`,
            objective: blueprintGoal,
            status: "Active",
            owner: "Sarah Chen",
            created: "Jan 21, 2026",
            lastRun: "Just Now",
            nextRun: scheduling,
            companiesFound: blueprintForecast.companies,
            qualifiedOps: blueprintForecast.opportunities,
            pipelineValue: blueprintForecast.pipeline,
            progress: 100
          };
          setCampaigns([...campaigns, newCamp]);
          setIsCreatingWizard(false);
          setWizardScreen(1);
          return 100;
        }
        return prev + 25;
      });
    }, 500);
  };

  if (isCreatingWizard) {
    return (
      <div style={{ padding: "28px 28px 40px", background: "var(--color-bg)", minHeight: "100%", color: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
        
        {/* Wizard Navigation Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <button onClick={() => setIsCreatingWizard(false)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 13 }}>
            <ChevronLeft size={16} /> Cancel
          </button>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: wizardScreen === 1 ? "var(--color-primary)" : "rgba(255,255,255,0.06)", color: "#fff" }}>1. Describe Goal</span>
            <span style={{ width: 12, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: wizardScreen === 2 ? "var(--color-primary)" : "rgba(255,255,255,0.06)", color: "#fff" }}>2. Review Blueprint</span>
            <span style={{ width: 12, height: 1, background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 100, background: wizardScreen === 3 ? "var(--color-primary)" : "rgba(255,255,255,0.06)", color: "#fff" }}>3. Mission Control</span>
          </div>
        </div>

        {/* SCREEN 1: DESCRIBE BUSINESS GOAL */}
        {wizardScreen === 1 && (
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 6px" }}>Create AI Research Mission</h1>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Describe the business opportunity you want AI to discover.</p>
            </div>

            {/* Prompt Box */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <textarea
                value={campaignPrompt}
                onChange={e => setCampaignPrompt(e.target.value)}
                placeholder='e.g. "Find manufacturing companies in Indonesia using SAP ECC that are likely to migrate to SAP S/4HANA."'
                style={{ width: "100%", height: 120, background: "transparent", border: "none", color: "#fff", outline: "none", fontSize: 14, resize: "none", lineHeight: 1.6 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#9CA3AF", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <Volume2 size={13} /> Voice Input
                  </button>
                  <button style={{ padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#9CA3AF", fontSize: 12, cursor: "pointer" }}>
                    Upload Customer List
                  </button>
                </div>
                <button onClick={handleGenerateBlueprint} disabled={!campaignPrompt.trim()} style={{ padding: "8px 16px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={14} /> Generate Research Blueprint
                </button>
              </div>
            </div>

            {/* Confidence Grid / What AI Will Auto-Discover */}
            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16, textAlign: "left" }}>
              <div style={{ fontSize: 11, fontWeight: 750, color: "var(--color-text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>AI Automated Analysis Scope</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, fontSize: 12, color: "#9CA3AF" }}>
                <div>✓ Countries</div>
                <div>✓ Industries</div>
                <div>✓ Company Size</div>
                <div>✓ Revenue</div>
                <div>✓ Technologies</div>
                <div>✓ Decision Makers</div>
                <div>✓ Buying Signals</div>
                <div>✓ Qualification Rules</div>
                <div>✓ Research Sources</div>
                <div>✓ Opportunity Forecast</div>
              </div>
            </div>

            {/* Quick Templates & Example Prompts */}
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Popular Prompts & Templates</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  { name: "SAP Modernization", desc: "Find manufacturing companies in Indonesia using SAP ECC likely to migrate." },
                  { name: "Cloud Migration", desc: "Identify healthcare facilities looking for cloud EHR integration." },
                  { name: "Banking & Finance", desc: "Discover banks investing in core banking API systems." }
                ].map(temp => (
                  <button
                    key={temp.name}
                    onClick={() => setCampaignPrompt(temp.desc)}
                    style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", color: "#9CA3AF", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                  >
                    {temp.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: REVIEW AI BLUEPRINT */}
        {wizardScreen === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 850, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Research Blueprint</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Review the AI-generated strategy and business rationale before execution.</p>
            </div>

            {/* HERO CARD - MISSION FORECAST */}
            <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(217,70,239,0.08))", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 750, letterSpacing: "0.05em", marginBottom: 16 }}>Expected Mission Outcomes & Business Impact</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 20 }}>
                {[
                  { label: "Est Companies", val: blueprintForecast.companies },
                  { label: "Decision Makers", val: blueprintForecast.decisionMakers },
                  { label: "Qualified Ops", val: blueprintForecast.opportunities },
                  { label: "Pipeline Value", val: blueprintForecast.pipeline },
                  { label: "Crawl Time", val: blueprintForecast.duration },
                  { label: "AI Confidence", val: blueprintForecast.confidence }
                ].map(metric => (
                  <div key={metric.label}>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{metric.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 850, marginTop: 4, color: "#fff" }}>{metric.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editable Strategy Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              
              {/* Business Goal Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Business Goal Strategy</span>
                  <button onClick={() => setEditSection(editSection === "goal" ? null : "goal")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "goal" ? (
                  <textarea value={blueprintGoal} onChange={e => setBlueprintGoal(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintGoal}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Why AI:</span> Natural language goal outlines direct business expansion signals.
                    </div>
                  </>
                )}
              </div>

              {/* ICP Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Ideal Customer Profile</span>
                  <button onClick={() => setEditSection(editSection === "icp" ? null : "icp")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "icp" ? (
                  <textarea value={blueprintIcp} onChange={e => setBlueprintIcp(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintIcp}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Sources:</span> LinkedIn, Corporate Registries | <span style={{ color: "#10B981" }}>94% Conf</span>
                    </div>
                  </>
                )}
              </div>

              {/* Tech Profile Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Technology Profile Target</span>
                  <button onClick={() => setEditSection(editSection === "tech" ? null : "tech")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "tech" ? (
                  <textarea value={blueprintTech} onChange={e => setBlueprintTech(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintTech}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Why AI:</span> Custom targeting signatures mapped to target business sector.
                    </div>
                  </>
                )}
              </div>

              {/* Decision Makers Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Target Decision Makers</span>
                  <button onClick={() => setEditSection(editSection === "people" ? null : "people")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "people" ? (
                  <textarea value={blueprintPeople} onChange={e => setBlueprintPeople(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintPeople}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Why AI:</span> Stakeholders matching procurement and technical ownership chains.
                    </div>
                  </>
                )}
              </div>

              {/* Opportunity Signals Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Scanned Opportunity Signals</span>
                  <button onClick={() => setEditSection(editSection === "signals" ? null : "signals")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "signals" ? (
                  <textarea value={blueprintSignals} onChange={e => setBlueprintSignals(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintSignals}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Sources:</span> Job Portals, Press Releases | <span style={{ color: "#10B981" }}>91% Conf</span>
                    </div>
                  </>
                )}
              </div>

              {/* Research Sources Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Targeted Research Sources</span>
                  <button onClick={() => setEditSection(editSection === "sources" ? null : "sources")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "sources" ? (
                  <textarea value={blueprintSources} onChange={e => setBlueprintSources(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintSources}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Why AI:</span> Maximum availability of verified tech signatures.
                    </div>
                  </>
                )}
              </div>

              {/* Qualification Rules Card */}
              <div style={cardStyle}>
                <div style={cardHeaderStyle}>
                  <span>Qualification Rules</span>
                  <button onClick={() => setEditSection(editSection === "rules" ? null : "rules")} style={editBtnStyle}>Edit</button>
                </div>
                {editSection === "rules" ? (
                  <textarea value={blueprintRules} onChange={e => setBlueprintRules(e.target.value)} style={textStyle} />
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 10px" }}>{blueprintRules}</p>
                    <div style={aiExplStyle}>
                      <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>Why AI:</span> Establishes matching thresholds for score calculation.
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Advanced Configuration */}
            <div>
              <button onClick={() => setAdvOpen(!advOpen)} style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", fontSize: 13, fontWeight: 700, padding: 0 }}>
                {advOpen ? "Hide" : "Show"} Advanced Configuration (Power Settings)
              </button>
              {advOpen && (
                <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24, marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <label style={advLabelStyle}>Crawl Scheduling</label>
                    <select value={scheduling} onChange={e => setScheduling(e.target.value)} style={selectStyle}>
                      <option>Run Once</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Continuous Monitoring</option>
                    </select>
                  </div>
                  <div>
                    <label style={advLabelStyle}>Duplicate Policy</label>
                    <select value={duplicateRules} onChange={e => setDuplicateRules(e.target.value)} style={selectStyle}>
                      <option>Skip Existing</option>
                      <option>Merge Existing</option>
                      <option>Update Existing</option>
                    </select>
                  </div>
                  <div>
                    <label style={advLabelStyle}>Review Policy</label>
                    <select value={reviewPolicy} onChange={e => setReviewPolicy(e.target.value)} style={selectStyle}>
                      <option>Manual Review</option>
                      <option>Auto Approve</option>
                      <option>Manager Review</option>
                    </select>
                  </div>
                  <div>
                    <label style={advLabelStyle}>Automation Action Workflow</label>
                    <select value={automationRules} onChange={e => setAutomationRules(e.target.value)} style={selectStyle}>
                      <option>SWOT + CRM Sync</option>
                      <option>SWOT + Discovery Questions</option>
                      <option>Auto Draft Outreach Emails</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Controls */}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
              <button onClick={() => setWizardScreen(1)} style={{ padding: "10px 20px", borderRadius: 8, background: "transparent", border: "1px solid var(--color-border)", color: "#9CA3AF", cursor: "pointer", fontSize: 13 }}>
                Back
              </button>
              <button onClick={() => setWizardScreen(3)} style={{ padding: "10px 20px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                Proceed to Mission Control
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: MISSION CONTROL */}
        {wizardScreen === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 850, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Mission Control Summary</h2>
              <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Review details before launching the AI crawler nodes.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 14 }}><strong>Business Objective</strong>: {blueprintGoal}</div>
                <div style={{ fontSize: 14 }}><strong>Ideal Targets</strong>: {blueprintIcp}</div>
                <div style={{ fontSize: 14 }}><strong>Scoping Systems</strong>: {blueprintTech}</div>
                <div style={{ fontSize: 14 }}><strong>Trigger Signals</strong>: {blueprintSignals}</div>
                <div style={{ fontSize: 14 }}><strong>Automation Rule</strong>: {automationRules} · {scheduling}</div>
              </div>

              {/* Execution Pipeline Map */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", marginBottom: 16 }}>AI Execution Flow</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "Mission Started",
                    "Companies Identified",
                    "Decision Makers Found",
                    "Technology Analysed",
                    "Buying Signals Identified",
                    "Qualified Opportunities Created",
                    "Ready for Sales Review"
                  ].map((node, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#9CA3AF" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "var(--color-primary)", fontWeight: 700 }}>{idx + 1}</span>
                      <span>{node}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Launch Actions */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24 }}>
              <button onClick={() => setWizardScreen(2)} style={{ padding: "10px 20px", borderRadius: 8, background: "transparent", border: "1px solid var(--color-border)", color: "#9CA3AF", cursor: "pointer", fontSize: 13 }}>
                Back to Edit
              </button>
              <button onClick={handleLaunchCampaign} style={{ padding: "12px 32px", borderRadius: 8, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", border: "none", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <Play size={16} /> Launch AI Research Mission
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: EXECUTION PROGRESS */}
        {wizardScreen === 4 && (
          <div style={{ padding: "80px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2s infinite" }}>
              <Sparkles size={40} color="var(--color-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 900, margin: "0 0 8px" }}>AI Research Node Executing</h3>
              <p style={{ color: "#6B7280", fontSize: 14, margin: "0 auto", maxWidth: 420, lineHeight: 1.5 }}>
                Discovering target companies... profiling decision makers... identifying technology signals...
              </p>
            </div>
            <div style={{ width: "100%", maxWidth: 400, height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${pipelineProgress}%`, background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))", borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-primary)" }}>{pipelineProgress}% Scanned</div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
      {/* Module Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          
          {selectedCompany ? (
            /* COMPANY DETAIL PAGE */
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Detail Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => setSelectedCompany(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
                  <ChevronLeft size={16} /> Back to list
                </button>
                <div style={{ display: "flex", gap: 10 }}>
                  {selectedCompany.owner !== "Pushed to CRM" ? (
                    <button onClick={() => handlePushToCRM(selectedCompany.id)} style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      Push to Sales CRM
                    </button>
                  ) : (
                    <span style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10B981", fontSize: 13, fontWeight: 600 }}>Pushed to CRM</span>
                  )}
                </div>
              </div>

              {/* Grid Layout - Separated Business Data from AI Insights */}
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>
                
                {/* 1. BUSINESS DATA COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Corporate Identity (Business Data)</div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>{selectedCompany.name}</h2>
                    <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 16 }}>{selectedCompany.domain} · {selectedCompany.hq}</div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13, color: "#9CA3AF" }}>
                      <div>Revenue Bracket: <strong style={{ color: "#fff" }}>{selectedCompany.revenue}</strong></div>
                      <div>Employee Range: <strong style={{ color: "#fff" }}>{selectedCompany.employees}</strong></div>
                      <div>Core Industry: <strong style={{ color: "#fff" }}>{selectedCompany.industry}</strong></div>
                    </div>
                  </div>

                  {/* Technology Signature */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Technology Infrastructure (Business Data)</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {selectedCompany.stack.split(",").map(tech => (
                        <span key={tech} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", fontSize: 12, color: "#D1D5DB" }}>{tech.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. AI INSIGHTS COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {/* Score & Recommendation Card */}
                  <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(217,70,239,0.05))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700 }}>AI Opportunity Analytics</span>
                      <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>Confidence: {selectedCompany.confidence}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
                      <div style={{ fontSize: 44, fontWeight: 900, color: "var(--color-accent)", letterSpacing: "-0.04em" }}>{selectedCompany.aiScore}</div>
                      <div style={{ fontSize: 14, color: "#9CA3AF" }}>/ 100 Opportunity Score</div>
                    </div>
                    <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.5, margin: "16px 0 0" }}>{selectedCompany.aiSummary}</p>
                  </div>

                  {/* AI Reasoning / Selection Why */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>AI Selection Rationale (Why Selected?)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {selectedCompany.reasoning.map((reason, idx) => (
                        <div key={idx} style={{ fontSize: 13, color: "#D1D5DB", display: "flex", gap: 8 }}>
                          <span style={{ color: "#10B981" }}>✓</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* MODULE VIEWS */
            <>
              {activeModule === "dashboard" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Market Intelligence Dashboard</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Executive view of AI-discovered accounts, budgets, and technology migrations.</p>
                  </div>

                  {/* KPI Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                    {[
                      { label: "Research Campaigns", value: campaigns.length, sub: "2 Active" },
                      { label: "Companies Discovered", value: companies.length, sub: "+12 this week" },
                      { label: "Decision Makers Found", value: contacts.length, sub: "+3 Relationship maps" },
                      { label: "Qualified Opportunities", value: "3 Deals", sub: "$1.2M pipeline value" },
                    ].map(card => (
                      <div key={card.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20 }}>
                        <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600 }}>{card.label}</div>
                        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", marginTop: 8 }}>{card.value}</div>
                        <div style={{ fontSize: 12, color: "var(--color-primary)", marginTop: 6 }}>{card.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* AI Assistant Section */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <Sparkles size={16} color="var(--color-primary)" />
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>AI Research Copilot</h3>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                      <input
                        value={aiInput}
                        onChange={e => setAiInput(e.target.value)}
                        placeholder="e.g. Find manufacturing companies in Indonesia with SAP ECC..."
                        style={{ flex: 1, padding: "10px 16px", borderRadius: 9, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#F9FAFB", fontSize: 13, outline: "none" }}
                      />
                      <button onClick={executeAICommand} style={{ padding: "0 20px", borderRadius: 9, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                        Ask AI
                      </button>
                    </div>
                    {aiLoading && <div style={{ fontSize: 12, color: "#6B7280" }}>AI Agent searching data pipelines...</div>}
                    {aiResponse && (
                      <pre style={{ background: "rgba(0,0,0,0.15)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 16, color: "#D1D5DB", fontFamily: "var(--font-sans)", fontSize: 13, whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.5 }}>
                        {aiResponse}
                      </pre>
                    )}
                  </div>

                  {/* Recent Discoveries */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Top Opportunities Discovered</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {companies.slice(0, 3).map(c => (
                        <div key={c.id} onClick={() => setSelectedCompany(c)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--color-border)", cursor: "pointer" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{c.hq} · Stack: {c.stack}</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--color-accent)" }}>Score: {c.aiScore}</div>
                            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{c.dealValue} Deal Value</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModule === "campaigns" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Research Campaigns</h2>
                      <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Configure and launch automated business opportunity discovery missions.</p>
                    </div>
                    <button onClick={() => { setIsCreatingWizard(true); setWizardScreen(1); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      <Plus size={14} /> Create AI Mission
                    </button>
                  </div>

                  {/* Campaigns list refactored as Campaign containers */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
                    {campaigns.map(camp => (
                      <div 
                        key={camp.id} 
                        onClick={() => { setSelectedCampaignResults(camp); }}
                        style={{ 
                          background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20,
                          cursor: "pointer", borderLeft: selectedCampaignResults?.id === camp.id ? "3px solid var(--color-primary)" : "1px solid var(--color-border)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(99,102,241,0.1)", color: "var(--color-primary)" }}>{camp.id}</span>
                          <span style={{ fontSize: 12, color: camp.status === "Active" ? "#10B981" : "#6B7280", fontWeight: 600 }}>{camp.status}</span>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px" }}>{camp.name}</h3>
                        <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 16px", lineHeight: 1.4 }}>{camp.objective}</p>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                          <div>Companies: <strong style={{ color: "#fff" }}>{camp.companiesFound}</strong></div>
                          <div>Qual Opportunities: <strong style={{ color: "#fff" }}>{camp.qualifiedOps}</strong></div>
                          <div>Pipeline Value: <strong style={{ color: "var(--color-accent)" }}>{camp.pipelineValue}</strong></div>
                          <div>Last Run: <strong style={{ color: "#fff" }}>{camp.lastRun}</strong></div>
                        </div>

                        {camp.status === "Active" && (
                          <div style={{ marginTop: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6B7280", marginBottom: 4 }}>
                              <span>Progress</span>
                              <span>{camp.progress}%</span>
                            </div>
                            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                              <div style={{ height: "100%", width: `${camp.progress}%`, background: "var(--color-primary)", borderRadius: 2 }} />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Results Workspace */}
              {activeModule === "results" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>
                        Research Results: {selectedCampaignResults ? selectedCampaignResults.name : "Select Campaign"}
                      </h2>
                      <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Verify company profiles and selection rationale constructed by AI.</p>
                    </div>
                  </div>

                  {/* Split columns for Business Data vs AI Insights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {companies.map(c => (
                      <div key={c.id} style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 24, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 24 }}>
                        {/* Left: Business Data */}
                        <div style={{ borderRight: "1px solid rgba(255,255,255,0.05)", paddingRight: 24 }}>
                          <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Corporate Profile (Business Data)</div>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{c.name}</div>
                          <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 12 }}>{c.hq} · {c.domain}</div>
                          
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 12, color: "#9CA3AF" }}>
                            <div>Revenue: <strong style={{ color: "#fff" }}>{c.revenue}</strong></div>
                            <div>Employees: <strong style={{ color: "#fff" }}>{c.employees}</strong></div>
                            <div>Industry: <strong style={{ color: "#fff" }}>{c.industry}</strong></div>
                            <div>Stack: <strong style={{ color: "#fff" }}>{c.stack}</strong></div>
                          </div>
                        </div>

                        {/* Right: AI Insights */}
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <span style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700 }}>AI Discovery Insights</span>
                            <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>Score: {c.aiScore} · Conf: {c.confidence}</span>
                          </div>
                          
                          {/* Selection Reasoning */}
                          <div style={{ background: "rgba(0,0,0,0.15)", borderRadius: 8, padding: 12, marginBottom: 12 }}>
                            <div style={{ fontSize: 11, color: "var(--color-primary)", fontWeight: 700, marginBottom: 6 }}>Selection Rationale:</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              {c.reasoning.map((r, i) => (
                                <span key={i} style={{ fontSize: 12, color: "#D1D5DB" }}>✓ {r}</span>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <button onClick={() => setSelectedCompany(c)} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid var(--color-border)", color: "#fff", background: "transparent", fontSize: 12, cursor: "pointer" }}>
                              Inspect Profile
                            </button>
                            <button onClick={() => handlePushToCRM(c.id)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "var(--color-primary)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                              Approve Opportunity
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === "companies" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Company Intelligence Directory</h2>
                      <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Crawl technology signatures, revenue brackets, and ERP environments.</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")} style={{ padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#9CA3AF", cursor: "pointer" }}>
                        <List size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Listings */}
                  {viewMode === "list" ? (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--color-border)", color: "#6B7280" }}>
                            <th style={{ padding: "12px 16px" }}>Company</th>
                            <th style={{ padding: "12px 16px" }}>Industry</th>
                            <th style={{ padding: "12px 16px" }}>HQ Location</th>
                            <th style={{ padding: "12px 16px" }}>Revenue</th>
                            <th style={{ padding: "12px 16px" }}>Tech Stack</th>
                            <th style={{ padding: "12px 16px" }}>AI Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companies.map(c => (
                            <tr key={c.id} onClick={() => setSelectedCompany(c)} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer" }}>
                              <td style={{ padding: "16px", fontWeight: 700 }}>{c.name}</td>
                              <td style={{ padding: "16px" }}>{c.industry}</td>
                              <td style={{ padding: "16px" }}>{c.hq}</td>
                              <td style={{ padding: "16px" }}>{c.revenue}</td>
                              <td style={{ padding: "16px", color: "#9CA3AF" }}>{c.stack}</td>
                              <td style={{ padding: "16px", fontWeight: 800, color: "var(--color-accent)" }}>{c.aiScore}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                      {companies.map(c => (
                        <div key={c.id} onClick={() => setSelectedCompany(c)} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16, cursor: "pointer" }}>
                          <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{c.name}</h3>
                          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 12 }}>{c.industry} · {c.hq}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{c.revenue}</span>
                            <span style={{ fontSize: 13, color: "var(--color-accent)", fontWeight: 800 }}>Score: {c.aiScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeModule === "people" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Decision Maker Profiles</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Track influence scores, relationship strengths, and preferred communications.</p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                    {contacts.map((p: any) => (
                      <div key={p.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 2px" }}>{p.name}</h3>
                        <div style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 600, marginBottom: 8 }}>{p.title}</div>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 14 }}>{p.company}</div>
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                          <span style={{ color: "#6B7280" }}>Relationship: <strong style={{ color: "#F9FAFB" }}>{p.relationship}</strong></span>
                          <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>{p.authority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === "signals" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Crawled Buying Signals</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Telemetry signals on ERP migrations, funding rounds, and transformation updates.</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {signals.map((s: any) => (
                      <div key={s.id} style={{ padding: 20, background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(99,102,241,0.15)", color: "var(--color-primary)" }}>{s.type}</span>
                            <span style={{ fontSize: 13, fontWeight: 800 }}>{s.company}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "#9CA3AF", margin: 0 }}>{s.desc}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 12, color: s.urgency === "Critical" ? "#EF4444" : "#F59E0B", fontWeight: 700 }}>{s.urgency}</div>
                          <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{s.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === "review" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>Qualification Queue</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Verify scored opportunities manually before exporting to the CRM pipeline.</p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {companies.map(c => (
                      <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Recommended Service: {c.services}</div>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: "var(--color-accent)" }}>Score: {c.aiScore}</span>
                          {c.owner !== "Pushed to CRM" ? (
                            <button onClick={() => handlePushToCRM(c.id)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "var(--color-primary)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                              Approve Deal
                            </button>
                          ) : (
                            <span style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>Approved</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModule === "history" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>CRM Export History</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Logs of all research targets and matching accounts exported to the CRM platform.</p>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--color-border)", color: "#6B7280" }}>
                          <th style={{ padding: "12px 16px" }}>Export ID</th>
                          <th style={{ padding: "12px 16px" }}>Target Account</th>
                          <th style={{ padding: "12px 16px" }}>Deal Value</th>
                          <th style={{ padding: "12px 16px" }}>Export Date</th>
                          <th style={{ padding: "12px 16px" }}>Synchronizer</th>
                          <th style={{ padding: "12px 16px" }}>Sync Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { id: "EXP-89", name: "Astra International", value: "$350K", date: "Today, 14:02 PM", sync: "Sarah Chen", status: "Success" },
                          { id: "EXP-88", name: "SingTel Digital Assets", value: "$450K", date: "Yesterday, 09:12 AM", sync: "Sarah Chen", status: "Success" },
                        ].map(log => (
                          <tr key={log.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "16px", fontWeight: 700 }}>{log.id}</td>
                            <td style={{ padding: "16px" }}>{log.name}</td>
                            <td style={{ padding: "16px" }}>{log.value}</td>
                            <td style={{ padding: "16px" }}>{log.date}</td>
                            <td style={{ padding: "16px" }}>{log.sync}</td>
                            <td style={{ padding: "16px", color: "#10B981", fontWeight: 600 }}>{log.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeModule === "settings" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 600 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px" }}>AI Scoring Configuration</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Establish weighting rules for calculating the AI Opportunity Score.</p>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { label: "Technology Fit Weight", value: "35%" },
                      { label: "Buying Signal Urgency", value: "25%" },
                      { label: "Company Revenue Potential", value: "20%" },
                      { label: "Industry Alignment", value: "20%" },
                    ].map(rule => (
                      <div key={rule.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#D1D5DB" }}>{rule.label}</span>
                        <input defaultValue={rule.value} style={{ width: 80, padding: "6px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#F9FAFB", fontSize: 13, textAlign: "center" }} />
                      </div>
                    ))}
                    <button style={{ alignSelf: "flex-end", padding: "8px 16px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", marginTop: 12 }}>
                      Save scoring parameters
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

      </div>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.02)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  padding: 20,
  display: "flex",
  flexDirection: "column" as const,
  gap: 12
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: 14,
  fontWeight: 700,
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  paddingBottom: 8
};

const editBtnStyle = {
  background: "none",
  border: "none",
  color: "var(--color-primary)",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer"
};

const textStyle = {
  width: "100%" as const,
  background: "rgba(0,0,0,0.2)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  padding: 10,
  color: "#fff",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  fontSize: 13,
  resize: "none" as const,
  height: 60
};

const aiExplStyle = {
  fontSize: 11,
  color: "#6B7280",
  background: "rgba(255,255,255,0.02)",
  padding: "8px 12px",
  borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.04)",
  lineHeight: 1.4
};

const advLabelStyle = {
  display: "block",
  fontSize: 11,
  color: "#6B7280",
  textTransform: "uppercase" as const,
  marginBottom: 6
};

const selectStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--color-border)",
  color: "#fff",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  fontSize: 13
};

// Fallback values for missing bindings
const INITIAL_CONTACTS = [
  { id: "PE-001", name: "Budi Santoso", company: "Astra International", title: "Chief Information Officer", relationship: "Strong", authority: "Decision Maker" },
  { id: "PE-002", name: "Tan Min-Liang", company: "Daimler Southeast", title: "VP of IT & Infrastructure", relationship: "Cold", authority: "Decision Maker" },
  { id: "PE-003", name: "Lin Wei", company: "SingTel Digital Assets", title: "Director of AI Systems", relationship: "Introduced", authority: "Influencer" }
];

const SIGNALS = [
  { id: "SIG-01", company: "Astra International", type: "ERP Migration", desc: "Leaked RFP for SAP ECC 6.0 migration to S/4HANA Cloud", date: "Today", urgency: "Critical" },
  { id: "SIG-02", company: "SingTel Digital Assets", type: "AI Initiatives", desc: "Hiring 14 Senior GenAI / LLM Engineers across APAC", date: "Yesterday", urgency: "High" }
];
