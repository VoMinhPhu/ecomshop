import { ConfirmOrderType, CreateOrderType, GetOrdersDetailResponse, GetOrdersResponse } from '@/types/order';
import axiosInstance from '../axiosInstance';

const createOrderFn = async (payload: CreateOrderType): Promise<{ orderCode: string; id: string }> => {
  const { data } = await axiosInstance.post('/orders', payload);

  return data;
};

const confirmOrderFn = async (payload: ConfirmOrderType): Promise<{ orderCode: string; id: string }> => {
  const { data } = await axiosInstance.post('/orders/confirm', payload);

  return data;
};

const getOrderFn = async (): Promise<GetOrdersResponse> => {
  const { data } = await axiosInstance.get('/orders');

  return data;
};

const getDetailOrderFn = async (id: string): Promise<GetOrdersDetailResponse> => {
  const { data } = await axiosInstance.get(`/orders/detail/${id}`);

  return data;
};

export { createOrderFn, getOrderFn, getDetailOrderFn, confirmOrderFn };
