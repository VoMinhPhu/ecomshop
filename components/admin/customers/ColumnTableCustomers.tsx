import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';

import { formatGender } from '@/utils/users.utils';

import { DataTableColumnHeader } from '@/components/common/tables/data-table-column-header';

import ActionTableCustomer from './ActionTableCustomers';

import { UserListItem } from '@/types/users.type';

export const columnsTableCustomers: ColumnDef<UserListItem>[] = [
  {
    accessorKey: 'avatar',
    header: ({ column }) => (
      <DataTableColumnHeader className="max-w-32 text-center" column={column} title="Ảnh đại diện" />
    ),
    cell: ({ row }) => (
      <div className="max-w-32 flex items-center justify-center">
        <Image
          src={row.original.avatar || '/avatar.svg'}
          alt="Avatar"
          width={45}
          height={45}
          className="rounded-full border"
        />
      </div>
    ),
    meta: { title: 'Ảnh đại diện' },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div>{row.original.email}</div>,
    meta: { title: 'Email' },
    enableHiding: false,
    enableSorting: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên khách hàng" />,
    meta: { title: 'Tên khách hàng' },
    cell: ({ row }) => <div>{row.original.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Số điện thoại" />,
    meta: { title: 'Số điện thoại' },
    cell: ({ row }) => <div className="text-center">{row.original.phone ?? '-'}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Giới tính" />,
    meta: { title: 'Giới tính' },
    cell: ({ row }) => <div className="text-center">{formatGender(row.original.gender)}</div>,
    enableSorting: false,
  },

  {
    id: 'actions',
    cell: ({ row }) => <ActionTableCustomer userId={row.original.id} />,
    enableHiding: false,
  },
];
