'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/categories.type';

type Props = {
  categories: Category[];
  onClose?: () => void;
};

const CategoriesOnMobile = ({ categories, onClose }: Props) => {
  return (
    <div className="flex flex-col mt-2">
      {categories.map((item) => (
        <Link
          key={item.id}
          href={`/products?category=${item.slug}`}
          onClick={onClose}
          className="flex items-center gap-4 py-3 hover:bg-primary-foreground rounded-md transition-colors border-b border-gray-100 last:border-0"
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image src={item.icon} alt={item.name} fill className="object-contain" />
          </div>
          <span className="text-base font-medium text-gray-700">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesOnMobile;
