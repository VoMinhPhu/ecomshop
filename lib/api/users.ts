import axiosInstance from '../axiosInstance';

const getMeFn = async () => {
  const { data } = await axiosInstance.get('/users/me');

  return data;
};

export { getMeFn };
