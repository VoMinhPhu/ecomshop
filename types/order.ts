export type CreateOrderType = {
  cartItemIds: string[];
  note?: string;
  shippingAddress?: string;
  paymentMethod?: string;
};

export type CreateSingleOrderType = {
  productId: string;
  quantity: number;
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

export interface Order {
  id: string;
  orderCode: string;
  status: OrderStatus;
  totalAmount: number;
  phone: number | null;
  paymentMethod: PaymentMethod;
  createdAt: string;
  items: OrderItem[];
}

export interface GetAllOrderData extends Omit<Order, 'items'> {
  user: {
    id: string;
    name: string;
  };
}

export interface GetAllOrderRes extends Omit<Order, 'items'> {
  data: GetAllOrderData[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}

export interface GetAllOrderParams {
  page?: number;
  limit?: number;
  orderCode?: string;
  status?: string;
  paymentMethod?: string;
}

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
  VNPAY = 'VNPAY',
}

export type GetOrdersResponse = Order[];
export type GetOrdersDetailResponse = Order & {
  user: {
    name: string;
  };
  note: string;
  shippingAddress: string;
};
