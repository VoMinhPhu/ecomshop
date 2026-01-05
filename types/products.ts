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

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type ChangeThumbnailSchema = z.infer<typeof changeThumbnailSchema>;

export const updateProductSchema = createProductSchema.omit({ images: true }).extend({
  id: z.string().min(1, 'ID là bắt buộc'),
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
  stock: number;
  sold: number;
  description: string;
  thumbnail: string;
  images: { id: string; url: string }[];
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

export type GetProductByIdResponse = GetProductBySlugResponse;

export interface GetProductBySlugResponse {
  id: string;
  name: string;
  slug: string;
  stock: number;
  sold: number;
  description: string;
  thumbnail: string;
  images: { id: string; url: string }[];
  price: number;
  salePrice?: number | null;
  status: ProductStatus;
  category: {
    id: string;
    name: string;
  };
  brand: {
    id: string;
    name: string;
  };
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

export type ProductFilterParams = {
  search?: string;
  brand?: string[];
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: 'priceAsc' | 'priceDesc' | 'newest';
  page?: number;
  limit?: number;
};

export type UseGetAllProductWithFilterParams = {
  page: number;
  limit: number;
  search?: string;
  brand?: string[];
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: 'priceAsc' | 'priceDesc' | 'newest';
};

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  price: number;
  salePrice: number | null;
  status: string;
  createdAt: Date;
  brand: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}

export interface GetProductsWithFiltersResponse {
  data: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ProductOnHomePageResponse = {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  salePrice: number;
  // totalSold: number;
};

export type TopSellResponseType = ProductOnHomePageResponse[];
export type NewProductsResponseType = ProductOnHomePageResponse[];
export type GetDiscountProductsResponseType = ProductOnHomePageResponse[];
