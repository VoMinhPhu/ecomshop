'use client';

import { useState } from 'react';

import ManageBuyProduct from './ManageBuyProduct';
import DynamicProductInfoLoading from './DynamicProductInfoLoading';

import { useGetDynamicProductInfoById } from '@/hooks/api/products';

import { formatCurrency } from '@/utils/number';

type Props = {
  productId: string;
};

export default function RenderDynamicProduct({ productId }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  const { data: dataDynamic, isLoading: dynamicLoading } = useGetDynamicProductInfoById(productId);

  if (dynamicLoading) return <DynamicProductInfoLoading />;
  if (!dataDynamic) return null;

  return (
    <>
      <p className="text-3xl font-semibold text-primary mt-1 flex gap-3">
        {formatCurrency(dataDynamic.salePrice ? dataDynamic.salePrice * quantity : dataDynamic.price * quantity)}
        <span className="flex items-start">
          <span className="text-sm">VND</span>
        </span>
      </p>

      {dataDynamic.salePrice && (
        <p className="text-sm font-semibold text-zinc-400 line-through mt-1 flex gap-3">
          {formatCurrency(dataDynamic.price * quantity)}
          <span className="flex items-start">
            <span className="text-sm">VND</span>
          </span>
        </p>
      )}
      <div className="mt-6 text-zinc-400">
        <h3>
          Số lượng: <span>{dataDynamic.stock}</span>
        </h3>
        <h3>
          Đã bán: <span>{dataDynamic.sold}</span>
        </h3>
      </div>

      <ManageBuyProduct productId={productId} quantity={quantity} setQuantity={setQuantity} />
    </>
  );
}
