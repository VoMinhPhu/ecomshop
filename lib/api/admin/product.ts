import axiosInstance from '@/lib/axiosInstance';
import {
  Product,
  FilterProducts,
  CreateProductSchema,
  UpdateProductSchema,
  ChangeThumbnailSchema,
  GetAllProductResponseType,
} from '@/types/products';
import { CategoriesAndBrandsResponse } from '@/types/categories';

const getCategoriesAndBrandsFn = async (): Promise<CategoriesAndBrandsResponse<'id'>> => {
  const { data } = await axiosInstance.get('/category/categories-brands');
  return data;
};

const getCategoriesAndBrandsToFilterFn = async (): Promise<CategoriesAndBrandsResponse<'slug'>> => {
  const { data } = await axiosInstance.get('/category/categories-brands-filter');
  return data;
};

const createProductFn = async (data: CreateProductSchema) => {
  const { images, ...rest } = data;
  const formData = new FormData();

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  images.forEach((file) => {
    formData.append('images', file);
  });

  return axiosInstance.post('/product/create', formData);
};

const updateProductFn = async (data: UpdateProductSchema) => {
  const res = await axiosInstance.patch('/product/update', data);

  return res.data;
};

const getAllProductFn = async (filters: FilterProducts = {}): Promise<GetAllProductResponseType> => {
  const finalFilters = {
    page: 1,
    limit: 20,
    ...filters,
  };
  const params = Object.fromEntries(Object.entries(finalFilters).filter(([_, v]) => v !== undefined && v !== null));

  const res = await axiosInstance.get(`/product`, { params });

  return res.data;
};

const getProductByIdFn = async (id: string): Promise<Product> => {
  const res = await axiosInstance.get(`/product/admin/${id}`);

  return res.data;
};

const changeThumbnailFn = async (payload: ChangeThumbnailSchema) => {
  const { image } = payload;
  const formData = new FormData();

  formData.append('id', payload.id);
  formData.append('image', image);

  const data = await axiosInstance.patch('/product/thumbnail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export {
  createProductFn,
  updateProductFn,
  getAllProductFn,
  getProductByIdFn,
  changeThumbnailFn,
  getCategoriesAndBrandsFn,
  getCategoriesAndBrandsToFilterFn,
};
