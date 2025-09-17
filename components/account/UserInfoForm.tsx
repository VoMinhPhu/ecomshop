'use client';

import z from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { UserInfo } from '@/types/users';
import { formatDateToYMD } from '@/utils/date';
import { useUpdateUserInfo } from '@/hooks/users';

import { Loader } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import InputField from '@/components/common/fieldOfForm/InputField';
import SelectField from '@/components/common/fieldOfForm/SelectField';
import DatePickerField from '@/components/common/fieldOfForm/DatePickerField';

const updateUserInfoSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống').optional(),
  gender: z.enum(['male', 'female']).optional(),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^0\d{9}$/.test(val), {
      message: 'Số điện thoại không hợp lệ',
    }),
  dateOfBirth: z
    .date()
    .optional()
    .refine((date) => !date || (date >= new Date('1900-01-01') && date <= new Date()), {
      message: 'Ngày sinh phải nằm trong khoảng từ năm 1900 đến nay',
    }),
});

type Props = {
  user: UserInfo | null;
};

const UserInfoForm = ({ user }: Props) => {
  const { mutate: updateInfoUserMutate, isPending } = useUpdateUserInfo();

  const form = useForm<z.infer<typeof updateUserInfoSchema>>({
    resolver: zodResolver(updateUserInfoSchema),
  });

  useEffect(() => {
    if (!user) return;
    form.reset({
      name: user.name ?? '',
      phone: user.phone ?? undefined,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      gender: user.gender ?? undefined,
    });
  }, [user]);

  const onSubmit = (values: z.infer<typeof updateUserInfoSchema>) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth ? formatDateToYMD(values.dateOfBirth) : undefined,
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
