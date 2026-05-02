'use client';

import {
  SortingState,
  useReactTable,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { DataTable } from '@/components/common/tables/data-table';
import ToolbarTableCustomers from '@/components/admin/customers/ToolbarTableCustomers';
import { columnsTableCustomers } from '@/components/admin/customers/ColumnTableCustomers';
import PaginationTableCustomers from '@/components/admin/customers/PaginationTableCustomers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllUser } from '@/hooks/api/users.hook';
import { getFilter } from '@/utils/table-filter.utils';
import { useCustomersTableParams } from '@/hooks/ui/useCustomerTableParams';

import { UserListItem } from '@/types/users.type';

export default function page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { pagination, setPagination, emailParam, syncUrl } = useCustomersTableParams();

  const email = getFilter<string>(columnFilters, 'email');

  useEffect(() => {
    setPagination((p) => (p.pageIndex === 0 ? p : { ...p, pageIndex: 0 }));
  }, [email]);

  const {
    isError,
    isLoading,
    isFetching,
    data: users,
  } = useGetAllUser({
    email,
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
  });

  useEffect(() => {
    syncUrl({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      email,
    });
  }, [pagination.pageIndex, pagination.pageSize, email]);

  useEffect(() => {
    const filters = [];

    if (emailParam) filters.push({ id: 'email', value: emailParam });

    setColumnFilters(filters);
  }, [emailParam]);

  const table = useReactTable<UserListItem>({
    data: users?.data ?? [],
    columns: columnsTableCustomers,

    manualFiltering: true,
    manualPagination: true,
    rowCount: users?.total ?? 0,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Quản lý khách hàng</CardTitle>
        <CardDescription>Quản lý tất cả các khách hàng trong hệ thống</CardDescription>
      </CardHeader>

      <CardContent>
        <ToolbarTableCustomers table={table} />
        <div className="grid grid-cols-1">
          <DataTable isLoading={isFetching} table={table} />
        </div>
        <PaginationTableCustomers table={table} />
      </CardContent>
    </Card>
  );
}
