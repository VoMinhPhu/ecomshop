import RecentOrders from '@/components/admin/home/RecentOrders';
import RevenueChart from '@/components/admin/home/RevenueChart';
import StatsOverview from '@/components/admin/home/StatsOverview';

export default function page() {
  return (
    <div className="py-3 md:py-6 px-2 md:px-4 lg:px-8">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Tổng quan</h2>
        <h3 className="mt-2 text-zinc-500">Chào mừng admin đến với giao diện quản trị.</h3>
      </div>
      <StatsOverview />
      <RevenueChart />
      <div className="mt-5 grid grid-cols-1">
        <RecentOrders />
      </div>
    </div>
  );
}
