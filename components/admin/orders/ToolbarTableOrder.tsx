'use client';

import { useMemo, useEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';

import { Search } from 'lucide-react';
import debounce from 'lodash.debounce';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/common/tables/toggle-column-visibility';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { OrderStatus, PaymentMethod } from '@/types/order';
import { statusMap, paymentMethodMap } from '@/constants/order';

interface ToolbarTableOrderProps<TData> {
  table: Table<TData>;
}

export default function ToolbarTableOrder<TData>({ table }: ToolbarTableOrderProps<TData>) {
  const [value, setValue] = useState((table.getColumn('orderCode')?.getFilterValue() as string) ?? '');

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        const v = val.trim();

        table.getColumn('orderCode')?.setFilterValue(v || undefined);
      }, 400),
    [table],
  );

  useEffect(() => {
    debouncedSearch(value);
    return () => debouncedSearch.cancel();
  }, [value, debouncedSearch]);

  return (
    <div className="lg:flex items-center gap-2 pb-4">
      <div className="flex justify-between">
        <div className="lg:min-w-48 max-w-60 flex-1 relative">
          <Search size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="pl-8 rounded-md"
          />
        </div>
        <div className="block md:hidden">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="flex items-center gap-2 lg:mt-0 mt-2 flex-1">
        {/* Status */}
        <Select
          value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(v) => table.getColumn('status')?.setFilterValue(v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-42">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Trạng thái</SelectItem>

            {Object.values(OrderStatus).map((s) => (
              <SelectItem key={s} value={s}>
                <div className="flex items-center gap-2">
                  {statusMap[s].icon}
                  <span>{statusMap[s].label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Payment method */}
        <Select
          value={(table.getColumn('paymentMethod')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(v) => table.getColumn('paymentMethod')?.setFilterValue(v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Tất cả thanh toán" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Phương thức thanh toán</SelectItem>

            {Object.values(PaymentMethod).map((m) => (
              <SelectItem key={m} value={m}>
                <div className="flex items-center gap-2">
                  <span className="h-full w-6">{paymentMethodMap[m].icon}</span>
                  <span>{paymentMethodMap[m].label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="hidden md:block ml-auto">
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
