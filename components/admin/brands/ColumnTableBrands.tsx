import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/common/tables/data-table-column-header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Ellipsis, FilePen } from 'lucide-react';

import DeleteBrandBtn from './DeleteBrandBtn';

export const columnsTableBrand: ColumnDef<Brand, any>[] = [
  {
    accessorKey: 'icon',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Icon" />,
    meta: { title: 'Icon' },
    cell: ({ row }) => (
      <div className="flex justify-center items-centerm h-12">
        <img src={row.original.icon} alt={row.original.name} className="w-8 h-8 rounded-md my-auto" />
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên thương hiệu" />,
    meta: { title: 'Tên thương hiệu' },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Slug" />,
    meta: { title: 'Slug' },
    cell: ({ row }) => <div className="text-center">{row.original.slug}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian tạo" />,
    meta: { title: 'Thời gian tạo' },
    cell: ({ row }) => (
      <div className="text-center">{new Date(row.original.createdAt).toLocaleDateString('vi-VN')}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian cập nhật" />,
    meta: { title: 'Thời gian cập nhật' },
    cell: ({ row }) => (
      <div className="text-center">{new Date(row.original.updatedAt).toLocaleDateString('vi-VN')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-14">
          <Link href={`/admin/brands/${row.original.id}`}>
            <Button variant="ghost" className="w-full justify-start text-amber-500 hover:text-amber-500" size="sm">
              <FilePen />
              Chỉnh sửa
            </Button>
          </Link>
          <DeleteBrandBtn brandId={row.original.id} name={row.original.name} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
  },
];
