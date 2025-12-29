import z from 'zod';

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

export const confirmOrderSchema = z.object({
  id: z.string(),

  phone: z.string().regex(/^0[35789][0-9]{8}$/, 'Số điện thoại không hợp lệ.'),

  note: z.string().optional(),

  shippingAddress: z.string().min(1, 'Địa chỉ không được để trống'),

  paymentMethod: z.string('Vui lòng chọn phương thức thanh toán'),
});

export type ConfirmOrderSchemaType = z.infer<typeof confirmOrderSchema>;

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
