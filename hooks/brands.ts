import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBrandFn, getAllBrandsFn, getBrandByIdFn, updateBrandFn } from '@/lib/api/brands';

const useGetAllBrands = () => {
  return useQuery<Category[]>({
    queryKey: ['brands'],
    queryFn: getAllBrandsFn,
    staleTime: 1000 * 60 * 30,
  });
};

const useGetBrandById = (id?: string) => {
  return useQuery<Category>({
    queryKey: ['brands', id],
    queryFn: () => getBrandByIdFn(id!),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
  });
};

const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBrandFn,
    onSuccess: () => {
      toast.success('Cập nhật thương hiệu', {
        description: 'Cập nhật thương hiệu thành công',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Cập nhật thương hiệu', {
          description: 'Thương hiệu không tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }
      toast.error('Cập nhật thương hiệu', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBrandFn,
    onSuccess: () => {
      toast.success('Tạo thương hiệu', {
        description: 'Tạo thương hiệu thành công',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
    },
    onError(error: AxiosError) {
      if (error.status === 409) {
        toast.error('Tạo thương hiệu', {
          description: 'Thương hiệu đã tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }

      toast.error('Tạo thương hiệu', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetAllBrands, useGetBrandById, useUpdateBrand, useCreateBrand };
