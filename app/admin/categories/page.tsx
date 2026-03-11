'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Plus } from 'lucide-react';

import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  VisibilityState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { useGetAllCategories } from '@/hooks/api/categories';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/common/tables/data-table';
import { columnsTableCategory } from '@/components/admin/categories/columnTableCategory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import ToolbarTableCategory from '@/components/admin/categories/ToolbarTableCategory';
import PaginationTableCategory from '@/components/admin/categories/PaginationTableCategory';
import { Category } from '@/types/categories';

const Page = () => {
  const { data: categories, isLoading } = useGetAllCategories();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const table = useReactTable<Category>({
    data: categories ?? [],
    columns: columnsTableCategory,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <Card className="m-2 md:m-4">
      <CardHeader className="flex justify-between px-2 md:px-4">
        <div>
          <CardTitle>Danh mục</CardTitle>
          <CardDescription>Quản lý danh mục sản phẩm</CardDescription>
        </div>
        <Link href={'/admin/categories/create'}>
          <Button>
            <Plus />
            <span className="hidden md:block">Thêm mới danh mục</span>
          </Button>
        </Link>
      </CardHeader>
      <Separator />
      <CardContent className="px-2 md:px-4">
        <ToolbarTableCategory table={table} />
        <div className="grid grid-cols-1">
          <DataTable isLoading={isLoading} table={table} />
        </div>
        <PaginationTableCategory table={table} />
      </CardContent>
    </Card>
  );
};

export default Page;
