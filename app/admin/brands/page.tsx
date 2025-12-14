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
import { useGetAllBrands } from '@/hooks/brands';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/common/tables/data-table';
import { columnsTableBrand } from '@/components/admin/brands/ColumnTableBrands';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import ToolbarTableBrand from '@/components/admin/brands/ToolbarTableBrand';
import PaginationTableCategory from '@/components/admin/categories/PaginationTableCategory';

const Page = () => {
  const { data: brands, isLoading } = useGetAllBrands();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable<Brand>({
    data: brands ?? [],
    columns: columnsTableBrand,
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
          <CardTitle>Thương hiệu</CardTitle>
          <CardDescription>Quản lý thương hiệu sản phẩm</CardDescription>
        </div>
        <Link href={'/admin/brands/create'}>
          <Button>
            <Plus />
            <span className="hidden md:block">Thêm mới thương hiệu</span>
          </Button>
        </Link>
      </CardHeader>
      <Separator />
      <CardContent className="px-2 md:px-4">
        <ToolbarTableBrand table={table} />
        <div className="grid grid-cols-1">
          <DataTable isLoading={isLoading} table={table} />
        </div>
        <PaginationTableCategory table={table} />
      </CardContent>
    </Card>
  );
};

export default Page;
