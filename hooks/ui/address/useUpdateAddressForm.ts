import { useEffect, useMemo, useState } from 'react';

import { useGetProvinces } from '@/hooks/api/map.hook';
import { useUpdateAddress } from '@/hooks/api/address.hook';

import { Province, Ward } from '@/types/map.type';

const parseAddress = (address: string) => {
  const parts = address.split(',').map((s) => s.trim());
  const provinceName = parts.pop()!;
  const wardName = parts.pop()!;
  const street = parts.join(',');
  return { provinceName, wardName, street };
};

export const useUpdateAddressForm = (id: string, address: string, onSuccess: () => void) => {
  const { provinceName, wardName, street: streetInit } = useMemo(() => parseAddress(address), [address]);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [provinceCode, setProvinceCode] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [street, setStreet] = useState(streetInit);
  const [isValid, setIsValid] = useState(true);

  const { data: provincesData } = useGetProvinces();
  const { mutate: updateAddressMutate, isPending } = useUpdateAddress();

  useEffect(() => {
    if (!provincesData) return;
    setProvinces(provincesData);

    const province = provincesData.find((p) => p.name === provinceName);
    if (province) setProvinceCode(province.code.toString());
  }, [provincesData, provinceName]);

  useEffect(() => {
    if (!provinceCode) {
      setWards([]);
      setWardCode('');
      return;
    }

    const controller = new AbortController();

    const loadWards = async () => {
      try {
        const res = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`, {
          signal: controller.signal,
        });
        const data = await res.json();
        const wards: Ward[] = data.wards || [];
        setWards(wards);

        const ward = wards.find((w) => w.name === wardName);
        setWardCode(ward ? ward.code.toString() : '');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setWards([]);
          setWardCode('');
        }
      }
    };

    loadWards();
    return () => controller.abort();
  }, [provinceCode, wardName]);

  const handleSetProvinceCode = (value: string) => {
    setProvinceCode(value);
    setIsValid(true);
  };

  const handleSetWardCode = (value: string) => {
    setWardCode(value);
    setIsValid(true);
  };

  const handleSetStreet = (value: string) => {
    setStreet(value);
    setIsValid(true);
  };

  const handleSubmit = () => {
    if (!provinceCode || !wardCode || !street.trim()) {
      setIsValid(false);
      return;
    }

    const province = provinces.find((p) => p.code.toString() === provinceCode)?.name;
    const ward = wards.find((w) => w.code.toString() === wardCode)?.name;
    if (!province || !ward) return;

    const newAddress = `${street.trim()}, ${ward}, ${province}`;
    updateAddressMutate({ id, address: newAddress }, { onSuccess });
  };

  return {
    provinces,
    wards,
    provinceCode,
    wardCode,
    street,
    isValid,
    isPending,
    handleSetProvinceCode,
    handleSetWardCode,
    handleSetStreet,
    handleSubmit,
  };
};
