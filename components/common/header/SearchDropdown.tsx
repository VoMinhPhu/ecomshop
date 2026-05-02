import Link from 'next/link';
import Image from 'next/image';
import { LoaderIcon } from 'lucide-react';

import { formatCurrency } from '@/utils/number.utils';
import { useSearchProduct } from '@/hooks/api/products.hook';

interface SearchDropdownProps {
  query: string;
}

const SearchDropdown = ({ query }: SearchDropdownProps) => {
  const { data: results, isLoading } = useSearchProduct(query);

  if (query.trim() === '') return null;

  return (
    <div className="absolute w-full bg-white shadow-md mt-0.5 max-h-80 overflow-y-scroll dropdown-scrollbar rounded-sm py-1.5 z-50">
      {isLoading && (
        <div className="text-center py-2">
          <LoaderIcon className="size-8 text-primary mx-auto animate-spin" />
        </div>
      )}

      {!isLoading && results?.length
        ? results.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`}>
              <div className="flex items-start p-2 hover:bg-zinc-100 overflow-hidden">
                <Image src={p.thumbnail} width={55} height={55} alt={p.name} className="flex-shrink-0 size-[55px]" />
                <div className="flex flex-col ml-2 min-w-0 flex-1">
                  <p className="truncate whitespace-nowrap">{p.name}</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-red-500">{formatCurrency(p.salePrice ?? p.price)} đ</p>
                    {p.salePrice && <p className="text-sm text-gray-500 line-through">{formatCurrency(p.price)} đ</p>}
                  </div>
                </div>
              </div>
            </Link>
          ))
        : !isLoading && (
            <div className="text-center py-2">
              <p className="text-zinc-500">Không có sản phẩm nào...</p>
            </div>
          )}
    </div>
  );
};

export default SearchDropdown;
