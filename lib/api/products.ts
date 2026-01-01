import QueryString from 'qs';
import axiosInstance from '@/lib/axiosInstance';
import {
  ProductFilterParams,
  GetProductBySlugResponse,
  GetProductsWithFiltersResponse,
  GetNameAndSlugOfCategoriesAndBrandsResponseType,
} from '@/types/products';

const getProductBySlugFn = async (slug: string): Promise<GetProductBySlugResponse> => {
  const res = await axiosInstance.get(`/product/${slug}`);

  return res.data;
};

const getNameAndSlugOfCategoriesAndBrandsFn = async (): Promise<GetNameAndSlugOfCategoriesAndBrandsResponseType> => {
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
