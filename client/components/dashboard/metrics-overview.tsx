'use client';

import { Shield, Activity, AlertTriangle, Lock } from 'lucide-react';
import { MetricCard } from './metrics/metric-card';
import { TrafficChart } from './metrics/traffic-chart';

const mockData = [
  { time: '00:00', requests: 120 },
  { time: '04:00', requests: 180 },
  { time: '08:00', requests: 350 },
  { time: '12:00', requests: 480 },
  { time: '16:00', requests: 400 },
  { time: '20:00', requests: 250 },
  { time: '23:59', requests: 150 },
];

export default function MetricsOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Blocked Requests"
        value="1,274"
        subtitle="+20.1% from last week"
        icon={<Shield className="h-4 w-4" />}
        iconClassName="text-muted-foreground"
      />
      <MetricCard
        title="Active Blocked IPs"
        value="342"
        subtitle="+12 in last 24h"
        icon={<Lock className="h-4 w-4" />}
        iconClassName="text-muted-foreground"
      />
      <MetricCard
        title="Traffic Rate"
        value="2.4k/s"
        subtitle="Average over 5min"
        icon={<Activity className="h-4 w-4" />}
        iconClassName="text-muted-foreground"
      />
      <MetricCard
        title="Active Alerts"
        value="7"
        subtitle="Requires attention"
        icon={<AlertTriangle className="h-4 w-4" />}
        iconClassName="text-destructive"
      />

      <TrafficChart data={mockData} />
    </div>
  );
}