import { GetAllOrderData } from '@/types/order.type';
import { ColumnDef } from '@tanstack/react-table';

import { formatCurrency } from '@/utils/number.utils';
import { statusMap, paymentMethodMap } from '@/constants/order';

import { Badge } from '@/components/ui/badge';
import ActionOrderTable from './ActionOrderTable';
import { DataTableColumnHeader } from '@/components/common/tables/data-table-column-header';

export const columnsTableOrders: ColumnDef<GetAllOrderData>[] = [
  {
    accessorKey: 'orderCode',
    header: ({ column }) => <DataTableColumnHeader className="pl-8" column={column} title="Mã đơn hàng" />,
    cell: ({ row }) => <div className="pl-8">{row.original.orderCode}</div>,
    meta: { title: 'Mã đơn hàng' },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'user.name',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Người mua" />,
    meta: { title: 'Người mua' },
    cell: ({ row }) => <div className="text-center">{row.original.user.name}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Số điện thoại" />,
    meta: { title: 'Người mua' },
    cell: ({ row }) => <div className="text-center">{row.original.phone ?? '-'}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Trạng thái" />,
    cell: ({ row }) => {
      const status = statusMap[row.original.status];

      return (
        <div className="flex justify-center">
          <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground py-1">
            {status.icon}
            {status.label}
          </Badge>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <DataTableColumnHeader className="text-center max-w-30" column={column} title="Thanh toán" />
    ),
    meta: { title: 'Phương thức thanh toán' },
    cell: ({ row }) => {
      const paymentMethod = paymentMethodMap[row.original.paymentMethod];

      return (
        <div className="flex justify-start w-28">
          <span className="flex items-center pl-6 gap-2 text-muted-foreground text-xs my-1">
            {paymentMethod.icon}
            {paymentMethod.label}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Tổng tiền" />,
    meta: { title: 'Tổng tiền' },
    cell: ({ row }) => <div className="text-center">{formatCurrency(row.original.totalAmount)}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader className="text-center" column={column} title="Thời gian tạo" />,
    meta: { title: 'Thời gian tạo' },
    cell: ({ row }) => (
      <div className="text-center">{new Date(row.original.createdAt).toLocaleDateString('vi-VN')}</div>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <ActionOrderTable orderCode={row.original.orderCode} id={row.original.id} />,
    enableHiding: false,
  },
];
