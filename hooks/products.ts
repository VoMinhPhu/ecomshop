import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createProductFn,
  updateProductFn,
  getAllProductFn,
  getProductByIdFn,
  getCategoriesAndBrandsFn,
  getCategoriesAndBrandsToFilterFn,
} from '@/lib/api/admin/product';
import { getNameAndSlugOfCategoriesAndBrandsFn, getProductBySlugFn, getProductWithFilterFn } from '@/lib/api/products';

import { GetProductBySlugResponse, Product, UseGetAllProductWithFilterParams } from '@/types/products';

const useGetCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['category', 'brand'],
    queryFn: getCategoriesAndBrandsFn,
    staleTime: 1000 * 60 * 30,
  });
};

const useGetNameAndSlugOfCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['category', 'brand'],
    queryFn: getNameAndSlugOfCategoriesAndBrandsFn,
    staleTime: 1000 * 60 * 30,
  });
};

const useGetCategoriesAndBrandsToFilter = () => {
  return useQuery({
    queryKey: ['category', 'brand', 'filter'],
    queryFn: getCategoriesAndBrandsToFilterFn,
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

const useGetAllProduct = ({
  brand,
  category,
  page,
  limit,
}: {
  page: number;
  limit: number;
  brand: string | undefined;
  category: string | undefined;
}) => {
  return useQuery({
    queryKey: ['products', page, limit, brand, category],
    queryFn: () => getAllProductFn({ page: page, limit, brand, category }),
    staleTime: 1000 * 60 * 30,
  });
};

const useGetAllProductWithFilter = ({
  sort,
  page,
  limit,
  brand,
  search,
  category,
  minPrice,
  maxPrice,
}: UseGetAllProductWithFilterParams) => {
  return useQuery({
    queryKey: ['products', page, limit, search, brand, category, minPrice, maxPrice, sort],
    queryFn: () =>
      getProductWithFilterFn({
        page,
        sort,
        limit,
        brand,
        search,
        category,
        minPrice,
        maxPrice,
      }),
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

const useGetProductBySlug = (slug: string) => {
  return useQuery<GetProductBySlugResponse>({
    queryKey: ['products', 'detail', slug],
    queryFn: () => getProductBySlugFn(slug),
    staleTime: 1000 * 60 * 20,
    enabled: !!slug,
  });
};

export {
  useCreateProduct,
  useUpdateProduct,
  useGetAllProduct,
  useGetProductById,
  useGetProductBySlug,
  useGetCategoriesAndBrands,
  useGetAllProductWithFilter,
  useGetCategoriesAndBrandsToFilter,
  useGetNameAndSlugOfCategoriesAndBrands,
};
