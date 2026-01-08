import axiosInstance from '../axiosInstance';
import { CreateBrandSchema, UpdateBrandSchema } from '@/schemas/brands';

const getAllBrandsFn = async (): Promise<Brand[]> => {
  const { data } = await axiosInstance.get('/brands/all');

  return data;
};

const updateBrandFn = async (data: UpdateBrandSchema) => {
  const res = await axiosInstance.patch('/brands/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

const getBrandByIdFn = async (id: string): Promise<Brand> => {
  const { data } = await axiosInstance.get(`/brands/${id}`);
  return data;
};

const createBrandFn = async (data: CreateBrandSchema) => {
  const res = await axiosInstance.post('/brands/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

const deleteBrandFn = async (payload: { id: string }) => {
  const data = await axiosInstance.delete('/brands', { data: payload });
  return data;
};

export { getAllBrandsFn, updateBrandFn, getBrandByIdFn, createBrandFn, deleteBrandFn };
