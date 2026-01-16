'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, SendHorizonalIcon } from 'lucide-react';

import { Textarea } from '@/components/ui/textarea';
import { Form, FormField } from '@/components/ui/form';

import useUserStore from '@/stores/userStore';
import { useReplyComment } from '@/hooks/review';
import { cn } from '@/lib/utils';

import { replyCommentSchema, ReplyCommentType } from '@/schemas/review';

type Props = {
  name: string;
  commentId: string;
  level: number;
};

export default function AddReplyForm({ name, commentId, level }: Props) {
  const { mutate: replyCommentMutate, isPending } = useReplyComment();
  const [reply, setReply] = useState<boolean>(false);

  const user = useUserStore((s) => s.user);

  const form = useForm<ReplyCommentType>({
    resolver: zodResolver(replyCommentSchema),
    defaultValues: {
      comment: '',
      commentId: commentId,
    },
  });

  function onSubmit(values: ReplyCommentType) {
    replyCommentMutate(values, {
      onSuccess: () => {
        form.reset();
        setReply(false);
      },
    });
  }

  return (
    <div>
      <div>
        <span
          onClick={() => setReply(true)}
          className={cn(
            'text-blue-500 text-sm cursor-pointer mt-1 inline-block',
            level > 0 && 'hidden',
            user?.role !== 'admin' && 'hidden',
          )}
        >
          Trả lời
        </span>
        <span
          onClick={() => setReply(false)}
          className={cn('text-red-500 text-sm ml-3 cursor-pointer hover:underline', !reply && 'hidden')}
        >
          Hủy
        </span>
      </div>
      <div className={cn('flex gap-2 items-start mt-1', !reply && 'hidden', !user && 'hidden')}>
        <Image src={user?.avatar ?? '/avatar/svg'} width={32} height={32} alt={name} className="rounded-full" />

        <div className="w-full">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      disabled={isPending}
                      className="min-h-20 max-h-40 scrollbar-hide bg-zinc-50"
                      maxLength={512}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                      spellCheck={false}
                      placeholder={`Phản hồi người dùng ${name}`}
                    />
                  )}
                />
                <button type="submit" className="absolute right-2 bottom-2 cursor-pointer">
                  {isPending ? (
                    <Loader2Icon className="animate-spin text-blue-500" />
                  ) : (
                    <SendHorizonalIcon className="text-blue-500" />
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
