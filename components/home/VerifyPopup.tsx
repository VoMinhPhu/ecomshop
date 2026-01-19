'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import Lottie from 'lottie-react';

import successAnimation from '@/public/icons/success.json';
import errorAnimation from '@/public/icons/errorAnimation.json';

import AuthPopup from '../auth/AuthPopup';
import useUserStore from '@/stores/userStore';
import { Button } from '../ui/button';
import { useVerifyAccount } from '@/hooks/auth';
import { Loader } from 'lucide-react';

type Props = {
  verify: string;
};

export default function VerifyPopup({ verify }: Props) {
  const router = useRouter();
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
            <label
              className={cn(
                'mt-6 bg-green-400 hover:bg-green-400/90 text-white cursor-pointer py-1.75 px-3 rounded-sm',
                user && 'hidden',
              )}
            >
              Đăng nhập ngay
              <span className="hidden">
                <AuthPopup />
              </span>
            </label>
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
    </div>
  );
}
