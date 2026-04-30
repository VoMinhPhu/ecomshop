'use client';

import { useState } from 'react';
import { LoaderIcon, Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useDeleteAddAddress } from '@/hooks/api/address.hook';

import { cn } from '@/lib/utils';

type Props = {
  id: string;
  address: string;
};

const DeleteAddressBtn = ({ address, id }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useDeleteAddAddress();

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500">
          <Trash2 />
          Xóa
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <div className={cn('inset-0 fixed hidden bg-black/40 z-50', open && 'block')}></div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn chắc chắn chứ?</DialogTitle>
            <DialogDescription>
              Nếu bạn nhấn nút
              <span className="text-red-500 font-semibold text-base mx-1.5">xóa</span>
              địa chỉ
              <span className="mx-1.5 text-primary">{address}</span>
              sẽ bị xóa vĩnh viễn
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive">
              <LoaderIcon className={cn('size-4 text-white', isPending ? 'animate-spin' : 'hidden')} />
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteAddressBtn;
