import {
  OrderStatus,
  PaymentMethod,
  CreateOrderType,
  ConfirmOrderType,
  GetOrdersResponse,
  CreateSingleOrderType,
  GetOrdersDetailResponse,
} from '@/types/order';
import axiosInstance from '../axiosInstance';

const createOrderFn = async (payload: CreateOrderType): Promise<{ orderCode: string; id: string }> => {
  const { data } = await axiosInstance.post('/orders', payload);

  return data;
};

const createSingleOrderFn = async (payload: CreateSingleOrderType): Promise<{ orderCode: string; id: string }> => {
  const { data } = await axiosInstance.post('/orders/single', payload);

  return data;
};

const getTotalOrderFn = async (orderCode: string): Promise<{ total: number }> => {
  const { data } = await axiosInstance.get(`/orders/${orderCode}`);

  return data;
};

const confirmOrderFn = async (
  payload: ConfirmOrderType,
): Promise<{ orderCode: string; id: string; status: OrderStatus; paymentMethod: PaymentMethod }> => {
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

export { createOrderFn, getOrderFn, getDetailOrderFn, confirmOrderFn, getTotalOrderFn, createSingleOrderFn };
