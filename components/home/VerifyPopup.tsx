'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import Lottie from 'lottie-react';
import { Loader } from 'lucide-react';

import successAnimation from '@/public/icons/success.json';
import errorAnimation from '@/public/icons/errorAnimation.json';

import useUserStore from '@/stores/user.store';
import { useVerifyAccount } from '@/hooks/api/auth.hook';

import { Button } from '../ui/button';
import AuthPopup from '../auth/AuthPopup';

type Props = {
  verify: string;
};

export default function VerifyPopup({ verify }: Props) {
  const router = useRouter();
  const [openAuth, setOpenAuth] = useState<boolean>(false);

  const user = useUserStore((s) => s.user);
  const { isLoading, isSuccess, isError } = useVerifyAccount(verify);

  const closeVerifySection = () => {
    router.replace('/', { scroll: false });
  };
  return (
    <div
      onClick={closeVerifySection}
      className={cn(
        !verify && 'hidden',
        'fixed top-0 w-full bg-black/20 bottom-0 z-50 flex items-center justify-center',
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg w-full bg-white rounded-md flex flex-col items-center py-6 shadow-md"
      >
        <p className="font-semibold text-lg">Xác minh tài khoản</p>

        {isLoading && (
          <>
            <Loader className="text-primary animate-spin size-14 my-5" />
            <p className="animate-pulse">Đang xác minh tài khoản</p>
          </>
        )}
        {isSuccess && (
          <>
            <Lottie animationData={successAnimation} loop={false} autoPlay className="w-14 h-14 mx-auto my-3" />
            <p>Xác minh tài khoản thành công</p>
            <Button className={cn('mt-6', user && 'hidden')} onClick={() => setOpenAuth(true)}>
              Đăng nhập ngay
            </Button>
          </>
        )}
        {isError && (
          <>
            <Lottie animationData={errorAnimation} loop={false} autoPlay className="w-14 h-14 mx-auto my-3" />
            <p>Xác minh tài khoản thất bại</p>
          </>
        )}

        <Button onClick={closeVerifySection} className={cn('mt-6 cursor-pointer', !user && 'hidden')} size={'lg'}>
          Đóng
        </Button>
      </div>
      <AuthPopup open={openAuth} onOpenChange={setOpenAuth} />
    </div>
  );
}
