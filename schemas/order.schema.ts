import z from 'zod';

export const confirmOrderSchema = z.object({
  id: z.string(),
  phone: z.string().regex(/^0[35789][0-9]{8}$/, 'Số điện thoại không hợp lệ.'),
  note: z.string().optional(),
  shippingAddress: z.string().min(1, 'Địa chỉ không được để trống'),
  paymentMethod: z.string('Vui lòng chọn phương thức thanh toán'),
});

export type ConfirmOrderSchemaType = z.infer<typeof confirmOrderSchema>;
