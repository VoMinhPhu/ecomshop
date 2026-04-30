'use client';

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { useDeleteBrand } from '@/hooks/api/brands.hook';

import { Loader, Trash2 } from 'lucide-react';

type Props = {
  brandId: string;
  name: string;
};

export default function DeleteBrandBtn({ brandId, name }: Props) {
  const { mutate: deleteBrandMutate, isPending } = useDeleteBrand();

  const handleDeleteBrand = () => {
    deleteBrandMutate({
      id: brandId,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-500">
          <Trash2 className={cn(isPending && 'hidden')} />
          <Loader className={cn('animate-spin', !isPending && 'hidden')} />
          {isPending ? 'Đang xóa' : 'Xóa'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Thương hiệu<span className="text-primary font-semibold mx-1.5">{name}</span>sẽ bị xóa vĩnh viễn khỏi hệ
            thống, việc này có nghĩa là những sản phẩm thuộc thương hiệu này cũng sẽ bị xóa bỏ.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteBrand} className="bg-destructive hover:bg-destructive cursor-pointer">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
