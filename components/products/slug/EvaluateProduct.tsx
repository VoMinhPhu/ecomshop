'use client';

import Image from 'next/image';
import { Ellipsis, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {};

const EvaluateProduct = (props: Props) => {
  return (
    <div className="max-w-300 px-3 pt-3 pb-10 bg-white mx-auto mt-3">
      <p className="font-semibold text-xl">Đánh giá sản phẩm</p>
      <div className="mt-6">
        <p className="text-3xl mb-2">KHÁCH HÀNG NHẬN XÉT</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="px-4">
            <p className="mx-auto mt-2 py-1.5 px-3 bg-amber-100 rounded-md text-center text-amber-500">
              Chưa có nhận xét nào, hãy là người đầu tiên đánh giá cho sản phẩm
            </p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <span className="flex items-center gap-1">
                5
                <Star className="size-3 fill-zinc-600 text-zinc-600" />
              </span>
              <div className="w-full relative">
                <p className="w-full h-2.5 bg-zinc-200 rounded-full"></p>
                <p className="w-[100%] h-2.5 bg-primary rounded-full absolute top-0"></p>
              </div>
              <span className="w-12">100%</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="flex items-center gap-1">
                4
                <Star className="size-3 fill-zinc-600 text-zinc-600" />
              </span>
              <div className="w-full relative">
                <p className="w-full h-2.5 bg-zinc-200 rounded-full"></p>
                <p className="w-[0%] h-2.5 bg-primary rounded-full absolute top-0"></p>
              </div>
              <span className="w-12">0%</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="flex items-center gap-1">
                3
                <Star className="size-3 fill-zinc-600 text-zinc-600" />
              </span>
              <div className="w-full relative">
                <p className="w-full h-2.5 bg-zinc-200 rounded-full"></p>
                <p className="w-[0%] h-2.5 bg-primary rounded-full absolute top-0"></p>
              </div>
              <span className="w-12">0%</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="flex items-center gap-1">
                2
                <Star className="size-3 fill-zinc-600 text-zinc-600" />
              </span>
              <div className="w-full relative">
                <p className="w-full h-2.5 bg-zinc-200 rounded-full"></p>
                <p className="w-[0%] h-2.5 bg-primary rounded-full absolute top-0"></p>
              </div>
              <span className="w-12">0%</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="flex items-center gap-1">
                1
                <Star className="size-3 fill-zinc-600 text-zinc-600" />
              </span>
              <div className="w-full relative">
                <p className="w-full h-2.5 bg-zinc-200 rounded-full"></p>
                <p className="w-[0%] h-2.5 bg-primary rounded-full absolute top-0"></p>
              </div>
              <span className="w-12">0%</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Chia sẻ nhận xét về sản phẩm</p>
            <Button size="lg">Thêm nhận xét của bạn</Button>
          </div>
        </div>
        <div className="border-t mt-6">
          <p className="mt-3 mb-6">Nhận xét của những khách hàng khác</p>
          <div>
            <div className="flex">
              <div className="flex gap-4 items-start mr-4">
                <Image src={`/avatar.svg`} alt={'name'} width={36} height={36} className="rounded-full border" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Võ Minh Phú</p>
                <p className="flex gap-1">
                  <Star className="size-2.5 text-amber-300 fill-amber-300" />
                  <Star className="size-2.5 text-amber-300 fill-amber-300" />
                  <Star className="size-2.5 text-amber-300 fill-amber-300" />
                  <Star className="size-2.5 text-amber-300 fill-amber-300" />
                  <Star className="size-2.5 text-amber-300 fill-amber-300" />
                  <Star className="size-2.5 text-amber-300 fill-amber-300" />
                </p>
                <p>Cái này có bảo hành không shop ơi?</p>
              </div>
              <div className="w-10">
                <span className="h-4 w-4">
                  <Ellipsis className="size-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluateProduct;
