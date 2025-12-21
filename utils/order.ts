import { OrderStatus } from '@/types/order';

const formatStatusOrder = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Chờ xử lý';
    case OrderStatus.PAID:
      return 'Đã thanh toán';
    case OrderStatus.SHIPPED:
      return 'Đang giao hàng';
    case OrderStatus.COMPLETED:
      return 'Hoàn thành';
    case OrderStatus.CANCELLED:
      return 'Đã hủy';
    default:
      return '';
  }
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'text-amber-500';
    case OrderStatus.PAID:
      return 'text-blue-500';
    case OrderStatus.SHIPPED:
      return 'text-purple-500';
    case OrderStatus.COMPLETED:
      return 'text-green-600';
    case OrderStatus.CANCELLED:
      return 'text-red-500';
    default:
      return '';
  }
};

export { formatStatusOrder, getStatusColor };
