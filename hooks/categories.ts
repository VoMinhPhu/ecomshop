import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCategoryFn, getAllCategories, getCategoryById, updateCategory } from '@/lib/api/categories';

const useGetAllCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 30,
  });
};

const useGetCategoryById = (id?: string) => {
  return useQuery<Category>({
    queryKey: ['categories', id],
    queryFn: () => getCategoryById(id!),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success('Cập nhật danh mục', {
        description: 'Cập nhật danh mục thành công',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Cập nhật danh mục', {
          description: 'Danh mục không tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }
      toast.error('Cập nhật danh mục', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryFn,
    onSuccess: () => {
      toast.success('Tạo danh mục', {
        description: 'Tạo danh mục thành công',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError(error: AxiosError) {
      if (error.status === 409) {
        toast.error('Tạo danh mục', {
          description: 'Danh mục đã tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }

      toast.error('Tạo danh mục', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetAllCategories, useGetCategoryById, useUpdateCategory, useCreateCategory };
