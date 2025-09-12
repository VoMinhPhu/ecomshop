'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartData = [
  // Tháng 4
  { date: '2024-04-01', revenue: 3200 },
  { date: '2024-04-02', revenue: 3400 },
  { date: '2024-04-03', revenue: 3000 },
  { date: '2024-04-04', revenue: 3600 },
  { date: '2024-04-05', revenue: 3100 },
  { date: '2024-04-06', revenue: 3800 },
  { date: '2024-04-07', revenue: 3500 },

  { date: '2024-04-08', revenue: 2800 },
  { date: '2024-04-09', revenue: 3000 },
  { date: '2024-04-10', revenue: 2600 },
  { date: '2024-04-11', revenue: 3100 },
  { date: '2024-04-12', revenue: 2700 },
  { date: '2024-04-13', revenue: 3300 },
  { date: '2024-04-14', revenue: 3000 },

  { date: '2024-04-15', revenue: 3600 },
  { date: '2024-04-16', revenue: 3800 },
  { date: '2024-04-17', revenue: 3400 },
  { date: '2024-04-18', revenue: 3900 },
  { date: '2024-04-19', revenue: 3500 },
  { date: '2024-04-20', revenue: 4100 },
  { date: '2024-04-21', revenue: 3800 },

  { date: '2024-04-22', revenue: 3000 },
  { date: '2024-04-23', revenue: 3200 },
  { date: '2024-04-24', revenue: 2800 },
  { date: '2024-04-25', revenue: 3300 },
  { date: '2024-04-26', revenue: 2900 },
  { date: '2024-04-27', revenue: 3500 },
  { date: '2024-04-28', revenue: 3200 },

  { date: '2024-04-29', revenue: 3700 },
  { date: '2024-04-30', revenue: 3900 },

  // Tháng 5
  { date: '2024-05-01', revenue: 3400 },
  { date: '2024-05-02', revenue: 3600 },
  { date: '2024-05-03', revenue: 3200 },
  { date: '2024-05-04', revenue: 3700 },
  { date: '2024-05-05', revenue: 3300 },

  { date: '2024-05-06', revenue: 4000 },
  { date: '2024-05-07', revenue: 4200 },
  { date: '2024-05-08', revenue: 3800 },
  { date: '2024-05-09', revenue: 4300 },
  { date: '2024-05-10', revenue: 3900 },
  { date: '2024-05-11', revenue: 4500 },
  { date: '2024-05-12', revenue: 4200 },

  { date: '2024-05-13', revenue: 3100 },
  { date: '2024-05-14', revenue: 3300 },
  { date: '2024-05-15', revenue: 2900 },
  { date: '2024-05-16', revenue: 3400 },
  { date: '2024-05-17', revenue: 3000 },
  { date: '2024-05-18', revenue: 3600 },
  { date: '2024-05-19', revenue: 3300 },

  { date: '2024-05-20', revenue: 4300 },
  { date: '2024-05-21', revenue: 4500 },
  { date: '2024-05-22', revenue: 4100 },
  { date: '2024-05-23', revenue: 4600 },
  { date: '2024-05-24', revenue: 4200 },
  { date: '2024-05-25', revenue: 4800 },
  { date: '2024-05-26', revenue: 4500 },

  { date: '2024-05-27', revenue: 3700 },
  { date: '2024-05-28', revenue: 3900 },
  { date: '2024-05-29', revenue: 3500 },
  { date: '2024-05-30', revenue: 4000 },
  { date: '2024-05-31', revenue: 3600 },

  // Tháng 6
  { date: '2024-06-01', revenue: 4200 },
  { date: '2024-06-02', revenue: 3900 },

  { date: '2024-06-03', revenue: 4600 },
  { date: '2024-06-04', revenue: 4800 },
  { date: '2024-06-05', revenue: 4400 },
  { date: '2024-06-06', revenue: 4900 },
  { date: '2024-06-07', revenue: 4500 },
  { date: '2024-06-08', revenue: 5100 },
  { date: '2024-06-09', revenue: 4800 },

  { date: '2024-06-10', revenue: 3600 },
  { date: '2024-06-11', revenue: 3800 },
  { date: '2024-06-12', revenue: 3400 },
  { date: '2024-06-13', revenue: 3900 },
  { date: '2024-06-14', revenue: 3500 },
  { date: '2024-06-15', revenue: 4100 },
  { date: '2024-06-16', revenue: 3800 },

  { date: '2024-06-17', revenue: 4400 },
  { date: '2024-06-18', revenue: 4600 },
  { date: '2024-06-19', revenue: 4200 },
  { date: '2024-06-20', revenue: 4700 },
  { date: '2024-06-21', revenue: 4300 },
  { date: '2024-06-22', revenue: 4900 },
  { date: '2024-06-23', revenue: 4600 },

  { date: '2024-06-24', revenue: 3800 },
  { date: '2024-06-25', revenue: 4000 },
  { date: '2024-06-26', revenue: 3600 },
  { date: '2024-06-27', revenue: 4100 },
  { date: '2024-06-28', revenue: 3700 },
  { date: '2024-06-29', revenue: 4300 },
  { date: '2024-06-30', revenue: 4000 },
];

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export default function RevenueMonth() {
  const [timeRange, setTimeRange] = useState<string>('30d');

  const filteredData = useMemo(() => {
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [timeRange, chartData]);

  return (
    <Card className="pt-0 col-span-2 order-2 lg:order-1">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Doanh thu trong tháng</CardTitle>
          <CardDescription>Hiển thị doanh thu trong tháng</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="hidden w-40 rounded-lg sm:ml-auto sm:flex" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Trong 3 tháng
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Trong 30 ngày
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
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
