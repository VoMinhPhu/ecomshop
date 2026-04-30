import axiosInstance from '../axiosInstance';

const paymentIntentFn = async (payload: { amount: number; orderCode: string }): Promise<{ clientSecret: string }> => {
  const { data } = await axiosInstance.post('/payment/stripe/payment-intent', payload);

  return data;
};

const paymentWithVnpayFn = async (payload: { orderCode: string }): Promise<{ paymentUrl: string }> => {
  const { data } = await axiosInstance.post('/payment/vnpay/create', payload);

  return data;
};

export { paymentIntentFn, paymentWithVnpayFn };
