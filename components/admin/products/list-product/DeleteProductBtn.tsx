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
import { useDeleteProduct } from '@/hooks/api/products';

import { Loader, Trash2 } from 'lucide-react';

type Props = {
  productId: string;
  name: string;
};

export default function DeleteProductBtn({ productId, name }: Props) {
  const { mutate: deleteProductMutate, isPending } = useDeleteProduct();

  const handleDeleteProduct = () => {
    deleteProductMutate({
      id: productId,
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
            Nếu bạn nhấn nút
            <span className="text-red-500 font-semibold text-base mx-1.5">xóa</span>
            sản phẩm<span className="text-primary mx-1.5">{name}</span>sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteProduct}
            className="bg-destructive hover:bg-destructive cursor-pointer"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
