import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().trim().min(1, 'Thêm tên sản phẩm'),
  price: z
    .string()
    .trim()
    .min(1, 'Cập nhật giá cho sản phẩm')
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, 'Giá không hợp lệ'),
  stock: z
    .string()
    .trim()
    .min(1, 'Số lượng sản phẩm hiện có')
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 0, 'Stock không hợp lệ'),
  salePrice: z
    .string()
    .optional()
    .refine((v) => v === undefined || (!isNaN(Number(v)) && Number(v) > 0), 'Giá khuyến mãi không hợp lệ'),
  description: z.string().trim().min(1, 'Mô tả cho sản phẩm'),
  categoryId: z.string().min(1, 'Category ID là bắt buộc'),
  brandId: z.string().min(1, 'Brand ID là bắt buộc'),
  status: z.string(),
  images: z
    .array(
      z.custom<Blob>((file) => file instanceof Blob, {
        message: 'Ảnh không hợp lệ',
      }),
    )
    .min(1, 'Hãy chọn ít nhất 1 ảnh sản phẩm'),
});

export const changeThumbnailSchema = z.object({
  id: z.string().min(1, 'ID là bắt buộc'),
  image: z
    .custom<Blob>((file) => file instanceof Blob, {
      message: 'Ảnh không hợp lệ',
    })
    .refine((file) => file instanceof Blob, {
      message: 'Ảnh phải là một file Blob hợp lệ',
    }),
});

export const addNewImageProductSchema = z.object({
  productId: z.string().min(1, 'ID là bắt buộc'),
  images: z
    .array(
      z.custom<Blob>((file) => file instanceof Blob, {
        message: 'Ảnh không hợp lệ',
      }),
    )
    .min(1, 'Hãy chọn ít nhất 1 ảnh sản phẩm'),
});

export const updateImageProductSchema = z.object({
  id: z.string().min(1, 'ID là bắt buộc'),
  image: z
    .custom<Blob>((file) => file instanceof Blob, {
      message: 'Ảnh không hợp lệ',
    })
    .refine((file) => file instanceof Blob, {
      message: 'Ảnh phải là một file Blob hợp lệ',
    }),
});

export const updateProductSchema = createProductSchema.omit({ images: true }).extend({
  id: z.string().min(1, 'ID là bắt buộc'),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type ChangeThumbnailSchema = z.infer<typeof changeThumbnailSchema>;
export type AddNewImageProductSchema = z.infer<typeof addNewImageProductSchema>;
export type UpdateImageProductSchema = z.infer<typeof updateImageProductSchema>;
