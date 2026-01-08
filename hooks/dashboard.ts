import { getOverviewCardDataFn, getOverviewChartDataFn, getRecentOrdersFn } from '@/lib/api/admin/dashboard';
import { useQuery } from '@tanstack/react-query';

const useGetOverviewCardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getOverviewCardDataFn,
    staleTime: 1000 * 60 * 2,
  });
};

const useGetOverviewChartData = () => {
  return useQuery({
    queryKey: ['dashboard', 'revenue'],
    queryFn: getOverviewChartDataFn,
    staleTime: 1000 * 60 * 5,
  });
};

const useGetRecentOrders = () => {
  return useQuery({
    queryKey: ['dashboard', 'order', 'recent'],
    queryFn: getRecentOrdersFn,
    staleTime: 1000 * 60 * 5,
  });
};

export { useGetOverviewCardData, useGetOverviewChartData, useGetRecentOrders };
