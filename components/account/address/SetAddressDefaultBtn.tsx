'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import { useSetAddressDefault } from '@/hooks/api/address.hook';

import { cn } from '@/lib/utils';

import { LoaderIcon, MapPin } from 'lucide-react';

type Props = {
  id: string;
  address: string;
};

const SetAddressDefaultBtn = ({ address, id }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending } = useSetAddressDefault();

  const handleDelete = () => {
    mutate({ id });
  };
  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal hover:text-primary">
          <MapPin />
          Đặt làm mặc định
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <div className={cn('inset-0 fixed hidden bg-black/40 z-50', open && 'block')} />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn chắc chắn chứ?</DialogTitle>
            <DialogDescription>
              Bạn muốn đặt địa chỉ
              <span className="mx-1.5 text-primary">{address}</span>
              thành địa chỉ mặc định?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete} className="cursor-pointer" disabled={isPending}>
              <LoaderIcon className={cn('animate-spin', isPending ? 'block' : 'hidden')} />
              Đặt làm mặc định
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default SetAddressDefaultBtn;
