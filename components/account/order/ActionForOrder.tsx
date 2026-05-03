'use client';

import Link from 'next/link';
import CancelOrderBtn from './CancelOrderBtn';
import { OrderStatus, PaymentMethod } from '@/types/order.type';

type Props = {
  orderId: string;
  orderCode: string;
  orderStatus: OrderStatus;
  orderPaymentMethod: PaymentMethod;
  onClose: () => void;
};

export default function ActionForOrder({ onClose, orderId, orderCode, orderStatus, orderPaymentMethod }: Props) {
  let actionLabel: string | null = null;

  if (orderStatus === OrderStatus.PENDING) {
    actionLabel = 'Xem & xác nhận đơn hàng';
  } else if (orderStatus === OrderStatus.CONFIRMED) {
    actionLabel = orderPaymentMethod === PaymentMethod.COD ? 'Thanh toán' : 'Tiếp tục mua hàng';
  }

  if (!actionLabel) return null;

  return (
    <div className="flex gap-2 mt-2">
      <CancelOrderBtn id={orderId} onClose={onClose} />
      <Link
        href={`/order/${orderCode}`}
        className="flex items-center justify-center text-center gap-1 w-full py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
