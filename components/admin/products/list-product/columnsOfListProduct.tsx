import { Product } from '@/types/products';
import { ColumnDef, FilterFn } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

const nameFilterFn: FilterFn<Product> = (row, columnId, filterValue: string) => {
  if (!filterValue) return true;
  const name = row.getValue(columnId) as string;
  return name.toLowerCase().includes(filterValue.toLowerCase());
};

export const columnsOfListProduct: ColumnDef<Product>[] = [
  {
    header: () => <div className="pl-2">Tên sản phẩm</div>,
    cell: ({ row }) => <div className="pl-2">{row.original.name}</div>,
    accessorKey: 'name',
    filterFn: nameFilterFn,
    enableHiding: false,
    meta: { title: 'Tên sản phẩm' },
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    enableHiding: true,
    meta: { title: 'Slug' },
  },
  {
    accessorKey: 'categoryName',
    header: 'Danh mục',
    enableHiding: true,
    meta: { title: 'Danh mục' },
  },
  {
    accessorKey: 'brandName',
    header: 'Thương hiệu',
    enableHiding: true,
    meta: { title: 'Thương hiệu' },
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-center">Đơn giá (vnđ)</div>,
    cell: ({ row }) => <div className="text-center">{new Intl.NumberFormat('vi-VN').format(row.original.price)}</div>,
    enableHiding: false,
    meta: { title: 'Đơn giá (vnđ)' },
  },
  {
    accessorKey: 'salePrice',
    header: () => <div className="text-center">Giảm giá</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.salePrice
          ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.original.salePrice)
          : '-'}
      </div>
    ),
    enableHiding: true,
    meta: { title: 'Giảm giá' },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center">Trạng thái</div>,
    cell: ({ row }) => <div className="text-center">{row.original.status}</div>,
    enableHiding: false,
    meta: { title: 'Trạng thái' },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-center">Thời gian tạo</div>,
    cell: ({ row }) => (
      <div className="text-center">{new Date(row.original.createdAt).toLocaleDateString('vi-VN')}</div>
    ),
    enableHiding: false,
    meta: { title: 'Thời gian tạo' },
  },
  {
    accessorKey: 'updatedAt',
    header: () => <div className="text-center">Thời gian cập nhật</div>,
    cell: ({ row }) => (
      <div className="text-center">{new Date(row.original.updatedAt).toLocaleDateString('vi-VN')}</div>
    ),
    enableHiding: false,
    meta: { title: 'Thời gian cập nhật' },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => console.log(row.original)}>Sửa</DropdownMenuItem>
          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          <DropdownMenuItem>Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableHiding: false,
    meta: { title: 'Thao tác' },
  },
];
