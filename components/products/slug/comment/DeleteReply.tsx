'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { LoaderIcon, TrashIcon } from 'lucide-react';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useDeleteReply } from '@/hooks/api/review.hook';

type Props = { replyId: string };

function Overlay({ onClick }: { onClick: () => void }) {
  return createPortal(<div className="fixed inset-0 bg-black/50 z-50" onClick={onClick} />, document.body);
}

export default function DeleteReply({ replyId }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate: deleteReplyMutate, isPending } = useDeleteReply();

  const handleDelete = () => {
    deleteReplyMutate(replyId, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive justify-start">
          <TrashIcon />
          Xóa
        </Button>
      </DialogTrigger>

      {open && <Overlay onClick={() => setOpen(false)} />}

      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Bạn chắc chắn?</DialogTitle>
          <DialogDescription>Hành động này không thể hoàn tác. Phản hồi sẽ bị xóa vĩnh viễn.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <LoaderIcon className={`size-4 mr-2 animate-spin ${isPending ? 'inline-block' : 'hidden'}`} />
            {isPending ? 'Đang xóa...' : 'Xóa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
