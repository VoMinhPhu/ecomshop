import ListProducts from '@/components/products/ListProducts';
import FilterProductPage from '@/components/products/FilterProductPage';

const Page = () => {
  return (
    <div className="lg:max-w-300 mx-auto">
      <FilterProductPage />
      <ListProducts />
    </div>
  );
};

export default Page;
