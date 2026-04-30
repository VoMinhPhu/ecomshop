import { useEffect, useMemo, useRef, useState } from 'react';

import debounce from 'lodash.debounce';
import { useUpdateQuantityCartItem } from '../api/cart.hook';

import { CartItem } from '@/types/cart.type';

export type CartUIState = {
  quantity: number;
  selected: boolean;
};

export function useCartUI(cartsData: CartItem[]) {
  const { mutate: updateQuantityMutate } = useUpdateQuantityCartItem();
  const originalQuantitiesRef = useRef<Record<string, number>>({});
  const [uiState, setUIState] = useState<Record<string, CartUIState>>({});

  const debouncedUpdate = useMemo(
    () =>
      debounce((id: string, quantity: number) => {
        updateQuantityMutate(
          { id, quantity },
          {
            onError: () => {
              setUIState((prev) => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  quantity: originalQuantitiesRef.current[id] ?? 1,
                },
              }));
            },
          },
        );
      }, 400),
    [updateQuantityMutate],
  );

  useEffect(() => {
    if (!cartsData) return;

    setUIState((prev) =>
      Object.fromEntries(
        cartsData.map((d) => [
          d.id,
          {
            quantity: prev[d.id]?.quantity ?? d.quantity,
            selected: prev[d.id]?.selected ?? false,
          },
        ]),
      ),
    );

    originalQuantitiesRef.current = Object.fromEntries(cartsData.map((d) => [d.id, d.quantity]));
  }, [cartsData]);

  useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

  const selectedIds = useMemo(
    () =>
      Object.entries(uiState)
        .filter(([, v]) => v.selected)
        .map(([id]) => id),
    [uiState],
  );

  const totalPrice = useMemo(() => {
    return (
      cartsData?.reduce((sum, d) => {
        const ui = uiState[d.id];
        if (!ui?.selected) return sum;
        const price = d.product.salePrice ?? d.product.price;
        return sum + price * ui.quantity;
      }, 0) ?? 0
    );
  }, [cartsData, uiState]);

  return { uiState, setUIState, selectedIds, totalPrice, debouncedUpdate };
}
