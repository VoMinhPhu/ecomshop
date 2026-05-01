'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useRemoveCartItem } from '@/hooks/api/cart.hook';

import { cn } from '@/lib/utils';

type Props = {
  numberSelected: number;
  cartItemIds: string[];
  disable: boolean;
};

export default function RemoveCartItemBtn({ numberSelected, cartItemIds, disable }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending } = useRemoveCartItem();

  const handleRemoveCartItem = () => {
    mutate(
      { cartItemIds },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={isPending || disable}>
          <Loader className={cn('hidden', isPending && 'animate-spin block')} />
          Xóa ({numberSelected})
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <div className={cn('inset-0 fixed hidden bg-black/40 z-50', open && 'block')} />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn chắc chắn chứ?</DialogTitle>
            <DialogDescription>
              Bạn chắc chắn muốn xóa
              <span className="mx-1.5 text-red-500 font-semibold">{numberSelected}</span>
              sản phẩm khỏi giỏ hàng?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              Hủy
            </Button>

            <Button onClick={handleRemoveCartItem} className="bg-destructive hover:bg-destructive" disabled={isPending}>
              <Loader className={cn('animate-spin', isPending ? 'block' : 'hidden')} />
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
