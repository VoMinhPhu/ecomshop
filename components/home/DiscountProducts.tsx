import Link from 'next/link';
import { getDiscountProducts } from '@/lib/server/product.server';

import DiscountProductCard from './DiscountProductCard';

export default async function DiscountProducts() {
  const products = await getDiscountProducts();

  return (
    <div className="bg-gradient-to-b from-red-400 to-white mt-4 rounded-md p-4 pb-12 gap-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Giá tốt hôm nay</p>
        <Link href="/products" className="text-sm font-semibold">
          Xem tất cả
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-1.5 gap-y-2 mt-8">
        {products.map((p) => (
          <DiscountProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
