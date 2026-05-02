'use client';

import Image from 'next/image';
import { ScrollTextIcon } from 'lucide-react';
import { formatCurrency } from '@/utils/number.utils';
import { useGetDetailOrderById } from '@/hooks/api/order.hook';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import OrderInfoList from './OrderInfoList';
import DetailOrderSkeleton from './DetailOrderSkeleton';

type Props = {
  id: string;
  orderCode: string;
};

export default function DetailOrderDialog({ orderCode, id }: Props) {
  const { data: detailOrder, isLoading } = useGetDetailOrderById(id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
          <ScrollTextIcon />
          Chi tiết
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-200 min-w-full gap-0 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <DialogDescription>Mã đơn hàng: {orderCode}</DialogDescription>
        </DialogHeader>
        {isLoading || !detailOrder ? (
          <DetailOrderSkeleton />
        ) : (
          <>
            <div className="px-2 overflow-y-auto dropdown-scrollbar max-h-80">
              {detailOrder.items.map((i) => (
                <div key={i.id} className="flex items-start gap-2 my-3">
                  <Image
                    src={i.product.thumbnail}
                    width={80}
                    height={80}
                    alt={i.product.name}
                    className="border rounded-md object-contain h-20 p-0.75"
                  />
                  <div>
                    <p className="text-sm max-w-64">{i.product.name}</p>
                    <p className="text-zinc-400 text-sm mt-1">Số lượng: {i.quantity}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-end font-semibold text-sm mr-3">
                      {formatCurrency(i.subtotal)} <span>vnđ</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-1 pt-1.5">
              <OrderInfoList detailOrder={detailOrder} />
              <div className="border-t border-border flex justify-between py-2 mt-2">
                <p>Tổng tiền:</p>
                <p className="text-red-500 font-semibold text-lg mx-1">{formatCurrency(detailOrder.totalAmount)} vnđ</p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
