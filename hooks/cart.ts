import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getUserCartFn, removeCartItemsFn, updateQuantityCartItemFn } from '@/lib/api/cart';

const useGetUserCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getUserCartFn,
    staleTime: 1000 * 60 * 20,
  });
};

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItemsFn,
    onSuccess: () => {
      toast.success('Xóa sản phẩm khỏi giỏ hàng', {
        description: 'Xóa sản phẩm khỏi giỏ thành công.',
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

export { useGetUserCart, useRemoveCartItem, useUpdateQuantityCartItem };
