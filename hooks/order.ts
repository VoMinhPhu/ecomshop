import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { confirmOrderFn, createOrderFn, getDetailOrderFn, getOrderFn, getTotalOrderFn } from '@/lib/api/order';

import { PaymentMethod } from '@/types/order';
import { paymentWithVnpayFn } from '@/lib/api/payment';

const useGetOrder = () => {
  return useQuery({
    queryKey: ['order'],
    queryFn: getOrderFn,
    staleTime: 1000 * 60 * 20,
  });
};

const useGetTotalOrder = (orderCode: string) => {
  return useQuery({
    queryKey: [orderCode],
    queryFn: () => getTotalOrderFn(orderCode),
    staleTime: 1000 * 60 * 10,
  });
};

const useGetDetailOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getDetailOrderFn(id),
    staleTime: 1000 * 60 * 20,
    enabled: !!id,
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
  const router = useRouter();

  return useMutation({
    mutationFn: confirmOrderFn,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['order'] });

      if (data.paymentMethod === PaymentMethod.VISA) {
        router.push(`/order/${data.orderCode}/payment?method=${data.paymentMethod}`);
      } else if (data.paymentMethod === PaymentMethod.VNPAY) {
        const res = await paymentWithVnpayFn({ orderCode: data.orderCode });

        window.location.href = res.paymentUrl;
      } else router.push(`/order/${data.orderCode}/status`);
    },

    onError: () => {
      toast.error('Xác nhận đơn hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { useGetOrder, useCreateOrder, useGetDetailOrder, useConfirmOrder, useGetTotalOrder };
