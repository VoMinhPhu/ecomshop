import Banner from '@/components/home/Banner';
import Categories from '@/components/home/Categories';

export default function Home() {
  return (
    <div className="bg-zinc-100 py-4 flex items-center justify-center">
      <div className="max-w-300 px-2 w-full flex justify-between gap-4">
        <Categories />
        <div className="flex-1 h-500">
          <Banner />
        </div>
      </div>
    </div>
  );
}
