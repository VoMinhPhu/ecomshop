'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CategoriesAndBrandsResponse } from '@/types/categories.type';
import { useProductFilter } from '@/hooks/ui/useProductFilter';

import BrandFilter from './filters/BrandFilter';
import CategoryFilter from './filters/CategoryFilter';
import PriceFilter from './filters/PriceFilter';
import SortFilter from './filters/SortFilter';
import ActiveFilters from './filters/ActiveFilters';

type FilterState = ReturnType<typeof useProductFilter>;

interface Props {
  data: CategoriesAndBrandsResponse<'slug'>;
  isOpen: boolean;
  onClose: () => void;
  filter: FilterState;
}

export default function FilterOnMobile({ data, isOpen, onClose, filter }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const activeCount =
    filter.brands.length +
    filter.categories.length +
    (filter.sort ? 1 : 0) +
    (filter.minApplied || filter.maxApplied ? 1 : 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-md z-50 flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
        style={{ maxHeight: '85dvh' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="font-semibold text-lg">
            Bộ lọc
            {activeCount > 0 && (
              <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-0.5">{activeCount}</span>
            )}
          </span>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-4 py-2 space-y-1">
          <BrandFilter
            brands={data.brands}
            selected={filter.brands}
            onToggle={(v) =>
              filter.setBrands(filter.brands.includes(v) ? filter.brands.filter((x) => x !== v) : [...filter.brands, v])
            }
            onClear={() => filter.setBrands([])}
          />
          <CategoryFilter
            categories={data.categories}
            selected={filter.categories}
            onToggle={(v) =>
              filter.setCategories(
                filter.categories.includes(v) ? filter.categories.filter((x) => x !== v) : [...filter.categories, v],
              )
            }
            onClear={() => filter.setCategories([])}
          />
          <PriceFilter {...filter} />
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm w-24 shrink-0">Sắp xếp theo:</span>
            <SortFilter value={filter.sort} onChange={filter.setSort} />
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-500 mb-1">Bộ lọc hiện tại:</p>
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
        </div>

        <div className="p-4 border-t flex gap-2">
          <button
            onClick={() => {
              filter.setBrands([]);
              filter.setCategories([]);
              filter.setSort(undefined);
              filter.clearPrice();
            }}
            className="flex-1 border border-gray-300 rounded-lg py-3 text-sm font-medium"
          >
            Xóa tất cả
          </button>
          <button onClick={onClose} className="flex-1 bg-primary text-white rounded-lg py-3 text-sm font-semibold">
            Áp dụng
          </button>
        </div>
      </div>
    </>
  );
}
