'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, SquarePenIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useEditReply } from '@/hooks/api/review.hook';
import { updateReplySchema, UpdateReplyType } from '@/schemas/review.schema';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField } from '@/components/ui/form';

type Props = {
  commentId: string;
  initialComment: string;
};

function Overlay({ onClick }: { onClick: () => void }) {
  return createPortal(<div className="fixed inset-0 bg-black/50 z-50" onClick={onClick} />, document.body);
}

export default function EditReply({ commentId, initialComment }: Props) {
  const [open, setOpen] = useState(false);

  const { mutate: editReplyMutate, isPending } = useEditReply();

  const form = useForm<UpdateReplyType>({
    resolver: zodResolver(updateReplySchema),
    defaultValues: {
      id: commentId,
      comment: initialComment,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        id: commentId,
        comment: initialComment,
      });
    }
  }, [open]);

  function onSubmit(values: UpdateReplyType) {
    editReplyMutate({ ...values }, { onSuccess: () => setOpen(false) });
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
          <DialogTitle>Sửa phản hồi</DialogTitle>
          <DialogDescription>Chỉnh sửa nội dung phản hồi của bạn.</DialogDescription>
        </DialogHeader>

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
