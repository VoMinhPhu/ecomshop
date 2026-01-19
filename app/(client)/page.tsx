import Banner from '@/components/home/Banner';
import TopSell from '@/components/home/TopSell';
import Categories from '@/components/home/Categories';
import NewProducts from '@/components/home/NewProducts';
import VerifyPopup from '@/components/home/VerifyPopup';
import DiscountProducts from '@/components/home/DiscountProducts';

import { getAllCategories } from '@/lib/server/product';

export default async function Home({ searchParams }: { searchParams: { verify?: string } }) {
  const verify = (await searchParams).verify;

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
      {verify && <VerifyPopup verify={verify} />}
    </div>
  );
}
