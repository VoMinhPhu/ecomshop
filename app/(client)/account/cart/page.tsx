'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { Loader, ShoppingCart } from 'lucide-react';

import { useGetUserCart } from '@/hooks/cart';
import { useCreateOrder } from '@/hooks/order';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/number';

import ManageQuantityBtn from '@/components/account/cart/ManageQuantityBtn';
import RemoveCartItemBtn from '@/components/account/cart/RemoveCartItemBtn';

const page = () => {
  const { data: carts, isLoading } = useGetUserCart();
  const { mutate: createOrderMutate, isPending } = useCreateOrder();

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!carts) return;

    setQuantities(Object.fromEntries(carts.data.map((d) => [d.id, d.quantity])));
    setSelected(Object.fromEntries(carts.data.map((d) => [d.id, false])));
  }, [carts]);

  const selectedIds = useMemo(
    () =>
      Object.entries(selected)
        .filter(([, v]) => v)
        .map(([id]) => id),
    [selected],
  );

  const selectedCount = selectedIds.length;

  const totalPrice = useMemo(() => {
    if (!carts) return 0;

    return carts.data.reduce((sum, d) => {
      if (!selected[d.id]) return sum;

      const qty = quantities[d.id] ?? d.quantity;
      const price = d.product.salePrice ?? d.product.price;

      return sum + price * qty;
    }, 0);
  }, [carts, selected, quantities]);

  const handleCreateOrder = () => {
    createOrderMutate({
      cartItemIds: selectedIds,
    });
  };

  if (isLoading) {
    return (
      <Card className="mt-4 lg:ml-4 gap-0">
        <CardHeader>
          <CardTitle>QUẢN LÝ GIỎ HÀNG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-60 flex items-center justify-center gap-2 mt-4">
            <div>
              <Loader className="size-8 text-primary mx-auto animate-spin" />
              <p className="mt-2">Đang tải giỏ hàng</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 lg:ml-4 gap-0">
      <CardHeader>
        <CardTitle>QUẢN LÝ GIỎ HÀNG</CardTitle>
      </CardHeader>

      <CardContent>
        {!carts || carts.data.length === 0 ? (
          <div className="h-60 flex flex-col justify-center items-center gap-1">
            <ShoppingCart className="size-25 text-zinc-400" />
            Giỏ hàng của bạn hiện đang trống
            <Link href="/" className="mt-3">
              <Button>Mua ngay</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="min-h-60 grid gap-2 mt-4">
              {carts.data.map((d) => {
                const qty = quantities[d.id] ?? d.quantity;
                const price = d.product.salePrice ?? d.product.price;

                return (
                  <div key={d.id} className="flex w-full items-start gap-2 max-h-34 rounded-md border p-4">
                    <Label className="h-full flex items-center w-6">
                      <Checkbox
                        checked={!!selected[d.id]}
                        onCheckedChange={(checked) =>
                          setSelected((prev) => ({
                            ...prev,
                            [d.id]: Boolean(checked),
                          }))
                        }
                        id={d.id}
                      />
                    </Label>

                    <div className="flex grow items-start gap-3">
                      <Label htmlFor={d.id}>
                        <Image
                          src={d.product.thumbnail}
                          width={100}
                          height={100}
                          alt={d.product.name}
                          className="object-contain w-25 h-25 rounded-md"
                        />
                      </Label>

                      <div className="grid gap-2">
                        <Label>{d.product.name}</Label>

                        <div className="flex gap-2 items-center ml-4">
                          <p className="text-red-500 font-semibold">{formatCurrency(price * qty)}</p>

                          {d.product.salePrice && (
                            <p className="line-through text-sm text-zinc-400">{formatCurrency(d.product.price)}</p>
                          )}
                        </div>

                        <ManageQuantityBtn
                          // id={d.id}
                          value={qty}
                          onChange={(value) =>
                            setQuantities((prev) => ({
                              ...prev,
                              [d.id]: value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border mt-10 rounded-sm p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">Tổng tiền</p>
                <p className="text-red-500 font-semibold">{formatCurrency(totalPrice)}</p>
              </div>

              <div className="flex gap-3">
                <RemoveCartItemBtn
                  numberSelected={selectedCount}
                  disable={selectedCount === 0}
                  cartItemIds={selectedIds}
                />

                <Button disabled={selectedCount === 0} onClick={handleCreateOrder}>
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

export default page;
