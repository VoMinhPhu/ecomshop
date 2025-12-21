'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { useReactTable, getCoreRowModel, type SortingState, type VisibilityState } from '@tanstack/react-table';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { columnsOfListProduct } from '@/components/admin/products/list-product/columnsOfListProduct';
import ToolbarTableProduct from '@/components/admin/products/list-product/ToolbarTableProduct';
import PanigateTableListProduct from '@/components/admin/products/list-product/PanigateTableListProduct';
import { DataTable } from '@/components/common/tables/data-table';

import { useGetAllProduct } from '@/hooks/products';

const Page = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data, isLoading } = useGetAllProduct({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    brand: selectedBrand,
    category: selectedCategory,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [selectedBrand, selectedCategory]);

  const table = useReactTable({
    data: data?.data ?? [],
    columns: columnsOfListProduct,

    manualPagination: true,
    pageCount: data?.totalPages ?? -1,

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      pagination,
      sorting,
      columnVisibility,
    },

    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 lg:p-4">
      <Card className="gap-3">
        <CardHeader className="px-3 lg:px-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Danh sách sản phẩm</CardTitle>
              <CardDescription className="mt-1">Những sản phẩm hiện có trong hệ thống</CardDescription>
            </div>
            <Link href="/admin/products/create">
              <Button className="ml-4">
                <Plus />
                <span className="hidden md:block">Thêm sản phẩm</span>
              </Button>
            </Link>
          </div>

          <Separator className="mt-4" />
        </CardHeader>

        <CardContent className="px-2 lg:px-4">
          <div className="flex items-center gap-1 md:gap-3 mb-3">
            <p className="font-semibold text-sm">
              Tất cả (<span className=" hover:underline mx-0.5 font-normal">{data?.total ?? '?'}</span>)
            </p>
          </div>
          <ToolbarTableProduct
            table={table}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="grid grid-cols-1">
            <DataTable table={table} isLoading={isLoading} />
          </div>

          <PanigateTableListProduct table={table} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
