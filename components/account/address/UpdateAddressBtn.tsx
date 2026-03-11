'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SelectSearch from './SelectSearch';
import { Separator } from '@/components/ui/separator';
import { useUpdateAddress } from '@/hooks/api/address';
import { cn } from '@/lib/utils';
import { FilePen, Loader } from 'lucide-react';
import { useGetProvinces } from '@/hooks/api/map';
import { Province, Ward } from '@/types/map';

type Props = {
  id: string;
  address: string;
};

const UpdateAddressBtn = ({ address, id }: Props) => {
  const parts = address.split(',').map((s) => s.trim());
  const provinceName = parts.pop()!;
  const wardName = parts.pop()!;
  const streetInit = parts.join(',');

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [provinceCode, setProvinceCode] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [street, setStreet] = useState('');
  const [validAddress, setValidAddress] = useState(true);

  const { data: provincesData } = useGetProvinces();
  const { mutate: updateAddressMutate, isPending } = useUpdateAddress();

  useEffect(() => {
    if (!provincesData) return;

    setProvinces(provincesData);

    const province = provincesData.find((p) => p.name === provinceName);
    if (province) setProvinceCode(province.code.toString());
  }, [provincesData, provinceName]);

  useEffect(() => {
    setStreet(streetInit);
  }, [streetInit]);

  useEffect(() => {
    if (!provinceCode) {
      setWards([]);
      setWardCode('');
      return;
    }

    const loadWards = async () => {
      try {
        const res = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`);
        const data = await res.json();
        const wards = data.wards || [];
        setWards(wards);

        const ward = wards.find((w: Ward) => w.name === wardName);
        if (ward) setWardCode(ward.code.toString());
        else setWardCode('');
      } catch {
        setWards([]);
        setWardCode('');
      }
    };

    loadWards();
  }, [provinceCode, wardName]);

  const handleSubmit = () => {
    if (!provinceCode || !wardCode || !street.trim()) {
      setValidAddress(false);
      return;
    }

    const province = provinces.find((p) => p.code.toString() === provinceCode)?.name;
    const ward = wards.find((w) => w.code.toString() === wardCode)?.name;
    if (!province || !ward) return;

    const newAddress = `${street.trim()}, ${ward}, ${province}`;
    updateAddressMutate({ id, address: newAddress });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal">
          <FilePen />
          Chỉnh sửa
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-250">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
          <DialogDescription>
            Địa chỉ hiện tại:
            <span className="mx-1.5 text-primary">{address}</span>
          </DialogDescription>
          <Separator className="mb-1 mt-2" />
        </DialogHeader>

        <p className={cn('text-red-400 text-sm', validAddress && 'hidden')}>Cung cấp đầy đủ thông tin</p>

        <div className="grid grid-cols-2 gap-3">
          <SelectSearch
            title="Chọn Tỉnh/ Thành phố"
            placehoder="Chọn Tỉnh/ Thành phố"
            data={provinces.map((p) => ({ label: p.name, value: p.code.toString() }))}
            value={provinceCode}
            setValue={setProvinceCode}
          />

          <SelectSearch
            title="Chọn Phường/ Xã"
            placehoder="Chọn Phường/ Xã"
            data={wards.map((w) => ({ label: w.name, value: w.code.toString() }))}
            value={wardCode}
            setValue={setWardCode}
          />

          <div className="col-span-2">
            <p className="mb-1 font-semibold text-sm">Số nhà / tên đường</p>
            <Input value={street} onChange={(e) => setStreet(e.target.value)} />
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
    </Dialog>
  );
};

export default UpdateAddressBtn;
