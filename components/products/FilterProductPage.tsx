'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useProductFilter } from '@/hooks/ui/useProductFilter';
import { CategoriesAndBrandsResponse } from '@/types/categories.type';

import SortFilter from './filters/SortFilter';
import FilterOnMobile from './FilterOnMobile';
import PriceFilter from './filters/PriceFilter';
import BrandFilter from './filters/BrandFilter';
import ActiveFilters from './filters/ActiveFilters';
import CategoryFilter from './filters/CategoryFilter';

interface Props {
  data: CategoriesAndBrandsResponse<'slug'>;
}

const FilterProductPage = ({ data }: Props) => {
  const filter = useProductFilter();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const activeCount =
    filter.brands.length +
    filter.categories.length +
    (filter.sort ? 1 : 0) +
    (filter.minApplied || filter.maxApplied ? 1 : 0);

  return (
    <>
      <div className="bg-white pt-3 pb-6 px-2 border rounded-sm">
        <p className="font-semibold text-2xl mb-2">SẢN PHẨM</p>

        {/* Button show filter on mobile */}
        <div className="md:hidden flex justify-between items-center">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 border rounded-md px-3 py-1 h-9 text-sm font-medium"
          >
            <SlidersHorizontalIcon className="size-4" />
            Bộ lọc
            {activeCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-1.5">{activeCount}</span>
            )}
          </button>
          <SortFilter value={filter.sort} onChange={filter.setSort} />
        </div>
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 grid-cols-1 mb-1">
            <BrandFilter
              brands={data.brands}
              selected={filter.brands}
              onToggle={(v) =>
                filter.setBrands(
                  filter.brands.includes(v) ? filter.brands.filter((x) => x !== v) : [...filter.brands, v],
                )
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
        </div>
        <div className="hidden md:block">
          <PriceFilter {...filter} />
        </div>
        <div className="flex flex-col-reverse md:flex-row mt-1">
          <div className="flex-1 flex flex-wrap">
            <p className="mr-2 text-sm">Bộ lọc hiện tại:</p>
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
          <div className="w-60 md:flex hidden items-start md:justify-end justify-start mt-2 md:mt-0">
            <div className="flex gap-2 items-center justify-end">
              <p className="text-sm w-24">Sắp xếp theo:</p>
              <SortFilter value={filter.sort} onChange={filter.setSort} />
            </div>
          </div>
        </div>
      </div>

      <FilterOnMobile data={data} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} filter={filter} />
    </>
  );
};

export default FilterProductPage;
