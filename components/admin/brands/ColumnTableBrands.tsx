import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/common/tables/data-table-column-header';
import { Ellipsis, FilePen, Trash2 } from 'lucide-react';

export const columnsTableBrand: ColumnDef<Brand, any>[] = [
  {
    accessorKey: 'icon',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Icon" />,
    meta: { title: 'Icon' },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img src={row.original.icon} alt={row.original.name} className="w-8 h-8 rounded-md" />
      </div>
    ),
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên danh mục" />,
    meta: { title: 'Tên danh mục' },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Slug" />,
    meta: { title: 'Slug' },
    cell: ({ row }) => <div className="text-center">{row.original.slug}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Thời gian tạo" />,
    meta: { title: 'Thời gian tạo' },
    cell: ({ row }) => (
      <div className="text-center">{new Date(row.original.createdAt).toLocaleDateString('vi-VN')}</div>
    ),
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/admin/brands/${row.original.id}`} className="flex items-center text-amber-500 w-full gap-2">
              <FilePen className="text-amber-500" />
              Sửa
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="gap-2 flex text-red-500">
              <Trash2 className="text-red-500" />
              Xóa
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
  },
];
