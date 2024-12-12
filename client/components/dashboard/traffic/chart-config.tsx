import { ReactNode } from 'react';

interface ChartProps {
  width?: string | number;
  height?: string | number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export const defaultChartConfig: ChartProps = {
  width: '100%',
  height: '100%',
  margin: { top: 10, right: 30, bottom: 0, left: 0 },
};

export const chartComponents = {
  XAxis: {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    dy: 10,
  },
  YAxis: {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    dx: -10,
  },
  CartesianGrid: {
    strokeDasharray: '3 3',
    stroke: 'hsl(var(--border))',
  },
  Tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '6px',
      padding: '8px',
    },
    labelStyle: {
      color: 'hsl(var(--foreground))',
      marginBottom: '4px',
    },
  },
};