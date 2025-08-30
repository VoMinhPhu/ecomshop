import Image from 'next/image';

import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <div className="my-2 px-4">
      <p className="text-xl font-semibold">THÔNG TIN TÀI KHOẢN</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="pl-8">
          <div className="mt-4">
            <p className="font-semibold">Họ tên:</p>
            <p>Võ Minh Phú</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Email:</p>
            <p>email@gmail.com</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Trạng thái:</p>
            <p>Đã kích hoạt</p>
          </div>
        </div>
        <div className="flex flex-col items-center col-span-2 pt-6">
          <Image
            src={
              'https://xincoqxttanzbwzrdvfq.supabase.co/storage/v1/object/public/avatars/b0602730-3887-48f7-b63d-bed2f0d9b218.webp'
            }
            width={130}
            height={130}
            alt="avt"
            className="rounded-full"
          />
          <Button className="h-12 mt-6 cursor-pointer">Chọn ảnh đại diện</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
