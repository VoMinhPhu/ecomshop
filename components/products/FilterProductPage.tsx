'use client';

import { useProductFilter } from '@/hooks/useProductFilter';
import { useGetNameAndSlugOfCategoriesAndBrands } from '@/hooks/products';

import SortFilter from './filters/SortFilter';
import BrandFilter from './filters/BrandFilter';
import PriceFilter from './filters/PriceFilter';
import ActiveFilters from './filters/ActiveFilters';
import CategoryFilter from './filters/CategoryFilter';
import FilterProductLoading from './FilterProductLoading';

const FilterProductPage = () => {
  const filter = useProductFilter();
  const { data, isLoading } = useGetNameAndSlugOfCategoriesAndBrands();

  if (isLoading) return <FilterProductLoading />;
  if (!data) return null;

  return (
    <div className="space-y-4 bg-white pt-3 pb-6 px-2 border rounded-sm">
      <p className="font-semibold text-2xl">SẢN PHẨM</p>
      <div className="grid md:grid-cols-3 grid-cols-1 mb-1">
        <BrandFilter
          brands={data.brands}
          selected={filter.brands}
          onToggle={(v) =>
            filter.setBrands(filter.brands.includes(v) ? filter.brands.filter((x) => x !== v) : [...filter.brands, v])
          }
          onClear={() => filter.setBrands([])}
        />

        <CategoryFilter
          className="col-span-2"
          categories={data.categories}
          selected={filter.categories}
          onToggle={(v) =>
            filter.setCategories(
              filter.categories.includes(v) ? filter.categories.filter((x) => x !== v) : [...filter.categories, v],
            )
          }
          onClear={() => filter.setCategories([])}
        />
      </div>

      <PriceFilter {...filter} />
      <div className="md:flex">
        <div className="flex-1 flex flex-wrap">
          <p className="mr-2 text-sm">Bộ lọc hiên tại:</p>
          <ActiveFilters
            {...filter}
            data={data}
            clearAll={() => {
              filter.setBrands([]);
              filter.setCategories([]);
              filter.setSort(undefined);
              filter.clearPrice();
            }}
          />
        </div>
        <div className="w-60 flex items-start justify-end mt-2 md:mt-0">
          <div className="flex gap-2 items-center justify-end">
            <p className="text-sm">Sắp xếp theo:</p>
            <SortFilter value={filter.sort} onChange={filter.setSort} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProductPage;
