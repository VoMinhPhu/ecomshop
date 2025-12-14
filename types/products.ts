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

export type GetCategoriesAndBrandsToFilterResponseType = {
  categories: {
    slug: string;
    name: string;
  }[];
  brands: {
    slug: string;
    name: string;
  }[];
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

export const updateProductSchema = createProductSchema.extend({
  id: z.string().min(1, 'ID là bắt buộc'),
  thumbnail: z.union([z.instanceof(Blob), z.string().url(), z.literal('').optional()]),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  salePrice?: number | null;
  status: ProductStatus;
  categoryId: string;
  brandId: string;
  brandName: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export type GetAllProductResponseType = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface FilterProducts {
  sort?: 'priceAsc' | 'priceDesc' | 'newest';
  brand?: string;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}
