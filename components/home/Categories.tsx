'use client';

import Link from 'next/link';
import Image from 'next/image';
import CategoiesLoading from './CategoiesLoading';
import { useGetAllCategories } from '@/hooks/categories';

const Categories = () => {
  const { data, isLoading } = useGetAllCategories();

  if (isLoading) return <CategoiesLoading />;

  return (
    <div className="w-50 hidden md:block">
      <div className="sticky top-40 lg:top-23 bg-white rounded-md shadow">
        <p className="text-lg font-semibold px-4 py-2">Danh mục</p>
        <div className="px-4 pb-8">
          {data?.map((item: any) => {
            return (
              <Link
                key={item.id}
                href={'/account'}
                className="h-10 flex items-center px-1 hover:bg-primary-foreground w-full rounded-sm mb-1 font-light"
              >
                {item.icon && <Image src={item.icon} width={24} height={24} alt="icon" />}
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
