import { useState, useEffect } from "react";
import { 
  Sparkles, Plus, ChevronLeft, List, Volume2, Play, 
  FileText, Users, Cpu, Activity, TrendingUp, Download, 
  Eye, Mail, Phone, Globe, Landmark, MapPin 
} from "lucide-react";
import { api } from "../../imports/api";

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
    confidence: "96%",
    campaignId: "RC-001"
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
    confidence: "91%",
    campaignId: "RC-001"
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

function parsePromptToBlueprint(prompt: string) {
  const p = prompt.toLowerCase();

  // 1. Objective
  let objective = "Not Specified";
  let objReason = "No clear objective detected in the prompt.";
  if (p.includes("manufacturing") || p.includes("manufactur")) {
    objective = "Research Manufacturing Companies";
    objReason = "Extracted based on 'manufacturing' keyword.";
  } else if (p.includes("sap")) {
    objective = "Find ERP Migration Opportunities";
    objReason = "Extracted based on 'SAP' keyword.";
  } else if (p.includes("retail") || p.includes("oracle")) {
    objective = "Identify ERP Customers";
    objReason = "Extracted based on ERP/Retail keywords.";
  } else if (p.includes("health") || p.includes("hospital") || p.includes("medical")) {
    objective = "Modernize Healthcare Prospects";
    objReason = "Extracted based on healthcare keywords.";
  } else if (p.includes("bank") || p.includes("finance")) {
    objective = "Discover Financial Core Opportunities";
    objReason = "Extracted based on banking/finance keywords.";
  }

  // 2. Industry
  let industry = "Not Specified";
  let industryReason = "No industry explicitly specified in the query.";
  if (p.includes("manufactur")) {
    industry = "Industrial Manufacturing";
    industryReason = "Extracted based on the term 'manufacturing'.";
  } else if (p.includes("retail")) {
    industry = "Retail & Digital Commerce";
    industryReason = "Extracted based on the term 'retail'.";
  } else if (p.includes("health") || p.includes("hospital") || p.includes("clinic") || p.includes("medical")) {
    industry = "Healthcare & Life Sciences";
    industryReason = "Extracted based on clinical/medical terms.";
  } else if (p.includes("bank") || p.includes("finance") || p.includes("fintech")) {
    industry = "Banking & Financial Services";
    industryReason = "Extracted based on financial terms.";
  }

  // 3. Geography
  let geography = "Not Specified";
  let geoReason = "No geographical filter mentioned in the query.";
  if (p.includes("europe")) {
    geography = "Germany, France, Italy, Spain, Netherlands, Belgium, Switzerland, Austria, Poland, Sweden";
    geoReason = "Intelligently expanded 'Europe' continent into major European economies.";
  } else if (p.includes("indonesia")) {
    geography = "Indonesia (Jakarta, Surabaya, Bandung)";
    geoReason = "Mapped to Indonesia search cluster.";
  } else if (p.includes("us") || p.includes("america") || p.includes("united states")) {
    geography = "United States (East/West Coast Hubs)";
    geoReason = "Mapped to North America regional database.";
  } else if (p.includes("uk") || p.includes("london") || p.includes("united kingdom")) {
    geography = "United Kingdom (London, Manchester)";
    geoReason = "Mapped to UK regional databases.";
  }

  // 4. Company Revenue
  let revenue = "Not Specified";
  let revReason = "No revenue constraint defined in objective.";
  if (p.includes("10m") || p.includes("10 million")) {
    revenue = "> $10M USD";
    revReason = "Identified minimum revenue threshold matching 10M.";
  } else if (p.includes("50m") || p.includes("50 million")) {
    revenue = "> $50M USD";
    revReason = "Identified minimum revenue threshold matching 50M.";
  } else if (p.includes("1b") || p.includes("1 billion")) {
    revenue = "> $1B USD";
    revReason = "Identified enterprise tier revenue constraint.";
  }

  // 5. Company Age
  let age = "Not Specified";
  let ageReason = "No company age constraint defined.";
  if (p.includes("10 years") || p.includes("10 yrs")) {
    age = "10+ Years in Business";
    ageReason = "Identified operating longevity requirement of 10 years.";
  } else if (p.includes("20 years") || p.includes("20 yrs")) {
    age = "20+ Years in Business";
    ageReason = "Identified operating longevity requirement of 20 years.";
  }

  // 6. Employee Size
  let employees = "Not Specified";
  let empReason = "No specific employee range requested.";
  if (p.includes("500")) {
    employees = "500+ Employees";
    empReason = "Identified mid-market size boundary.";
  } else if (p.includes("1000") || p.includes("1k")) {
    employees = "1,000+ Employees";
    empReason = "Identified enterprise size boundary.";
  } else if (p.includes("10000") || p.includes("10k")) {
    employees = "10,000+ Employees";
    empReason = "Identified large-scale enterprise size boundary.";
  }

  // 7. Company Type
  let type = "Not Specified";
  let typeReason = "No constraint on company legal/operational structure.";
  if (p.includes("public")) {
    type = "Publicly Traded Corporation";
    typeReason = "Filtered to public listings.";
  } else if (p.includes("private")) {
    type = "Private Limited";
    typeReason = "Filtered to privately held companies.";
  } else if (p.includes("startup")) {
    type = "VC Funded Startup";
    typeReason = "Filtered to high-growth startup profiles.";
  }

  // 8. Tech Requirements
  let tech = "Not Specified";
  let techReason = "No specific software technologies requested.";
  const technologiesDetected = [];
  if (p.includes("sap ecc")) technologiesDetected.push("SAP ECC");
  if (p.includes("sap s/4hana") || p.includes("s/4hana")) {
    technologiesDetected.push("SAP S/4HANA");
  } else if (p.includes("sap")) {
    technologiesDetected.push("SAP (ECC or S/4HANA)");
  }
  if (p.includes("oracle erp")) technologiesDetected.push("Oracle Cloud ERP");
  else if (p.includes("oracle")) technologiesDetected.push("Oracle DB / ERP");
  if (p.includes("dynamics") || p.includes("microsoft erp")) technologiesDetected.push("Microsoft Dynamics 365");
  if (p.includes("salesforce")) technologiesDetected.push("Salesforce CRM");
  if (p.includes("aws")) technologiesDetected.push("AWS Cloud Infrastructure");
  if (p.includes("azure")) technologiesDetected.push("Microsoft Azure Cloud");
  if (p.includes("snowflake")) technologiesDetected.push("Snowflake Data Cloud");
  if (p.includes("java")) technologiesDetected.push("Java Enterprise Core");
  if (p.includes("python")) technologiesDetected.push("Python (AI/Data stacks)");
  
  if (technologiesDetected.length > 0) {
    tech = technologiesDetected.join(", ");
    techReason = "Extracted software signatures based on query keywords.";
  }

  // 9. Decision Makers
  let dms = "Not Specified";
  let dmReason = "No targeted personas specified.";
  if (p.includes("cio") || p.includes("cto") || p.includes("it director")) {
    dms = "CIO, CTO, VP of Infrastructure, IT Director";
    dmReason = "Mapped to technical and information ownership roles.";
  } else if (p.includes("cfo") || p.includes("procurement") || p.includes("buyer")) {
    dms = "CFO, VP of Procurement, Head of Finance";
    dmReason = "Mapped to financial and procurement decision makers.";
  } else if (tech !== "Not Specified" && (tech.includes("SAP") || tech.includes("Oracle"))) {
    dms = "CIO, VP Enterprise Applications, Solutions Architect";
    dmReason = "Recommended stakeholders for ERP modernisation projects.";
  }

  // 10. Buying Signals
  let signalsVal = "Not Specified";
  let sigReason = "No specific trigger events requested.";
  if (p.includes("migrate") || p.includes("migration")) {
    signalsVal = "Cloud Migration Signature, Database End-of-Life, Tech Job Openings";
    sigReason = "Detected migration intent signals.";
  } else if (p.includes("upgrade") || p.includes("modernize")) {
    signalsVal = "ERP Upgrade Budget Requests, RFP releases, Digital Strategy Press Releases";
    sigReason = "Detected system modernisation intent signals.";
  } else if (p.includes("ai") || p.includes("genai")) {
    signalsVal = "GenAI Engine development, Hiring Machine Learning Engineers, API integrations";
    sigReason = "Detected AI infrastructure expansion signals.";
  }

  // 11. Competitor Intelligence
  let competitorsVal = "Not Specified";
  let compReason = "No competitor focus specified.";
  if (tech !== "Not Specified") {
    if (tech.includes("SAP")) {
      competitorsVal = "Oracle, Microsoft, Workday, Infor";
      compReason = "Identified competitors in the ERP market space.";
    } else if (tech.includes("Oracle")) {
      competitorsVal = "SAP, Microsoft Dynamics, Salesforce";
      compReason = "Identified competitors in SaaS and database suites.";
    }
  }

  // 12. Qualification Rules
  let rulesVal = "Not Specified";
  let rulesReason = "Using default compliance guidelines.";
  const activeRules = [];
  if (revenue !== "Not Specified") activeRules.push(`Revenue must be ${revenue}`);
  if (age !== "Not Specified") activeRules.push(`Operating history must be ${age}`);
  if (geography !== "Not Specified") activeRules.push("Must be within targeted geographies");
  if (tech !== "Not Specified") activeRules.push(`Must detect signature of ${tech}`);
  if (activeRules.length > 0) {
    rulesVal = activeRules.join(" | ");
    rulesReason = "Auto-structured matching criteria from query parameters.";
  }

  // 13. Suggested Filters
  let filtersVal = "Not Specified";
  let filtersReason = "Suggested validation parameters omitted since prompt parameters are incomplete.";
  if (industry !== "Not Specified" && geography !== "Not Specified") {
    filtersVal = "Verified Corporate Website | active LinkedIn Handle | CEO/CIO Contact details verified";
    filtersReason = "Ensures high deliverability for outbound sales intelligence.";
  }

  // 14. Research Sources
  let sourcesVal = "Not Specified";
  let sourcesReason = "Define research targets to allocate targeted scraper nodes.";
  if (industry !== "Not Specified" || tech !== "Not Specified") {
    sourcesVal = "LinkedIn Talent Directory, Corporate Webpage Signatures, Government Registries, Tech Stack Trackers (BuiltWith, Wappalyzer)";
    sourcesReason = "Selected optimized scrapers based on requested technologies and company scale.";
  }

  // 15. Strategy
  let strategyVal = "Not Specified";
  if (industry !== "Not Specified" || geography !== "Not Specified") {
    strategyVal = `The AI will crawls business registers to identify companies matching: ${industry} in ${geography === "Europe" ? "major EU countries" : geography}. It will scan HTML signatures for ${tech !== "Not Specified" ? tech : "legacy software"} and cross-reference LinkedIn to profile key decision makers (${dms !== "Not Specified" ? dms : "IT leadership"}).`;
  }

  // 16. Estimated Output
  let estimatedVal = "Not Specified";
  let companiesEst = 0;
  let dmsEst = 0;
  let pipelineEst = "$0";
  let durationEst = "0h";
  let confidenceEst = "0%";

  if (p.includes("europe") && p.includes("manufacturing")) {
    companiesEst = 340;
    dmsEst = 1450;
    pipelineEst = "$4.2M";
    durationEst = "6h 15m";
    confidenceEst = "96%";
    estimatedVal = `Companies: ${companiesEst} | Decision Makers: ${dmsEst} | Pipeline: ${pipelineEst} | Duration: ${durationEst} | Confidence: ${confidenceEst}`;
  } else if (p.includes("indonesia") && p.includes("sap")) {
    companiesEst = 42;
    dmsEst = 180;
    pipelineEst = "$680K";
    durationEst = "2h 30m";
    confidenceEst = "91%";
    estimatedVal = `Companies: ${companiesEst} | Decision Makers: ${dmsEst} | Pipeline: ${pipelineEst} | Duration: ${durationEst} | Confidence: ${confidenceEst}`;
  } else if (industry !== "Not Specified" || geography !== "Not Specified") {
    companiesEst = 120;
    dmsEst = 480;
    pipelineEst = "$1.8M";
    durationEst = "3h 45m";
    confidenceEst = "94%";
    estimatedVal = `Companies: ${companiesEst} | Decision Makers: ${dmsEst} | Pipeline: ${pipelineEst} | Duration: ${durationEst} | Confidence: ${confidenceEst}`;
  }  // Combined ICP Rules
  let icpVal = "Not Specified";
  let icpReason = "No clear ICP constraints detected.";
  const icpParts = [];
  if (revenue !== "Not Specified") icpParts.push(`Revenue: ${revenue}`);
  if (employees !== "Not Specified") icpParts.push(`Size: ${employees}`);
  if (age !== "Not Specified") icpParts.push(`Age: ${age}`);
  if (type !== "Not Specified") icpParts.push(`Type: ${type}`);
  if (icpParts.length > 0) {
    icpVal = icpParts.join(" | ");
    icpReason = "Synthesized from company revenue, employee count, legal structure, and operating age constraints.";
  }

  // Combined Decision Makers & Buying Signals
  let dmsSignalsVal = "Not Specified";
  let dmsSignalsReason = "No persona or buying signal triggers specified.";
  const dsParts = [];
  if (dms !== "Not Specified") dsParts.push(`Personas: ${dms}`);
  if (signalsVal !== "Not Specified") dsParts.push(`Signals: ${signalsVal}`);
  if (dsParts.length > 0) {
    dmsSignalsVal = dsParts.join(" | ");
    dmsSignalsReason = "Combined decision maker personas and target buying intent signals.";
  }

  return [
    { key: "objective", title: "1. Research Objective", value: objective, confidence: objective !== "Not Specified" ? "98%" : "0%", reasoning: objReason, source: objective !== "Not Specified" ? "AI Core Parser" : "Unspecified" },
    { key: "industry", title: "2. Industry & Vertical", value: industry, confidence: industry !== "Not Specified" ? "95%" : "0%", reasoning: industryReason, source: industry !== "Not Specified" ? "Industry Taxonomy Mapping" : "Unspecified" },
    { key: "geography", title: "3. Geography Filter", value: geography, confidence: geography !== "Not Specified" ? "94%" : "0%", reasoning: geoReason, source: geography !== "Not Specified" ? "Geocoding Database" : "Unspecified" },
    { key: "icp", title: "4. Target ICP (Revenue & Size)", value: icpVal, confidence: icpVal !== "Not Specified" ? "92%" : "0%", reasoning: icpReason, source: icpVal !== "Not Specified" ? "Corporate Graph Scraper" : "Unspecified" },
    { key: "technologies", title: "5. Technology Requirements", value: tech, confidence: tech !== "Not Specified" ? "96%" : "0%", reasoning: techReason, source: tech !== "Not Specified" ? "Web Stack Signatures" : "Unspecified" },
    { key: "personas_signals", title: "6. Decision Makers & Buying Signals", value: dmsSignalsVal, confidence: dmsSignalsVal !== "Not Specified" ? "93%" : "0%", reasoning: dmsSignalsReason, source: dmsSignalsVal !== "Not Specified" ? "Intent & Contacts Engine" : "Unspecified" }
  ];
}

