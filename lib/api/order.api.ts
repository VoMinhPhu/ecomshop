import {
  OrderStatus,
  PaymentMethod,
  GetAllOrderRes,
  CreateOrderType,
  ConfirmOrderType,
  GetOrdersResponse,
  GetAllOrderParams,
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

const getAllOrderFn = async (params: GetAllOrderParams): Promise<GetAllOrderRes> => {
  const { data } = await axiosInstance.get('/orders/all', {
    params,
  });

  return data;
};

const getDetailOrderFn = async (orderCode: string): Promise<GetOrdersDetailResponse> => {
  const { data } = await axiosInstance.get(`/orders/detail/${orderCode}`);

  return data;
};

const getDetailOrderByIdFn = async (id: string): Promise<GetOrdersDetailResponse> => {
  const { data } = await axiosInstance.get(`/orders/detail/id/${id}`);

  return data;
};

const cancelOrderFn = async (id: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete(`/orders/${id}`);

  return data;
};

const updateStatusOrderFn = async (payload: {
  id: string;
  status: OrderStatus;
}): Promise<{ message: string; id: string }> => {
  const { data } = await axiosInstance.patch(`/orders/${payload.id}`, { status: payload.status });

  return data;
};

export {
  getOrderFn,
  getAllOrderFn,
  createOrderFn,
  confirmOrderFn,
  cancelOrderFn,
  getTotalOrderFn,
  getDetailOrderFn,
  updateStatusOrderFn,
  createSingleOrderFn,
  getDetailOrderByIdFn,
};
