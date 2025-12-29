import axiosInstance from '../axiosInstance';

const paymentIntentFn = async (payload: { amount: number; orderCode: string }): Promise<{ clientSecret: string }> => {
  const { data } = await axiosInstance.post('/stripe/payment-intent', payload);

  return data;
};

export { paymentIntentFn };
