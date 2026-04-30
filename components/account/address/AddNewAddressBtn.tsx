'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import { useAddNewAddressForm } from '@/hooks/ui/address/useAddNewAddressForm';
import SelectSearch from './SelectSearch';

const AddNewAddressBtn = () => {
  const [open, setOpen] = useState(false);

  const {
    wards,
    street,
    isValid,
    wardCode,
    provinces,
    isPending,
    provinceCode,
    handleReset,
    handleSubmit,
    handleSetStreet,
    handleSetWardCode,
    handleSetProvinceCode,
  } = useAddNewAddressForm(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogTrigger asChild>
        <Button>Thêm địa chỉ mới</Button>
      </DialogTrigger>
      <div className={cn('inset-0 fixed hidden bg-black/40 z-50', open && 'block')} />
      <DialogContent className="lg:min-w-250">
        <DialogHeader>
          <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          <DialogDescription>Thêm địa chỉ mới của bạn.</DialogDescription>
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
            <p className="mb-1 font-semibold text-sm">Số nhà/ tên đường</p>
            <Input value={street} onChange={(e) => handleSetStreet(e.target.value)} placeholder="Số nhà, tên đường" />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleReset}>
              Hủy
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isPending}>
            <Loader className={cn('animate-spin size-4', !isPending && 'hidden')} />
            Thêm mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAddressBtn;
