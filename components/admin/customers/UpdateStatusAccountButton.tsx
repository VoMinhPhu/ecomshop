'use client';

import { useState } from 'react';

import { AccountStatus } from '@/types/users.type';

import { useUpdateAccountStatus } from '@/hooks/api/users.hook';

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

import { ACTION_CONFIG } from './update-status-account.config';

type Props = {
  status: AccountStatus;
  customerId: string;
};

export default function UpdateStatusAccountButton({ status, customerId }: Props) {
  const { mutate: updateAccountStatusMutate, isPending } = useUpdateAccountStatus();
  const [open, setOpen] = useState(false);

  const config = ACTION_CONFIG[status];
  if (!config) return null;

  const handleConfirm = () => {
    updateAccountStatusMutate({ id: customerId, status: config.newStatus }, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{config.trigger}</DialogTrigger>
      <DialogContent className="max-w-sm rounded-md">
        <DialogHeader>
          <DialogTitle className="text-base">{config.title}</DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">{config.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setOpen(false)} disabled={isPending}>
            Hủy
          </Button>
          <Button className={`flex-1 ${config.confirmClass}`} onClick={handleConfirm} disabled={isPending}>
            {isPending ? 'Đang xử lý...' : config.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
