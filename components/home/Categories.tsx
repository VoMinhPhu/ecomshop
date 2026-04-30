import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/categories.type';

type Props = {
  categories: Category[];
};

const Categories = ({ categories }: Props) => {
  return (
    <div className="w-50 hidden md:block">
      <div className="sticky top-40 max-h-[calc(100vh-108px)] overflow-y-scroll scrollbar-hide lg:top-23 bg-white rounded-md shadow">
        <div className="text-lg font-semibold px-4 py-2">Danh mục</div>
        <div className="px-4 pb-8">
          {categories.map((item: Category) => {
            return (
              <Link
                key={item.id}
                href={`/products?category=${item.slug}`}
                className="h-10 flex items-center gap-2 px-1 hover:bg-primary-foreground w-full rounded-sm mb-1 font-light"
              >
                <Image src={item.icon} width={28} height={28} alt="icon" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
