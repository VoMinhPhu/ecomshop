'use client';

import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

type Item = {
  slug: string;
  name: string;
};

type Props = {
  items: Item[];
  selectedItems: string[];
  onClear: () => void;
  onToggle: (id: string) => void;
};

const DropdownFilter = ({ items, selectedItems, onToggle, onClear }: Props) => {
  if (!items.length) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Filter size={12} className="text-zinc-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="md:max-w-96 max-w-sm px-4 py-3 md:ml-2" align="end">
        <div className="flex flex-wrap gap-2 max-h-56 scrollbar-hide overflow-y-scroll">
          {items.map((item) => (
            <span
              key={item.slug}
              onClick={() => onToggle(item.slug)}
              className={cn(
                'border rounded-3xl py-1.5 px-3 cursor-pointer',
                selectedItems.includes(item.slug) ? 'bg-zinc-200' : 'hover:bg-zinc-100',
              )}
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6 border-t pt-2">
          <Button variant="destructive" onClick={onClear}>
            Xóa lọc
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;
