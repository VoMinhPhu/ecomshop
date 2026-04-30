import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  createProductFn,
  updateProductFn,
  getAllProductFn,
  getProductByIdFn,
  changeThumbnailFn,
  updateImageProductFn,
  deleteImageProductFn,
  addNewImagesProductFn,
  getCategoriesAndBrandsFn,
  getCategoriesAndBrandsToFilterFn,
  deleteProductFn,
} from '@/lib/api/admin/product';
import {
  searchProductFn,
  getProductWithFilterFn,
  getDynamicProductInsoByIdFn,
  getNameAndSlugOfCategoriesAndBrandsFn,
} from '@/lib/api/products.api';

import {
  GetProductByIdResponse,
  UseGetAllProductWithFilterParams,
  GetDynamicProductInsoBySlugResponse,
} from '@/types/products.type';

const useGetCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['category', 'brand'],
    queryFn: getCategoriesAndBrandsFn,
    staleTime: 1000 * 60 * 30,
  });
};

const useGetNameAndSlugOfCategoriesAndBrands = () => {
  return useQuery({
    queryKey: ['category', 'brand', 'slug'],
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

const useAddNewImagesProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewImagesProductFn,
    onSuccess: () => {
      toast.success('Thêm mới ảnh sản phẩm', {
        description: 'Thêm mới ảnh sản phẩm thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      toast.error('Thêm mới ảnh sản phẩm', {
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

const useChangeThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeThumbnailFn,
    onSuccess: () => {
      toast.success('Cập nhật ảnh thu nhỏ', {
        description: 'Cập nhật ảnh thu nhỏ thành công.',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Cập nhật ảnh thu nhỏ', {
          description: 'Ảnh thu nhỏ không tồn tại trong hệ thống.',
          duration: 2000,
        });
        return;
      }
      toast.error('Cập nhật ảnh thu nhỏ', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
      });
    },
  });
};

const useUpdateImageProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateImageProductFn,
    onSuccess: () => {
      toast.success('Cập nhật ảnh chi tiết', {
        description: 'Cập nhật ảnh chi tiết thành công.',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Cập nhật ảnh chi tiết', {
          description: 'ảnh chi tiết không tồn tại trong hệ thống.',
          duration: 2000,
        });
        return;
      }
      toast.error('Cập nhật ảnh chi tiết', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
      });
    },
  });
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductFn,
    onSuccess: () => {
      toast.success('Xóa sản phẩm', {
        description: 'Xóa sản phẩm thành công.',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Xóa sản phẩm', {
          description: 'Sản phẩm không tồn tại trong hệ thống.',
          duration: 2000,
        });
        return;
      }
      toast.error('Xóa sản phẩm', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
      });
    },
  });
};

const useDeleteImageProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImageProductFn,
    onSuccess: () => {
      toast.success('Xóa ảnh chi tiết', {
        description: 'Xóa ảnh chi tiết thành công.',
        duration: 2000,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error: AxiosError) {
      if (error.status === 404) {
        toast.error('Xóa ảnh chi tiết', {
          description: 'ảnh chi tiết không tồn tại trong hệ thống.',
          duration: 2000,
        });
        return;
      }
      toast.error('Xóa ảnh chi tiết', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2000,
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

const useSearchProduct = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchProductFn(query),
    enabled: query.trim().length > 0,
    retry: 1,
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
  return useQuery<GetProductByIdResponse>({
    queryKey: ['products', id],
    queryFn: () => getProductByIdFn(id!),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
};

const useGetDynamicProductInfoById = (slug: string) => {
  return useQuery<GetDynamicProductInsoBySlugResponse>({
    queryKey: ['products', 'detail', 'dynamic', slug],
    queryFn: () => getDynamicProductInsoByIdFn(slug),
    staleTime: 1000 * 60 * 20,
    enabled: !!slug,
  });
};

export {
  useDeleteProduct,
  useCreateProduct,
  useUpdateProduct,
  useGetAllProduct,
  useSearchProduct,
  useGetProductById,
  useChangeThumbnail,
  useUpdateImageProduct,
  useDeleteImageProduct,
  useAddNewImagesProduct,
  useGetCategoriesAndBrands,
  useGetAllProductWithFilter,
  useGetDynamicProductInfoById,
  useGetCategoriesAndBrandsToFilter,
  useGetNameAndSlugOfCategoriesAndBrands,
};
