import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  getOrderFn,
  createOrderFn,
  getAllOrderFn,
  confirmOrderFn,
  cancelOrderFn,
  getTotalOrderFn,
  getDetailOrderFn,
  createSingleOrderFn,
  updateStatusOrderFn,
  getDetailOrderByIdFn,
} from '@/lib/api/order.api';
import { paymentWithVnpayFn } from '@/lib/api/payment';

import { GetAllOrderParams, PaymentMethod } from '@/types/order';

const useGetOrder = () => {
  return useQuery({
    queryKey: ['order'],
    queryFn: getOrderFn,
    staleTime: 1000 * 60 * 20,
  });
};

const useGetAllOrder = (params: GetAllOrderParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => getAllOrderFn(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
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

const useGetDetailOrderById = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => getDetailOrderByIdFn(id),
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

const useCreateSingleOrder = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createSingleOrderFn,
    onSuccess: (data) => {
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

const useUpdateStatusOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStatusOrderFn,
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', data.id] });

      toast.success('Cập nhật trạng thái đơn hàng', {
        description: 'Cập nhật trạng thái đơn hàng thành công.',
        duration: 1500,
      });
    },

    onError: () => {
      toast.error('Cập nhật trạng thái đơn hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrderFn,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['order'] });

      toast.success('Hủy đơn hàng', {
        description: 'Hủy đơn hàng thành công.',
        duration: 1500,
      });
    },

    onError: () => {
      toast.error('Hủy đơn hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 1500,
      });
    },
  });
};

export {
  useGetOrder,
  useGetAllOrder,
  useCreateOrder,
  useConfirmOrder,
  useCancelOrder,
  useGetTotalOrder,
  useGetDetailOrder,
  useUpdateStatusOrder,
  useCreateSingleOrder,
  useGetDetailOrderById,
};