interface CompanyContact {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
}

function getCompanyPeople(companyName: string, domain: string): CompanyContact[] {
  const cleanDomain = domain || "domain.com";
  const nameKey = companyName.toLowerCase();
  
  if (nameKey.includes("astra") || nameKey.includes("siloam") || nameKey.includes("mandiri") || nameKey.includes("indonesia")) {
    return [
      {
        name: "Budi Santoso",
        title: "Chief Information Officer (CIO)",
        email: `budi.santoso@${cleanDomain}`,
        phone: "+62 21-508-8812",
        linkedin: `https://linkedin.com/in/budi-santoso-${nameKey.replace(/[^a-z0-9]/g, "")}`
      },
      {
        name: "Dewi Lestari",
        title: "VP Enterprise Applications",
        email: `dewi.lestari@${cleanDomain}`,
        phone: "+62 21-508-8815",
        linkedin: `https://linkedin.com/in/dewi-lestari-${nameKey.replace(/[^a-z0-9]/g, "")}`
      },
      {
        name: "Adi Wijaya",
        title: "Head of Cloud Infrastructure",
        email: `adi.wijaya@${cleanDomain}`,
        phone: "+62 21-508-8820",
        linkedin: `https://linkedin.com/in/adi-wijaya-${nameKey.replace(/[^a-z0-9]/g, "")}`
      }
    ];
  } else if (nameKey.includes("daimler") || nameKey.includes("siemens") || nameKey.includes("bosch") || nameKey.includes("europe")) {
    return [
      {
        name: "Dieter Zetsche",
        title: "VP Group IT & Infrastructure",
        email: `d.zetsche@${cleanDomain}`,
        phone: "+49 711 17-0",
        linkedin: `https://linkedin.com/in/dieter-zetsche-${nameKey.replace(/[^a-z0-9]/g, "")}`
      },
      {
        name: "Markus Schäfer",
        title: "Director of ERP Modernization",
        email: `m.schaefer@${cleanDomain}`,
        phone: "+49 711 17-2342",
        linkedin: `https://linkedin.com/in/markus-schaefer-${nameKey.replace(/[^a-z0-9]/g, "")}`
      },
      {
        name: "Sabine Kohleisen",
        title: "IT Procurement & Compliance Officer",
        email: `s.kohleisen@${cleanDomain}`,
        phone: "+49 711 17-4521",
        linkedin: `https://linkedin.com/in/sabine-kohleisen-${nameKey.replace(/[^a-z0-9]/g, "")}`
      }
    ];
  } else {
    return [
      {
        name: "Sarah Jenkins",
        title: "Chief Information Officer (CIO)",
        email: `s.jenkins@${cleanDomain}`,
        phone: "+1 (312) 555-0192",
        linkedin: `https://linkedin.com/in/sarah-jenkins-${nameKey.replace(/[^a-z0-9]/g, "")}`
      },
      {
        name: "David Miller",
        title: "VP Enterprise Architecture",
        email: `d.miller@${cleanDomain}`,
        phone: "+1 (312) 555-0195",
        linkedin: `https://linkedin.com/in/david-miller-${nameKey.replace(/[^a-z0-9]/g, "")}`
      },
      {
        name: "Elena Rostova",
        title: "Director of Systems Integration",
        email: `e.rostova@${cleanDomain}`,
        phone: "+1 (312) 555-0199",
        linkedin: `https://linkedin.com/in/elena-rostova-${nameKey.replace(/[^a-z0-9]/g, "")}`
      }
    ];
  }
}

type InnerModule = 
  | "dashboard"
  | "tasks"
  | "campaigns"
  | "companies"
  | "results"
  | "people"
  | "signals"
  | "review"
  | "history"
  | "settings";

type WizardScreen = 1 | 2 | 3 | 4;

