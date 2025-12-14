import type { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationTableProps<TData> {
  table: Table<TData>;
}

export default function PanigateTableListProduct<TData>({ table }: PaginationTableProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  const goToPage = (page: number) => {
    table.setPageIndex(page - 1);
  };

  return (
    <div className="flex flex-wrap items-center justify-between mt-8 gap-2 m:gap-4 lg:space-x-8">
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
