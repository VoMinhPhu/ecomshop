import { paymentIntentFn } from '@/lib/api/payment.api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const usePaymentIntent = () => {
  return useMutation({
    mutationFn: paymentIntentFn,

    onError: () => {
      toast.error('Thanh toán đơn hàng', {
        description: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        duration: 2500,
      });
    },
  });
};

export { usePaymentIntent };
