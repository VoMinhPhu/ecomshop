'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Dot } from 'lucide-react';

import { Order, OrderStatus } from '@/types/order';
import { formatCurrency } from '@/utils/number';
import { formatStatusOrder, getStatusColor } from '@/utils/order';

import OrderDetailDialog from './OrderDetailDialog';
type Props = {
  orders: Order[];
};

const RenderOrder = ({ orders }: Props) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!orders.length)
    return <p className="p-4 justify-center text-muted-foreground h-30 flex items-center">Không có đơn hàng</p>;

  return (
    <>
      {orders.map((d) => (
        <div key={d.id} className="md:mb-10 mb-6 cursor-pointer" onClick={() => setSelectedOrder(d)}>
          <div className="border shadow rounded-md p-3 mt-3 hover:border-primary hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                Mã đơn hàng: <span className="text-primary">{d.orderCode}</span>
              </p>
              <span className={`font-semibold text-right mr-2 flex items-center ${getStatusColor(d.status)}`}>
                {d.status === OrderStatus.PENDING ? (
                  <span className="flex items-center text-sm" onClick={(e) => e.stopPropagation()}>
                    <Link href={`/order/${d.orderCode}`} className="flex items-center text-sm">
                      <Dot className="animate-ping" />
                      {formatStatusOrder(d.status)} &gt;
                    </Link>
                  </span>
                ) : (
                  formatStatusOrder(d.status)
                )}
              </span>
            </div>
            <div>
              {d.items.map((i) => (
                <div key={i.id} className="flex pb-3 md:pt-3 mb-2 pt-1 border-b last:border-b-0">
                  <Image
                    src={i.product.thumbnail}
                    width={100}
                    height={100}
                    alt={i.product.name}
                    className="object-contain mr-3 w-25 h-25 rounded-md md:ml-4"
                  />
                  <div>
                    <p className="font-semibold">{i.product.name}</p>
                    <div className="mt-2">
                      <p>Số lượng: {i.quantity}</p>
                      <p>
                        Giá cả:
                        <span className="ml-2 text-red-500">{formatCurrency(i.subtotal)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-red-500 font-semibold text-right text-lg">Tổng tiền: {formatCurrency(d.totalAmount)}</p>
          </div>
        </div>
      ))}

      <OrderDetailDialog order={selectedOrder} open={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default RenderOrder;
