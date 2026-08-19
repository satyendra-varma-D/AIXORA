import { mockDB, Lead, LeadStatus, Account, Contact, Opportunity } from './db';

class LeadService {
  private leads: Lead[] = mockDB.leads;

  // READ
  async getAll(): Promise<Lead[]> {
    return Promise.resolve([...this.leads.filter(l => !l.archived)]);
  }

  async getById(id: string): Promise<Lead | null> {
    const lead = this.leads.find(l => l.id === id && !l.archived);
    return Promise.resolve(lead ? { ...lead } : null);
  }

  // CREATE
  async create(data: Partial<Lead>, userId: string): Promise<Lead> {
    const newLead: Lead = {
      id: `L-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name || '',
      companyName: data.companyName || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      source: data.source || 'Manual',
      ownerId: data.ownerId || userId,
      status: data.status || 'NEW',
      score: data.score || 0,
      industry: data.industry,
      region: data.region,
      businessNeed: data.businessNeed,
      budget: data.budget,
      timeline: data.timeline,
      archived: false,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };
    
    // Duplicate check
    const isDuplicate = this.leads.some(l => l.email === newLead.email && !l.archived);
    if (isDuplicate) throw new Error("A lead with this email already exists.");

    this.leads.push(newLead);
    return Promise.resolve({ ...newLead });
  }

  // UPDATE
  async update(id: string, updates: Partial<Lead>, userId: string): Promise<Lead> {
    const index = this.leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    
    // Status validation
    if (updates.status && updates.status !== this.leads[index].status) {
      if (this.leads[index].status === 'CONVERTED') {
        throw new Error("Cannot change status of a converted lead.");
      }
      if (updates.status === 'CONVERTED') {
        throw new Error("Cannot directly transition status to CONVERTED. Use the convert method.");
      }
    }

    const updatedLead = {
      ...this.leads[index],
      ...updates,
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };
    
    this.leads[index] = updatedLead;
    return Promise.resolve({ ...updatedLead });
  }

  // ARCHIVE (Soft Delete)
  async archive(id: string, userId: string): Promise<void> {
    const index = this.leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error("Lead not found");
    
    this.leads[index] = {
      ...this.leads[index],
      archived: true,
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };
    return Promise.resolve();
  }

  // CONVERT
  async convert(leadId: string, userId: string, details: {
    opportunityName: string,
    amount: number
  }): Promise<{ account: Account, contact: Contact, opportunity: Opportunity }> {
    const leadIndex = this.leads.findIndex(l => l.id === leadId);
    if (leadIndex === -1) throw new Error("Lead not found");
    const lead = this.leads[leadIndex];

    if (lead.status === 'CONVERTED') {
      throw new Error("Lead is already converted.");
    }
    if (lead.status !== 'QUALIFIED') {
      throw new Error("Lead must be QUALIFIED before conversion.");
    }

    // Create Account
    const newAccount: Account = {
      id: `A-${Math.floor(1000 + Math.random() * 9000)}`,
      name: lead.companyName,
      industry: lead.industry,
      region: lead.region,
      status: 'PROSPECT',
      ownerId: lead.ownerId,
      archived: false,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };
    mockDB.accounts.push(newAccount);

    // Create Contact
    const newContact: Contact = {
      id: `C-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: lead.firstName,
      lastName: lead.lastName,
      accountId: newAccount.id,
      email: lead.email,
      phone: lead.phone,
      ownerId: lead.ownerId,
      archived: false,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };
    mockDB.contacts.push(newContact);

    // Create Opportunity
    const newOpp: Opportunity = {
      id: `O-${Math.floor(1000 + Math.random() * 9000)}`,
      name: details.opportunityName,
      accountId: newAccount.id,
      primaryContactId: newContact.id,
      ownerId: lead.ownerId,
      stage: 'QUALIFICATION',
      amount: details.amount,
      probability: 25,
      expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days out
      archived: false,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };
    mockDB.opportunities.push(newOpp);

    // Update Lead
    this.leads[leadIndex] = {
      ...lead,
      status: 'CONVERTED',
      updatedBy: userId,
      updatedAt: new Date().toISOString()
    };

    return Promise.resolve({
      account: newAccount,
      contact: newContact,
      opportunity: newOpp
    });
  }
}

export const leadService = new LeadService();
