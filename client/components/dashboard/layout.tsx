'use client';

import { useState } from 'react';
import { Shield, Activity, List, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FirewallRules from '@/components/dashboard/firewall-rules';
import TrafficMonitoring from '@/components/dashboard/traffic-monitoring';
import MetricsOverview from '@/components/dashboard/metrics-overview';
import Alerts from '@/components/dashboard/alerts';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Shield className="h-8 w-8" />
        Firewall Management Dashboard
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="traffic" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Traffic
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MetricsOverview />
        </TabsContent>

        <TabsContent value="rules">
          <FirewallRules />
        </TabsContent>

        <TabsContent value="traffic">
          <TrafficMonitoring />
        </TabsContent>

        <TabsContent value="alerts">
          <Alerts />
        </TabsContent>
      </Tabs>
    </div>
  );
}