import Link from 'next/link';
import ProductCard from '../common/ProductCard';
import { getNewProduct } from '@/lib/server/product.server';

export default async function NewProducts() {
  const products = await getNewProduct();

  return (
    <div className="bg-white mt-4 rounded-md md:p-4 p-2 md:pb-12 pb-6 gap-2">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Những sản phẩm mới của cửa hàng</p>
        <Link href="/products?sort=newest" className="text-primary text-sm font-semibold">
          Xem tất cả
        </Link>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-x-1.5 gap-0.75 md:gap-y-2 gap-y-1 md:mt-8 mt-2">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
