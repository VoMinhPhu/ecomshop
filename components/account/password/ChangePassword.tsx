'use client';

import { useForm } from 'react-hook-form';
import { KeyRound, Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import PasswordInput from '@/components/auth/PasswordInput';

import { useChangePassword } from '@/hooks/api/auth';

import { cn } from '@/lib/utils';
import { formChangePasswordSchema, FormChangePasswordType } from '@/schemas/auth';

export default function ChangePassword() {
  const { mutate: changePasswordMutate, isPending } = useChangePassword();

  const form = useForm<FormChangePasswordType>({
    resolver: zodResolver(formChangePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: FormChangePasswordType) {
    changePasswordMutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <PasswordInput className="h-9" placeholder="Nhập mật khẩu cũ" field={field} label="Mật khẩu cũ" />
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <PasswordInput className="h-9" placeholder="Nhập mật khẩu mới" field={field} label="Mật khẩu mới" />
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordInput className="h-9" placeholder="Xác nhận mật khẩu" field={field} label="Xác nhận mật khẩu" />
            )}
          />

          <Button disabled={isPending} className="mt-3 w-full lg:w-auto" type="submit" size="lg">
            <Loader className={cn('animate-spin', !isPending && 'hidden')} />
            <KeyRound className={cn(isPending && 'hidden')} />
            {isPending ? 'Đang đổi mật khẩu' : 'Đổi mật khẩu'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
