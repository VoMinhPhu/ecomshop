'use client';

import { ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SortType } from '@/hooks/ui/useProductFilter';

type Props = {
  value: SortType;
  onChange: (v: SortType) => void;
};

const options: { value: SortType; label: string }[] = [
  { value: 'priceAsc', label: 'Giá tăng dần' },
  { value: 'priceDesc', label: 'Giá giảm dần' },
  { value: 'newest', label: 'Sản phẩm mới nhất' },
];

const SortFilter = ({ value, onChange }: Props) => {
  const selected = options.find((o) => o.value === value);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm border border-input rounded-md px-3 h-9 bg-transparent hover:bg-accent transition-colors outline-none focus:ring-1 focus:ring-ring min-w-40">
        <span className="flex-1 text-left truncate text-sm">{selected ? selected.label : 'Sắp xếp theo'}</span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width)">
        {options.map((o) => (
          <DropdownMenuItem
            key={o.value}
            onClick={() => onChange(o.value)}
            className={value === o.value ? 'text-primary font-medium' : ''}
          >
            {o.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilter;
