import { JSX } from 'react';
import Image from 'next/image';
import { OrderStatus, PaymentMethod } from '@/types/order.type';
import { CircleCheck, Loader, XCircle } from 'lucide-react';

export const statusMap: Record<OrderStatus, { label: string; icon: JSX.Element }> = {
  pending: {
    label: 'Chưa xác nhận',
    icon: <Loader className="text-amber-500" strokeWidth={3} />,
  },
  confirmed: {
    label: 'Đã xác nhận',
    icon: <Loader className="text-blue-500" strokeWidth={3} />,
  },
  paid: {
    label: 'Đã thanh toán',
    icon: <CircleCheck className="fill-blue-500 text-white" />,
  },
  shipped: {
    label: 'Đang giao',
    icon: <Loader className="text-purple-500" strokeWidth={3} />,
  },
  completed: {
    label: 'Hoàn thành',
    icon: <CircleCheck className="fill-green-500 text-white" />,
  },
  cancelled: {
    label: 'Đã huỷ',
    icon: <XCircle className="text-red-500" />,
  },
};

export const paymentMethodMap: Record<PaymentMethod, { label: string; icon: JSX.Element }> = {
  COD: {
    label: 'Trực tiếp',
    icon: <Image src={'/icons/money.png'} width={32} height={32} alt="VISA Icon" />,
  },
  VNPAY: {
    label: 'VNPAY',
    icon: <Image src={'/icons/vnpay.svg'} width={44} height={40} alt="VISA Icon" />,
  },
  VISA: {
    label: 'VISA',
    icon: <Image src={'/icons/visa.png'} width={32} height={32} alt="VISA Icon" />,
  },
};
