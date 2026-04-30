'use client';

import { useState } from 'react';
import { FilePen, Loader } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogPortal,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import { useUpdateAddressForm } from '@/hooks/ui/address/useUpdateAddressForm';
import SelectSearch from './SelectSearch';

type Props = {
  id: string;
  address: string;
};

const UpdateAddressBtn = ({ id, address }: Props) => {
  const [open, setOpen] = useState(false);

  const {
    wards,
    street,
    isValid,
    wardCode,
    provinces,
    isPending,
    provinceCode,
    handleSubmit,
    handleSetStreet,
    handleSetWardCode,
    handleSetProvinceCode,
  } = useUpdateAddressForm(id, address, () => setOpen(false));

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal">
          <FilePen />
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <div className={cn('inset-0 fixed hidden bg-black/40 z-50', open && 'block')} />
        <DialogContent className="lg:min-w-250">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
            <DialogDescription>
              Địa chỉ hiện tại:
              <span className="mx-1.5 text-primary">{address}</span>
            </DialogDescription>
            <Separator className="mb-1 mt-2" />
          </DialogHeader>

          <p className={cn('text-red-400 text-sm', isValid && 'hidden')}>Cung cấp đầy đủ thông tin</p>

          <div className="grid grid-cols-2 gap-3">
            <SelectSearch
              title="Chọn Tỉnh/ Thành phố"
              placehoder="Chọn Tỉnh/ Thành phố"
              data={provinces.map((p) => ({ label: p.name, value: p.code.toString() }))}
              value={provinceCode}
              setValue={handleSetProvinceCode}
            />

            <SelectSearch
              title="Chọn Phường/ Xã"
              placehoder="Chọn Phường/ Xã"
              data={wards.map((w) => ({ label: w.name, value: w.code.toString() }))}
              value={wardCode}
              setValue={handleSetWardCode}
            />

            <div className="col-span-2">
              <p className="mb-1 font-semibold text-sm">Số nhà / tên đường</p>
              <Input value={street} onChange={(e) => handleSetStreet(e.target.value)} />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button onClick={handleSubmit} disabled={isPending}>
              <Loader className={cn('animate-spin size-4', !isPending && 'hidden')} />
              Chỉnh sửa
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UpdateAddressBtn;