const INITIAL_TASKS = [
  {
    id: "TSK-001",
    name: "Indonesia Palm Oil Mill Research",
    objective: "Identify palm oil companies in Indonesia with revenue > 10M USD operating milling, refinery, and distribution networks.",
    region: "Indonesia & Malaysia",
    icp: "Palm Oil Milling / Refinery / Distribution",
    tech: "Agri-Tech ERP, SAP, Oracle DB",
    people: "Operations Director, Supply Chain Head, IT Manager",
    signals: "Production expansion, new refinery setup",
    sources: "Industry registries, WHOIS, Trade directories",
    rules: "Revenue > $10M USD"
  },
  {
    id: "TSK-002",
    name: "APAC S/4HANA Legacy ERP Migration Scan",
    objective: "Find manufacturing companies in Indonesia and Malaysia using SAP ECC likely to migrate to S/4HANA.",
    region: "APAC (Indonesia, Malaysia, Singapore)",
    icp: "Manufacturing, Chemicals, Automotive",
    tech: "SAP ECC, Oracle Database, Microsoft SQL Server",
    people: "CIO, VP IT, Enterprise Architect, IT Director",
    signals: "ERP modernization announcement, hiring SAP experts",
    sources: "LinkedIn, Job Portals, Corporate blogs",
    rules: "Company employees > 500 | Priority weight: High"
  },
  {
    id: "TSK-003",
    name: "Europe Digital Retail Commerce Scan",
    objective: "Target mid-market retail firms in Europe running legacy custom codebases.",
    region: "Europe",
    icp: "Digital Retail, E-Commerce, Apparel",
    tech: "Custom PHP, legacy Magento, Oracle retail systems",
    people: "Head of E-Commerce, CTO, Director of Digital Experience",
    signals: "Digital transformation mandates, legacy system upgrades",
    sources: "BuiltWith technographics, Wappalyzer",
    rules: "Revenue €20M - €150M"
  }
];

