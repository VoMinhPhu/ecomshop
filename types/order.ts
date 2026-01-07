export type CreateOrderType = {
  cartItemIds: string[];
  note?: string;
  shippingAddress?: string;
  paymentMethod?: string;
};

export type ConfirmOrderType = {
  id: string;
  note?: string;
  shippingAddress: string;
  paymentMethod: string;
};

export type OrderProduct = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  product: OrderProduct;
};

export type Order = {
  id: string;
  orderCode: string;
  status: OrderStatus;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  items: OrderItem[];
};

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
  SHIPPED = 'shipped',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  COD = 'COD',
  VISA = 'VISA',
  QR = 'QR',
}

export type GetOrdersResponse = Order[];
export type GetOrdersDetailResponse = Order & {
  note: string;
  shippingAddress: string;
};
