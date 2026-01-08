'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { RevenueByDay } from '@/types/dashboard';

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

interface RevenueMonthProps {
  data: RevenueByDay[]; // last30Days
}

export default function RevenueMonth({ data }: RevenueMonthProps) {
  const [timeRange, setTimeRange] = useState<'30d' | '7d'>('30d');

  const chartData = useMemo(() => {
    if (timeRange === '7d') {
      return data.slice(-7);
    }
    return data; // 30d
  }, [timeRange, data]);

  return (
    <Card className="pt-0 col-span-2 order-2 lg:order-1">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Doanh thu</CardTitle>
          <CardDescription>Hiển thị biểu đồ doanh thu thời gian gần đây</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as '30d' | '7d')}>
          <SelectTrigger className="hidden w-40 rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d" className="rounded-lg">
              Trong 7 ngày
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Trong 30 ngày
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="revenue" type="natural" fill="url(#fillRevenue)" stroke="var(--color-revenue)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
