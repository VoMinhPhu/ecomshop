'use client';

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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import AddNewImageBtn from './AddNewImageBtn';
import ChangeThumbnail from './ChangeThumbnail';
import ManageDetailImage from './ManageDetailImage';

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
        <DialogHeader className="px-6 flex-row items-center justify-between border-b py-4">
          <div>
            <DialogTitle className="text-base"> Quản lý ảnh sản phẩm</DialogTitle>
            <DialogDescription className="sr-only">Quản lý những ảnh của sản phẩm ở đây</DialogDescription>
          </div>
          <Label className="mr-6 bg-primary rounded-md text-white px-3 py-1.5 font-semibold cursor-pointer text-sm">
            Thêm ảnh mới
            <span className="hidden">
              <AddNewImageBtn productId={productId} />
            </span>
          </Label>
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
                <ManageDetailImage image={img} key={img.id} />
              ))}
              <AddNewImageBtn productId={productId} />
            </div>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" size={'lg'} variant="destructive">
              Hủy bỏ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
