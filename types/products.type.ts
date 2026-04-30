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

export type GetProductByIdResponse = GetProductBySlugResponse & {
  sold: number;
  price: number;
  stock: number;
  salePrice: number;
  thumbnail: string;
  status: ProductStatus;
};

export interface GetProductBySlugResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: { id: string; url: string }[];
  category: {
    id: string;
    name: string;
  };
  brand: {
    id: string;
    name: string;
  };
}

export interface GetDynamicProductInsoBySlugResponse {
  stock: number;
  sold: number;
  price: number;
  salePrice?: number | null;
  status: ProductStatus;
}

export type GetAllProductResponseType = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type BaseFilter = {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'priceAsc' | 'priceDesc' | 'newest';
  page?: number;
  limit?: number;
};

export type SearchProductResponse = {
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  salePrice: number | null;
}[];

export type FilterProducts = BaseFilter & {
  brand?: string;
  category?: string;
};

export type ProductFilterParams = BaseFilter & {
  brand?: string[];
  category?: string[];
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
