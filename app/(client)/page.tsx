import Banner from '@/components/home/Banner';
import TopSell from '@/components/home/TopSell';
import Categories from '@/components/home/Categories';
import NewProducts from '@/components/home/NewProducts';
import DiscountProducts from '@/components/home/DiscountProducts';
import VerifyPopupLoader from '@/components/home/VerifyPopupLoader';

import { getAllCategories } from '@/lib/server/product.server';

export default async function Home() {
  //Fix hydration
  const categories = await getAllCategories();

  return (
    <div className="bg-zinc-100 py-4 flex items-center justify-center">
      <div className="max-w-300 px-2 w-full flex justify-between gap-4">
        <Categories categories={categories} />
        <div className="flex-1">
          <Banner />
          <TopSell />
          <DiscountProducts />
          <NewProducts />
        </div>
      </div>

      <VerifyPopupLoader />
    </div>
  );
}
