import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { addProductToCart, getUserCartFn, removeCartItemsFn, updateQuantityCartItemFn } from '@/lib/api/cart';

const useGetUserCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getUserCartFn,
    retry: 0,
    staleTime: 1000 * 60 * 20,
    refetchOnWindowFocus: false,
  });
};

const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      toast.success('Thêm sản phẩm vào giỏ hàng', {
        description: 'Thêm sản phẩm vào giỏ hàng thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (e: AxiosError<{ message: string; error: string; statusCode: number }>) => {
      if (e.status === 409) {
        return toast.error('Thêm sản phẩm vào giỏ hàng', {
          description: 'Sản phẩm đã có trong giỏ hàng.',
          duration: 2500,
        });
      }
      toast.error('Thêm sản phẩm vào giỏ hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItemsFn,
    onSuccess: () => {
      toast.success('Xóa sản phẩm khỏi giỏ hàng', {
        description: 'Xóa sản phẩm khỏi giỏ hàng thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Xóa sản phẩm khỏi giỏ hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useUpdateQuantityCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuantityCartItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('Chỉnh sửa số lượng sản phẩm', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetUserCart, useRemoveCartItem, useUpdateQuantityCartItem, useAddProductToCart };
