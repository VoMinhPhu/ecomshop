import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProductFn,
  updateProductFn,
  getAllProductFn,
  getProductByIdFn,
  getCategoriesAndBrandsFn,
} from '@/lib/api/admin/product';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import useProductPagination from '@/stores/productStore';
import { Product } from '@/types/products';

const useGetCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['category', 'brand'],
    queryFn: getCategoriesAndBrandsFn,
    staleTime: 1000 * 60 * 30,
  });
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductFn,
    onSuccess: () => {
      toast.success('Tạo mới sản phẩm', {
        description: 'Tạo mới sản phẩm thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      if (error.status === 409) {
        toast.error('Tạo mới sản phẩm', {
          description: 'Sản phẩm đã tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }
      toast.error('Tạo mới sản phẩm', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductFn,
    onSuccess: () => {
      toast.success('Cập nhật sản phẩm', {
        description: 'Cập nhật sản phẩm thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Cập nhật sản phẩm', {
          description: 'Sản phẩm không tồn tại trong hệ thống.',
          duration: 2500,
        });
        return;
      }
      toast.error('Cập nhật sản phẩm', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useGetAllProduct = () => {
  const { currentPage, limit } = useProductPagination();

  return useQuery({
    queryKey: ['products', currentPage, limit],
    queryFn: () => getAllProductFn({ page: currentPage, limit }),
    staleTime: 1000 * 60 * 30,
  });
};

const useGetProductById = (id?: string) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: () => getProductByIdFn(id!),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
};

export { useGetCategoriesAndBrands, useCreateProduct, useUpdateProduct, useGetAllProduct, useGetProductById };
