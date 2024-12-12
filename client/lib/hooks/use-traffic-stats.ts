'use client';

import { useState, useEffect } from 'react';
import { firewallApi } from '@/lib/services/api';

export function useTrafficStats() {
  const [trafficStats, setTrafficStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrafficStats = async () => {
      try {
        setIsLoading(true);
        const data = await firewallApi.getTrafficStats();
        setTrafficStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch traffic stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrafficStats();
    const interval = setInterval(fetchTrafficStats, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return { trafficStats, isLoading, error };
}