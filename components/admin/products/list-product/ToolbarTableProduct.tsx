'use client';

import type { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { DataTableViewOptions } from '@/components/common/tables/toggle-column-visibility';
import { useGetCategoriesAndBrandsToFilter } from '@/hooks/api/products.hook';

interface Props<TData> {
  table: Table<TData>;
  selectedBrand?: string;
  setSelectedBrand: (v?: string) => void;
  selectedCategory?: string;
  setSelectedCategory: (v?: string) => void;
}

export default function ToolbarTableProduct<TData>({
  table,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
}: Props<TData>) {
  const { data } = useGetCategoriesAndBrandsToFilter();
  const [limit, setLimit] = useState(table.getState().pagination.pageSize);

  return (
    <div className="flex flex-wrap items-center gap-3 pb-4">
      <Select value={selectedCategory ?? 'all'} onValueChange={(v) => setSelectedCategory(v === 'all' ? undefined : v)}>
        <SelectTrigger className="min-w-32">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <p className="text-zinc-500">Danh mục</p>
          </SelectItem>
          {data?.categories.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* BRAND */}
      <Select value={selectedBrand ?? 'all'} onValueChange={(v) => setSelectedBrand(v === 'all' ? undefined : v)}>
        <SelectTrigger className="min-w-32">
          <SelectValue placeholder="Thương hiệu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <p className="text-zinc-500">Thương hiệu</p>
          </SelectItem>
          {data?.brands.map((b) => (
            <SelectItem key={b.slug} value={b.slug}>
              {b.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={`${limit}`}
        onValueChange={(v) => {
          const size = Number(v);
          setLimit(size);
          table.setPageSize(size);
        }}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 30, 40, 50].map((n) => (
            <SelectItem key={n} value={`${n}`}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DataTableViewOptions table={table} />

      <Button>
        <Download />
        Xuất Excel
      </Button>
    </div>
  );
}
