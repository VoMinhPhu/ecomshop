export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
  resetCode: string;
};
