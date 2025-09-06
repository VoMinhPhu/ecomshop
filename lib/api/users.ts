import axiosInstance from '../axiosInstance';

const getMeFn = async () => {
  const { data } = await axiosInstance.get('/users/me');

  return data;
};

const updateAvatarFn = async (avatar: Blob) => {
  const formData = new FormData();
  formData.append('file', avatar, 'avatar.png');
  const { data } = await axiosInstance.post('/users/update-avatar', formData);
  return data;
};

export { getMeFn, updateAvatarFn };
