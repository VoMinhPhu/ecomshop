'use client';

import { useMemo, useEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';

import { Search } from 'lucide-react';
import debounce from 'lodash.debounce';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/common/tables/toggle-column-visibility';

interface ToolbarTableOrderProps<TData> {
  table: Table<TData>;
}

export default function ToolbarTableCustomers<TData>({ table }: ToolbarTableOrderProps<TData>) {
  const [value, setValue] = useState((table.getColumn('email')?.getFilterValue() as string) ?? '');

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        const v = val.trim();

        table.getColumn('email')?.setFilterValue(v || undefined);
      }, 400),
    [table],
  );

  useEffect(() => {
    debouncedSearch(value);
    return () => debouncedSearch.cancel();
  }, [value, debouncedSearch]);

  return (
    <div className="md:flex items-center gap-2 pb-4">
      <div className="flex justify-between">
        <div className="md:min-w-80 max-w-96 flex-1 relative">
          <Search size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo email..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pl-8 rounded-md"
          />
        </div>
        <div className="block md:hidden ml-2">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="flex items-center gap-2 lg:mt-0 mt-2 flex-1">
        <div className="hidden md:block ml-auto">
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
