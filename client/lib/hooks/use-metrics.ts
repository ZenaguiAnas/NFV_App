'use client';

import { useState, useEffect } from 'react';
import { firewallApi } from '@/lib/services/api';

export function useMetrics() {
  const [metrics, setMetrics] = useState({
    blocked_requests_count: 0,
    active_blocked_ips: 0,
    active_blocked_domains: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await firewallApi.getMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { metrics, isLoading, error };
}