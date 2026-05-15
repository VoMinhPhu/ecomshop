'use client';

import dynamic from 'next/dynamic';
import { formatCurrency } from '@/utils/number.utils';
import { useGetTotalOrder } from '@/hooks/api/order.hook';

import { PaymentMethod } from '@/types/order.type';

import hourglassAnimation from '@/public/icons/hourglass.json';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const StripeCheckout = dynamic(() => import('./CheckoutForm').then((mod) => mod.StripeCheckout), { ssr: false });

type Props = {
  orderCode: string;
  paymentMethod: string;
};

const ShowPayment = ({ orderCode, paymentMethod }: Props) => {
  const { data } = useGetTotalOrder(orderCode);

  if (!data) return null;

  const isVisa = paymentMethod === PaymentMethod.VISA;
  const isVnpay = paymentMethod === PaymentMethod.VNPAY;

  return (
    <>
      <div className="text-center py-10">
        <p className="text-3xl font-semibold">Thanh toán</p>
        <Lottie animationData={hourglassAnimation} className="w-16 h-16 mx-auto" />
        <p className="text-primary text-xl mt-1 font-semibold">{formatCurrency(data.total)} đ</p>
      </div>

      <div className="lg:w-150 md:max-w-lg max-w-sm mx-auto">
        {isVisa && <StripeCheckout amount={data.total} orderCode={orderCode} />}
        {isVnpay && <div>thanh toán bằng qr</div>}
      </div>
    </>
  );
};

export default ShowPayment;
