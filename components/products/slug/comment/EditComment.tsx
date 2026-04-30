'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, SquarePenIcon, Star } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField } from '@/components/ui/form';

import { useEditComment } from '@/hooks/api/review.hook';
import { updateCommentSchema, UpdateCommentType } from '@/schemas/review.schema';
import { cn } from '@/lib/utils';

type Props = {
  commentId: string;
  initialComment: string;
  initialRating?: number;
};

function Overlay({ onClick }: { onClick: () => void }) {
  return createPortal(<div className="fixed inset-0 bg-black/50 z-50" onClick={onClick} />, document.body);
}

export default function EditComment({ commentId, initialComment, initialRating }: Props) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);

  const { mutate: editCommentMutate, isPending } = useEditComment();

  const form = useForm<UpdateCommentType>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      id: commentId,
      comment: initialComment,
      rating: `${initialRating ?? 5}`,
    },
  });

  const rating = Number(form.watch('rating'));

  useEffect(() => {
    if (open) {
      form.reset({
        id: commentId,
        comment: initialComment,
        rating: `${initialRating ?? 5}`,
      });
    }
  }, [open]);

  function onSubmit(values: UpdateCommentType) {
    editCommentMutate({ ...values }, { onSuccess: () => setOpen(false) });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <SquarePenIcon />
          Chỉnh sửa
        </Button>
      </DialogTrigger>

      {open && <Overlay onClick={() => setOpen(false)} />}

      <DialogContent className="z-60">
        <DialogHeader>
          <DialogTitle>Sửa đánh giá</DialogTitle>
          <DialogDescription>Chỉnh sửa nội dung đánh giá của bạn.</DialogDescription>
        </DialogHeader>
        {initialRating !== undefined && (
          <div className="flex items-center gap-2">
            <p>Đánh giá:</p>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={cn(
                  'size-5 cursor-pointer transition-colors',
                  i <= (hovered || rating) ? 'text-amber-300 fill-amber-300' : 'text-gray-300',
                )}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => form.setValue('rating', `${i}`)}
              />
            ))}
          </div>
        )}

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Nhập nội dung đánh giá..."
                  maxLength={512}
                  spellCheck={false}
                  rows={4}
                  className="resize-none"
                />
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isPending}>
                <Loader className={cn('animate-spin', !isPending && 'hidden')} />
                {isPending ? 'Đang thay đổi' : 'Thay đổi'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
