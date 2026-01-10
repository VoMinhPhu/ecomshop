'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';

import { formatCurrency } from '@/utils/number';
import { useGetDetailOrder } from '@/hooks/order';

import { Button } from '@/components/ui/button';
import StepperOrder from '@/components/order/StepperOrder';

import { CircleCheck, ShoppingCartIcon } from 'lucide-react';

const page = () => {
  const searchParams = useSearchParams();

  const payment = searchParams.get('payment');

  const { id } = useParams();

  const { data } = useGetDetailOrder(id as string);

  return (
    <div className="bg-zinc-100 pb-10 pt-4">
      <div className="max-w-298 mx-auto bg-white">
        <div className="py-6 px-10">
          <StepperOrder step={3} />
        </div>

        {data && (
          <>
            <div className="lg:max-w-lg md:max-w-md max-w-sm mx-auto py-10">
              <p className="text-center font-semibold text-2xl">
                {payment === 'true' ? 'Thanh toán thành công' : 'Đặt hàng thành công'}
              </p>
              <CircleCheck className="fill-primary text-white size-25 mx-auto mt-6 mb-4" />
            </div>

            <div className="px-20 pb-10">
              <p className="font-semibold">
                THÔNG TIN ĐƠN HÀNG
                <span className="ml-2 font-normal text-zinc-400">
                  {payment === 'true' ? '(Đã thanh toán)' : '(Chưa thanh toán)'}
                </span>
              </p>
              <div className="mt-2">
                <p className="font-semibold">
                  Mã đơn hàng:
                  <span className="text-primary ml-1">{data.orderCode}</span>
                </p>
                <p className="font-semibold mt-3">Sản phẩm</p>
                <div className="mt-1">
                  {data.items.map((i) => (
                    <div key={i.id} className="border rounded-md p-4 flex mb-2 h-28">
                      <Image
                        src={i.product.thumbnail}
                        alt={i.product.name}
                        width={75}
                        height={75}
                        className="object-contain mr-3"
                      />
                      <div>
                        <p className="font-semibold">{i.product.name}</p>
                        <div className="mt-3">
                          {formatCurrency(i.unitPrice)} x {i.quantity} =
                          <span className="text-red-500 ml-1 font-semibold">
                            {' '}
                            {formatCurrency(i.unitPrice * i.quantity)} đ
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-8">
                  <span className="font-semibold mr-1">Tổng đơn hàng:</span>
                  <span className="font-semibold text-red-500 text-lg">{formatCurrency(data.totalAmount)} đ</span>
                </div>
                <div className="text-right pt-8">
                  <Link href={'/products'}>
                    <Button size="lg">
                      <ShoppingCartIcon />
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default page;
