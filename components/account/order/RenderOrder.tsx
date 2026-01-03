import Image from 'next/image';
import { Order, OrderStatus } from '@/types/order';
import { formatCurrency } from '@/utils/number';
import { formatStatusOrder, getStatusColor } from '@/utils/order';
import { Dot } from 'lucide-react';
import Link from 'next/link';

type Props = {
  orders: Order[];
};

const RenderOrder = ({ orders }: Props) => {
  if (!orders.length)
    return <p className="p-4 justify-center text-muted-foreground h-30 flex items-center">Không có đơn hàng</p>;

  return orders.map((d) => (
    <div key={d.id} className="md:mb-10 mb-6">
      <div className="border shadow rounded-md p-3 mt-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold">
            Mã đơn hàng: <span className="text-primary">{d.orderCode}</span>
          </p>
          <span className={`font-semibold text-right mr-2 flex items-center ${getStatusColor(d.status)}`}>
            {d.status === OrderStatus.PENDING ? (
              <Link href={`/order/${d.orderCode}`} className="flex items-center text-sm">
                <span>
                  <Dot className="animate-ping" />
                </span>
                {formatStatusOrder(d.status)} &gt;
              </Link>
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
  ));
};

export default RenderOrder;
