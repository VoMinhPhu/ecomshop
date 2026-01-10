import { UserInfo } from '@/types/users';
import axiosInstance from '../axiosInstance';
import { UpdateUserInfoType } from '@/schemas/user';

const getMeFn = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get('/users/me');

  return data;
};

const updateAvatarFn = async (avatar: Blob) => {
  const formData = new FormData();
  formData.append('file', avatar, 'avatar.png');
  const { data } = await axiosInstance.post('/users/update-avatar', formData);
  return data;
};

const updateUserInfo = async (data: UpdateUserInfoType) => {
  const res = await axiosInstance.post('/users/update', data);
  return res.data;
};

export { getMeFn, updateAvatarFn, updateUserInfo };
