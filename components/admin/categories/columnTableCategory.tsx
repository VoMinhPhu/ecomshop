import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import { Ellipsis, FilePen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Category } from '@/types/categories.type';
import DeleteCategoryBtn from './DeleteCategoryBtn';
import { DataTableColumnHeader } from '@/components/common/tables/data-table-column-header';

export const columnsTableCategory: ColumnDef<Category, any>[] = [
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
        <DropdownMenuContent align="end" className="w-14">
          <Link href={`/admin/categories/${row.original.id}`}>
            <Button variant="ghost" className="w-full justify-start text-amber-500 hover:text-amber-500" size="sm">
              <FilePen />
              Chỉnh sửa
            </Button>
          </Link>
          <DeleteCategoryBtn categoryId={row.original.id} name={row.original.name} />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
  },
];
