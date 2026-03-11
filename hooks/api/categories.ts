import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCategoryFn,
  deleteCategoryFn,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '@/lib/api/categories';

import { Category } from '@/types/categories';

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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      await fetch('/api/revalidate/categories', { method: 'POST' });

      toast.success('Cập nhật danh mục', {
        description: 'Cập nhật danh mục thành công',
        duration: 2500,
      });
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
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      await fetch('/api/revalidate/categories', { method: 'POST' });

      toast.success('Tạo danh mục', {
        description: 'Tạo danh mục thành công',
        duration: 2500,
      });
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

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategoryFn,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });

      await fetch('/api/revalidate/categories', { method: 'POST' });

      toast.success('Xóa danh mục', {
        description: 'Xóa danh mục thành công',
        duration: 2500,
      });
    },
    onError(error: AxiosError<{ message: string; error: string; statusCode: number }>) {
      if (error.status === 404) {
        toast.error('Xóa danh mục', {
          description: 'Danh mục không tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }

      toast.error('Xóa danh mục', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetAllCategories, useGetCategoryById, useUpdateCategory, useCreateCategory, useDeleteCategory };
