'use client';

import { useState } from 'react';
import { firewallApi } from '@/lib/services/api';
import { FirewallRule } from '@/lib/types/firewall';
import { toast } from 'sonner';

export function useFirewallRules() {
  const [isLoading, setIsLoading] = useState(false);

  const addRule = async (data: { type: 'IP' | 'Domain'; value: string; port: string }) => {
    try {
      setIsLoading(true);
      const payload = data.type === 'IP' 
        ? { ip: data.value }
        : { domain: data.value };
      
      await firewallApi.addRule(payload);
      toast.success('Rule added successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add rule');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRule = async (rule: FirewallRule) => {
    try {
      setIsLoading(true);
      const payload = rule.type === 'IP'
        ? { ip: rule.value }
        : { domain: rule.value };
      
      await firewallApi.deleteRule(payload);
      toast.success('Rule deleted successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete rule');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addRule,
    deleteRule,
  };
}