import { Suspense } from 'react';
import ListProducts from '@/components/products/ListProducts';
import FilterProductPage from '@/components/products/FilterProductPage';

const Page = () => {
  return (
    <div className="lg:max-w-300 mx-auto">
      <Suspense fallback={null}>
        <FilterProductPage />
        <ListProducts />
      </Suspense>
    </div>
  );
};

export default Page;
