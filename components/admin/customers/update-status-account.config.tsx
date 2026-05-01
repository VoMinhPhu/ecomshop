import { Button } from '@/components/ui/button';
import { AccountStatus } from '@/types/users.type';
import { BanIcon, RotateCcwIcon, ZapIcon } from 'lucide-react';

export type ActionConfig = {
  title: string;
  description: string;
  confirmLabel: string;
  confirmClass: string;
  trigger: React.ReactNode;
  newStatus: AccountStatus;
};

export const ACTION_CONFIG: Record<AccountStatus, ActionConfig> = {
  [AccountStatus.ACTIVE]: {
    trigger: (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-full justify-start font-normal text-red-500 hover:text-red-500 hover:bg-red-50"
      >
        <BanIcon className="mr-2 h-4 w-4" />
        Cấm
      </Button>
    ),
    title: 'Xác nhận cấm tài khoản',
    description: 'Tài khoản sẽ bị khóa và người dùng không thể đăng nhập. Bạn có thể khôi phục lại bất cứ lúc nào.',
    confirmLabel: 'Xác nhận cấm',
    confirmClass: 'bg-red-600 hover:bg-red-700 text-white',
    newStatus: AccountStatus.BANNED,
  },
  [AccountStatus.BANNED]: {
    trigger: (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-full justify-start font-normal text-emerald-600 hover:text-emerald-600 hover:bg-emerald-50"
      >
        <RotateCcwIcon className="mr-2 h-4 w-4" />
        Kích hoạt
      </Button>
    ),
    title: 'Xác nhận kích hoạt tài khoản',
    description: 'Tài khoản sẽ được mở khóa và người dùng có thể đăng nhập trở lại.',
    confirmLabel: 'Xác nhận kích hoạt',
    confirmClass: 'bg-primary/90 hover:bg-primary text-white',
    newStatus: AccountStatus.ACTIVE,
  },
  [AccountStatus.UNACTIVE]: {
    trigger: (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-full justify-start font-normal text-indigo-600 hover:text-indigo-600 hover:bg-indigo-50"
      >
        <ZapIcon className="mr-2 h-4 w-4" />
        Kích hoạt
      </Button>
    ),
    title: 'Xác nhận kích hoạt tài khoản',
    description: 'Tài khoản sẽ được kích hoạt và người dùng có thể bắt đầu sử dụng dịch vụ.',
    confirmLabel: 'Xác nhận kích hoạt',
    confirmClass: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    newStatus: AccountStatus.ACTIVE,
  },
};
