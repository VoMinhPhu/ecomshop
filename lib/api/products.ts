import QueryString from 'qs';
import axiosInstance from '@/lib/axiosInstance';

import { CategoriesAndBrandsResponse } from '@/types/categories';
import {
  ProductFilterParams,
  GetProductsWithFiltersResponse,
  GetDynamicProductInsoBySlugResponse,
} from '@/types/products';

const getDynamicProductInsoByIdFn = async (slug: string): Promise<GetDynamicProductInsoBySlugResponse> => {
  const res = await axiosInstance.get(`/product/dynamic/${slug}`);

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

export { getProductWithFilterFn, getDynamicProductInsoByIdFn, getNameAndSlugOfCategoriesAndBrandsFn };
