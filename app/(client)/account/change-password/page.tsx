'use client';

import { Card } from '@/components/ui/card';
import useUserStore from '@/stores/user.store';
import SetPassword from '@/components/account/password/SetPassword';
import ChangePassword from '@/components/account/password/ChangePassword';

export default function page() {
  const user = useUserStore((s) => s.user);

  return (
    <Card className="mt-4 lg:ml-4 px-4 gap-0">
      <p className="text-xl font-semibold">QUẢN LÝ MẬT KHẨU</p>
      {user?.hasPassword ? <ChangePassword /> : <SetPassword />}
    </Card>
  );
}
