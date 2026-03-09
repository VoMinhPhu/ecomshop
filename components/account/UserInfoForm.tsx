'use client';

import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';

import { UserInfo } from '@/types/users';
import { updateUserInfoSchema, UpdateUserInfoType } from '@/schemas/user';

import { useUpdateUserInfo } from '@/hooks/users';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormLabel } from '@/components/ui/form';

import InputField from '@/components/common/fieldOfForm/InputField';
import SelectField from '@/components/common/fieldOfForm/SelectField';
import DatePickerField from '@/components/common/fieldOfForm/DatePickerField';

type Props = {
  user: UserInfo;
};

const UserInfoForm = ({ user }: Props) => {
  const { mutate: updateInfoUserMutate, isPending } = useUpdateUserInfo();

  const form = useForm<UpdateUserInfoType>({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone ?? undefined,
      gender: user.gender ?? undefined,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateUserInfoSchema>) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth ?? undefined,
    };
    updateInfoUserMutate(payload);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <FormLabel className="mb-2">Email</FormLabel>
          <Input placeholder={user?.email ?? 'email@gmail.com'} disabled />
        </div>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <InputField label="Họ tên" field={field} placeholder={user?.name ?? 'Tên người dùng'} />
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <InputField label="Số điện thoại" field={field} placeholder={user?.phone ?? 'Nhập số điện thoại ...'} />
          )}
        />
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <SelectField
              label="Giới tính"
              field={field}
              options={[
                { label: 'Nam', value: 'male' },
                { label: 'Nữ', value: 'female' },
              ]}
            />
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => <DatePickerField field={field} label="Ngày sinh" />}
        />

        <Button disabled={isPending} type="submit" className="w-full mt-4">
          <Loader className={cn('animate-spin size-4', !isPending && 'hidden')} strokeWidth={3} />
          Cập nhật thông tin
        </Button>
      </form>
    </Form>
  );
};
export default UserInfoForm;
