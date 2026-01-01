import { cn } from '@/lib/utils';
import DropdownFilter from './DropdownFilter';

type Props = {
  selected: string[];
  brands: { name: string; slug: string }[];
  onClear: () => void;
  onToggle: (slug: string) => void;
};

const BrandFilter = ({ brands, selected, onToggle, onClear }: Props) => {
  return (
    <div>
      <p className="mb-1 text-zinc-500 text-sm">Thương hiệu</p>
      <div className="flex items-center flex-wrap gap-2">
        {brands.slice(0, 4).map((b) => (
          <p
            key={b.slug}
            onClick={() => onToggle(b.slug)}
            className={cn(
              'border rounded-3xl px-5 py-1.25 text-sm cursor-pointer',
              selected.includes(b.slug) ? 'bg-zinc-200' : 'hover:bg-zinc-100',
            )}
          >
            {b.name}
          </p>
        ))}
        {brands.length > 4 && (
          <DropdownFilter items={brands} selectedItems={selected} onToggle={onToggle} onClear={onClear} />
        )}
      </div>
    </div>
  );
};

export default BrandFilter;
