'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { KeyRound, Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';

import PasswordInput from '@/components/auth/PasswordInput';
import InputField from '@/components/common/fieldOfForm/InputField';

import { useResetPassword } from '@/hooks/api/auth.hook';
import { formResetPasswordSchema, FormResetPasswordType } from '@/schemas/auth.schema';

import { cn } from '@/lib/utils';

import successAnimation from '@/public/icons/success.json';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const resetCode = searchParams.get('resetCode');

  const { mutate: resetPasswordMutate, isPending, isSuccess } = useResetPassword();

  const form = useForm<FormResetPasswordType>({
    resolver: zodResolver(formResetPasswordSchema),
    defaultValues: {
      resetCode: resetCode || '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: FormResetPasswordType) {
    resetPasswordMutate({
      resetCode: values.resetCode,
      newPassword: values.newPassword,
    });
  }

  return (
    <div className="py-10">
      <div className="mx-auto max-w-300 px-2">
        <div className="flex flex-col items-center gap-2">
          <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full ">
            <Image src={'/icons/logo-small.svg'} width={40} height={40} alt="Logo ecomshop small" className="w-10" />
          </div>
          <div>
            <p className="text-center font-semibold">Đặt lại mật khẩu</p>
            <p className="text-center">Đặt lại mật khẩu mới cho lần đăng nhập tiếp theo.</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="max-w-lg mx-auto">
            <Lottie animationData={successAnimation} loop={false} autoPlay className="w-20 h-20 mx-auto my-3" />
            <p className="text-center">Mật khẩu của bạn đã được đặt lại thành công.</p>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-3 max-w-lg mx-auto mt-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="hidden">
                <FormField
                  control={form.control}
                  name="resetCode"
                  render={({ field }) => <InputField className="hidden" field={field} label="" />}
                />
              </div>

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <PasswordInput className="h-10" placeholder="Nhập mật khẩu mới" field={field} label="Mật khẩu mới" />
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <PasswordInput
                    className="h-10"
                    placeholder="Xác nhận mật khẩu"
                    field={field}
                    label="Xác nhận mật khẩu"
                  />
                )}
              />

              <div className="flex items-center justify-center pt-4">
                <Button disabled={isPending} className="w-full" type="submit" size="lg">
                  <Loader className={cn('animate-spin', !isPending && 'hidden')} />
                  <KeyRound className={cn(isPending && 'hidden')} />
                  {isPending ? 'Đang đặt lại mật khẩu' : 'Đặt lại mật khẩu'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
