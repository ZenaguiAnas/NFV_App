import { TrafficData } from '../types/firewall';

export function formatTrafficData(data: TrafficData[]) {
  return data.map(item => ({
    ...item,
    inbound: Number(item.inbound),
    outbound: Number(item.outbound),
  }));
}

export function calculateTrafficStats(data: TrafficData[]) {
  return data.reduce((acc, curr) => ({
    totalInbound: acc.totalInbound + curr.inbound,
    totalOutbound: acc.totalOutbound + curr.outbound,
    peakInbound: Math.max(acc.peakInbound, curr.inbound),
    peakOutbound: Math.max(acc.peakOutbound, curr.outbound),
  }), {
    totalInbound: 0,
    totalOutbound: 0,
    peakInbound: 0,
    peakOutbound: 0,
  });
}