'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Loader, ShoppingCart } from 'lucide-react';

import { useCreateOrder } from '@/hooks/api/order';
import { useGetUserCart } from '@/hooks/api/cart';
import { useCartUI } from '@/hooks/ui/useCartUI';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import RenderCartItem from '@/components/account/cart/RenderCartItem';
import RemoveCartItemBtn from '@/components/account/cart/RemoveCartItemBtn';

import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/number';

const Page = () => {
  const { data: carts, isLoading } = useGetUserCart();
  const { mutate: createOrderMutate, isPending } = useCreateOrder();

  const cartItems = useMemo(() => carts?.data ?? [], [carts?.data]);

  const { uiState, setUIState, selectedIds, totalPrice, debouncedUpdate } = useCartUI(cartItems);

  const handleCreateOrder = () => createOrderMutate({ cartItemIds: selectedIds });

  if (isLoading) {
    return (
      <Card className="mt-4 lg:ml-4">
        <CardHeader>
          <CardTitle>QUẢN LÝ GIỎ HÀNG</CardTitle>
        </CardHeader>
        <CardContent className="min-h-60 flex items-center justify-center">
          <Loader className="size-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 lg:ml-4 gap-1">
      <CardHeader>
        <h2 className="text-xl font-semibold">QUẢN LÝ GIỎ HÀNG</h2>
      </CardHeader>

      <CardContent>
        {!carts || carts.data.length === 0 ? (
          <div className="h-60 flex flex-col items-center justify-center gap-2">
            <ShoppingCart className="size-20 text-zinc-400" />
            Giỏ hàng trống
            <Link href="/">
              <Button>Mua ngay</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-2 mt-4">
              {carts.data.map((d) => {
                const ui = uiState[d.id];
                if (!ui) return null;
                return (
                  <RenderCartItem
                    key={d.id}
                    item={d}
                    ui={ui}
                    onChangeQuantity={(v) => {
                      setUIState((prev) => ({
                        ...prev,
                        [d.id]: { ...prev[d.id], quantity: v },
                      }));
                      debouncedUpdate(d.id, v);
                    }}
                    onToggleSelected={(checked) =>
                      setUIState((prev) => ({
                        ...prev,
                        [d.id]: { ...prev[d.id], selected: checked },
                      }))
                    }
                  />
                );
              })}
            </div>

            <div className="border rounded-md mt-8 p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Tổng tiền</p>
                <p className="text-red-500 font-semibold">{formatCurrency(totalPrice)} vnđ</p>
              </div>

              <div className="flex gap-3">
                <RemoveCartItemBtn
                  numberSelected={selectedIds.length}
                  disable={selectedIds.length === 0}
                  cartItemIds={selectedIds}
                />

                <Button disabled={selectedIds.length === 0} onClick={handleCreateOrder}>
                  <Loader className={cn('hidden', isPending && 'block animate-spin')} />
                  Mua ngay
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Page;
