'use client';

import Link from 'next/link';
import { useGetUserCart } from '@/hooks/cart';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';

export default function CartSection() {
  const { data: carts, isLoading, isError } = useGetUserCart();

  if (isLoading || isError)
    return (
      <Link href={'/account/cart'}>
        <Button
          variant={'outline'}
          className="bg-transparent cursor-pointer shadow-none hover:bg-white/80 h-10 py-0 text-white"
        >
          <span className="relative h-full flex items-center">
            <ShoppingCartIcon className="size-6" />
            <span className="absolute -top-2 -right-6 w-5.5 h-5.5 text-xs text-white rounded-full bg-zinc-700 flex items-center justify-center">
              0
            </span>
          </span>
        </Button>
      </Link>
    );

  const totalQuantity = carts?.data.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href={'/account/cart'}>
      <Button
        variant={'outline'}
        className="bg-transparent cursor-pointer shadow-none hover:bg-white/80 h-10 py-0 text-white"
      >
        <span className="relative h-full flex items-center">
          <ShoppingCartIcon className="size-6" />
          <span className="absolute -top-2 -right-6 w-5.5 h-5.5 text-xs text-white rounded-full bg-zinc-700 flex items-center justify-center">
            {totalQuantity}
          </span>
        </span>
      </Button>
    </Link>
  );
}
