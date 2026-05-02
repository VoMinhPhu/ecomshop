'use client';

import Link from 'next/link';

import { formatDate } from 'date-fns';

import { formatCurrency } from '@/utils/number.utils';
import { useGetRecentOrders } from '@/hooks/api/dashboard.hook';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader, TableCaption } from '@/components/ui/table';

import { RecentOrder } from '@/types/dashboard.type';
import { paymentMethodMap, statusMap } from '@/constants/order.constants';

export default function RecentOrders() {
  const { data, isLoading } = useGetRecentOrders();

  if (isLoading) return null;

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Đơn hàng gần đây</CardTitle>
          <CardDescription className="mt-1.5">5 đơn hàng được tạo gần nhất</CardDescription>
        </div>
        <Link href="/admin/orders">
          <Button>Xem tất cả</Button>
        </Link>
      </CardHeader>

      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableCaption className="mb-6">Danh sách đơn hàng mới nhất</TableCaption>

            <TableHeader className="bg-zinc-100">
              <TableRow className="h-12">
                <TableHead className="pl-6">Mã đơn</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="w-24 text-center">SL</TableHead>
                <TableHead className="w-32">Trạng thái</TableHead>
                <TableHead className="w-32 text-center">Phương thức</TableHead>
                <TableHead className="w-32 text-right">Tổng tiền</TableHead>
                <TableHead className="w-36 text-right pr-6">Ngày tạo</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map((order: RecentOrder) => {
                const status = statusMap[order.status];
                const paymentMethod = paymentMethodMap[order.paymentMethod];
                const firstProduct = order.products[0];

                return (
                  <TableRow key={order.id}>
                    <TableCell className="pl-6 font-medium">{order.orderCode}</TableCell>
                    <TableCell className="truncate max-w-[260px]">{firstProduct?.name}</TableCell>
                    <TableCell className="text-center">{order.itemsCount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                        {status.icon}
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center pl-5 gap-2 text-muted-foreground text-xs my-2">
                        {paymentMethod.icon}
                        {paymentMethod.label}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">{formatCurrency(order.totalAmount)}</TableCell>

                    <TableCell className="text-right pr-6">{formatDate(order.createdAt, 'dd/MM/yyyy')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
