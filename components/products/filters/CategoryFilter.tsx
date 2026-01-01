import { cn } from '@/lib/utils';
import DropdownFilter from './DropdownFilter';

type Props = {
  selected: string[];
  className?: string;
  categories: { name: string; slug: string }[];
  onClear: () => void;
  onToggle: (slug: string) => void;
};

const CategoryFilter = ({ categories, selected, onToggle, onClear, className }: Props) => {
  return (
    <div className={cn(className)}>
      <p className="mb-1 text-zinc-500 text-sm">Danh mục</p>
      <div className="flex items-center flex-wrap gap-2">
        {categories.slice(0, 5).map((c) => (
          <p
            key={c.slug}
            onClick={() => onToggle(c.slug)}
            className={cn(
              'border rounded-3xl px-5 py-1.25 text-sm cursor-pointer',
              selected.includes(c.slug) ? 'bg-zinc-200' : 'hover:bg-zinc-100',
            )}
          >
            {c.name}
          </p>
        ))}
        {categories.length > 5 && (
          <DropdownFilter items={categories} selectedItems={selected} onToggle={onToggle} onClear={onClear} />
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
