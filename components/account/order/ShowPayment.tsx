'use client';

import { cn } from '@/lib/utils';
import Lottie from 'lottie-react';
import { formatCurrency } from '@/utils/number.utils';
import { useGetTotalOrder } from '@/hooks/api/order.hook';

import { PaymentMethod } from '@/types/order.type';

import { StripeCheckout } from './CheckoutForm';

import hourglassAnimation from '@/public/icons/hourglass.json';

type Props = {
  orderCode: string;
  paymentMethod: string;
};

const ShowPayment = ({ orderCode, paymentMethod }: Props) => {
  const { data } = useGetTotalOrder(orderCode);

  if (!data) return null;

  return (
    <>
      <div className="text-center py-10">
        <p className="text-3xl font-semibold">Thanh toán</p>
        <Lottie animationData={hourglassAnimation} className="w-16 h-16 mx-auto" />
        <p className="text-primary text-xl mt-1 font-semibold">{formatCurrency(data.total)} đ</p>
      </div>
      <div className="lg:w-150 md:max-w-lg max-w-sm mx-auto">
        <div className={cn(paymentMethod === PaymentMethod.VNPAY && 'hidden')}>
          <StripeCheckout amount={data.total} orderCode={orderCode} />
        </div>
        <div className={cn(paymentMethod === PaymentMethod.VISA && 'hidden')}>
          <div>thanh toán bằng qr</div>
        </div>
      </div>
    </>
  );
};

export default ShowPayment;
