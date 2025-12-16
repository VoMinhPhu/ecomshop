import { Address } from '@/types/address';
import axiosInstance from '../axiosInstance';

const getAllAddress = async (): Promise<Address[]> => {
  const { data } = await axiosInstance.get('/users/address');

  return data;
};

const addAddress = async (payload: { address: string }): Promise<Address> => {
  const { data } = await axiosInstance.post('/users/address', payload);

  return data;
};

const setAddressDefault = async (payload: { id: string }): Promise<Address> => {
  const { data } = await axiosInstance.patch('/users/address-default', payload);

  return data;
};

const updateAddress = async (payload: { id: string; address: string }): Promise<Address> => {
  const { data } = await axiosInstance.patch('/users/address', payload);

  return data;
};

const deleteAddAddress = async (payload: { id: string }) => {
  const { data } = await axiosInstance.delete('/users/address', {
    data: payload,
  });

  return data;
};

export { getAllAddress, addAddress, deleteAddAddress, setAddressDefault, updateAddress };
