'use client';

import dynamic from 'next/dynamic';

const EvaluateProduct = dynamic(() => import('@/components/products/slug/comment/EvaluateProduct'), {
  ssr: false,
});

type Props = {
  productId: string;
};

export default function EvaluateProductLoader({ productId }: Props) {
  return <EvaluateProduct productId={productId} />;
}
