'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { RuleForm } from './rules/rule-form';
import { RuleTable } from './rules/rule-table';
import { MOCK_RULES } from '@/lib/constants/mock-data';

export default function FirewallRules() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Firewall Rules</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <RuleForm />
        </Dialog>
      </div>

      <RuleTable rules={MOCK_RULES} />
    </div>
  );
}