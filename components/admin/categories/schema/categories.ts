import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, 'Thêm tên danh mục'),
  icon: z.custom<Blob>((file) => file instanceof Blob, {
    message: 'Hãy chọn ảnh danh mục',
  }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.extend({
  id: z.string().min(1, 'ID là bắt buộc'),
  icon: z.union([z.instanceof(Blob), z.string().url(), z.literal('').optional()]),
});

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
