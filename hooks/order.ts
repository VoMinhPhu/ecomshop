import { confirmOrderFn, createOrderFn, getDetailOrderFn, getOrderFn } from '@/lib/api/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const useGetOrder = () => {
  return useQuery({
    queryKey: ['order'],
    queryFn: getOrderFn,
    staleTime: 1000 * 60 * 20,
  });
};

const useGetDetailOrder = (id: string) => {
  return useQuery({
    queryKey: ['order'],
    queryFn: () => getDetailOrderFn(id),
    staleTime: 1000 * 60 * 20,
  });
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createOrderFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });

      router.push(`/order/${data.orderCode}`);
    },
    onError: () => {
      toast.error('Tạo mới đơn hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useConfirmOrder = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation({
    mutationFn: confirmOrderFn,
    onSuccess: (data) => {
      toast.success('Xác nhận đơn hàng', {
        description: 'Xác nhân đơn hàng thành công.',
        duration: 2500,
      });
      queryClient.invalidateQueries({ queryKey: ['order'] });

      // router.push(`/order/${data.orderCode}`);
    },
    onError: () => {
      toast.error('Xác nhận đơn hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetOrder, useCreateOrder, useGetDetailOrder, useConfirmOrder };
