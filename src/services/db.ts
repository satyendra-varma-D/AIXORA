export type LeadStatus = 'NEW' | 'CONTACTED' | 'ENGAGED' | 'QUALIFYING' | 'QUALIFIED' | 'UNQUALIFIED' | 'NURTURE' | 'CONVERTED' | 'LOST';

export interface AuditFields {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface Lead extends AuditFields {
  id: string;
  name: string;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  source: string;
  ownerId: string;
  status: LeadStatus;
  score?: number;
  industry?: string;
  region?: string;
  businessNeed?: string;
  budget?: string;
  timeline?: string;
  nextAction?: string;
  nextActionDate?: string;
  archived: boolean;
}

export type AccountStatus = 'PROSPECT' | 'CUSTOMER' | 'PARTNER' | 'FORMER CUSTOMER';

export interface Account extends AuditFields {
  id: string;
  name: string;
  industry?: string;
  region?: string;
  website?: string;
  status: AccountStatus;
  ownerId: string;
  archived: boolean;
}

export interface Contact extends AuditFields {
  id: string;
  firstName: string;
  lastName: string;
  accountId: string;
  email: string;
  phone?: string;
  designation?: string;
  role?: string;
  ownerId: string;
  archived: boolean;
}

export type OpportunityStage = 'QUALIFICATION' | 'DISCOVERY' | 'SOLUTION' | 'ESTIMATION' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';

export interface Opportunity extends AuditFields {
  id: string;
  name: string;
  accountId: string;
  primaryContactId?: string;
  ownerId: string;
  stage: OpportunityStage;
  amount: number;
  probability: number;
  expectedCloseDate: string;
  nextAction?: string;
  archived: boolean;
}

// In-memory Database
export const mockDB = {
  leads: [
    {
      id: "L-001",
      name: "Acme Corp Cloud Migration",
      companyName: "Acme Corp",
      firstName: "John",
      lastName: "Smith",
      email: "john@acme.com",
      source: "Website",
      ownerId: "U-1",
      status: "NEW",
      score: 65,
      industry: "Technology",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    },
    {
      id: "L-002",
      name: "Globex ERP Implementation",
      companyName: "Globex Inc",
      firstName: "Sarah",
      lastName: "Connor",
      email: "sarah@globex.com",
      source: "Referral",
      ownerId: "U-1",
      status: "ENGAGED",
      score: 85,
      industry: "Manufacturing",
      nextAction: "Send presentation",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    }
  ] as Lead[],

  accounts: [
    {
      id: "A-001",
      name: "Wayne Enterprises",
      industry: "Finance",
      region: "North America",
      status: "CUSTOMER",
      ownerId: "U-1",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    }
  ] as Account[],

  contacts: [
    {
      id: "C-001",
      firstName: "Bruce",
      lastName: "Wayne",
      accountId: "A-001",
      email: "bruce@wayne.com",
      designation: "CEO",
      ownerId: "U-1",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    }
  ] as Contact[],

  opportunities: [
    {
      id: "O-001",
      name: "Wayne IT Modernization",
      accountId: "A-001",
      primaryContactId: "C-001",
      ownerId: "U-1",
      stage: "PROPOSAL",
      amount: 150000,
      probability: 75,
      expectedCloseDate: "2026-09-30",
      nextAction: "Review proposal with client",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    }
  ] as Opportunity[],

  targetAccounts: [
    {
      id: "TA-101",
      name: "Astra International",
      domain: "astra.co.id",
      industry: "Industrial Manufacturing",
      region: "Jakarta, Indonesia",
      employees: "15,000+",
      revenue: "$4.2B",
      status: "APPROVED",
      priority: "HIGH",
      icpFit: {
        score: 94,
        positiveFactors: ["Revenue above target ($4.2B)", "15,000+ employees", "Manufacturing industry"],
        negativeFactors: [],
        missingData: []
      },
      intent: {
        score: 82,
        positiveFactors: ["Recent digital expansion announced", "Active hiring for SAP Consultants"],
        negativeFactors: [],
        missingData: []
      },
      triggerStrength: {
        score: 91,
        positiveFactors: ["SAP ECC End-of-Life detected"],
        negativeFactors: [],
        missingData: []
      },
      opportunityPotential: {
        score: 89,
        positiveFactors: ["High budget for S/4HANA migration estimated at $350K"],
        negativeFactors: [],
        missingData: []
      },
      technologies: [
        { name: "SAP ECC", confidence: 96, source: "Web Signature", verifiedAt: new Date().toISOString() },
        { name: "Oracle DB", confidence: 88, source: "Job Posting", verifiedAt: new Date().toISOString() }
      ],
      lastResearched: new Date().toISOString(),
      ownerId: "U-1",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    }
  ] as TargetAccount[],
  signals: [
    {
      id: "SIG-101",
      targetAccountId: "TA-101",
      title: "SAP S/4HANA Architect Hiring",
      type: "Hiring",
      strength: "HIGH",
      status: "VALIDATED",
      detectedDate: new Date().toISOString(),
      evidence: "LinkedIn Job Postings for 'SAP S/4HANA Migration Architect'",
      source: "LinkedIn Talent Directory",
      confidence: 96,
      freshness: "FRESH",
      archived: false,
      createdBy: "System",
      createdAt: new Date().toISOString(),
      updatedBy: "System",
      updatedAt: new Date().toISOString()
    }
  ] as Signal[],
  
  researchDefinitions: [
    {
      id: "RD-001",
      name: "APAC SAP Legacy Scan",
      objective: "Identify manufacturing companies in APAC running SAP ECC",
      type: "Market Discovery",
      targetGeography: "APAC",
      targetIndustry: "Manufacturing",
      targetSize: "5000+ employees",
      targetTechnologies: "SAP ECC",
      targetSignals: "ERP Modernization",
      targetRoles: "CIO, IT Director",
      status: "ACTIVE",
      ownerId: "U-1",
      archived: false,
      createdBy: "U-1",
      createdAt: new Date().toISOString(),
      updatedBy: "U-1",
      updatedAt: new Date().toISOString()
    }
  ] as ResearchDefinition[],
  
  researchRuns: [
    {
      id: "RR-001",
      definitionId: "RD-001",
      status: "COMPLETED",
      startedAt: new Date(Date.now() - 86400000).toISOString(),
      completedAt: new Date().toISOString(),
      companiesFound: 142,
      enriched: 120,
      signalsFound: 45,
      highFitAccounts: 12,
      archived: false,
      createdBy: "System",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedBy: "System",
      updatedAt: new Date().toISOString()
    }
  ] as ResearchRun[]
};

// ==========================================
// MARKET INTELLIGENCE DOMAIN
// ==========================================

export type TargetAccountStatus = 'DISCOVERED' | 'UNDER REVIEW' | 'APPROVED' | 'REJECTED' | 'WATCHLIST' | 'SALES READY' | 'ACTIVATED' | 'NURTURE' | 'DISQUALIFIED';
export type SignalStrength = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type SignalStatus = 'NEW' | 'REVIEWING' | 'VALIDATED' | 'DISMISSED' | 'EXPIRED';
export type DataFreshness = 'FRESH' | 'AGING' | 'STALE' | 'EXPIRED';
export type ResearchStatus = 'DRAFT' | 'READY' | 'RUNNING' | 'PAUSED' | 'REVIEW' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface IntelligenceScore {
  score: number;
  positiveFactors: string[];
  negativeFactors: string[];
  missingData: string[];
}

export interface TargetAccount extends AuditFields {
  id: string;
  name: string; // The company name, may not be a CRM Account yet
  accountId?: string; // Linked CRM Account if it exists
  industry?: string;
  region?: string;
  employees?: string;
  revenue?: string;
  domain?: string;
  status: TargetAccountStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Scoring
  icpFit: IntelligenceScore;
  intent: IntelligenceScore;
  triggerStrength: IntelligenceScore;
  opportunityPotential: IntelligenceScore;
  
  // Technologies
  technologies: Array<{ name: string; confidence: number; source: string; verifiedAt: string }>;
  
  // State
  lastResearched: string;
  ownerId: string;
  archived: boolean;
}

export interface Signal extends AuditFields {
  id: string;
  targetAccountId: string;
  title: string;
  type: string;
  strength: SignalStrength;
  status: SignalStatus;
  detectedDate: string;
  evidence: string;
  source: string;
  confidence: number;
  freshness: DataFreshness;
  archived: boolean;
}

export interface ResearchDefinition extends AuditFields {
  id: string;
  name: string;
  objective: string;
  type: string;
  targetGeography: string;
  targetIndustry: string;
  targetSize: string;
  targetTechnologies: string;
  targetSignals: string;
  targetRoles: string;
  status: 'ACTIVE' | 'ARCHIVED';
  ownerId: string;
  archived: boolean;
}

export interface ResearchRun extends AuditFields {
  id: string;
  definitionId: string;
  status: ResearchStatus;
  startedAt?: string;
  completedAt?: string;
  companiesFound: number;
  enriched: number;
  signalsFound: number;
  highFitAccounts: number;
  archived: boolean;
}
