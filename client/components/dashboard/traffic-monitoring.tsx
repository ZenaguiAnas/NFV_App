'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrafficAreaChart } from './traffic/traffic-area-chart';
import { MOCK_TRAFFIC_DATA } from '@/lib/constants/mock-data';

export default function TrafficMonitoring() {
  return (
    <div className="space-y-6">
      <TrafficAreaChart data={MOCK_TRAFFIC_DATA} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Source IPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { ip: '192.168.1.100', requests: 1250 },
                { ip: '10.0.0.5', requests: 980 },
                { ip: '172.16.0.10', requests: 750 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-mono">{item.ip}</span>
                  <span className="text-muted-foreground">{item.requests} requests</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Blocked Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { domain: 'malicious-site.com', count: 523 },
                { domain: 'spam-domain.net', count: 342 },
                { domain: 'suspicious.org', count: 289 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-mono">{item.domain}</span>
                  <span className="text-muted-foreground">{item.count} blocks</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}