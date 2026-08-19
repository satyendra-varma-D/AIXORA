import { mockDB, Signal, SignalStatus } from './db';

const getCurrentDate = () => new Date().toISOString();

export const signalService = {
  getAllSignals: (): Signal[] => {
    return mockDB.signals.filter(s => !s.archived);
  },

  getSignalsByAccount: (accountId: string): Signal[] => {
    return mockDB.signals.filter(s => s.targetAccountId === accountId && !s.archived);
  },

  getSignalById: (id: string): Signal | undefined => {
    return mockDB.signals.find(s => s.id === id && !s.archived);
  },

  updateSignalStatus: (id: string, newStatus: SignalStatus): Signal | undefined => {
    const index = mockDB.signals.findIndex(s => s.id === id);
    if (index === -1) return undefined;

    mockDB.signals[index] = {
      ...mockDB.signals[index],
      status: newStatus,
      updatedAt: getCurrentDate(),
      updatedBy: 'U-1'
    };
    return mockDB.signals[index];
  }
};
