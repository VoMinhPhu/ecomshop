'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShoppingBasketIcon } from 'lucide-react';

import { useGetAllProductWithFilter } from '@/hooks/api/products.hook';

import { formatCurrency } from '@/utils/number.utils';
import ListProductLoading from './ListProductLoading';
import { ProductPagination } from './filters/ProductPagination';

const ListProducts = () => {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 30);

  const brand = searchParams.getAll('brand');
  const sortParam = searchParams.get('sort');
  const category = searchParams.getAll('category');
  const search = searchParams.get('search') ?? undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sort = sortParam === 'priceAsc' || sortParam === 'priceDesc' || sortParam === 'newest' ? sortParam : undefined;

  const { data, isLoading } = useGetAllProductWithFilter({
    sort,
    page,
    limit,
    brand,
    search,
    category,
    minPrice,
    maxPrice,
  });

  if (isLoading) return <ListProductLoading />;

  if (!data) return null;

  if (data.totalPages === 0)
    return (
      <div className="pt-10 pb-30 bg-white flex flex-col items-center">
        <ShoppingBasketIcon className="size-18 mb-2 text-zinc-400" strokeWidth={1.75} />
        Hiện không có sản phẩm phù hợp yêu cầu của bạn
      </div>
    );

  return (
    <div className="mt-3 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 lg:px-0 px-2">
      {data.data.map((d) => {
        return (
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
              {d.salePrice ? (
                <p className="font-semibold text-red-500">{formatCurrency(d.salePrice)} VND</p>
              ) : (
                <p className="font-semibold text-red-500">{formatCurrency(d.price)} VND</p>
              )}
              <p className="text-zinc-400 mt-1">{d.brand.name}</p>
              <p className="font-semibold line-clamp-2" title={d.name}>
                {d.name}
              </p>
            </div>
          </Link>
        );
      })}
      <div className="lg:col-span-5 md:col-span-3 col-span-2">
        <ProductPagination totalPages={data.totalPages} />
      </div>
    </div>
  );
};

export default ListProducts;
