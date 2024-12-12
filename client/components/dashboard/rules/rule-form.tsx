'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFirewallRules } from '@/lib/hooks/use-firewall-rules';

export function RuleForm() {
  const [type, setType] = useState<'IP' | 'Domain'>('IP');
  const [value, setValue] = useState('');
  const [port, setPort] = useState('');
  const { addRule, isLoading } = useFirewallRules();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addRule({ type, value, port });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Firewall Rule</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Rule Type</label>
          <Select value={type} onValueChange={(value: 'IP' | 'Domain') => setType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IP">IP Address</SelectItem>
              <SelectItem value="Domain">Domain</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Value</label>
          <Input 
            placeholder={type === 'IP' ? 'Enter IP address' : 'Enter domain'} 
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Port(s)</label>
          <Input 
            placeholder="e.g., 80,443 or All" 
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Rule'}
        </Button>
      </form>
    </DialogContent>
  );
}