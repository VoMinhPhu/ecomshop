import Image from 'next/image';
import { CalendarIcon, CreditCardIcon, DotIcon, PackageIcon, PhoneIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Order, OrderStatus } from '@/types/order.type';

import { formatCurrency } from '@/utils/number.utils';
import { formatStatusOrder, getStatusColor } from '@/utils/order.utils';

import ActionForOrder from './ActionForOrder';

export default function OrderDetailDialog({
  order,
  open,
  onClose,
}: {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose} modal={false}>
      {open && <div className="fixed top-0 inset-0 bg-black/50 z-50" onClick={onClose} />}
      <DialogContent className="md:max-w-2xl max-w-[calc(100%-8px)] max-h-[90vh] dropdown-scrollbar md:p-6 p-3">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PackageIcon className="w-5 h-5 text-primary" />
            Chi tiết đơn hàng
          </DialogTitle>
        </DialogHeader>

        {/* Order Code & Status */}
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="text-sm text-muted-foreground">Mã đơn hàng</p>
            <p className="font-bold text-primary text-lg">{order.orderCode}</p>
          </div>
          <span
            className={`font-semibold flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-muted ${getStatusColor(order.status)}`}
          >
            {order.status === OrderStatus.PENDING && <DotIcon className="animate-ping w-4 h-4" />}
            {formatStatusOrder(order.status)}
          </span>
        </div>

        {/* Order Info */}
        <div className="py-3 border-b space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Ngày đặt:</span>
            <span>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
          {order.phone && (
            <div className="flex items-center gap-2 text-sm">
              <PhoneIcon className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Số điện thoại:</span>
              <span>{order.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <CreditCardIcon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Thanh toán:</span>
            <span className="font-medium">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="py-3 border-b">
          <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
            Sản phẩm ({order.items.length})
          </p>
          <div className="space-y-3">
            {order.items.map((i) => (
              <div key={i.id} className="flex gap-3 pb-3 border-b last:border-b-0 last:pb-0">
                <Image
                  src={i.product.thumbnail}
                  width={80}
                  height={80}
                  alt={i.product.name}
                  className="object-contain w-20 h-20 rounded-md border bg-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm line-clamp-2">{i.product.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-muted-foreground">x{i.quantity}</p>
                    <p className="font-semibold text-red-500">{formatCurrency(i.subtotal)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="font-semibold">Tổng cộng</span>
          <span className="text-red-500 font-bold text-xl">{formatCurrency(order.totalAmount)}</span>
        </div>

        {/* Action for PENDING */}
        <ActionForOrder
          orderId={order.id}
          orderStatus={order.status}
          orderCode={order.orderCode}
          orderPaymentMethod={order.paymentMethod}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
