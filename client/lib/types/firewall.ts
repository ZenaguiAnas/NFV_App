export interface FirewallRule {
  id: number;
  type: 'IP' | 'Domain';
  value: string;
  port: string;
  createdAt: string;
}

export interface TrafficData {
  time: string;
  inbound: number;
  outbound: number;
}

export interface Alert {
  id: number;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconClassName?: string;
}