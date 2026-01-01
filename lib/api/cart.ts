import axiosInstance from '../axiosInstance';

const getUserCartFn = async (): Promise<{ data: CartItem[] }> => {
  const { data } = await axiosInstance.get('/carts');

  return data;
};

const addProductToCart = async (payload: { productId: string; quantity: number }) => {
  const { data } = await axiosInstance.post('/carts/add', payload);

  return data;
};

const removeCartItemsFn = async (payload: { cartItemIds: string[] }): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete('/carts/remove', {
    data: payload,
  });

  return data;
};

const updateQuantityCartItemFn = async (payload: { id: string; quantity: number }): Promise<{ message: string }> => {
  const { data } = await axiosInstance.patch('/carts/update', payload);

  return data;
};

export { getUserCartFn, removeCartItemsFn, updateQuantityCartItemFn, addProductToCart };
