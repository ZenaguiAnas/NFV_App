'use client';

import { Trash2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FirewallRule } from '@/lib/types/firewall';
import { formatDate } from '@/lib/utils/format';

interface RuleTableProps {
  rules: FirewallRule[];
}

export function RuleTable({ rules }: RuleTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Port(s)</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell>{rule.type}</TableCell>
              <TableCell className="font-mono">{rule.value}</TableCell>
              <TableCell>{rule.port}</TableCell>
              <TableCell>{formatDate(rule.createdAt)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" title="Edit rule">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Delete rule">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}