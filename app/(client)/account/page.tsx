'use client';

import useUserStore from '@/stores/user.store';

import { Card } from '@/components/ui/card';
import UserInfoForm from '@/components/account/UserInfoForm';
import AvatarSection from '@/components/account/AvatarSection';

const Page = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <Card className="mt-4 lg:ml-4 md:px-4 px-2 gap-0">
      <p className="text-xl font-semibold">THÔNG TIN TÀI KHOẢN</p>
      <div className="grid grid-cols-1 mt-4 md:grid-cols-5 md:gap-4 gap-y-8 md:gap-y-0">
        <div className="lg:pl-8 col-span-3 order-2 md:order-1">
          <UserInfoForm user={user} />
        </div>
        <AvatarSection userAvatar={user?.avatar} />
      </div>
    </Card>
  );
};

export default Page;
