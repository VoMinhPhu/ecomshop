import { X } from 'lucide-react';

type Props = {
  brands: string[];
  categories: string[];
  minApplied?: number;
  maxApplied?: number;
  sort?: string;
  data: {
    brands: { name: string; slug: string }[];
    categories: { name: string; slug: string }[];
  };
  clearAll: () => void;
  clearPrice: () => void;
  setSort: (v: any) => void;
  setBrands: (v: string[]) => void;
  setCategories: (v: string[]) => void;
};

const ActiveFilters = ({
  sort,
  data,
  brands,
  categories,
  minApplied,
  maxApplied,
  setSort,
  clearAll,
  setBrands,
  clearPrice,
  setCategories,
}: Props) => {
  const hasAnyFilter =
    brands.length > 0 ||
    sort !== undefined ||
    categories.length > 0 ||
    minApplied !== undefined ||
    maxApplied !== undefined;

  return (
    <div className="flex flex-wrap gap-2">
      {brands.map((b) => (
        <span key={b} className="bg-zinc-200 px-3 h-8 rounded-full text-sm flex items-center gap-1">
          {data.brands.find((x) => x.slug === b)?.name}
          <X className="size-3 cursor-pointer" onClick={() => setBrands(brands.filter((x) => x !== b))} />
        </span>
      ))}

      {categories.map((c) => (
        <span key={c} className="bg-zinc-200 px-3 h-8 rounded-full text-sm flex items-center gap-1">
          {data.categories.find((x) => x.slug === c)?.name}
          <X className="size-3 cursor-pointer" onClick={() => setCategories(categories.filter((x) => x !== c))} />
        </span>
      ))}

      {sort && (
        <span className="bg-zinc-200 px-3 h-8 rounded-full text-sm flex items-center gap-1">
          {sort === 'priceAsc' ? 'Giá tăng dần' : sort === 'priceDesc' ? 'Giá giảm dần' : 'Sản phẩm mới nhất'}
          <X className="size-3 cursor-pointer" onClick={() => setSort(undefined)} />
        </span>
      )}

      {(minApplied !== undefined || maxApplied !== undefined) && (
        <span className="bg-zinc-200 px-3 h-8 rounded-full text-sm flex items-center gap-1">
          Giá: {minApplied ?? 0} - {maxApplied ?? '∞'}
          <X className="size-3 cursor-pointer" onClick={clearPrice} />
        </span>
      )}

      {hasAnyFilter && (
        <button onClick={clearAll} className="ml-2 text-sm text-red-500 underline hover:text-red-600">
          Xóa tất cả
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
