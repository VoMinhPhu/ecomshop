import axiosInstance from '@/lib/axiosInstance';
import { CreateProductSchema, GetCategoriesAndBrandsResponseType } from '@/types/products';

const getCategoriesAndBrandsFn = async (): Promise<GetCategoriesAndBrandsResponseType> => {
  const { data } = await axiosInstance.get('/category/categories-brands');
  return data;
};

const createProductFn = async (data: CreateProductSchema) => {
  const res = await axiosInstance.post('/product/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export { getCategoriesAndBrandsFn, createProductFn };
