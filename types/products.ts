import { z } from 'zod';

export type GetCategoriesAndBrandsResponseType = {
  categories: {
    id: string;
    name: string;
  }[];
  brands: {
    id: string;
    name: string;
  }[];
};

export type CreateProductType = {
  //
};

export const createProductSchema = z.object({
  name: z.string().trim().min(1, 'Thêm tên sản phẩm'),
  price: z.string().trim().min(1, 'Cập nhật giá cho sản phẩm'),
  salePrice: z.string().optional(),
  description: z.string('Mô tả cho sản phẩm').trim().min(1, 'Mô tả cho sản phẩm'),
  categoryId: z.string().min(1, 'Category ID là bắt buộc'),
  brandId: z.string().min(1, 'Brand ID là bắt buộc'),
  status: z.string(),
  thumbnail: z.custom<Blob>((file) => file instanceof Blob, {
    message: 'Hãy chọn ảnh sản phẩm',
  }),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
