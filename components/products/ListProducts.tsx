import Image from 'next/image';
import Link from 'next/link';

import { ShoppingBasketIcon } from 'lucide-react';

import { GetProductsWithFiltersResponse } from '@/types/products.type';

import { formatCurrency } from '@/utils/number.utils';

import { ProductPagination } from './filters/ProductPagination';

interface Props {
  data: GetProductsWithFiltersResponse;
  totalPages: number;
}

const ListProducts = ({ data, totalPages }: Props) => {
  if (totalPages === 0)
    return (
      <div className="pt-10 pb-30 bg-white flex flex-col items-center">
        <ShoppingBasketIcon className="size-18 mb-2 text-zinc-400" strokeWidth={1.75} />
        Hiện không có sản phẩm phù hợp yêu cầu của bạn
      </div>
    );

  return (
    <div className="mt-3 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 lg:px-0 px-2">
      {data.data.map((d) => (
        <Link
          href={`/products/${d.slug}`}
          key={d.id}
          className="bg-white rounded-md border hover:shadow hover:transform hover:scale-101 duration-150"
        >
          <div className="relative h-66 flex items-start pt-3 justify-center">
            <Image
              src={d.thumbnail}
              alt={d.name}
              width={200}
              height={200}
              className="mx-auto rounded-t-md md:rounded-t-none"
            />
            <Image
              src={'/chinh-hang.png'}
              alt={d.name}
              width={200}
              height={200}
              className="absolute h-full w-full bottom-0 left-0"
            />
          </div>
          <div className="px-2 pb-6 pt-3">
            <p className="font-semibold text-red-500">{formatCurrency(d.salePrice ?? d.price)} VND</p>
            <p className="text-zinc-400 mt-1">{d.brand.name}</p>
            <p className="font-semibold line-clamp-2" title={d.name}>
              {d.name}
            </p>
          </div>
        </Link>
      ))}
      <div className="lg:col-span-5 md:col-span-3 col-span-2">
        <ProductPagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ListProducts;
