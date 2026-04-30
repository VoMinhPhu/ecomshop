import { z } from 'zod';

export const createBrandSchema = z.object({
  name: z.string().trim().min(1, 'Thêm tên thương hiệu'),
  icon: z.custom<Blob>((file) => file instanceof Blob, {
    message: 'Hãy chọn ảnh thương hiệu',
  }),
});

export const updateBrandSchema = createBrandSchema.extend({
  id: z.string().min(1, 'ID là bắt buộc'),
  icon: z.union([z.instanceof(Blob), z.string().url(), z.literal('').optional()]),
});

export type CreateBrandSchema = z.infer<typeof createBrandSchema>;
export type UpdateBrandSchema = z.infer<typeof updateBrandSchema>;
