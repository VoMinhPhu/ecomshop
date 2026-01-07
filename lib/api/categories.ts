import { Category } from '@/types/categories';
import axiosInstance from '../axiosInstance';
import { CreateCategorySchema, UpdateCategorySchema } from '@/schemas/categories';

const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get('/category/all');

  return data;
};

const updateCategory = async (data: UpdateCategorySchema) => {
  const res = await axiosInstance.patch('/category/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

const getCategoryById = async (id: string) => {
  const { data } = await axiosInstance.get(`/category/${id}`);
  return data;
};

const createCategoryFn = async (data: CreateCategorySchema) => {
  const res = await axiosInstance.post('/category/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

export { getAllCategories, updateCategory, getCategoryById, createCategoryFn };
