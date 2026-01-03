'use client';

import { Loader } from 'lucide-react';

import RenderOrder from '@/components/account/order/RenderOrder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetOrder } from '@/hooks/order';
import { OrderStatus } from '@/types/order';

export default function Page() {
  const { data, isLoading } = useGetOrder();

  const allOrders = data ?? [];

  const pendingOrders = allOrders.filter((o) => [OrderStatus.PENDING, OrderStatus.SHIPPED].includes(o.status));

  const completedOrders = allOrders.filter((o) => o.status === OrderStatus.COMPLETED);

  const paidOrders = allOrders.filter((o) => o.status === OrderStatus.PAID);

  const cancelledOrders = allOrders.filter((o) => o.status === OrderStatus.CANCELLED);

  if (isLoading)
    return (
      <Card className="mt-4 lg:ml-4 gap-0">
        <CardHeader>
          <CardTitle>ĐƠN HÀNG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-60 flex items-center justify-center gap-2 mt-4">
            <div>
              <Loader className="size-8 text-primary mx-auto animate-spin" />
              <p className="mt-2">Đang tải các đơn hàng</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="mt-4 lg:ml-4 gap-0">
      <CardHeader>
        <CardTitle>ĐƠN HÀNG</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <Tabs defaultValue="tab-1">
            <TabsList className="relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow"
                value="tab-1"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow"
                value="tab-2"
              >
                Cần xác nhận
              </TabsTrigger>
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow"
                value="tab-3"
              >
                Đã thanh toán
              </TabsTrigger>
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow"
                value="tab-4"
              >
                Hoàn thành
              </TabsTrigger>
              <TabsTrigger
                className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow"
                value="tab-5"
              >
                Đã hủy
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1">
              <RenderOrder orders={allOrders} />
            </TabsContent>

            <TabsContent value="tab-2">
              <RenderOrder orders={pendingOrders} />
            </TabsContent>

            <TabsContent value="tab-3">
              <RenderOrder orders={paidOrders} />
            </TabsContent>

            <TabsContent value="tab-4">
              <RenderOrder orders={completedOrders} />
            </TabsContent>

            <TabsContent value="tab-5">
              <RenderOrder orders={cancelledOrders} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
