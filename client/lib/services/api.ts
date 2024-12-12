import { API_BASE_URL, API_ENDPOINTS } from '@/lib/config/api';
import { FirewallRule } from '@/lib/types/firewall';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

export const firewallApi = {
  // Firewall Rules
  addRule: (data: { ip?: string; domain?: string }) =>
    fetchApi(API_ENDPOINTS.rules.add, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteRule: (data: { ip?: string; domain?: string }) =>
    fetchApi(API_ENDPOINTS.rules.delete, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateRule: (data: { ip?: string; domain?: string; action: 'block' | 'unblock' }) =>
    fetchApi(API_ENDPOINTS.rules.update, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Traffic and Metrics
  getTrafficStats: () =>
    fetchApi(API_ENDPOINTS.traffic.stats),

  getMetrics: () =>
    fetchApi<{
      blocked_requests_count: number;
      active_blocked_ips: number;
      active_blocked_domains: number;
    }>(API_ENDPOINTS.metrics),

  checkRequest: (data: { ip: string; domain?: string }) =>
    fetchApi(API_ENDPOINTS.check, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};