'use client';

import Image from 'next/image';

import { formatDate } from 'date-fns';
import { UserIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { formatGender } from '@/utils/users.utils';

import { useGetDetailUser } from '@/hooks/api/users.hook';

type Props = {
  customerId: string;
};

export default function DetailCustomer({ customerId }: Props) {
  const { data } = useGetDetailUser(customerId);

  if (!data)
    return (
      <Button disabled variant="ghost" size="sm" className="w-full justify-start font-normal">
        <UserIcon />
        Chi tiết
      </Button>
    );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
          <UserIcon />
          Chi tiết
        </Button>
      </SheetTrigger>
      <SheetContent className="md:min-w-150 min-w-full gap-0">
        <SheetHeader>
          <SheetTitle>Chi tiết khách hàng</SheetTitle>
          <SheetDescription>Xem chi tiết thông tin khách hàng.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <p className="font-semibold text-lg mb-2">Thông tin khách hàng</p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Email: </span> {data.email}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Tên khách hàng: </span> {data.name}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Số điện thoại: </span> {data.phone ?? '-'}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Giới tính: </span> {formatGender(data.gender)}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Ngày sinh: </span>
                {data.dateOfBirth ? formatDate(data.dateOfBirth, 'dd/MM/yyyy') : '-'}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Tình trạng: </span>
                {data.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Trạng thái tài khoản: </span>
                {data.status}
              </p>
              <p className="mb-1 flex items-start">
                <span className="w-38 block text-zinc-700">Thời gian tạo tài khoản: </span>
                {formatDate(data.createdAt, 'dd/MM/yyyy HH:mm:ss')}
              </p>
            </div>
            <Image
              src={data.avatar || '/avatar.svg'}
              width={120}
              height={120}
              alt="Avatar"
              className="rounded-full border mx-6 mt-10 w-29 h-29"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
