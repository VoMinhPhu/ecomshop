import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteImageProduct } from '@/hooks/api/products';

import { cn } from '@/lib/utils';

import { Loader } from 'lucide-react';

type Props = {
  imageId: string;
};

export default function DeleteImageBtn({ imageId }: Props) {
  const { mutate: deleteImageProductMutate, isPending } = useDeleteImageProduct();

  const handleDeleteImage = () => {
    deleteImageProductMutate({ id: imageId });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} variant="destructive" size="lg">
          <Loader className={cn('animate-spin', !isPending && 'hidden')} />
          {isPending ? 'Đang xóa' : 'Xóa ảnh'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chức chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Khi bạn nhấn nút <span className="mx-1.5 text-red-500 font-semibold">xóa</span>, ảnh này xẽ bị xóa khỏi hệ
            thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDeleteImage}
              size="lg"
              className="bg-destructive hover:bg-destructive cursor-pointer"
            >
              Xóa
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
