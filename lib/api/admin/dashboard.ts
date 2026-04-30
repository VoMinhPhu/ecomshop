import axiosInstance from '@/lib/axiosInstance';
import { DashboardOverviewResponse, RecentOrdersResponse, RevenueChartResponse } from '@/types/dashboard.type';

const getOverviewCardDataFn = async (): Promise<DashboardOverviewResponse> => {
  const { data } = await axiosInstance.get('/admin/dashboard');

  return data;
};

const getOverviewChartDataFn = async (): Promise<RevenueChartResponse> => {
  const { data } = await axiosInstance.get('/admin/revenue-overview');

  return data;
};

const getRecentOrdersFn = async (): Promise<RecentOrdersResponse> => {
  const { data } = await axiosInstance.get('/admin/recent-orders');

  return data;
};

export { getOverviewCardDataFn, getOverviewChartDataFn, getRecentOrdersFn };