export default function MarketIntelligence({ subModule }: { subModule?: string }) {
  const [localModule] = useState<InnerModule>("dashboard");
  const activeModule = (subModule && ["dashboard", "tasks", "campaigns", "companies", "results", "people", "signals", "review", "history", "settings"].includes(subModule)) ? (subModule as InnerModule) : localModule;
  
  const [campaigns, setCampaigns] = useState<any[]>(INITIAL_CAMPAIGNS);
  const [companies, setCompanies] = useState<any[]>(DEFAULT_COMPANIES);
  const [contacts, setContacts] = useState<any[]>([]);
  const [signals, setSignals] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>(INITIAL_TASKS);

  // Fetch from actual API on component load
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const campsRes = await api.dashboard.getCampaigns();
        if (campsRes.success) setCampaigns(campsRes.campaigns);

        const compsRes = await api.dashboard.getCompanies();
        if (compsRes.success) setCompanies(compsRes.companies);

        const contactsRes = await api.dashboard.getContacts();
        if (contactsRes.success) setContacts(contactsRes.contacts);

        const signalsRes = await api.dashboard.getSignals();
        if (signalsRes.success) setSignals(signalsRes.signals);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };
    loadDashboardData();
  }, []);

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

  const [blueprintCards, setBlueprintCards] = useState<Array<{
    key: string;
    title: string;
    value: string;
    confidence: string;
    reasoning: string;
    source: string;
  }>>([]);

  const [crawlStatus, setCrawlStatus] = useState<"Queued" | "Running" | "Paused" | "Completed" | "Failed">("Queued");
  const [crawlMetrics, setCrawlMetrics] = useState({
    companiesFound: 0,
    decisionMakersFound: 0,
    buyingSignals: 0,
    technologiesDetected: 0,
    emailsVerified: 0,
    confidence: "95%"
  });

  const [currentCampaign, setCurrentCampaign] = useState<any | null>(null);
  const [detailTab, setDetailTab] = useState<"overview" | "companies" | "signals" | "tech" | "market" | "reports" | "timeline">("overview");
  const [activeCompanyProfile, setActiveCompanyProfile] = useState<any | null>(null);
  const [activeDecisionMaker, setActiveDecisionMaker] = useState<any | null>(null);

  useEffect(() => {
    setCurrentCampaign(null);
    setDetailTab("overview");
    setActiveCompanyProfile(null);
    setActiveDecisionMaker(null);
    setIsCreatingWizard(false);
  }, [activeModule]);
  
  // Advanced Config
  const [advOpen, setAdvOpen] = useState(false);
  const [scheduling, setScheduling] = useState("Run Once");
  const [duplicateRules, setDuplicateRules] = useState("Skip Existing");
  const [reviewPolicy, setReviewPolicy] = useState("Manual Review");
  const [automationRules, setAutomationRules] = useState("SWOT + CRM Sync");
  const [selectedSystems, setSelectedSystems] = useState<string[]>(["LinkedIn Talent", "BuiltWith & Wappalyzer", "Apollo.io & ZoomInfo"]);
  const [customUrls, setCustomUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");
  const [customFiles, setCustomFiles] = useState<{ name: string; size: string }[]>([]);
  const [approvalStatuses, setApprovalStatuses] = useState<Record<string, "pending" | "approved" | "rejected">>({});
  const [activeTab, setActiveTab] = useState<"companies" | "leads">("companies");
  const [researchedCompanies, setResearchedCompanies] = useState<string[]>([]);
  const [loadingLeads, setLoadingLeads] = useState<Record<string, boolean>>({});
  const [discoveredLeads, setDiscoveredLeads] = useState<any[]>([]);
  const [companyApprovals, setCompanyApprovals] = useState<Record<string, "pending" | "approved" | "rejected">>({});
  const [leadApprovals, setLeadApprovals] = useState<Record<string, "pending" | "approved" | "rejected">>({});

  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);

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

  const handlePushToCRM = async (companyId: string) => {
    try {
      const company = companies.find(c => c.id === companyId);
      if (company) {
        const updated = { ...company, owner: "Pushed to CRM" };
        const res = await api.dashboard.saveCompany(updated);
        if (res.success) {
          setCompanies(companies.map(c => c.id === companyId ? { ...c, owner: "Pushed to CRM" } : c));
          alert("Opportunity successfully synchronized with AI Sales CRM!");
        }
      }
    } catch (err: any) {
      alert("Failed to synchronize with Sales CRM: " + err.message);
    }
  };

  const handleGenerateBlueprint = () => {
    if (!campaignPrompt.trim()) return;
    
    // Parse dynamic prompt context
    const context = parsePromptToContext(campaignPrompt);
    const cards = parsePromptToBlueprint(campaignPrompt);
    setBlueprintCards(cards);
    
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
    setCrawlStatus("Queued");
    setCrawlMetrics({
      companiesFound: 0,
      decisionMakersFound: 0,
      buyingSignals: 0,
      technologiesDetected: 0,
      emailsVerified: 0,
      confidence: "95%"
    });

    const campId = `RC-00${campaigns.length + 1}`;
    setActiveCampaignId(campId);

    const newCamp = {
      id: campId,
      name: `AI Research - ${blueprintGoal.split(" ").slice(0, 4).join(" ")}...`,
      objective: blueprintGoal,
      status: "Active",
      owner: "Sarah Chen",
      created: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      lastRun: "Just Now",
      nextRun: scheduling,
      companiesFound: blueprintForecast.companies,
      qualifiedOps: blueprintForecast.opportunities,
      pipelineValue: blueprintForecast.pipeline,
      progress: 100
    };

    const targetCompanies = blueprintForecast.companies || 120;
    const targetDms = blueprintForecast.decisionMakers || 480;
    const targetSignals = blueprintForecast.opportunities || 8;
    const targetTechs = 6;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress === 10) {
        setCrawlStatus("Running");
      }
      
      setPipelineProgress(currentProgress);

      setCrawlMetrics({
        companiesFound: Math.floor((currentProgress / 100) * targetCompanies),
        decisionMakersFound: Math.floor((currentProgress / 100) * targetDms),
        buyingSignals: Math.floor((currentProgress / 100) * targetSignals),
        technologiesDetected: Math.floor((currentProgress / 100) * targetTechs),
        emailsVerified: Math.floor((currentProgress / 100) * targetDms * 0.85),
        confidence: "95%"
      });

      if (currentProgress >= 100) {
        clearInterval(interval);
        setCrawlStatus("Completed");

        api.dashboard.createCampaign(newCamp)
          .then(res => {
            if (res.success) {
              setCampaigns(prev => [...prev, res.campaign]);
            }
          })
          .catch(err => {
            console.error("Failed to save campaign:", err);
          })
          .finally(() => {
            // Keep on screen for manual review and approval
          });
      }
    }, 400);
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

            {/* TARGET SYSTEMS SOURCE SELECTION & CUSTOM INPUTS */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 750, letterSpacing: "0.05em", marginBottom: 8 }}>
                  Target Systems & Sources (Extract Parameters From)
                </div>
                <p style={{ color: "#9CA3AF", fontSize: 12, margin: 0 }}>We suggested the best sources based on your goal. Check or uncheck sources below.</p>
              </div>

              {/* Best Recommended Sources */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { name: "LinkedIn Talent", desc: "For Decision Makers & Corporate Roles" },
                  { name: "BuiltWith & Wappalyzer", desc: "For Technology Requirements" },
                  { name: "SEC Filings & Registries", desc: "For Revenue & Age Statistics" },
                  { name: "Apollo.io & ZoomInfo", desc: "For Verified Emails & Phone Numbers" },
                  { name: "Google Search & News", desc: "For Scanned Buying Signals & Press Releases" },
                  { name: "Salesforce / Hubspot CRM", desc: "For Cross-checking Existing Accounts" }
                ].map(sys => {
                  const selected = selectedSystems.includes(sys.name);
                  return (
                    <button
                      key={sys.name}
                      onClick={() => {
                        if (selected) {
                          setSelectedSystems(selectedSystems.filter(s => s !== sys.name));
                        } else {
                          setSelectedSystems([...selectedSystems, sys.name]);
                        }
                      }}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: selected ? "rgba(99, 102, 241, 0.08)" : "rgba(255,255,255,0.01)",
                        border: selected ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                        color: selected ? "#fff" : "#9CA3AF",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                        <input 
                          type="checkbox" 
                          checked={selected} 
                          onChange={() => {}} 
                          style={{ accentColor: "var(--color-primary)", cursor: "pointer" }} 
                        />
                        {sys.name}
                      </div>
                      <div style={{ fontSize: 11, color: selected ? "rgba(255,255,255,0.6)" : "#6B7280", marginTop: 4 }}>{sys.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Add Custom URL or Supporting Files */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Custom URL Input */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Add Supporting Research URLs</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input 
                      type="text" 
                      value={inputUrl}
                      onChange={e => setInputUrl(e.target.value)}
                      placeholder="e.g., https://example.com/company-pricing"
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: "rgba(0, 0, 0, 0.2)",
                        border: "1px solid var(--color-border)",
                        color: "#fff",
                        fontSize: 13,
                        outline: "none"
                      }}
                    />
                    <button 
                      onClick={() => {
                        if (inputUrl.trim()) {
                          setCustomUrls([...customUrls, inputUrl.trim()]);
                          setInputUrl("");
                        }
                      }}
                      style={{
                        padding: "0 16px",
                        borderRadius: 8,
                        background: "var(--color-primary)",
                        color: "#fff",
                        border: "none",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer"
                      }}
                    >
                      Add Link
                    </button>
                  </div>

                  {customUrls.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                      {customUrls.map((url, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "6px 12px", borderRadius: 6, fontSize: 12, border: "1px solid rgba(255,255,255,0.04)" }}>
                          <span style={{ color: "rgba(255,255,255,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>{url}</span>
                          <button onClick={() => setCustomUrls(customUrls.filter((_, i) => i !== idx))} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 11 }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Supporting Files Upload */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Upload Supporting Knowledge Files</label>
                  <div style={{
                    border: "1px dashed var(--color-border)",
                    borderRadius: 8,
                    padding: "16px 20px",
                    textAlign: "center" as const,
                    background: "rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    position: "relative" as const
                  }}>
                    <input 
                      type="file" 
                      multiple
                      onChange={e => {
                        if (e.target.files) {
                          const filesArr = Array.from(e.target.files).map(f => ({
                            name: f.name,
                            size: (f.size / 1024).toFixed(1) + " KB"
                          }));
                          setCustomFiles([...customFiles, ...filesArr]);
                        }
                      }}
                      style={{
                        position: "absolute" as const,
                        top: 0, left: 0, width: "100%", height: "100%",
                        opacity: 0, cursor: "pointer"
                      }}
                    />
                    <div style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Click or Drag files to upload</div>
                    <div style={{ color: "#6B7280", fontSize: 11 }}>PDF, CSV, TXT, or DOCX (max 10MB)</div>
                  </div>

                  {customFiles.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                      {customFiles.map((file, idx) => (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "6px 12px", borderRadius: 6, fontSize: 12, border: "1px solid rgba(255,255,255,0.04)" }}>
                          <span style={{ color: "rgba(255,255,255,0.85)" }}>📄 {file.name} <span style={{ color: "#6B7280", fontSize: 10 }}>({file.size})</span></span>
                          <button onClick={() => setCustomFiles(customFiles.filter((_, i) => i !== idx))} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 11 }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          </div>

            {/* MISSING PARAMETERS ALERT */}
            {blueprintCards.some(c => c.value === "Not Specified" || !c.value) && (
              <div style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.3)", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#F59E0B", fontSize: 14 }}>Key Research Parameters Missing</div>
                  <div style={{ color: "#D1D5DB", fontSize: 12, marginTop: 2 }}>
                    Please review and fill in the highlighted parameters below to help the AI crawl successfully.
                  </div>
                </div>
              </div>
            )}

            {/* Editable Strategy Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {blueprintCards.map(card => {
                const isMissing = card.value === "Not Specified" || !card.value;
                return (
                  <div 
                    key={card.key} 
                    style={{
                      ...cardStyle,
                      border: isMissing ? "1px dashed rgba(245, 158, 11, 0.5)" : "1px solid var(--color-border)",
                      background: isMissing ? "rgba(245, 158, 11, 0.02)" : "rgba(255,255,255,0.02)"
                    }}
                  >
                    <div style={cardHeaderStyle}>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {card.title}
                        {isMissing && (
                          <span style={{ background: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                            Action Required
                          </span>
                        )}
                      </span>
                      <button 
                        onClick={() => {
                          const newCards = [...blueprintCards];
                          const idx = newCards.findIndex(c => c.key === card.key);
                          if (idx > -1) {
                            newCards[idx].confidence = Math.floor(Math.random() * 10 + 90) + "%";
                            newCards[idx].value = "Simulated update for " + card.title.substring(3);
                            setBlueprintCards(newCards);
                          }
                        }} 
                        style={{ ...editBtnStyle, color: "#10B981" }}
                      >
                        Regenerate
                      </button>
                    </div>
                    
                    <textarea 
                      value={card.value === "Not Specified" ? "" : card.value} 
                      placeholder={isMissing ? "Specify key parameter details here..." : ""}
                      onChange={e => {
                        const newCards = [...blueprintCards];
                        const idx = newCards.findIndex(c => c.key === card.key);
                        if (idx > -1) {
                          newCards[idx].value = e.target.value;
                          setBlueprintCards(newCards);
                        }
                      }} 
                      style={{
                        ...textStyle,
                        border: isMissing ? "1px solid rgba(245, 158, 11, 0.4)" : "1px solid var(--color-border)",
                        background: "rgba(0, 0, 0, 0.25)",
                        height: 72,
                        lineHeight: 1.4
                      }} 
                    />
                    
                    <div style={aiExplStyle}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ color: "var(--color-primary)", fontWeight: 700 }}>AI Reasoning:</span>
                        <span style={{ color: "#10B981", fontWeight: 600 }}>Confidence: {card.confidence}</span>
                      </div>
                      <div style={{ color: "#9CA3AF" }}>{card.reasoning}</div>
                      <div style={{ fontSize: 10, color: "#6B7280", marginTop: 6, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 4 }}>
                        Source: {card.source}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <button onClick={handleLaunchCampaign} style={{ padding: "10px 24px", borderRadius: 8, background: "var(--color-primary)", border: "none", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                Launch AI Research Mission
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
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px", display: "flex", flexDirection: "column", gap: 28, fontFamily: "'Inter', sans-serif" }}>
            
            {/* Header Details Card */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 750, letterSpacing: "0.05em" }}>Active Research Goal</span>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "6px 0 0" }}>{blueprintGoal}</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", borderRadius: 100, padding: "6px 14px" }}>
                  <span style={{ fontSize: 12, color: "#9CA3AF" }}>Status:</span>
                  <span style={{
                    fontSize: 12, fontWeight: 700,
                    color: crawlStatus === "Completed" ? "#10B981" : crawlStatus === "Running" ? "#38BDF8" : "#F59E0B"
                  }}>
                    {crawlStatus === "Running" ? "Crawl in Progress..." : crawlStatus}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16, fontSize: 13 }}>
                <div>
                  <span style={{ color: "#6B7280", display: "block", marginBottom: 2 }}>Research Duration</span>
                  <strong style={{ color: "#fff" }}>{blueprintForecast.duration}</strong>
                </div>
                <div>
                  <span style={{ color: "#6B7280", display: "block", marginBottom: 2 }}>Estimated Remaining</span>
                  <strong style={{ color: "#38BDF8" }}>
                    {crawlStatus === "Completed" ? "Completed" : `${Math.max(0, Math.round((1 - pipelineProgress / 100) * 255))} mins`}
                  </strong>
                </div>
                <div>
                  <span style={{ color: "#6B7280", display: "block", marginBottom: 2 }}>Resources Searched</span>
                  <strong style={{ color: "#fff", overflow: "hidden", textOverflow: "ellipsis", display: "block", whiteSpace: "nowrap" }}>
                    {selectedSystems.join(", ") || "Web Crawler"}
                  </strong>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600 }}>
                  <span style={{ color: "#6B7280" }}>Crawl Progress</span>
                  <span style={{ color: "var(--color-primary)" }}>{pipelineProgress}% Scanned</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pipelineProgress}%`, background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))", borderRadius: 3, transition: "width 0.3s ease" }} />
                </div>
              </div>
            </div>

            {/* TAB CONTROLS */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 2 }}>
              <div style={{ display: "flex", gap: 24 }}>
                <button
                  onClick={() => setActiveTab("companies")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "12px 4px",
                    color: activeTab === "companies" ? "var(--color-primary)" : "#6B7280",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    position: "relative",
                    borderBottom: activeTab === "companies" ? "2px solid var(--color-primary)" : "none"
                  }}
                >
                  Companies ({
                    companies.filter((_, idx) => {
                      if (idx === 0) return pipelineProgress >= 20;
                      if (idx === 1) return pipelineProgress >= 60;
                      return pipelineProgress >= 90;
                    }).length
                  })
                </button>
                <button
                  onClick={() => setActiveTab("leads")}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "12px 4px",
                    color: activeTab === "leads" ? "var(--color-primary)" : "#6B7280",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    position: "relative",
                    borderBottom: activeTab === "leads" ? "2px solid var(--color-primary)" : "none"
                  }}
                >
                  Leads / Contacts ({discoveredLeads.length})
                </button>
              </div>

              {/* Bulk Approval Actions based on active tab */}
              {activeTab === "companies" ? (
                <button
                  onClick={() => {
                    const loaded = companies.filter((_, idx) => {
                      if (idx === 0) return pipelineProgress >= 20;
                      if (idx === 1) return pipelineProgress >= 60;
                      return pipelineProgress >= 90;
                    });
                    const updated = { ...companyApprovals };
                    loaded.forEach(c => {
                      if (!updated[c.id]) updated[c.id] = "approved";
                    });
                    setCompanyApprovals(updated);
                  }}
                  disabled={companies.length === 0}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "var(--color-primary)",
                    border: "none",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: companies.length === 0 ? 0.5 : 1
                  }}
                >
                  Bulk Approve Companies
                </button>
              ) : (
                <button
                  onClick={() => {
                    const updated = { ...leadApprovals };
                    discoveredLeads.forEach(l => {
                      if (!updated[l.id]) updated[l.id] = "approved";
                    });
                    setLeadApprovals(updated);
                  }}
                  disabled={discoveredLeads.length === 0}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "var(--color-primary)",
                    border: "none",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    opacity: discoveredLeads.length === 0 ? 0.5 : 1
                  }}
                >
                  Bulk Approve Leads
                </button>
              )}
            </div>

            {/* TAB CONTENTS */}
            {activeTab === "companies" && (
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 20 }}>
                {companies.filter((_, idx) => {
                  if (idx === 0) return pipelineProgress >= 20;
                  if (idx === 1) return pipelineProgress >= 60;
                  return pipelineProgress >= 90;
                }).length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#6B7280", fontSize: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "var(--color-primary)", animation: "spin 1s linear infinite" }} />
                    Scanning database registries to extract companies matching objective...
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#6B7280", fontWeight: 700 }}>
                          <th style={{ padding: "12px 8px", width: "35%" }}>Company / HQ & Remark</th>
                          <th style={{ padding: "12px 8px" }}>Match Level</th>
                          <th style={{ padding: "12px 8px" }}>Industry</th>
                          <th style={{ padding: "12px 8px" }}>Detected Stack</th>
                          <th style={{ padding: "12px 8px" }}>Lead Action</th>
                          <th style={{ padding: "12px 8px", textAlign: "right" }}>Status / Approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.filter((_, idx) => {
                          if (idx === 0) return pipelineProgress >= 20;
                          if (idx === 1) return pipelineProgress >= 60;
                          return pipelineProgress >= 90;
                        }).map(comp => {
                          const status = companyApprovals[comp.id] || "pending";
                          const isResearched = researchedCompanies.includes(comp.id);
                          const isLeadLoading = loadingLeads[comp.id];
                          
                          // Determine High, Low, Moderate match priority
                          const score = comp.aiScore || 80;
                          const matchLevel = score >= 92 ? "High" : score >= 82 ? "Moderate" : "Low";
                          const matchColor = matchLevel === "High" ? "#10B981" : matchLevel === "Moderate" ? "#F59E0B" : "#EF4444";
                          const matchBg = matchLevel === "High" ? "rgba(16,185,129,0.12)" : matchLevel === "Moderate" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)";
                          
                          // Status Badge Highlighting
                          const statusColor = status === "approved" ? "#10B981" : status === "rejected" ? "#EF4444" : "#38BDF8";
                          const statusBg = status === "approved" ? "rgba(16,185,129,0.15)" : status === "rejected" ? "rgba(239,68,68,0.15)" : "rgba(56,189,248,0.15)";
                          const statusText = status === "approved" ? "Approved" : status === "rejected" ? "Excluded" : "Reviewing";

                          return (
                            <tr key={comp.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "middle" }}>
                              <td style={{ padding: "16px 8px" }}>
                                <div style={{ fontWeight: 700, color: "#fff" }}>{comp.name}</div>
                                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{comp.domain} · {comp.hq}</div>
                                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6, fontStyle: "italic", lineHeight: 1.4, background: "rgba(255,255,255,0.01)", padding: "4px 8px", borderRadius: 4, borderLeft: "2px solid var(--color-primary)" }}>
                                  <strong>AI Remark:</strong> {comp.aiSummary || "Match detected based on parameters."}
                                </div>
                              </td>
                              <td style={{ padding: "16px 8px" }}>
                                <span style={{
                                  fontSize: 11, fontWeight: 700,
                                  padding: "3px 8px", borderRadius: 6,
                                  color: matchColor, background: matchBg,
                                  border: `1px solid ${matchColor}40`
                                }}>
                                  {matchLevel}
                                </span>
                              </td>
                              <td style={{ padding: "16px 8px", color: "#D1D5DB" }}>{comp.industry}</td>
                              <td style={{ padding: "16px 8px" }}>
                                <span style={{ color: "var(--color-primary)", fontSize: 12 }}>{comp.stack}</span>
                              </td>
                              <td style={{ padding: "16px 8px" }}>
                                {isResearched ? (
                                  <span style={{ color: "#10B981", fontSize: 12, fontWeight: 600 }}>Researched ✓</span>
                                ) : isLeadLoading ? (
                                  <span style={{ color: "var(--color-primary)", fontSize: 12 }}>Researching...</span>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setLoadingLeads(prev => ({ ...prev, [comp.id]: true }));
                                      setTimeout(() => {
                                        setLoadingLeads(prev => ({ ...prev, [comp.id]: false }));
                                        setResearchedCompanies(prev => [...prev, comp.id]);
                                        const contacts = getCompanyPeople(comp.name, comp.domain);
                                        const newLeads = contacts.map(c => ({
                                          ...c,
                                          id: `${comp.id}-${c.name.replace(/\s+/g, "-")}`,
                                          companyId: comp.id,
                                          companyName: comp.name
                                        }));
                                        setDiscoveredLeads(prev => [...prev, ...newLeads]);
                                        setActiveTab("leads");
                                      }, 1200);
                                    }}
                                    style={{
                                      padding: "6px 12px",
                                      borderRadius: 6,
                                      background: "rgba(99, 102, 241, 0.15)",
                                      border: "1px solid var(--color-primary)",
                                      color: "#fff",
                                      fontSize: 12,
                                      fontWeight: 600,
                                      cursor: "pointer"
                                    }}
                                  >
                                    Research Leads
                                  </button>
                                )}
                              </td>
                              <td style={{ padding: "16px 8px", textAlign: "right" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                                  <span style={{
                                    fontSize: 10, fontWeight: 700,
                                    padding: "2px 6px", borderRadius: 4,
                                    color: statusColor, background: statusBg,
                                    textTransform: "uppercase", letterSpacing: "0.02em"
                                  }}>
                                    {statusText}
                                  </span>
                                  {status === "pending" && (
                                    <div style={{ display: "flex", gap: 6 }}>
                                      <button
                                        onClick={() => setCompanyApprovals(prev => ({ ...prev, [comp.id]: "approved" }))}
                                        style={{ padding: "3px 6px", borderRadius: 4, background: "rgba(16,185,129,0.15)", border: "1px solid #10B981", color: "#10B981", fontSize: 11, cursor: "pointer", fontWeight: 600 }}
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => setCompanyApprovals(prev => ({ ...prev, [comp.id]: "rejected" }))}
                                        style={{ padding: "3px 6px", borderRadius: 4, background: "rgba(239,68,68,0.15)", border: "1px solid #EF4444", color: "#EF4444", fontSize: 11, cursor: "pointer", fontWeight: 600 }}
                                      >
                                        Exclude
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "leads" && (
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 20 }}>
                {discoveredLeads.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#6B7280", fontSize: 13 }}>
                    No leads researched yet. Go to "Companies" tab and click "Research Leads" for a specific company to crawl contacts.
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#6B7280", fontWeight: 700 }}>
                          <th style={{ padding: "12px 8px" }}>Name / Title</th>
                          <th style={{ padding: "12px 8px" }}>Company</th>
                          <th style={{ padding: "12px 8px" }}>Email / Phone</th>
                          <th style={{ padding: "12px 8px" }}>LinkedIn Profile</th>
                          <th style={{ padding: "12px 8px", textAlign: "right" }}>Status / Approval</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discoveredLeads.map(lead => {
                          const status = leadApprovals[lead.id] || "pending";
                          return (
                            <tr key={lead.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", verticalAlign: "middle" }}>
                              <td style={{ padding: "16px 8px" }}>
                                <div style={{ fontWeight: 700, color: "#fff" }}>{lead.name}</div>
                                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{lead.title}</div>
                              </td>
                              <td style={{ padding: "16px 8px", color: "#fff" }}>{lead.companyName}</td>
                              <td style={{ padding: "16px 8px" }}>
                                <div style={{ color: "#D1D5DB" }}>{lead.email}</div>
                                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{lead.phone}</div>
                              </td>
                              <td style={{ padding: "16px 8px" }}>
                                <a href={lead.linkedin} target="_blank" rel="noreferrer" style={{ color: "var(--color-primary)", textDecoration: "none" }}>View Profile</a>
                              </td>
                              <td style={{ padding: "16px 8px", textAlign: "right" }}>
                                {status === "pending" ? (
                                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                    <button
                                      onClick={() => setLeadApprovals(prev => ({ ...prev, [lead.id]: "approved" }))}
                                      style={{ padding: "4px 8px", borderRadius: 4, background: "rgba(16,185,129,0.15)", border: "1px solid #10B981", color: "#10B981", fontSize: 11, cursor: "pointer" }}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => setLeadApprovals(prev => ({ ...prev, [lead.id]: "rejected" }))}
                                      style={{ padding: "4px 8px", borderRadius: 4, background: "rgba(239,68,68,0.15)", border: "1px solid #EF4444", color: "#EF4444", fontSize: 11, cursor: "pointer" }}
                                    >
                                      Exclude
                                    </button>
                                  </div>
                                ) : (
                                  <span style={{
                                    fontSize: 11, fontWeight: 700,
                                    color: status === "approved" ? "#10B981" : "#EF4444"
                                  }}>
                                    {status === "approved" ? "Approved ✓" : "Excluded"}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Estimated Duration Message & Redirect Action */}
            {crawlStatus === "Completed" && (
              <div style={{
                background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 16, padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12
              }}>
                <div>
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#10B981" }}>🎉 AI Research Completed!</span>
                  <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>
                    All crawling stages are finished. Please complete reviewing candidates to synchronize them to your campaigns.
                  </div>
                </div>
                 <button
                  onClick={() => {
                    // Filter and add approved companies to the global companies state
                    const approvedComps = companies.filter(c => companyApprovals[c.id] === "approved");
                    if (approvedComps.length > 0) {
                      setCompanies(prev => {
                        const existingIds = new Set(prev.map(p => p.id));
                        const filtered = approvedComps.filter(c => !existingIds.has(c.id)).map(c => ({
                          ...c,
                          campaignId: activeCampaignId || "RC-001"
                        }));
                        return [...prev, ...filtered];
                      });
                    }

                    // Filter and add approved leads to the global contacts state
                    const approvedLeads = discoveredLeads.filter(l => leadApprovals[l.id] === "approved");
                    if (approvedLeads.length > 0) {
                      setContacts(prev => {
                        const existingEmails = new Set(prev.map(p => p.email));
                        const filtered = approvedLeads.filter(l => !existingEmails.has(l.email));
                        return [...prev, ...filtered.map(l => ({
                          id: l.id,
                          name: l.name,
                          title: l.title,
                          email: l.email,
                          phone: l.phone,
                          company: l.companyName,
                          campaignId: activeCampaignId || "RC-001",
                          status: "Verified",
                          owner: "Sarah Chen",
                          linkedin: l.linkedin
                        }))];
                      });
                    }

                    setIsCreatingWizard(false);
                    setWizardScreen(1);
                  }}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 8,
                    background: "var(--color-primary)",
                    border: "none",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer"
                  }}
                >
                  Finish & View Campaigns Dashboard
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%", position: "relative" }}>
      {/* Module Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
          
          {activeCompanyProfile ? (
            /* ==========================================
               COMPANY INTELLIGENCE PROFILE
               ========================================== */
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Detail Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => { setActiveCompanyProfile(null); setActiveDecisionMaker(null); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 14 }}>
                  <ChevronLeft size={16} /> Back to Campaign
                </button>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#10B981", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", padding: "6px 12px", borderRadius: 8, fontWeight: 700 }}>
                    AI Qualified Candidate
                  </span>
                  {activeCompanyProfile.owner !== "Pushed to CRM" ? (
                    <button onClick={() => handlePushToCRM(activeCompanyProfile.id)} style={{ padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
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
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Corporate Identity & Business Summary</div>
                    <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>{activeCompanyProfile.name}</h2>
                    <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                      <Globe size={14} /> <a href={activeCompanyProfile.website || "#"} target="_blank" rel="noreferrer" style={{ color: "var(--color-primary)", textDecoration: "none" }}>{activeCompanyProfile.domain}</a>
                      <span>·</span>
                      <MapPin size={14} /> <span>{activeCompanyProfile.hq}</span>
                    </div>

                    <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.6, marginBottom: 20 }}>
                      {activeCompanyProfile.aiSummary}
                    </p>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                      <div>Revenue Bracket: <strong style={{ color: "#fff" }}>{activeCompanyProfile.revenue}</strong></div>
                      <div>Employee Range: <strong style={{ color: "#fff" }}>{activeCompanyProfile.employees}</strong></div>
                      <div>Core Industry: <strong style={{ color: "#fff" }}>{activeCompanyProfile.industry}</strong></div>
                      <div>Subsidiaries: <strong style={{ color: "#fff" }}>{activeCompanyProfile.subsidiaries || "None"}</strong></div>
                    </div>
                  </div>

                  {/* Technology Signature & Cloud Providers */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Technology Infrastructure & ERP Landscape</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>Identified Tech Stack</div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {activeCompanyProfile.stack.split(",").map((tech: string) => (
                            <span key={tech} style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.05)", fontSize: 12, color: "#D1D5DB" }}>{tech.trim()}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>ERP Architecture</div>
                        <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{activeCompanyProfile.erpLandscape || "SAP ECC 6.0"}</div>
                      </div>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 4 }}>Cloud Providers</div>
                        <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{activeCompanyProfile.cloudProviders || "Amazon Web Services (AWS)"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Discovered Decision Makers Section */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Discovered Decision Makers</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {getCompanyPeople(activeCompanyProfile.name, activeCompanyProfile.domain).map((person, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setActiveDecisionMaker(person)}
                          style={{ 
                            background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16, 
                            cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--color-primary)"}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--color-border)"}
                        >
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{person.name}</div>
                            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{person.title}</div>
                            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 4 }}>{person.email} · {person.phone}</div>
                          </div>
                          <span style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 650 }}>View Profile →</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. AI INSIGHTS COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {/* Score & Recommendation Card */}
                  <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(217,70,239,0.05))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700 }}>AI Qualification & Insights</span>
                      <span style={{ fontSize: 12, color: "#10B981", fontWeight: 700 }}>Conf: {activeCompanyProfile.confidence}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 14 }}>
                      <div style={{ fontSize: 44, fontWeight: 900, color: "var(--color-accent)", letterSpacing: "-0.04em" }}>{activeCompanyProfile.aiScore}</div>
                      <div style={{ fontSize: 14, color: "#9CA3AF" }}>/ 100 Opportunity Score</div>
                    </div>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 16, paddingTop: 16 }}>
                      <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 600 }}>AI Outreach Recommendation</div>
                      <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.5, marginTop: 6, margin: 0 }}>
                        {activeCompanyProfile.aiRecommendation || "Engage C-level decision maker immediately with custom transformation playbook."}
                      </p>
                    </div>
                  </div>

                  {/* AI Selection Rationale (Why Selected?) */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>AI Selection Rationale</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {activeCompanyProfile.reasoning.map((reason: string, idx: number) => (
                        <div key={idx} style={{ fontSize: 13, color: "#D1D5DB", display: "flex", gap: 8 }}>
                          <span style={{ color: "#10B981" }}>✓</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* News & Signals */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24 }}>
                    <div style={{ fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Recent News & Market Signals</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase" }}>Corporate Bulletin</div>
                        <p style={{ fontSize: 13, color: "#fff", margin: "4px 0 0", lineHeight: 1.5 }}>{activeCompanyProfile.recentNews}</p>
                      </div>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                        <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase" }}>Buying Intent Level</div>
                        <span style={{ fontSize: 13, color: "var(--color-accent)", fontWeight: 700, display: "block", marginTop: 4 }}>{activeCompanyProfile.buyingIntent}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : currentCampaign ? (
            /* ==========================================
               RESEARCH CAMPAIGN DETAILS VIEW (7 TABS)
               ========================================== */
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Campaign Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button onClick={() => setCurrentCampaign(null)} style={{ padding: 8, background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", borderRadius: 8, color: "#fff", cursor: "pointer" }}>
                    <ChevronLeft size={16} />
                  </button>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", margin: 0 }}>{currentCampaign.name}</h2>
                    <p style={{ color: "#6B7280", fontSize: 13, margin: "2px 0 0" }}>{currentCampaign.objective}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 650, color: "#10B981", background: "rgba(16,185,129,0.08)", padding: "6px 12px", borderRadius: 8 }}>
                    Status: {currentCampaign.status}
                  </span>
                </div>
              </div>

              {/* Tabs Selector */}
              <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", gap: 4 }}>
                {[
                  { id: "overview", label: "Overview", icon: TrendingUp },
                  { id: "companies", label: "Companies", icon: Landmark },
                  { id: "signals", label: "Buying Signals", icon: Activity },
                  { id: "tech", label: "Technology Intelligence", icon: Cpu },
                  { id: "market", label: "Market Insights", icon: Globe },
                  { id: "reports", label: "Reports", icon: FileText },
                  { id: "timeline", label: "Activity Timeline", icon: List },
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setDetailTab(t.id as any)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "12px 18px", background: "none", border: "none",
                      color: detailTab === t.id ? "var(--color-primary)" : "#6B7280", fontWeight: detailTab === t.id ? 700 : 500,
                      fontSize: 13, cursor: "pointer", borderBottom: detailTab === t.id ? "2.5px solid var(--color-primary)" : "none",
                      transition: "all 0.15s"
                    }}
                  >
                    <t.icon size={14} />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div style={{ minHeight: 400 }}>
                {/* 1. OVERVIEW */}
                {detailTab === "overview" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                      {[
                        { label: "Target Companies Found", val: companies.filter(c => c.campaignId === currentCampaign.id).length },
                        { label: "Decision Makers Profiled", val: companies.filter(c => c.campaignId === currentCampaign.id).reduce((acc, c) => acc + getCompanyPeople(c.name, c.domain).length, 0) },
                        { label: "Urgent Buying Signals", val: signals.filter(s => s.campaignId === currentCampaign.id).length },
                        { label: "Estimated Opportunity Pipeline", val: currentCampaign.pipelineValue },
                      ].map(metric => (
                        <div key={metric.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20 }}>
                          <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 600 }}>{metric.label}</div>
                          <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginTop: 8 }}>{metric.val}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Campaign Objective & Target Constraints</h3>
                      <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.5, margin: 0 }}>{currentCampaign.objective}</p>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, fontSize: 12, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 16 }}>
                        <div>Created On: <strong style={{ color: "#fff" }}>{currentCampaign.created}</strong></div>
                        <div>Last Telemetry Sync: <strong style={{ color: "#fff" }}>{currentCampaign.lastRun}</strong></div>
                        <div>Campaign Manager: <strong style={{ color: "#fff" }}>{currentCampaign.owner}</strong></div>
                        <div>Continuous Monitoring: <strong style={{ color: "var(--color-primary)" }}>{currentCampaign.nextRun}</strong></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. COMPANIES */}
                {detailTab === "companies" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ overflowX: "auto", background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12 }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 12 }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--color-border)", color: "#6B7280", textTransform: "uppercase" }}>
                            <th style={{ padding: "14px 18px" }}>Company</th>
                            <th style={{ padding: "14px 18px" }}>Industry</th>
                            <th style={{ padding: "14px 18px" }}>HQ</th>
                            <th style={{ padding: "14px 18px" }}>Revenue</th>
                            <th style={{ padding: "14px 18px" }}>Employees</th>
                            <th style={{ padding: "14px 18px" }}>Tech Stack</th>
                            <th style={{ padding: "14px 18px" }}>ERP Landscape</th>
                            <th style={{ padding: "14px 18px" }}>AI Score</th>
                            <th style={{ padding: "14px 18px" }}>Qualification</th>
                            <th style={{ padding: "14px 18px" }}>Buying Intent</th>
                            <th style={{ padding: "14px 18px" }}>DMs</th>
                            <th style={{ padding: "14px 18px" }}>Verified Emails</th>
                            <th style={{ padding: "14px 18px" }}>Pipeline</th>
                          </tr>
                        </thead>
                        <tbody>
                          {companies.filter(c => c.campaignId === currentCampaign.id).map(c => {
                            const dms = getCompanyPeople(c.name, c.domain);
                            return (
                              <tr 
                                key={c.id} 
                                onClick={() => setActiveCompanyProfile(c)} 
                                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", transition: "background 0.15s" }}
                                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                              >
                                <td style={{ padding: "16px 18px", fontWeight: 700, color: "#fff" }}>{c.name}</td>
                                <td style={{ padding: "16px 18px" }}>{c.industry}</td>
                                <td style={{ padding: "16px 18px" }}>{c.hq}</td>
                                <td style={{ padding: "16px 18px" }}>{c.revenue}</td>
                                <td style={{ padding: "16px 18px" }}>{c.employees}</td>
                                <td style={{ padding: "16px 18px", color: "#9CA3AF" }}>{c.stack.split(",").slice(0, 2).join(", ")}...</td>
                                <td style={{ padding: "16px 18px", color: "#D1D5DB" }}>{c.erpLandscape || "SAP ECC"}</td>
                                <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--color-accent)" }}>{c.aiScore}</td>
                                <td style={{ padding: "16px 18px" }}>
                                  <span style={{ fontSize: 11, background: "rgba(16,185,129,0.1)", color: "#10B981", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>{c.qualificationStatus || "Qualified"}</span>
                                </td>
                                <td style={{ padding: "16px 18px", color: c.buyingIntent.includes("High") ? "#EF4444" : "#F59E0B", fontWeight: 700 }}>{c.buyingIntent}</td>
                                <td style={{ padding: "16px 18px", fontWeight: 650 }}>{dms.length}</td>
                                <td style={{ padding: "16px 18px", color: "#10B981" }}>{dms.length} Verified</td>
                                <td style={{ padding: "16px 18px", fontWeight: 700, color: "#fff" }}>{c.dealValue}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. BUYING SIGNALS (CAMPAIGN-SPECIFIC) */}
                {detailTab === "signals" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {signals.filter(s => s.campaignId === currentCampaign.id).map(s => (
                      <div key={s.id} style={{ padding: 20, background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(99,102,241,0.15)", color: "var(--color-primary)" }}>{s.type}</span>
                            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{s.company}</span>
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
                )}

                {/* 4. TECHNOLOGY INTELLIGENCE */}
                {detailTab === "tech" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px" }}>Identified Systems Summary</h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        {companies.filter(c => c.campaignId === currentCampaign.id).map(c => (
                          <div key={c.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 16 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{c.name}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "#9CA3AF" }}>
                              <div>ERP System: <strong style={{ color: "#fff" }}>{c.erpLandscape}</strong></div>
                              <div>Cloud Platform: <strong style={{ color: "#fff" }}>{c.cloudProviders}</strong></div>
                              <div>Technology Stack: <span style={{ color: "var(--color-primary)" }}>{c.stack}</span></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. MARKET INSIGHTS */}
                {detailTab === "market" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Target Market Analysis</h3>
                      <p style={{ fontSize: 13, color: "#D1D5DB", lineHeight: 1.6, margin: "0 0 16px" }}>
                        This campaign discovers legacy systems and transformation timelines. Based on AI technographic signals, companies like Astra International are in prime windows for database consolidation projects due to structural support expirations.
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                          <h4 style={{ fontSize: 12, textTransform: "uppercase", color: "var(--color-primary)", margin: "0 0 8px" }}>Competitors Identified</h4>
                          <ul style={{ fontSize: 13, color: "#9CA3AF", paddingLeft: 16, margin: 0, lineHeight: 1.6 }}>
                            <li>Oracle ERP Solutions</li>
                            <li>Microsoft Dynamics 365 Enterprise</li>
                            <li>Salesforce Cloud Platform</li>
                          </ul>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                          <h4 style={{ fontSize: 12, textTransform: "uppercase", color: "#10B981", margin: "0 0 8px" }}>Outbound Value Propositions</h4>
                          <ul style={{ fontSize: 13, color: "#9CA3AF", paddingLeft: 16, margin: 0, lineHeight: 1.6 }}>
                            <li>Clean Core Architecture migration roadmap.</li>
                            <li>Rapid low-latency database deployment blueprint.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. REPORTS */}
                {detailTab === "reports" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>Executive Summaries & AI Reports</h3>
                        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid var(--color-border)", color: "#fff", fontSize: 12, cursor: "pointer" }}>
                          <Download size={14} /> Download Executive Report (PDF)
                        </button>
                      </div>
                      <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>
                        Generate state-of-the-art reports summarizing active accounts, pipeline valuations, technology fits, and recommended messaging chains.
                      </p>
                      
                      {/* Simple Chart Simulation */}
                      <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: 20, border: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 12 }}>Target Account Scoring Distribution</div>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 120, paddingTop: 10 }}>
                          {companies.filter(c => c.campaignId === currentCampaign.id).map(c => (
                            <div key={c.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                              <div style={{ fontSize: 11, color: "var(--color-primary)", fontWeight: 700 }}>{c.aiScore}</div>
                              <div style={{ width: "100%", height: `${c.aiScore}%`, background: "linear-gradient(0deg, var(--color-primary), var(--color-secondary))", borderRadius: "4px 4px 0 0" }} />
                              <div style={{ fontSize: 11, color: "#6B7280" }}>{c.name.split(" ")[0]}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. ACTIVITY TIMELINE */}
                {detailTab === "timeline" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 24 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px" }}>Crawl Engine Execution Logs</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 16, borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: 20, marginLeft: 8 }}>
                        {[
                          { time: "2h ago", title: "Scraped LinkedIn Professional Directory", desc: "Matched 4 high-value CIO / IT Director roles to Astra International." },
                          { time: "4h ago", title: "Analysed Web technographic signatures", desc: "Identified active SAP ECC 6.0 and Oracle DB signatures in Indonesia cluster." },
                          { time: "Yesterday", title: "Computed AI scoring & pipeline value", desc: "Calculated Opportunity Score: 94 and initialized Outbound priority." },
                          { time: "Jan 10, 2026", title: "Campaign Initialized", desc: "Created campaign APAC Cloud Migration under Sarah Chen." },
                        ].map((log, idx) => (
                          <div key={idx} style={{ position: "relative" }}>
                            <div style={{ position: "absolute", left: -27, top: 4, width: 12, height: 12, borderRadius: "50%", background: "var(--color-primary)" }} />
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{log.title}</div>
                            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{log.time}</div>
                            <p style={{ fontSize: 12, color: "#9CA3AF", margin: "4px 0 0", lineHeight: 1.4 }}>{log.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          ) : (
            /* ==========================================
               MODULE VIEWS
               ========================================== */
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
                        <div key={c.id} onClick={() => { 
                          const parentCamp = campaigns.find(camp => camp.id === c.campaignId) || campaigns[0];
                          setCurrentCampaign(parentCamp);
                          setActiveCompanyProfile(c);
                        }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--color-border)", cursor: "pointer" }}>
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

              {activeModule === "tasks" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px", color: "#fff" }}>Research Tasks</h2>
                      <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Add and organize objectives you need to research, then execute them directly as Campaigns.</p>
                    </div>
                    <button
                      onClick={() => {
                        const name = prompt("Enter Task Name:");
                        if (!name) return;
                        const objective = prompt("Enter Research Objective / Prompt Detail:");
                        if (!objective) return;
                        const region = prompt("Enter Region / Countries (e.g. Indonesia & Malaysia):") || "APAC";
                        const icp = prompt("Enter Industry / ICP (e.g. Palm oil refining):") || "General";
                        const tech = prompt("Enter Target Tech Stack (e.g. SAP, Oracle):") || "Any Stack";
                        const people = prompt("Enter Decision Makers / Roles (e.g. CIO, CTO):") || "IT Manager";

                        const newTask = {
                          id: `TSK-00${tasks.length + 1}`,
                          name,
                          objective,
                          region,
                          icp,
                          tech,
                          people,
                          signals: "General buying signals",
                          sources: "LinkedIn, Websites, registries",
                          rules: "Standard Scoring Weight"
                        };
                        setTasks(prev => [...prev, newTask]);
                      }}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                    >
                      <Plus size={14} /> Create Research Task
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid var(--color-border)",
                          borderRadius: 14,
                          padding: 20,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: 16
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(16,185,129,0.1)", color: "#10B981" }}>{task.id}</span>
                            <span style={{ fontSize: 12, color: "#9CA3AF" }}>Ready to execute</span>
                          </div>
                          <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>{task.name}</h3>
                          <p style={{ fontSize: 13, color: "#D1D5DB", margin: "0 0 12px", lineHeight: 1.4 }}>{task.objective}</p>
                          
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                            <div>Region: <strong style={{ color: "#fff" }}>{task.region}</strong></div>
                            <div>ICP Focus: <strong style={{ color: "#fff" }}>{task.icp}</strong></div>
                            <div>Tech Profile: <strong style={{ color: "var(--color-primary)" }}>{task.tech}</strong></div>
                            <div>Stakeholders: <strong style={{ color: "#fff" }}>{task.people}</strong></div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setBlueprintGoal(task.objective);
                            setBlueprintIcp(`${task.region} | ${task.icp}`);
                            setBlueprintTech(task.tech);
                            setBlueprintPeople(task.people);
                            setBlueprintSignals(task.signals || "ERP Modernization");
                            setBlueprintSources(task.sources || "Websites, LinkedIn");
                            setBlueprintRules(task.rules || "Standard Weighting");
                            setIsCreatingWizard(true);
                            setWizardScreen(2);
                          }}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: 8,
                            background: "var(--color-primary)",
                            border: "none",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8
                          }}
                        >
                          <Play size={14} fill="#fff" /> Convert to Campaign & Run
                        </button>
                      </div>
                    ))}
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
                        onClick={() => { setCurrentCampaign(camp); }}
                        style={{ 
                          background: "rgba(255,255,255,0.02)", border: "1px solid var(--color-border)", borderRadius: 14, padding: 20,
                          cursor: "pointer", borderLeft: "3px solid var(--color-primary)"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(99,102,241,0.1)", color: "var(--color-primary)" }}>{camp.id}</span>
                          <span style={{ fontSize: 12, color: camp.status === "Active" ? "#10B981" : "#6B7280", fontWeight: 600 }}>{camp.status}</span>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px", color: "#fff" }}>{camp.name}</h3>
                        <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 16px", lineHeight: 1.4 }}>{camp.objective}</p>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}>
                          <div>Companies: <strong style={{ color: "#fff" }}>{companies.filter(c => c.campaignId === camp.id).length}</strong></div>
                          <div>Qual Opportunities: <strong style={{ color: "#fff" }}>{companies.filter(c => c.campaignId === camp.id).length}</strong></div>
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
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{c.name}</div>
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
                            <td style={{ padding: "16px", fontWeight: 700, color: "#fff" }}>{log.id}</td>
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
              {activeModule === "companies" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px", color: "#fff" }}>Company Intelligence Directory</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Crawl technology signatures, revenue brackets, and ERP environments across all campaigns.</p>
                  </div>

                  <div style={{ overflowX: "auto", background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 12 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--color-border)", color: "#6B7280", textTransform: "uppercase" }}>
                          <th style={{ padding: "14px 18px" }}>Company</th>
                          <th style={{ padding: "14px 18px" }}>Industry</th>
                          <th style={{ padding: "14px 18px" }}>HQ Location</th>
                          <th style={{ padding: "14px 18px" }}>Revenue</th>
                          <th style={{ padding: "14px 18px" }}>Employees</th>
                          <th style={{ padding: "14px 18px" }}>ERP Landscape</th>
                          <th style={{ padding: "14px 18px" }}>AI Score</th>
                          <th style={{ padding: "14px 18px" }}>Campaign</th>
                          <th style={{ padding: "14px 18px" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.map(c => {
                          const parentCamp = campaigns.find(camp => camp.id === c.campaignId);
                          return (
                            <tr 
                              key={c.id} 
                              onClick={() => setActiveCompanyProfile(c)} 
                              style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", transition: "background 0.15s" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                            >
                              <td style={{ padding: "16px 18px", fontWeight: 700, color: "#fff" }}>{c.name}</td>
                              <td style={{ padding: "16px 18px" }}>{c.industry}</td>
                              <td style={{ padding: "16px 18px" }}>{c.hq}</td>
                              <td style={{ padding: "16px 18px" }}>{c.revenue}</td>
                              <td style={{ padding: "16px 18px" }}>{c.employees}</td>
                              <td style={{ padding: "16px 18px", color: "#D1D5DB" }}>{c.erpLandscape || "SAP ECC"}</td>
                              <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--color-accent)" }}>{c.aiScore}</td>
                              <td style={{ padding: "16px 18px", color: "var(--color-primary)", fontWeight: 600 }}>{parentCamp ? parentCamp.name : "N/A"}</td>
                              <td style={{ padding: "16px 18px" }}>
                                <span style={{ fontSize: 11, background: c.owner === "Pushed to CRM" ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.05)", color: c.owner === "Pushed to CRM" ? "#10B981" : "#9CA3AF", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                                  {c.owner === "Pushed to CRM" ? "CRM Sync" : "Discovered"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeModule === "people" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 4px", color: "#fff" }}>Decision Maker Directory</h2>
                    <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>Track influence scores, communication channels, and outreach preferences across all companies.</p>
                  </div>

                  <div style={{ overflowX: "auto", background: "rgba(255,255,255,0.01)", border: "1px solid var(--color-border)", borderRadius: 12 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 12 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--color-border)", color: "#6B7280", textTransform: "uppercase" }}>
                          <th style={{ padding: "14px 18px" }}>Contact</th>
                          <th style={{ padding: "14px 18px" }}>Title / Role</th>
                          <th style={{ padding: "14px 18px" }}>Company</th>
                          <th style={{ padding: "14px 18px" }}>Seniority</th>
                          <th style={{ padding: "14px 18px" }}>Relationship Score</th>
                          <th style={{ padding: "14px 18px" }}>Email</th>
                          <th style={{ padding: "14px 18px" }}>Phone</th>
                          <th style={{ padding: "14px 18px" }}>LinkedIn</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map(p => {
                          const matchingCompany = companies.find(c => c.name === p.company);
                          return (
                            <tr 
                              key={p.id} 
                              onClick={() => setActiveDecisionMaker(p)} 
                              style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", cursor: "pointer", transition: "background 0.15s" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                            >
                              <td style={{ padding: "16px 18px", fontWeight: 700, color: "#fff" }}>{p.name}</td>
                              <td style={{ padding: "16px 18px", color: "var(--color-primary)", fontWeight: 600 }}>{p.title}</td>
                              <td 
                                style={{ padding: "16px 18px", textDecoration: "underline", color: "#38BDF8" }}
                                onClick={(e) => {
                                  if (matchingCompany) {
                                    e.stopPropagation();
                                    setActiveCompanyProfile(matchingCompany);
                                  }
                                }}
                              >
                                {p.company}
                              </td>
                              <td style={{ padding: "16px 18px" }}>{p.seniority || "Executive C-Level"}</td>
                              <td style={{ padding: "16px 18px", fontWeight: 800, color: "var(--color-accent)" }}>{p.relationshipScore || 85} / 100</td>
                              <td style={{ padding: "16px 18px" }}><a href={`mailto:${p.email}`} onClick={e => e.stopPropagation()} style={{ color: "var(--color-primary)", textDecoration: "none" }}>{p.email}</a></td>
                              <td style={{ padding: "16px 18px", color: "#9CA3AF" }}>{p.phone}</td>
                              <td style={{ padding: "16px 18px" }}>
                                <a href={p.linkedin} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ color: "#38BDF8", textDecoration: "none" }}>
                                  View LinkedIn
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

      </div>

      {/* ==========================================
         DECISION MAKER PROFILE MODAL
         ========================================== */}
      {activeDecisionMaker && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, padding: 20, backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "#111827", border: "1px solid var(--color-border)", borderRadius: 16,
            width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto", padding: 28,
            display: "flex", flexDirection: "column", gap: 20
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 850, color: "#fff", margin: 0 }}>{activeDecisionMaker.name}</h3>
                <div style={{ fontSize: 13, color: "var(--color-primary)", fontWeight: 600, marginTop: 4 }}>
                  {activeDecisionMaker.title || activeDecisionMaker.designation} · {activeDecisionMaker.department || "IT Department"}
                </div>
              </div>
              <button 
                onClick={() => setActiveDecisionMaker(null)} 
                style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#fff", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}
              >
                Close Profile
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 13, color: "#9CA3AF" }}>
              <div>Seniority Level: <strong style={{ color: "#fff" }}>{activeDecisionMaker.seniority || "Executive C-Level"}</strong></div>
              <div>Decision Influence: <strong style={{ color: "#fff" }}>{activeDecisionMaker.decisionInfluence || "High (Primary Decision Maker)"}</strong></div>
              <div>Relationship Score: <strong style={{ color: "var(--color-accent)" }}>{activeDecisionMaker.relationshipScore || 85} / 100</strong></div>
              <div>Primary Location: <strong style={{ color: "#fff" }}>{activeDecisionMaker.location || "Jakarta, Indonesia"}</strong></div>
              <div style={{ gridColumn: "span 2" }}>Communication Preference: <strong style={{ color: "#fff" }}>{activeDecisionMaker.communicationPreference || "Email & Scheduled Zoom"}</strong></div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Communication Details</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 6, fontSize: 13 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Mail size={14} /> <a href={`mailto:${activeDecisionMaker.email}`} style={{ color: "var(--color-primary)", textDecoration: "none" }}>{activeDecisionMaker.email}</a></div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}><Phone size={14} /> <span style={{ color: "#fff" }}>{activeDecisionMaker.phone}</span></div>
                  <div style={{ gridColumn: "span 2", display: "flex", gap: 6, alignItems: "center" }}><Globe size={14} /> <a href={activeDecisionMaker.linkedin} target="_blank" rel="noreferrer" style={{ color: "#38BDF8", textDecoration: "none" }}>{activeDecisionMaker.linkedin}</a></div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Career History</div>
                <p style={{ fontSize: 13, color: "#D1D5DB", margin: "4px 0 0", lineHeight: 1.5 }}>
                  {activeDecisionMaker.careerHistory || `CIO at ${activeCompanyProfile?.name} (2020-Present) | IT Director at regional firm.`}
                </p>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Recent Activity & Buying Signals</div>
                <p style={{ fontSize: 13, color: "#D1D5DB", margin: "4px 0 0", lineHeight: 1.5 }}>
                  {activeDecisionMaker.recentActivity || "Attended regional ERP modernisation forums; actively scouting database partners."}
                </p>
                <div style={{ fontSize: 12, color: "var(--color-accent)", marginTop: 6 }}>Signals: {activeDecisionMaker.buyingSignals || "ERP Migration RFP"}</div>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12 }}>
                <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", fontWeight: 700 }}>Technology Interests</div>
                <span style={{ fontSize: 12, color: "#9CA3AF", display: "block", marginTop: 4 }}>{activeDecisionMaker.technologyInterests || "S/4HANA migration, Clean Core, IoT database scaling"}</span>
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 12, background: "rgba(99,102,241,0.04)", padding: 16, borderRadius: 10, border: "1px solid rgba(99,102,241,0.15)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--color-primary)", textTransform: "uppercase", fontWeight: 700 }}>
                  <span>AI Outreach Recommendation</span>
                  <span>AI Confidence: {activeDecisionMaker.aiConfidenceScore || "94%"}</span>
                </div>
                <p style={{ fontSize: 13, color: "#fff", margin: "6px 0 0", lineHeight: 1.5 }}>
                  {activeDecisionMaker.aiOutreachRecommendation || "Send a clean-core migration summary showing database modernization strategies."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
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
