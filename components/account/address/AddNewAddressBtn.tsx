'use client';

import { useEffect, useState } from 'react';
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

import SelectSearch from './SelectSearch';

import { useGetProvinces } from '@/hooks/api/map.hook';
import { useAddAddress } from '@/hooks/api/address.hook';

import { cn } from '@/lib/utils';

import { Province, Ward } from '@/types/map.type';

const AddNewAddressBtn = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [validAddress, setValidAddress] = useState<boolean>(true);

  const [street, setStreet] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [provinceCode, setProvinceCode] = useState('');

  const { data } = useGetProvinces();
  const { mutate: addAddressMutate, isPending } = useAddAddress();

  useEffect(() => {
    if (data) setProvinces(data);
  }, [data?.length]);

  useEffect(() => {
    if (!provinceCode) return;

    const loadWards = async () => {
      const pRes = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`);
      const province = await pRes.json();

      setWards(province.wards);

      setWardCode('');
    };

    loadWards();
  }, [provinceCode]);

  const handleSubmit = () => {
    if (!provinceCode || !wardCode || !street.trim()) {
      setValidAddress(false);
      return;
    }

    const ward = wards.find((w) => w.code.toString() === wardCode)?.name;
    const province = provinces.find((p) => p.code.toString() === provinceCode)?.name;

    if (!province || !ward) return;

    const address = `${street.trim()}, ${ward}, ${province} `;
    setValidAddress(true);
    addAddressMutate({ address });
    setProvinceCode('');
    setWardCode('');
    setStreet('');
  };

  const handleCancel = () => {
    setValidAddress(true);
    setProvinceCode('');
    setWardCode('');
    setStreet('');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Thêm địa chỉ mới</Button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-250">
        <DialogHeader>
          <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          <DialogDescription>Thêm địa chỉ mới của bạn.</DialogDescription>
          <Separator className="mb-1 mt-2" />
        </DialogHeader>

        <p className={cn('text-red-400 text-sm', validAddress && 'hidden')}>Cung cấp đầy đủ thông tin</p>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <SelectSearch
              placehoder="Chọn Tỉnh/ Thành phố"
              title="Chọn Tỉnh/ Thành phố"
              data={provinces.map((w) => ({
                label: w.name,
                value: w.code.toString(),
              }))}
              value={provinceCode as string}
              setValue={setProvinceCode}
            />
          </div>

          <div>
            <SelectSearch
              placehoder="Chọn Phường/ Xã"
              title="Chọn Phường/ Xã"
              data={wards.map((w) => ({
                label: w.name,
                value: w.code.toString(),
              }))}
              value={wardCode as string}
              setValue={setWardCode}
            />
          </div>

          <div className="col-span-2">
            <p className="mb-1 font-semibold text-sm">Số nhà/ tên đường</p>
            <Input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Số nhà, tên đường" />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
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
