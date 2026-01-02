import QueryString from 'qs';
import axiosInstance from '@/lib/axiosInstance';

import { CategoriesAndBrandsResponse } from '@/types/categories';
import { ProductFilterParams, GetProductBySlugResponse, GetProductsWithFiltersResponse } from '@/types/products';

const getProductBySlugFn = async (slug: string): Promise<GetProductBySlugResponse> => {
  const res = await axiosInstance.get(`/product/${slug}`);

  return res.data;
};

const getNameAndSlugOfCategoriesAndBrandsFn = async (): Promise<CategoriesAndBrandsResponse<'slug'>> => {
  const { data } = await axiosInstance.get('/category/categories-brands-name-slug');

  return data;
};

const getProductWithFilterFn = async (params: ProductFilterParams): Promise<GetProductsWithFiltersResponse> => {
  const res = await axiosInstance.get('/product/filter', {
    params,
    paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
  });

  return res.data;
};

export { getProductBySlugFn, getProductWithFilterFn, getNameAndSlugOfCategoriesAndBrandsFn };
