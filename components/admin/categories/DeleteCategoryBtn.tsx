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
import { useDeleteCategory } from '@/hooks/categories';

import { Loader, Trash2 } from 'lucide-react';

type Props = {
  categoryId: string;
  name: string;
};

export default function DeleteCategoryBtn({ categoryId, name }: Props) {
  const { mutate: deleteCategoryMutate, isPending } = useDeleteCategory();

  const handleDeleteCategory = () => {
    deleteCategoryMutate({
      id: categoryId,
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
            Danh mục<span className="text-primary font-semibold mx-1.5">{name}</span>sẽ bị xóa vĩnh viễn khỏi hệ thống,
            việc này có nghĩa là những sản phẩm thuộc danh mục cũng sẽ bị xóa bỏ.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCategory}
            className="bg-destructive hover:bg-destructive cursor-pointer"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
