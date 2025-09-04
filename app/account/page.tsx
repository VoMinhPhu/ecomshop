'use client';

import Image from 'next/image';

import { convertDate } from '@/utils/date';
import useUserStore from '@/stores/userStore';
import { Button } from '@/components/ui/button';

const page = () => {
  const user = useUserStore((state) => state.user);
  const convertGender = (gender: string | null | undefined): string => {
    if (!gender) return 'Chưa cập nhật';
    if (gender == 'male') return 'Nam';
    return 'Nữ';
  };

  return (
    <div className="my-2 px-4">
      <p className="text-xl font-semibold">THÔNG TIN TÀI KHOẢN</p>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
        <div className="pl-8 col-span-2 lg:col-span-1 order-2 md:order-1">
          <div className="mt-4 flex gap-4">
            <p className="font-semibold">Họ tên:</p>
            <p>{user?.name ?? ''}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <p className="font-semibold">Email:</p>
            <p>{user?.email ?? ''}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <p className="font-semibold">Số điện thoại:</p>
            <p>{user?.phone ?? 'Chưa cập nhật'}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <p className="font-semibold">Giới tính:</p>
            <p>{convertGender(user?.gender)}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <p className="font-semibold">Ngày sinh:</p>
            <p>{user?.dateOfBirth ? convertDate(user?.dateOfBirth) : 'Chưa cập nhật'}</p>
          </div>
          <div className="mt-4 flex gap-4">
            <p className="font-semibold">Trạng thái:</p>
            <p>Đã kích hoạt</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:col-span-2 order-1 pt-6">
          <Image
            src={user?.avatar ?? '/avatar.svg'}
            width={130}
            height={130}
            alt="avt"
            className="rounded-full border"
          />
          <Button className="h-12 mt-6 cursor-pointer">Chọn ảnh đại diện</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
