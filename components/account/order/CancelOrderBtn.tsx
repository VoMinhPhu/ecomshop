'use client';

import { useCancelOrder } from '@/hooks/api/order.hook';
import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

type Props = {
  id: string;
  onClose: () => void;
};

export default function CancelOrderBtn({ id, onClose }: Props) {
  const { mutate: cancelOrderMutate, isPending } = useCancelOrder();
  const handleCancelOrder = () => {
    cancelOrderMutate(id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <button
      className="flex items-center justify-center w-full py-2.5 rounded-md border border-red-500 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors"
      onClick={handleCancelOrder}
    >
      <LoaderIcon className={cn('animate-spin size-5 mr-2', isPending ? 'block' : 'hidden')} />
      {isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
    </button>
  );
}
