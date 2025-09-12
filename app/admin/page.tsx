import RevenueWeek from '@/components/admin/home/RevenueWeek';
import RecentOrders from '@/components/admin/home/RecentOrders';
import RevenueMonth from '@/components/admin/home/RevenueMonth';
import { CircleDollarSign, Layers, Receipt, Users } from 'lucide-react';

export default function page() {
  return (
    <div className="py-3 md:py-6 px-2 md:px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg p-4 border shadow bg-gradient-to-br from-white via-white to-green-100">
          <div className="flex items-center justify-between">
            <p className="font-medium">Người dùng</p>
            <Users size={32} className="mr-3 text-blue-500" />
          </div>
          <p className="text-4xl font-bold">22</p>
        </div>

        <div className="rounded-lg p-4 border shadow bg-gradient-to-br from-white via-white to-green-100">
          <div className="flex items-center justify-between">
            <p className="font-medium">Số đơn hàng trong tháng</p>
            <Receipt size={32} className="mr-3 text-amber-300" />
          </div>
          <p className="text-4xl font-bold">08</p>
        </div>
        <div className="rounded-lg p-4 border shadow bg-gradient-to-br from-white via-white to-green-100">
          <div className="flex items-center justify-between">
            <p className="font-medium">Tổng doanh thu</p>
            <CircleDollarSign size={32} className="mr-3 text-primary" />
          </div>
          <p className="text-4xl font-bold">2004</p>
        </div>
        <div className="rounded-lg p-4 border shadow bg-gradient-to-br from-white via-white to-green-100">
          <div className="flex items-center justify-between">
            <p className="font-medium">Sản phẩm</p>
            <Layers size={32} className="mr-3 text-blue-500" />
          </div>
          <p className="text-4xl font-bold">2032</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-4 mt-5">
        <RevenueMonth />
        <RevenueWeek />
      </div>
      <div className="mt-5 grid grid-cols-1">
        <RecentOrders />
      </div>
    </div>
  );
}
