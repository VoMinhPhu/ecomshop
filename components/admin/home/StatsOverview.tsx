'use client';

import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';

import { formatCurrency } from '@/utils/number';
import { formatPercent, isUp } from '@/utils/dashboard';

import StatsOverviewSkeleton from './StatsOverviewSkeleton';

import { useGetOverviewCardData } from '@/hooks/api/dashboard';

export default function StatsOverview() {
  const { data, isLoading } = useGetOverviewCardData();

  if (isLoading) return <StatsOverviewSkeleton />;
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-lg p-4 border shadow bg-gradient-to-b from-white via-white to-green-50">
        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-zinc-500">Người dùng</p>
            <span className="flex items-center px-1.5 py-0.5 text-zinc-700 font-semibold border rounded-lg text-sm">
              {isUp(data.userOverview.growthRate) ? (
                <TrendingUpIcon className="size-4 text-primary" />
              ) : (
                <TrendingDownIcon className="size-4 text-destructive" />
              )}
              {formatPercent(data.userOverview.growthRate)}
            </span>
          </div>
        </div>
        <p className="text-[26px] font-bold">{data.userOverview.newUsers}</p>
        <p className="mt-4 font-semibold">Người dùng mới trong hệ thống</p>
        <p className="text-sm text-zinc-500">So với tháng trước: {data.userOverview.previousMonthNewUsers}</p>
      </div>

      <div className="rounded-lg p-4 border shadow bg-gradient-to-b from-white via-white to-green-50">
        <div className="flex items-center justify-between">
          <p className="font-medium text-zinc-500">Đơn hàng</p>
          <span className="flex items-center px-1.5 py-0.5 text-zinc-700 font-semibold border rounded-lg text-sm">
            {isUp(data.overviewOrder.orders.growthRate) ? (
              <TrendingUpIcon className="size-4 text-primary" />
            ) : (
              <TrendingDownIcon className="size-4 text-destructive" />
            )}
            {formatPercent(data.overviewOrder.orders.growthRate)}
          </span>
        </div>
        <p className="text-[26px] font-bold">{data.overviewOrder.orders.current}</p>
        <p className="mt-4 font-semibold">Số đơn hàng trong tháng</p>
        <p className="text-sm text-zinc-500">Tháng trước: {data.overviewOrder.orders.previous}</p>
      </div>

      <div className="rounded-lg p-4 border shadow bg-gradient-to-b from-white via-white to-green-50">
        <div className="flex items-center justify-between">
          <p className="font-medium text-zinc-500">Tổng doanh thu</p>
          <span className="flex items-center px-1.5 py-0.5 text-zinc-700 font-semibold border rounded-lg text-sm">
            {isUp(data.overviewOrder.revenue.growthRate) ? (
              <TrendingUpIcon className="size-4 text-primary" />
            ) : (
              <TrendingDownIcon className="size-4 text-destructive" />
            )}
            {formatPercent(data.overviewOrder.revenue.growthRate)}
          </span>
        </div>
        <p className="text-[26px] font-bold">{formatCurrency(data.overviewOrder.revenue.current)}</p>
        <p className="mt-4 font-semibold">Doanh thu trong tháng</p>
        <p className="text-sm text-zinc-500">Tháng trước: {formatCurrency(data.overviewOrder.revenue.previous)}</p>
      </div>

      <div className="rounded-lg p-4 border shadow bg-gradient-to-b from-white via-white to-green-50">
        <div className="flex items-center justify-between">
          <p className="font-medium text-zinc-500">Trung bình</p>
          <span className="flex items-center px-1.5 py-0.5 text-zinc-700 font-semibold border rounded-lg text-sm">
            {isUp(data.overviewOrder.averageOrderValue.growthRate) ? (
              <TrendingUpIcon className="size-4 text-primary" />
            ) : (
              <TrendingDownIcon className="size-4 text-destructive" />
            )}
            {formatPercent(data.overviewOrder.averageOrderValue.growthRate)}
          </span>
        </div>
        <p className="text-[26px] font-bold">{formatCurrency(data.overviewOrder.averageOrderValue.current)}</p>
        <p className="mt-4 font-semibold">Giá trị đơn trung bình</p>
        <p className="text-sm text-zinc-500">
          Tháng trước: {formatCurrency(data.overviewOrder.averageOrderValue.previous)}
        </p>
      </div>
    </div>
  );
}
