'use client';

import { useEffect, useState } from 'react';

import {
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';

import { GetAllOrderData } from '@/types/order.type';
import { getFilter } from '@/utils/tableFilter.utils';

import { useGetAllOrder } from '@/hooks/api/order.hook';
import { useOrderTableParams } from '@/hooks/ui/useOrderTableParams';

import { DataTable } from '@/components/common/tables/data-table';
import ToolbarTableOrder from '@/components/admin/orders/ToolbarTableOrder';
import { columnsTableOrders } from '@/components/admin/orders/ColumnTableOrders';
import PaginationTableOrder from '@/components/admin/orders/PaginationTableOrder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { pagination, setPagination, orderCodeParam, statusParam, paymentMethodParam, syncUrl } = useOrderTableParams();

  const status = getFilter<string>(columnFilters, 'status');
  const orderCode = getFilter<string>(columnFilters, 'orderCode');
  const paymentMethod = getFilter<string>(columnFilters, 'paymentMethod');

  useEffect(() => {
    setPagination((p) => (p.pageIndex === 0 ? p : { ...p, pageIndex: 0 }));
  }, [orderCode, status, paymentMethod]);

  const { data: orders, isFetching } = useGetAllOrder({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    orderCode,
    status,
    paymentMethod,
  });

  useEffect(() => {
    syncUrl({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      orderCode,
      status,
      paymentMethod,
    });
  }, [pagination.pageIndex, pagination.pageSize, orderCode, status, paymentMethod]);

  useEffect(() => {
    const filters = [];

    if (orderCodeParam) filters.push({ id: 'orderCode', value: orderCodeParam });
    if (statusParam) filters.push({ id: 'status', value: statusParam });
    if (paymentMethodParam) filters.push({ id: 'paymentMethod', value: paymentMethodParam });

    setColumnFilters(filters);
  }, [orderCodeParam, statusParam, paymentMethodParam]);

  const table = useReactTable<GetAllOrderData>({
    data: orders?.data ?? [],
    columns: columnsTableOrders,

    manualPagination: true,
    pageCount: Math.ceil((orders?.meta.total ?? 0) / pagination.pageSize),

    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Quản lý đơn hàng</CardTitle>
        <CardDescription>Quản lý tất cả các đơn hàng trong hệ thống</CardDescription>
      </CardHeader>

      <CardContent>
        <ToolbarTableOrder table={table} />
        <div className="grid grid-cols-1">
          <DataTable isLoading={isFetching} table={table} />
        </div>
        <PaginationTableOrder table={table} />
      </CardContent>
    </Card>
  );
}
