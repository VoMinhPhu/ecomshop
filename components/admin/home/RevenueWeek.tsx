'use client';

import { TrendingUp } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const chartData = [
  { day: 'T2', revenue: 1200 },
  { day: 'T3', revenue: 1500 },
  { day: 'T4', revenue: 1000 },
  { day: 'T5', revenue: 1300 },
  { day: 'T6', revenue: 1700 },
  { day: 'T7', revenue: 2000 },
  { day: 'CN', revenue: 1800 },
];

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export default function RevenueWeek() {
  return (
    <Card className="order-1 lg:order-2">
      <CardHeader className="items-center pb-4">
        <CardTitle>Doanh thu tuần</CardTitle>
        <CardDescription>Thống kê doanh thu 7 ngày gần nhất</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <PolarAngleAxis dataKey="day" />
            <PolarGrid />
            <Radar dataKey="revenue" fill="var(--color-revenue)" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Tăng 2.8% so với tuần trước <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">7 ngày gần nhất</div>
      </CardFooter>
    </Card>
  );
}
