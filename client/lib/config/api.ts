export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  rules: {
    add: '/rules/add',
    delete: '/rules/delete',
    update: '/rules/update',
  },
  traffic: {
    stats: '/traffic/stats',
  },
  metrics: '/metrics',
  check: '/check',
} as const;