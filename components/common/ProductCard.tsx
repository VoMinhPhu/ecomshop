import { formatCurrency } from '@/utils/number';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const ProductCard = (props: Props) => {
  return (
    <Link href={`/product/detail/`} className="border rounded-sm hover:shadow">
      <Image src={'/fire.png'} width={36} height={36} alt="HOT" />
      <Image
        src={
          'https://xincoqxttanzbwzrdvfq.supabase.co/storage/v1/object/public/products/452e59fb-4425-4169-9a1c-aece594e19ee.webp'
        }
        width={150}
        height={160}
        alt="anhr"
        className="mx-auto w-4/5"
      />
      <div className="p-1">
        <p className="line-clamp-2">Ten san pham</p>
        <p className="text-lg text-red-400 font-semibold ml-1 relative w-fit">
          {formatCurrency(220000)} <span className="text-xs font-bold absolute top-0 -right-3">đ</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
