import { Province, Ward } from '@/types/map';

export const getProvinces = async (): Promise<Province[]> => {
  const res = await fetch('https://provinces.open-api.vn/api/v2/p/');
  if (!res.ok) throw new Error('Fetch provinces failed');
  return res.json();
};

export const getWards = async (provinceCode: number): Promise<Ward[]> => {
  const res = await fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`);
  if (!res.ok) throw new Error('Fetch wards failed');

  const data = await res.json();
  return data.wards ?? [];
};
