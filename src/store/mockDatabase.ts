// In-memory global store to demonstrate cross-application data flow.

export interface Customer {
  id: string;
  name: string;
  industry: string;
  status: "Active" | "Prospect" | "Churned";
}

export interface Contact {
  id: string;
  customerId: string;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: string;
  customerId: string;
  name: string;
  status: "Planning" | "Active" | "Completed" | "At Risk";
  budget: number;
}

export interface Opportunity {
  id: string;
  customerId: string;
  name: string;
  amount: number;
  stage: "Discovery" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
}

class MockDatabase {
  customers: Customer[] = [
    { id: "CUST-001", name: "Global Logistics Inc.", industry: "Transportation", status: "Active" },
    { id: "CUST-002", name: "TechNova Solutions", industry: "Technology", status: "Prospect" },
  ];

  contacts: Contact[] = [
    { id: "CONT-001", customerId: "CUST-001", name: "Sarah Connor", email: "sarah@globallogistics.com", role: "Director of IT" },
  ];

  projects: Project[] = [
    { id: "PROJ-001", customerId: "CUST-001", name: "TMS Cloud Migration", status: "Active", budget: 150000 },
  ];

  opportunities: Opportunity[] = [
    { id: "OPP-001", customerId: "CUST-002", name: "Enterprise Architecture Review", amount: 45000, stage: "Proposal" },
  ];

  getCustomers() { return this.customers; }
  getProjects() { return this.projects; }
  
  // Methods to demonstrate reactivity can be added here
}

export const db = new MockDatabase();
