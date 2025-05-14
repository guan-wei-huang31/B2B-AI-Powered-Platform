'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { EsriData } from '@/model/esri';

const chartConfig = {
  value: {
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface EsriBarProps {
  data: EsriData[];
  className?: string;
}

function getGradientColorFrom(index: number) {
  const baseColor = 'var(--chart-3)';
  const baseHue = parseInt(baseColor.slice(1, 3), 16);
  const hue = (baseHue + index * 7) % 360;
  return `hsl(${hue}, 90%, 55%)`;
}

export function EsriBar({ data, className = '' }: EsriBarProps) {
  const chartData = useMemo(() => {
    const canadaData = data.filter((item) => item.Country === 'Canada');
    const biggestsFiveData = canadaData.sort((a, b) => b.Volume_kg - a.Volume_kg).slice(0, 6);
    return biggestsFiveData.map((item, index) => ({
      label: `${item.PD_ID} - ${item.Crop_Name}`,
      volume: item.Volume_kg,
      fill: getGradientColorFrom(index),
    }));
  }, [data]);

  return (
    <Card className={cn('w-full h-full hover:shadow-xl transition-shadow duration-300', className)}>
      <CardHeader>
        <CardTitle>Top 6 Supply Products in Canada</CardTitle>
        <CardDescription>
          Products supplying the biggest volume of supply in Canada.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(' - ')[1].slice(0, 5)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="volume" fill="var(--color-Volume_kg)" radius={8}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
