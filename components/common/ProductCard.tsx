import Link from 'next/link';
import Image from 'next/image';

import { formatCurrency } from '@/utils/number';

import { ProductOnHomePageResponse } from '@/types/products';

type Props = {
  product: ProductOnHomePageResponse;
};

const ProductCard = ({ product }: Props) => {
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
          className="mx-auto rounded-t-md md:rounded-t-none"
        />
        <Image
          src={'/chinh-hang.png'}
          alt={product.name}
          width={160}
          height={160}
          className="absolute w-full h-full bottom-0"
        />
      </div>

      <div className="px-2 pb-6 pt-3">
        {product.salePrice ? (
          <p className="font-semibold text-red-500">{formatCurrency(product.salePrice)} VND</p>
        ) : (
          <p className="font-semibold text-red-500">{formatCurrency(product.price)} VND</p>
        )}
        <p className="font-semibold line-clamp-2" title={product.name}>
          {product.name}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
