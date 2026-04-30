import Link from 'next/link';
import ProductCard from '../common/ProductCard';
import { getTopSell } from '@/lib/server/product.server';

export default async function TopSell() {
  const products = await getTopSell();

  return (
    <div className="bg-gradient-to-b from-green-100 to-white mt-4 rounded-md p-4 pb-12 gap-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Những sản phẩm bán chạy nhất</p>
        <Link href="/products" className="text-primary text-sm font-semibold">
          Xem tất cả
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-x-1.5 gap-y-2 mt-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
