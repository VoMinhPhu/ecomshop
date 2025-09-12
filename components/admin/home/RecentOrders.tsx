import Link from 'next/link';
import { ReactNode } from 'react';

import { formatCurrency } from '@/utils/number';

import { CircleCheck, Loader, XCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader, TableCaption } from '@/components/ui/table';

const orders = [
  {
    id: '6f1fcb41-1d79-4f9d-8b73-50ad978fc1c1',
    userName: 'Nguyễn Minh Hùng',
    email: 'hung.nguyen@example.com',
    nameProduct: 'Laptop ABC',
    status: 'Done',
    totalAmount: 2500000000,
  },
  {
    id: 'c7b3f53b-2472-4f8c-a9f6-2a2e2e1f2a8a',
    userName: 'Trần Thị Mai',
    email: 'mai.tran@example.com',
    nameProduct: 'Tai nghe XYZ',
    status: 'In process',
    totalAmount: 15000000,
  },
  {
    id: 'b8d6a31e-6e7a-4ab4-a0e9-fd28dbf3055f',
    userName: 'Lê Quốc Bảo',
    email: 'quoc.bao@example.com',
    nameProduct: 'Điện thoại MNO',
    status: 'Cancel',
    totalAmount: 35000000,
  },
  {
    id: 'a2b7f3e1-4c18-4b6b-a9dd-7f01a6ecf421',
    userName: 'Phạm Thị Hồng',
    email: 'hong.pham@example.com',
    nameProduct: 'Chuột không dây',
    status: 'Done',
    totalAmount: 8000000,
  },
  {
    id: '9b5f8d17-3f60-44f1-b7e2-245a2d8fd9c4',
    userName: 'Đỗ Văn Hưng',
    email: 'hung.do@example.com',
    nameProduct: 'Bàn phím cơ',
    status: 'In process',
    totalAmount: 12000000,
  },
  {
    id: '0cf8914c-1a8f-4c8c-b1aa-f1b5a3de2c77',
    userName: 'Nguyễn Văn Quang',
    email: 'quang.nguyen@example.com',
    nameProduct: 'Màn hình 24 inch',
    status: 'Done',
    totalAmount: 22000000,
  },
  {
    id: '3e6a7d8f-9e3c-46e9-9f8f-0dc36d7a2e53',
    userName: 'Hoàng Thị Lan',
    email: 'lan.hoang@example.com',
    nameProduct: 'Loa bluetooth',
    status: 'Cancel',
    totalAmount: 10000000,
  },
  {
    id: '82d53764-dae5-4dcf-9439-0f53564c7fd7',
    userName: 'Vũ Văn Phúc',
    email: 'phuc.vu@example.com',
    nameProduct: 'Máy in mini',
    status: 'In process',
    totalAmount: 18000000,
  },
  {
    id: 'f7e0c8ba-2213-4fb5-8b43-573e2bb16ac5',
    userName: 'Nguyễn Thị Hương',
    email: 'huong.nguyen@example.com',
    nameProduct: 'Ổ cứng SSD',
    status: 'Done',
    totalAmount: 20000000,
  },
  {
    id: '1a2c3e4d-5f6a-7b8c-9d0e-1f2a3b4c5d6e',
    userName: 'Trần Văn Khánh',
    email: 'khanh.tran@example.com',
    nameProduct: 'Webcam HD',
    status: 'Cancel',
    totalAmount: 9000000,
  },
];

const statusIcons: Record<string, ReactNode> = {
  Done: <CircleCheck className="fill-green-500 text-white" />,
  'In process': <Loader className="text-amber-500" strokeWidth={3} />,
  Cancel: <XCircle className="text-red-500" />,
};

export default function RecentOrders() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Đơn hàng</CardTitle>
          <CardDescription className="mt-1.5">Những đơn hàng được tạo thời gian gần đây</CardDescription>
        </div>
        <div>
          <Link href={'#'}>
            <Button className="cursor-pointer">Xem tất cả</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableCaption className="mb-8">10 đơn hàng được tạo thời gian gần đây</TableCaption>
            <TableHeader className="bg-zinc-100">
              <TableRow className="h-12">
                <TableHead className="pl-4 lg:pl-12">Tên khách hàng</TableHead>
                <TableHead className="max-w-50">Email</TableHead>
                <TableHead className="max-w-50">Tên sản phẩm</TableHead>
                <TableHead className="w-28">Trạng thái</TableHead>
                <TableHead className="text-right pr-4 w-[140px]">Giá (vnđ)</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="truncate font-medium lg:pl-12" title={order.userName}>
                    {order.userName}
                  </TableCell>
                  <TableCell className="truncate max-w-50" title={order.email}>
                    {order.email}
                  </TableCell>
                  <TableCell className="truncate max-w-50">{order.nameProduct}</TableCell>
                  <TableCell className="w-28">
                    <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                      {statusIcons[order.status]}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-4 w-35">{formatCurrency(order.totalAmount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
