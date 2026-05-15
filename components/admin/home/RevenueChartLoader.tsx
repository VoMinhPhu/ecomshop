'use client';

import dynamic from 'next/dynamic';
import RevenueChartLoading from './RevenueChartLoading';

const RevenueChart = dynamic(() => import('./RevenueChart'), {
  ssr: false,
  loading: () => <RevenueChartLoading />,
});

export default function RevenueChartLoader() {
  return <RevenueChart />;
}
