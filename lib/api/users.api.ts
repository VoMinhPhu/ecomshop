import { AccountStatus, GetAllCustomerParams, GetDetailUser, UserInfo, UserListResponse } from '@/types/users.type';
import axiosInstance from '../axiosInstance';
import { UpdateAccountStatus, UpdateUserInfoType } from '@/schemas/users.schema';

const getMeFn = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get('/users/me');

  return data;
};

const getDetailUserFn = async (id: string): Promise<GetDetailUser> => {
  const { data } = await axiosInstance.get(`/users/detail/${id}`);

  return data;
};

const getAllUserFn = async (params: GetAllCustomerParams): Promise<UserListResponse> => {
  const { data } = await axiosInstance.get('/users', {
    params,
  });

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

const updateAccountStatusFn = async (
  data: UpdateAccountStatus,
): Promise<{ message: string; accountStatus: AccountStatus; userId: string }> => {
  const res = await axiosInstance.patch('/users/account', data);
  return res.data;
};

export { getMeFn, getDetailUserFn, getAllUserFn, updateAvatarFn, updateUserInfo, updateAccountStatusFn };
