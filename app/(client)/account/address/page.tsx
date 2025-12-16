'use client';

import AddNewAddressBtn from '@/components/account/address/AddNewAddressBtn';
import ManageAddress from '@/components/account/address/ManageAddress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGetAllAddress } from '@/hooks/address';
import { Ellipsis, MapPinned } from 'lucide-react';

const page = () => {
  const { data, isLoading } = useGetAllAddress();

  if (isLoading)
    return (
      <Card className="mt-4 lg:ml-4 px-4 gap-0">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">QUẢN LÝ ĐỊA CHỈ</p>
          <Button>Thêm địa chỉ mới</Button>
        </div>
        <div className="min-h-60 mt-3">
          <div className="border rounded-md my-2 p-4 flex">
            <div className="flex-1">
              <p className="bg-zinc-100 animate-pulse rounded-sm w-25 h-6"></p>
              <p className="bg-zinc-100 animate-pulse rounded-sm w-70 mt-2 h-6"></p>
            </div>
          </div>
          <div className="border rounded-md my-2 p-4 flex">
            <div className="flex-1">
              <p className="bg-zinc-100 animate-pulse rounded-sm w-25 h-6"></p>
              <p className="bg-zinc-100 animate-pulse rounded-sm w-70 mt-2 h-6"></p>
            </div>
          </div>
          <div className="border rounded-md my-2 p-4 flex">
            <div className="flex-1">
              <p className="bg-zinc-100 animate-pulse rounded-sm w-25 h-6"></p>
              <p className="bg-zinc-100 animate-pulse rounded-sm w-70 mt-2 h-6"></p>
            </div>
          </div>
        </div>
      </Card>
    );

  return (
    <Card className="mt-4 lg:ml-4 px-4 gap-0">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-semibold">QUẢN LÝ ĐỊA CHỈ</p>
        <AddNewAddressBtn />
      </div>
      {data?.length === 0 ? (
        <div className="h-60">
          <p className="flex items-center justify-center pt-10 pb-5">
            <MapPinned strokeWidth={1.25} className="size-25 text-zinc-400" />
          </p>
          <p className="text-center">Hiện tại bạn không thiết lập địa chỉ nào cả.</p>
        </div>
      ) : (
        <div className="min-h-60 pb-4 max-h-100 overflow-y-scroll scrollbar-hide">
          {data?.map((d, i) => (
            <div key={d.id} className="border rounded-md my-2 p-4 flex group">
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  Địa chỉ {i + 1}
                  {d.default && <span className="ml-4 text-zinc-400 font-normal">Địa chỉ mặc định</span>}
                </p>
                {d.address}
              </div>
              <ManageAddress data={d} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default page;
