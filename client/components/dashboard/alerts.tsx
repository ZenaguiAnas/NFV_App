'use client';

import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { MetricCard } from './metrics/metric-card';
import { AlertCard } from './alerts/alert-card';
import { MOCK_ALERTS } from '@/lib/constants/mock-data';

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard
          title="Critical Alerts"
          value="2"
          icon={<AlertTriangle className="h-4 w-4" />}
          iconClassName="text-destructive"
        />
        <MetricCard
          title="Active Threats"
          value="5"
          icon={<Shield className="h-4 w-4" />}
          iconClassName="text-muted-foreground"
        />
        <MetricCard
          title="System Status"
          value="Normal"
          icon={<Activity className="h-4 w-4" />}
          iconClassName="text-muted-foreground"
        />
      </div>

      <div className="space-y-4">
        {MOCK_ALERTS.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}