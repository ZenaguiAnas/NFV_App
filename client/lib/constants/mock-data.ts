import { FirewallRule, TrafficData, Alert } from '../types/firewall';

export const MOCK_RULES: FirewallRule[] = [
  { id: 1, type: 'IP', value: '192.168.1.100', port: '80,443', createdAt: '2024-12-12' },
  { id: 2, type: 'Domain', value: 'malicious-site.com', port: 'All', createdAt: '2024-12-11' },
  { id: 3, type: 'IP', value: '10.0.0.5', port: '22', createdAt: '2024-12-10' },
];

export const MOCK_TRAFFIC_DATA: TrafficData[] = [
  { time: '00:00', inbound: 150, outbound: 90 },
  { time: '04:00', inbound: 230, outbound: 140 },
  { time: '08:00', inbound: 450, outbound: 300 },
  { time: '12:00', inbound: 580, outbound: 420 },
  { time: '16:00', inbound: 500, outbound: 350 },
  { time: '20:00', inbound: 350, outbound: 220 },
  { time: '23:59', inbound: 250, outbound: 150 },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 1,
    severity: 'high',
    title: 'DDoS Attack Detected',
    description: 'Unusual high traffic detected from multiple IPs',
    timestamp: '2024-03-20 15:30:00',
  },
  {
    id: 2,
    severity: 'medium',
    title: 'Port Scan Attempt',
    description: 'Sequential port scanning detected from IP 192.168.1.100',
    timestamp: '2024-03-20 14:45:00',
  },
  {
    id: 3,
    severity: 'low',
    title: 'New IP Blocked',
    description: 'IP 10.0.0.5 automatically blocked due to repeated failed access attempts',
    timestamp: '2024-03-20 13:15:00',
  },
];