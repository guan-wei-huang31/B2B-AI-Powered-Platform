'use client';

import { useMemo } from 'react';
import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { canadaProvincesCodesMap } from '@/model/canada';
import { EsriData } from '@/model/esri';

interface EsriPieProps {
  data: EsriData[];
  className?: string;
}
const chartConfig = {
  province: {
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function EsriPie({ data, className = '' }: EsriPieProps) {
  const chartData = useMemo(() => {
    const canadaData = data.filter((item) => item.Country === 'Canada');
    const aggregatedVolumeByProvince = canadaData.reduce(
      (acc, item) => {
        const province = item.Province;
        if (!acc[province]) {
          acc[province] = 0;
        }
        acc[province] += item.Volume_kg;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(aggregatedVolumeByProvince)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([province, volume], index) => ({
        provinceCode: province,
        provinceName: canadaProvincesCodesMap[province as keyof typeof canadaProvincesCodesMap],
        volume: volume,
        fill: `var(--chart-${index + 1})`,
      }));
  }, [data]);

  return (
    <Card
      className={cn(
        'flex flex-col h-full w-full hover:shadow-xl transition-shadow duration-300',
        className
      )}
    >
      <CardHeader className="pb-0">
        <CardTitle>Top 5 Supply Provinces in Canada</CardTitle>
        <CardDescription>Provinces supplying the biggest supply volume.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent cursor={false} />} />
            <Pie data={chartData} dataKey="volume" nameKey="provinceName">
              <LabelList
                dataKey="provinceCode"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
