'use client';

import React from 'react';
import { Table } from '@tanstack/react-table';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/common/tables/toggle-column-visibility';

interface ToolbarTableBrandProps<TData> {
  table: Table<TData>;
}

export default function ToolbarTableBrand<TData>({ table }: ToolbarTableBrandProps<TData>) {
  return (
    <div className="flex items-center gap-2 pb-4">
      <div className="lg:min-w-60 relative">
        <Search size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
          className="pl-8"
        />
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
