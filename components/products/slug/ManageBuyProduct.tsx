'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import AuthPopup from '@/components/auth/AuthPopup';

import { useAddProductToCart } from '@/hooks/api/cart.hook';
import { useCreateSingleOrder } from '@/hooks/api/order.hook';

import { cn } from '@/lib/utils';
import useUserStore from '@/stores/user.store';
import { Loader, LoaderIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';

type Props = {
  productId: string;
  stock: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function ManageBuyProduct({ productId, quantity, setQuantity, stock }: Props) {
  const [openAuth, setOpenAuth] = useState<boolean>(false);

  const { mutate: addProductToCartMutate, isPending } = useAddProductToCart();
  const { mutate: createOrderMutate, isPending: isCreatingOrder } = useCreateSingleOrder();
  const user = useUserStore((s) => s.user);

  const handleUpdateQuantity = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      if (quantity < stock) {
        setQuantity((prev) => prev + 1);
      }
    } else {
      setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
    }
  };

  const handleAddToCart = () => {
    addProductToCartMutate({
      productId: productId,
      quantity: quantity,
    });
  };

  const handleCreateSingleOrder = () => {
    createOrderMutate({
      productId: productId,
      quantity: quantity,
    });
  };

  return (
    <div className="md:absolute bottom-8.5 md:px-8 w-full md:pb-4 pb-1 mt-1">
      <div className="md:mb-6 mb-2.5 flex items-center md:justify-start justify-between">
        <div className="mr-10">Số Lượng:</div>
        <div className="flex items-center justify-start gap-2 mt-3">
          <button
            onClick={() => handleUpdateQuantity('decrease')}
            disabled={quantity === 1}
            className="flex items-center justify-center border h-10 w-10 rounded-sm disabled:opacity-50"
          >
            <MinusIcon className="size-4.5" />
          </button>

          <span className="px-16 h-10 flex items-center border rounded-sm text-center">{quantity}</span>

          <button
            disabled={quantity === stock}
            onClick={() => handleUpdateQuantity('increase')}
            className="flex items-center justify-center border h-10 w-10 rounded-sm disabled:opacity-50"
          >
            <PlusIcon className="size-4.5" />
          </button>
        </div>
      </div>

      <div className="md:flex gap-3 items-center grid grid-cols-2 mb-6">
        {user ? (
          <Button
            onClick={handleCreateSingleOrder}
            disabled={isCreatingOrder || stock === 0}
            className="h-12 text-lg lg:w-3/5 md:w-4/7 w-full"
          >
            <Loader className={cn('animate-spin size-5', !isCreatingOrder && 'hidden')} strokeWidth={2.5} />

            {isCreatingOrder ? 'Đang xử lý...' : 'Mua ngay'}
          </Button>
        ) : (
          <Button onClick={() => setOpenAuth(true)} className="h-12 text-lg lg:w-3/5 md:w-4/7 w-full">
            Mua ngay
          </Button>
        )}

        {user ? (
          <Button
            disabled={isPending}
            onClick={handleAddToCart}
            className="h-12 text-md w-full md:w-auto"
            variant="outline"
          >
            {isPending ? <LoaderIcon className="animate-spin size-5" /> : <ShoppingCartIcon className="size-6" />}
            Thêm vào giỏ
          </Button>
        ) : (
          <Button onClick={() => setOpenAuth(true)} className="h-12 text-md w-full md:w-auto" variant="outline">
            <ShoppingCartIcon className="size-6" />
            Thêm vào giỏ
          </Button>
        )}
      </div>
      <AuthPopup open={openAuth} onOpenChange={setOpenAuth} />
    </div>
  );
}
