'use client';

import RevenueWeek from './RevenueWeek';
import RevenueMonth from './RevenueMonth';
import RevenueChartLoading from './RevenueChartLoading';

import { useGetOverviewChartData } from '@/hooks/api/dashboard.hook';

export default function RevenueChart() {
  const { data, isLoading } = useGetOverviewChartData();

  if (isLoading) return <RevenueChartLoading />;

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-y-4 gap-y-3 lg:gap-4 mt-5">
      <RevenueMonth data={data.last30Days} />
      <RevenueWeek data={data.last7Days} />
    </div>
  );
}
