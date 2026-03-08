'use client';

import { useState } from 'react';
import { Table } from '@tanstack/react-table';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaginationTableProps<TData> {
  table: Table<TData>;
}

export default function PaginationTableCustomers<TData>({ table }: PaginationTableProps<TData>) {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const [limit, setLimit] = useState(table.getState().pagination.pageSize);

  const goToPage = (page: number) => {
    table.setPageIndex(page - 1);
  };

  return (
    <div className="flex flex-wrap items-center justify-between mt-8 gap-2 m:gap-4 lg:space-x-8">
      <div className="flex items-center justify-between md:justify-start space-x-2 w-full md:w-auto">
        <p className="text-sm font-medium">Hàng trên mỗi trang</p>
        <Select
          value={`${limit}`}
          onValueChange={(value) => {
            const newLimit = Number(value);
            setLimit(newLimit);
            table.setPageSize(newLimit);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between md:justify-end flex-1 gap-4">
        <div className="flex w-[100px] items-center justify-start text-sm font-medium">
          Trang {currentPage} / {totalPages}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
