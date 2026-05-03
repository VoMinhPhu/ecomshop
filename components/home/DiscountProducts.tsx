import Link from 'next/link';
import { getDiscountProducts } from '@/lib/server/product.server';

import DiscountProductCard from './DiscountProductCard';

export default async function DiscountProducts() {
  const products = await getDiscountProducts();

  return (
    <div className="bg-gradient-to-b from-red-400 to-white mt-4 rounded-md md:p-4 p-2 md:pb-12 pb-6 gap-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Giá tốt hôm nay</p>
        <Link href="/products" className="text-sm font-semibold">
          Xem tất cả
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-x-1.5 gap-0.75 md:gap-y-2 gap-y-1 md:mt-8 mt-2">
        {products.map((p) => (
          <DiscountProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
