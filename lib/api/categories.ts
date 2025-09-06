import axiosInstance from '../axiosInstance';

const getAllCategories = async () => {
  const { data } = await axiosInstance.get('/category/all');

  return data;
};

export { getAllCategories };
