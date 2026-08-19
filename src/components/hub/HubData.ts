import {
  TrendingUp, Users, HeartHandshake,
  Search, Crosshair, Network, BarChart3,
  Bot, Database, Settings, Shield, Plug, FileText, CheckCircle2
} from "lucide-react";

// Mock Entitlement Data
export const mockEntitlements = {
  organization: "Acme Technologies",
  user: "Sarah Chen",
  role: "Project Manager",
  // In a real app, this comes from the backend. 
  // We're leaving 'money' out to test that the UI successfully hides disabled apps.
  enabledApps: ["grow", "discover", "deliver", "people", "serve"], 
  userPermissions: ["grow", "discover", "deliver", "people", "serve"] 
};

export const CORE_APPS = [
  {
    id: "grow",
    name: "GROW",
    label: "Business Acquisition",
    desc: "Find, qualify, win and manage customers.",
    icon: Users,
    color: "#6366F1",
    modules: ["Leads", "Accounts", "Opportunities", "Sales", "Forecasting"],
    activity: "12 Active Opportunities\n4 Follow-ups Today",
    ai: ["Research Assistant", "Voice Sales Agent", "BDE Copilot"],
    insights: [
      { label: "Pipeline", value: "12 Active Opportunities", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" }
    ]
  },
  {
    id: "discover",
    name: "DISCOVER",
    label: "Discovery & Solutioning",
    desc: "Turn customer conversations into clear requirements.",
    icon: Search,
    color: "#06B6D4",
    modules: ["Discovery", "Requirements", "Processes", "Solutioning", "Estimation"],
    activity: "3 Requirements Pending Review\n2 Active Discoveries",
    ai: ["BA Copilot", "Document Intelligence", "Design Agent"],
    insights: [
      { label: "Discovery", value: "3 Pending Reviews", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" }
    ]
  },
  {
    id: "deliver",
    name: "DELIVER",
    label: "Project Delivery",
    desc: "Plan, execute, test and release successful projects.",
    icon: Crosshair,
    color: "#F59E0B",
    modules: ["Projects", "Planning", "Agile", "Risks", "Quality", "Release"],
    activity: "8 Active Projects\n2 At Risk",
    ai: ["PM Copilot", "Engineering Agent", "QA Agent", "DevOps Agent"],
    insights: [
      { label: "Delivery", value: "8 Active Projects", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" }
    ]
  },
  {
    id: "people",
    name: "PEOPLE",
    label: "Workforce & Resources",
    desc: "Put the right people on the right work.",
    icon: Network,
    color: "#10B981",
    modules: ["Skills", "Demand", "Capacity", "Allocation", "Timesheets", "Utilization"],
    activity: "84% Utilized\n3 Resource Requests",
    ai: ["Resource Matching", "Capacity Agent"],
    insights: [
      { label: "People", value: "84% Utilized", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" }
    ]
  },
  {
    id: "money",
    name: "MONEY",
    label: "Commercial & Financials",
    desc: "Connect contracts, costs, revenue, billing and profitability.",
    icon: BarChart3,
    color: "#8B5CF6",
    modules: ["Commercials", "Budget", "Cost", "Revenue", "Billing", "Margin"],
    activity: "18.6% Avg Project Margin\n4 Invoices Pending",
    ai: ["Financial Analyst", "Margin Intelligence"],
    insights: [
      { label: "Financial", value: "18.6% Avg Project Margin", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" }
    ]
  },
  {
    id: "serve",
    name: "SERVE",
    label: "Customer Service & Success",
    desc: "Support customers, resolve issues and build relationships.",
    icon: HeartHandshake,
    color: "#EC4899",
    modules: ["Support", "Incidents", "Problems", "SLA", "Knowledge", "Success"],
    activity: "94% Customer Health\n6 Open Tickets",
    ai: ["Customer Agent", "Support Agent"],
    insights: [
      { label: "Customers", value: "94% Healthy", color: "bg-pink-500/10 text-pink-400 border-pink-500/20" }
    ]
  }
];

export const AI_WORKERS = [
  { name: "Research Assistant", desc: "Researches industries, companies and potential leads.", worksWith: "grow", status: "ACTIVE" },
  { name: "Voice Sales Agent", desc: "Calls leads and qualifies prospects.", worksWith: "grow", status: "ACTIVE" },
  { name: "BDE Copilot", desc: "Assists live conversations.", worksWith: "grow", status: "ACTIVE" },
  { name: "BA / PM Copilot", desc: "Turns calls into requirements.", worksWith: "discover", status: "AVAILABLE" },
  { name: "Design Agent", desc: "Drafts UI/UX specs.", worksWith: "discover", status: "AVAILABLE" },
  { name: "Engineering Agent", desc: "Assists code generation.", worksWith: "deliver", status: "REVIEW REQUIRED" },
  { name: "QA Agent", desc: "Assists testing.", worksWith: "deliver", status: "AVAILABLE" },
  { name: "DevOps Agent", desc: "Assists deployments.", worksWith: "deliver", status: "PAUSED" },
  { name: "Customer Agent", desc: "Answers support questions.", worksWith: "serve", status: "ACTIVE" }
];

export const PLATFORM_SERVICES = [
  { name: "Unified Data", icon: Database },
  { name: "Workflow Engine", icon: Settings },
  { name: "AI Context Engine", icon: Bot },
  { name: "Integration Hub", icon: Plug },
  { name: "Document Platform", icon: FileText },
  { name: "Security & Identity", icon: Shield },
  { name: "Audit & Governance", icon: CheckCircle2 }
];

export const CONNECTED_SYSTEMS = [
  { name: "Salesforce", category: "CRM", status: "Connected" },
  { name: "Jira", category: "PROJECT", status: "Connected" },
  { name: "GitHub", category: "ENGINEERING", status: "Connected" }
];
