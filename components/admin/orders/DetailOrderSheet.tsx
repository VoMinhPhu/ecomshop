'use client';

import Image from 'next/image';

import { Loader2, ScrollTextIcon } from 'lucide-react';

import { useGetDetailOrderById } from '@/hooks/api/order.hook';

import { formatDate } from 'date-fns';
import { formatCurrency } from '@/utils/number';
import { formatStatusOrder, getStatusColor } from '@/utils/order';

import { Button } from '@/components/ui/button';
import UpdateStatusOrder from './update/UpdateStatusOrder';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type Props = {
  id: string;
  orderCode: string;
};

export default function DetailOrderSheet({ orderCode, id }: Props) {
  const { data: detailOrder, isLoading } = useGetDetailOrderById(id);

  if (isLoading)
    return (
      <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
        <ScrollTextIcon />
        Chi tiết
        <Loader2 className="animate-spin" />
      </Button>
    );
  if (!detailOrder) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
          <ScrollTextIcon />
          Chi tiết
        </Button>
      </SheetTrigger>
      <SheetContent className="md:min-w-150 min-w-full gap-0">
        <SheetHeader>
          <SheetTitle>Chi tiết đơn hàng</SheetTitle>
          <SheetDescription>Xem chi tiết đơn hàng của khách hàng.</SheetDescription>
        </SheetHeader>
        <div className="px-4 overflow-y-scroll dropdown-scrollbar">
          <p className="mt-1">
            Mã đơn hàng:
            <span className="text-primary ml-2">{orderCode}</span>
          </p>
          <div className="py-3 border-y my-4">
            <p className="mb-3">Chi tiết</p>
            <div>
              <div>
                {detailOrder?.items.map((i) => (
                  <div key={i.id}>
                    <div className="flex items-start gap-2 my-3">
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
                        <p className="text-end font-semibold text-sm md:mr-10 mr-3">
                          {formatCurrency(i.subtotal)} <span>vnđ</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-right md:pr-10 pr-3 mt-6">
                Tổng tiền:
                <span className="text-red-500 font-semibold mx-1">{formatCurrency(detailOrder.totalAmount)}</span>
                vnđ
              </p>
            </div>
          </div>
          <div className="space-y-2.5 pb-10">
            <div className="flex items-center gap-2">
              <p className="md:min-w-70 text-zinc-700">Khách hàng:</p>
              <p className="font-semibold text-sm ml-2">{detailOrder.user.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="md:min-w-70 text-zinc-700">Số điện thoại:</p>
              <p className="font-semibold text-sm ml-2">{detailOrder.phone || '-'}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="md:min-w-70 min-w-14 text-zinc-700">Địa chỉ:</p>
              <p className="font-semibold text-sm ml-2">{detailOrder.shippingAddress || '-'}</p>
            </div>
            <div className="flex items-start gap-2">
              <p className="md:min-w-70 text-zinc-700">Ghi chú:</p>
              <p className="font-semibold text-sm ml-2">{detailOrder.note || '-'}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="md:min-w-70 text-zinc-700">Thời gian đặt hàng:</p>
              <p className="font-semibold text-sm ml-2">{formatDate(detailOrder.createdAt, 'dd/MM/yyyy')}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="md:min-w-70 text-zinc-700">Phương thức thanh toán:</p>
              <p className="font-semibold text-sm ml-2">{detailOrder.paymentMethod}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="md:min-w-70 text-zinc-700">Tình trạng:</p>
              <p className={`font-semibold text-sm ml-2 ${getStatusColor(detailOrder.status)}`}>
                {formatStatusOrder(detailOrder.status)}
              </p>
              <UpdateStatusOrder orderId={detailOrder.id} currentStatus={detailOrder.status} />
            </div>

            <p></p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
