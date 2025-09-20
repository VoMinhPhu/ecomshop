import axiosInstance from '@/lib/axiosInstance';
import {
  Product,
  FilterProducts,
  CreateProductSchema,
  UpdateProductSchema,
  GetAllProductResponseType,
  GetCategoriesAndBrandsResponseType,
} from '@/types/products';

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

const updateProductFn = async (data: UpdateProductSchema) => {
  const res = await axiosInstance.patch('/product/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

const getAllProductFn = async (filters: FilterProducts = {}): Promise<GetAllProductResponseType> => {
  const finalFilters = {
    page: 1,
    limit: 20,
    ...filters,
  };
  const params = Object.fromEntries(Object.entries(finalFilters).filter(([_, v]) => v !== undefined && v !== null));

  const res = await axiosInstance.get(`/product/all`, { params });

  return res.data;
};

const getProductByIdFn = async (id: string): Promise<Product> => {
  const res = await axiosInstance.get(`/product/admin/${id}`);

  return res.data;
};

export { getCategoriesAndBrandsFn, createProductFn, updateProductFn, getAllProductFn, getProductByIdFn };
