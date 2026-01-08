'use client';

import Image from 'next/image';
import { SetStateAction } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader, LogIn } from 'lucide-react';

import { useRegister } from '@/hooks/auth';
import { FormRegisterType, formRegiterSchema } from '@/schemas/auth';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Form, FormField } from '../ui/form';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';

import PasswordInput from './PasswordInput';
import InputField from '../common/fieldOfForm/InputField';

type Props = {
  closeDialogFn: React.Dispatch<SetStateAction<boolean>>;
};

export default function RegisterSection({ closeDialogFn }: Props) {
  const { mutate: registerMutate, isPending } = useRegister();

  const form = useForm<FormRegisterType>({
    resolver: zodResolver(formRegiterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: FormRegisterType) {
    const { confirmPassword, ...data } = values;
    registerMutate(data, {
      onSuccess: () => {
        form.reset();
        closeDialogFn(false);
      },
    });
  }
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full ">
          <Image src={'/icons/logo-small.svg'} width={36} height={36} alt="Logo ecomshop small" className="w-9" />
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">Chào mừng bạn</DialogTitle>
          <DialogDescription className="sm:text-center">Nhập thông tin tài khoản để đăng ký.</DialogDescription>
        </DialogHeader>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <InputField
                className="h-10"
                field={field}
                label="Tên người dùng"
                placeholder="Nhập tên của bạn"
                requireIcon
              />
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <InputField
                className="h-10"
                field={field}
                label="Tài khoản"
                requireIcon
                placeholder="Nhập địa chỉ email của bạn"
              />
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => <PasswordInput className="h-10" require field={field} label="Mật khẩu" />}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => <PasswordInput className="h-10" require field={field} label="Nhập lại mật khẩu" />}
          />

          <Button disabled={isPending} className="w-full mt-6" type="submit" size="lg">
            <Loader className={cn('animate-spin', !isPending && 'hidden')} />
            <LogIn className={cn(isPending && 'hidden')} />
            {isPending ? 'Đang đăng ký' : 'Đăng ký'}
          </Button>
        </form>
      </Form>
    </>
  );
}
