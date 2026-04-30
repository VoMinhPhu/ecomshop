import { useEffect, useState } from 'react';

import { useGetProvinces } from '@/hooks/api/map.hook';
import { useAddAddress } from '@/hooks/api/address.hook';

import { Province, Ward } from '@/types/map.type';

export const useAddNewAddressForm = (onSuccess: () => void) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [provinceCode, setProvinceCode] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [street, setStreet] = useState('');
  const [isValid, setIsValid] = useState(true);

  const { data: provincesData } = useGetProvinces();
  const { mutate: addAddressMutate, isPending } = useAddAddress();

  useEffect(() => {
    if (provincesData) setProvinces(provincesData);
  }, [provincesData]);

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
        setWards(data.wards || []);
        setWardCode('');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setWards([]);
          setWardCode('');
        }
      }
    };

    loadWards();
    return () => controller.abort();
  }, [provinceCode]);

  const handleReset = () => {
    setProvinceCode('');
    setWardCode('');
    setStreet('');
    setIsValid(true);
  };

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

    const address = `${street.trim()}, ${ward}, ${province}`;
    addAddressMutate(
      { address },
      {
        onSuccess: () => {
          onSuccess();
          handleReset();
        },
      },
    );
  };

  return {
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
  };
};
