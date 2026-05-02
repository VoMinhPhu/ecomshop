import {
  InfoIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  ClipboardIcon,
  CreditCardIcon,
  LocateFixedIcon,
} from 'lucide-react';
import { formatDate } from 'date-fns';
import UpdateStatusOrder from './update/UpdateStatusOrder';
import { formatStatusOrder, getStatusColor } from '@/utils/order.utils';

type OrderInfoListProps = {
  detailOrder: any;
};

export default function OrderInfoList({ detailOrder }: OrderInfoListProps) {
  const infoList = [
    { icon: UserIcon, label: 'Khách hàng:', value: detailOrder.user.name },
    { icon: PhoneIcon, label: 'Số điện thoại:', value: detailOrder.phone || '-' },
    { icon: LocateFixedIcon, label: 'Địa chỉ:', value: detailOrder.shippingAddress || '-' },
    { icon: ClipboardIcon, label: 'Ghi chú:', value: detailOrder.note || '-', isStart: true },
    {
      icon: CalendarIcon,
      label: 'Thời gian đặt hàng:',
      value: formatDate(detailOrder.createdAt, 'dd/MM/yyyy'),
    },
    { icon: CreditCardIcon, label: 'Phương thức thanh toán:', value: detailOrder.paymentMethod },
    {
      icon: InfoIcon,
      label: 'Tình trạng:',
      value: formatStatusOrder(detailOrder.status),
      valueClass: getStatusColor(detailOrder.status),
      extra: <UpdateStatusOrder orderId={detailOrder.id} currentStatus={detailOrder.status} />,
    },
  ];

  return (
    <>
      {infoList.map((item, idx) => (
        <div key={idx} className={`flex gap-2 ${item.isStart ? 'items-start' : 'items-center'}`}>
          <p className="md:min-w-70 min-w-max text-zinc-700 flex items-center gap-2">
            <item.icon className="size-4" />
            {item.label}
          </p>
          <p className={`font-semibold text-sm ml-2 ${item.valueClass || ''}`.trim()}>{item.value}</p>
          {item.extra}
        </div>
      ))}
    </>
  );
}
