'use client';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRemoveCartItem } from '@/hooks/api/cart';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

type Props = {
  numberSelected: number;
  cartItemIds: string[];
  disable: boolean;
};

export default function RemoveCartItemBtn({ numberSelected, cartItemIds, disable }: Props) {
  const { mutate, isPending } = useRemoveCartItem();

  const handleRemoveCartItem = () => {
    mutate({ cartItemIds });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={isPending || disable}>
          <Loader className={cn('hidden', isPending && 'animate-spin block')} />
          Xóa ({numberSelected})
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn chắc chắn muốn xóa
            <span className="mx-1.5 text-red-500 font-semibold">{numberSelected}</span>
            sản phẩm khỏi giỏ hàng?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveCartItem} className="bg-destructive hover:bg-destructive">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
