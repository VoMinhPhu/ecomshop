'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { debounce } from 'lodash';
import { LoaderIcon, MenuIcon, SearchIcon } from 'lucide-react';

import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/number.utils';
import { useSearchProduct } from '@/hooks/api/products.hook';

const SectionSearch = () => {
  const [category, setCategory] = useState<boolean>(false);
  const [query, setQuery] = useState('');

  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debounceSetQuery = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedQuery(val);
      }, 600),
    [],
  );

  useEffect(() => {
    return () => {
      debounceSetQuery.cancel();
    };
  }, [debounceSetQuery]);
  const { data: results, isLoading } = useSearchProduct(debouncedQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debounceSetQuery(e.target.value);
  };

  return (
    <div className="relative">
      <div className="relative lg:w-130">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full pr-16 bg-white peer rounded-sm peer"
          value={query}
          onChange={handleChange}
        />
        <Button className="absolute top-0 right-0 w-15 rounded-r-sm rounded-l-none">
          <SearchIcon />
        </Button>

        <div
          className={cn(
            'absolute w-full bg-white shadow-md mt-0.5 max-h-80 overflow-y-scroll dropdown-scrollbar rounded-sm py-1.5 transition opacity-0 invisible peer-focus:opacity-100 peer-focus:visible',
            query.trim() === '' && 'hidden',
          )}
        >
          {isLoading && (
            <div className="text-center py-2">
              <LoaderIcon className="size-8 text-primary mx-auto animate-spin" />
            </div>
          )}
          {results?.length
            ? results.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`}>
                  <div className="flex items-start p-2 hover:bg-zinc-100 overflow-hidden">
                    <Image src={p.thumbnail} width={55} height={55} alt={p.name} className="flex-shrink-0" />
                    <div className="flex flex-col ml-2 min-w-0 flex-1">
                      <p className="truncate whitespace-nowrap">{p.name}</p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold text-red-500">{formatCurrency(p.salePrice ?? p.price)} đ</p>
                        {p.salePrice && (
                          <p className="text-sm text-gray-500 line-through">{formatCurrency(p.price)} đ</p>
                        )}
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
      </div>

      <div className="text-white text-[13px] flex items-center mt-1">
        <div className="flex gap-3">
          <span className="cursor-pointer hover:underline">Asus OLED</span>
          <span className="cursor-pointer hover:underline">Bàn phím cơ AULA</span>
          <span className="cursor-pointer hover:underline">PC</span>
          <span className="cursor-pointer hover:underline">USB</span>
          <span className="cursor-pointer hover:underline">Sách</span>
        </div>
        <div className="ml-auto md:hidden">
          <Button onClick={() => setCategory(!category)} variant={'ghost'}>
            <MenuIcon className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionSearch;
