import { mockDB, TargetAccount, TargetAccountStatus } from './db';

const getCurrentDate = () => new Date().toISOString();

export const accountIntelligenceService = {
  getAllAccounts: (): TargetAccount[] => {
    return mockDB.targetAccounts.filter(a => !a.archived);
  },

  getAccountById: (id: string): TargetAccount | undefined => {
    return mockDB.targetAccounts.find(a => a.id === id && !a.archived);
  },

  createAccount: (data: Partial<TargetAccount>): TargetAccount => {
    const newAccount: TargetAccount = {
      ...data,
      id: `TA-${Date.now()}`,
      name: data.name || 'Unknown Company',
      status: data.status || 'DISCOVERED',
      priority: data.priority || 'LOW',
      icpFit: data.icpFit || { score: 0, positiveFactors: [], negativeFactors: [], missingData: [] },
      intent: data.intent || { score: 0, positiveFactors: [], negativeFactors: [], missingData: [] },
      triggerStrength: data.triggerStrength || { score: 0, positiveFactors: [], negativeFactors: [], missingData: [] },
      opportunityPotential: data.opportunityPotential || { score: 0, positiveFactors: [], negativeFactors: [], missingData: [] },
      technologies: data.technologies || [],
      lastResearched: data.lastResearched || getCurrentDate(),
      ownerId: data.ownerId || 'U-1',
      archived: false,
      createdBy: 'U-1',
      createdAt: getCurrentDate(),
      updatedBy: 'U-1',
      updatedAt: getCurrentDate(),
    } as TargetAccount;

    mockDB.targetAccounts.push(newAccount);
    return newAccount;
  },

  updateAccount: (id: string, data: Partial<TargetAccount>): TargetAccount | undefined => {
    const index = mockDB.targetAccounts.findIndex(a => a.id === id);
    if (index === -1) return undefined;

    mockDB.targetAccounts[index] = {
      ...mockDB.targetAccounts[index],
      ...data,
      updatedAt: getCurrentDate(),
      updatedBy: 'U-1', // Mock current user
    };
    return mockDB.targetAccounts[index];
  },

  updateStatus: (id: string, newStatus: TargetAccountStatus): TargetAccount | undefined => {
    return accountIntelligenceService.updateAccount(id, { status: newStatus });
  }
};
