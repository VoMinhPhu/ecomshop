import Link from 'next/link';
import Image from 'next/image';

import { formatCurrency } from '@/utils/number.utils';

import { ProductOnHomePageResponse } from '@/types/products.type';

type Props = {
  product: ProductOnHomePageResponse;
};

const DiscountProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product.slug}`}
      key={product.id}
      className="bg-white rounded-md border hover:shadow hover:transform hover:scale-101 duration-150"
    >
      <div className="relative h-55 flex items-center justify-center">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={160}
          height={160}
          className="rounded-t-md md:rounded-t-none"
        />
        <Image
          src={'/chinh-hang.png'}
          alt={product.name}
          width={160}
          height={160}
          className="absolute w-full h-full bottom-0"
        />
        <span className="absolute top-0 right-0 text-red-500 font-semibold bg-amber-200 pr-1 pl-4 rounded-bl-sm rounded-tr-md">
          {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
        </span>
      </div>

      <div className="px-2 pb-6 pt-3">
        <p className="font-semibold text-red-500">{formatCurrency(product.salePrice)} VND</p>

        <p className="text-zinc-400 line-through text-sm">{formatCurrency(product.price)} VND</p>
        <p className="font-semibold line-clamp-2" title={product.name}>
          {product.name}
        </p>
      </div>
    </Link>
  );
};

export default DiscountProductCard;
