'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrafficData } from '@/lib/types/firewall';
import { defaultChartConfig, chartComponents } from './chart-config';
import { formatTrafficData } from '@/lib/utils/chart';

interface TrafficAreaChartProps {
  data: TrafficData[];
}

export function TrafficAreaChart({ data }: TrafficAreaChartProps) {
  const formattedData = formatTrafficData(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Traffic Analysis</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer {...defaultChartConfig}>
          <AreaChart data={formattedData} margin={defaultChartConfig.margin}>
            <defs>
              <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid {...chartComponents.CartesianGrid} />
            <XAxis 
              dataKey="time" 
              {...chartComponents.XAxis}
            />
            <YAxis 
              {...chartComponents.YAxis}
            />
            <Tooltip 
              {...chartComponents.Tooltip}
            />
            <Area 
              type="monotone" 
              dataKey="inbound" 
              stroke="hsl(var(--chart-1))" 
              fillOpacity={1} 
              fill="url(#inbound)" 
            />
            <Area 
              type="monotone" 
              dataKey="outbound" 
              stroke="hsl(var(--chart-2))" 
              fillOpacity={1} 
              fill="url(#outbound)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}