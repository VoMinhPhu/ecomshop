'use client';

import Image from 'next/image';

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ChangeThumbnail from './ChangeThumbnail';

type Props = {
  productId: string;
  thumbnail: string;
  images: {
    id: string;
    url: string;
  }[];
};

export default function ManageImageDialog({ images, thumbnail, productId }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> Quản lý ảnh sản phẩm</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 max-h-[calc(100vh-60px)] sm:max-w-lg md:max-w-2xl lg:max-w-[calc(100vw-100px)] [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base"> Quản lý ảnh sản phẩm</DialogTitle>
          <DialogDescription className="sr-only">Quản lý những ảnh của sản phẩm ở đây</DialogDescription>
        </DialogHeader>
        <div className="px-6 pt-2 overflow-y-scroll">
          <div>
            <p className="font-semibold">Hình thu nhỏ</p>
            <p className="text-sm text-zinc-500">Ảnh dùng để hiển thị trong các thẻ bên ngoài</p>
            <ChangeThumbnail thumbnail={thumbnail} productId={productId} />
          </div>
          <div>
            <p className="font-semibold">Những ảnh chi tiết khác</p>
            <p className="text-sm text-zinc-500">Hình ảnh chi tiết về sản phẩm</p>
            <div className="pt-4 pb-12 grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {images.map((img) => (
                <Image
                  key={img.id}
                  src={img.url}
                  width={400}
                  height={400}
                  alt="Ảnh chi tiết"
                  className="mx-auto mb-auto h-auto lg:max-w-[95%] md:max-w-60 object-fill"
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Hủy bỏ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
