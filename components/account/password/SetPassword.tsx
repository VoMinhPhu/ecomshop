'use client';

import { useForm } from 'react-hook-form';
import { useSetPassword } from '@/hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';

import { KeyRound, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import PasswordInput from '@/components/auth/PasswordInput';

import { cn } from '@/lib/utils';
import { formSetPasswordSchema, FormSetPasswordType } from '@/schemas/auth';

export default function SetPassword() {
  const { mutate, isPending } = useSetPassword();

  const form = useForm<FormSetPasswordType>({
    resolver: zodResolver(formSetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: FormSetPasswordType) {
    console.log(values);
    mutate(values, {
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
            name="password"
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
            {isPending ? 'Đang đặt mật khẩu' : 'Đặt mật khẩu'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
