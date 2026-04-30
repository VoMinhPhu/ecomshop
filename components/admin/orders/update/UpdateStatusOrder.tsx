'use client';

import { OrderStatus } from '@/types/order.type';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu';

import { statusMap } from '@/constants/order';
import { useUpdateStatusOrder } from '@/hooks/api/order.hook';

import { Loader2 } from 'lucide-react';

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
};

export default function UpdateStatusOrder({ orderId, currentStatus }: Props) {
  const { mutate: updateStatusMutate, isPending } = useUpdateStatusOrder();

  const handleUpdateStatus = (status: OrderStatus) => {
    updateStatusMutate({
      id: orderId,
      status,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="text-xs font-semibold text-primary ml-4 cursor-pointer">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Thay đổi'}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup>
          {Object.entries(statusMap).map(([key, item]) => (
            <DropdownMenuItem
              disabled={key === currentStatus}
              key={key}
              onClick={() => handleUpdateStatus(key as OrderStatus)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
