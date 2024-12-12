'use client';

import { AlertTriangle } from 'lucide-react';
import { Alert as AlertUI, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Alert } from '@/lib/types/firewall';
import { formatDate } from '@/lib/utils/format';

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  return (
    <AlertUI variant={alert.severity === 'high' ? 'destructive' : 'default'}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        {alert.title}
        <span className="text-sm font-normal">{formatDate(alert.timestamp)}</span>
      </AlertTitle>
      <AlertDescription className="mt-2 flex items-center justify-between">
        <span>{alert.description}</span>
        <Button variant="outline" size="sm">
          Investigate
        </Button>
      </AlertDescription>
    </AlertUI>
  );
}