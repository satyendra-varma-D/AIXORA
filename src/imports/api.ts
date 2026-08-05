// Centralized API Service for AIXORA SaaS

const API_BASE_URL = '/api';

export interface User {
  email: string;
  name: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Global callback for session expiration
let onSessionExpiredCallback: (() => void) | null = null;

export const setSessionExpiredHandler = (callback: () => void) => {
  onSessionExpiredCallback = callback;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  
  // Credentials include cookies
  options.credentials = 'include';
  options.headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = localStorage.getItem('aixora_jwt');
  if (token) {
    (options.headers as any)['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, options);
    
    // If unauthorized or session expired
    if (res.status === 401) {
      localStorage.removeItem('aixora_jwt');
      localStorage.removeItem('aixora_user');
      if (onSessionExpiredCallback) {
        onSessionExpiredCallback();
      }
      const data = await res.json().catch(() => ({}));
      throw new ApiError(data.error || 'Unauthorized', 401);
    }

    const data = await res.json();
    if (!res.ok) {
      throw new ApiError(data.error || 'Request failed', res.status);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error('Network error or server is unavailable.');
  }
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      return request<{ success: boolean; requiresMFA?: boolean; user: User }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    },

    verifyMfa: async (email: string, otp: string) => {
      const data = await request<{ success: boolean; authenticated: boolean; token: string; refreshToken: string; user: User }>('/auth/verify-mfa', {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });
      if (data.token) {
        localStorage.setItem('aixora_jwt', data.token);
        localStorage.setItem('aixora_user', JSON.stringify(data.user));
      }
      return data;
    },

    getProfile: async () => {
      return request<{ success: boolean; user: User }>('/auth/profile');
    },

    logout: async () => {
      try {
        await request<{ success: boolean }>('/auth/logout', { method: 'POST' });
      } catch (e) {
        // Suppress logout network errors
      }
      localStorage.removeItem('aixora_jwt');
      localStorage.removeItem('aixora_user');
    }
  },

  dashboard: {
    getCampaigns: async () => {
      return request<{ success: boolean; campaigns: any[] }>('/dashboard/campaigns');
    },
    createCampaign: async (campaign: any) => {
      return request<{ success: boolean; campaign: any }>('/dashboard/campaigns', {
        method: 'POST',
        body: JSON.stringify(campaign),
      });
    },
    getCompanies: async () => {
      return request<{ success: boolean; companies: any[] }>('/dashboard/companies');
    },
    saveCompany: async (company: any) => {
      return request<{ success: boolean; company: any }>('/dashboard/companies', {
        method: 'POST',
        body: JSON.stringify(company),
      });
    },
    getContacts: async () => {
      return request<{ success: boolean; contacts: any[] }>('/dashboard/contacts');
    },
    getSignals: async () => {
      return request<{ success: boolean; signals: any[] }>('/dashboard/signals');
    }
  }
};
