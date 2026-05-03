'use client';

import Image from 'next/image';
import { formatDate } from 'date-fns';
import {
  UserIcon,
  MailIcon,
  MarsIcon,
  VenusIcon,
  ClockIcon,
  PhoneIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ShieldAlertIcon,
} from 'lucide-react';

import { AccountStatus } from '@/types/users.type';

import { formatGender } from '@/utils/users.utils';
import { useGetDetailUser } from '@/hooks/api/users.hook';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import InfoRowOnDetailUser from './InfoRowOnDetailUser';

type Props = {
  customerId: string;
};

const ACCOUNT_STATUS_CONFIG: Record<AccountStatus, { label: string; className: string }> = {
  [AccountStatus.ACTIVE]: {
    label: 'Hoạt động',
    className: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  },
  [AccountStatus.UNACTIVE]: {
    label: 'Chưa kích hoạt',
    className: 'bg-zinc-100 text-zinc-600 hover:bg-zinc-100',
  },
  [AccountStatus.BANNED]: {
    label: 'Đã bị khóa',
    className: 'bg-red-100 text-red-700 hover:bg-red-100',
  },
};

export default function DetailCustomer({ customerId }: Props) {
  const { data } = useGetDetailUser(customerId);

  if (!data)
    return (
      <Button disabled variant="ghost" size="sm" className="w-full justify-start font-normal">
        <UserIcon className="mr-2 h-4 w-4" />
        Chi tiết
      </Button>
    );
  const statusConfig = ACCOUNT_STATUS_CONFIG[data.status as AccountStatus];

  const genderIcon = data.gender === 'female' ? VenusIcon : MarsIcon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start font-normal">
          <UserIcon className="mr-2 h-4 w-4" />
          Chi tiết
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[calc(100%-4px)] p-0 rounded-lg gap-0">
        <DialogHeader className="flex-row pt-8 md:px-5 px-2 gap-4">
          <div className="flex items-center w-30 h-30">
            <Image
              src={data.avatar || '/avatar.svg'}
              width={120}
              height={120}
              alt="Avatar"
              className="h-30 w-30 rounded-md border-2 object-cover"
            />
          </div>

          <div>
            <DialogTitle className="text-xl font-bold text-zinc-900 leading-tight">{data.name}</DialogTitle>
            <div className="flex items-center gap-2 mt-3">
              <Badge
                variant={data.isVerified ? 'default' : 'secondary'}
                className={
                  data.isVerified
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs font-medium'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs font-medium'
                }
              >
                {data.isVerified ? (
                  <ShieldCheckIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ShieldAlertIcon className="mr-1 h-3 w-3" />
                )}
                {data.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
              </Badge>

              <Badge className={`text-xs font-medium ${statusConfig?.className}`}>
                {statusConfig?.label ?? data.status}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="md:px-6 px-2 pb-6">
          <Separator className="my-4" />

          <div className="space-y-0.5">
            <InfoRowOnDetailUser icon={MailIcon} label="Email" value={data.email} />
            <InfoRowOnDetailUser icon={PhoneIcon} label="Số điện thoại" value={data.phone ?? '—'} />
            <InfoRowOnDetailUser icon={genderIcon} label="Giới tính" value={formatGender(data.gender)} />
            <InfoRowOnDetailUser
              icon={CalendarIcon}
              label="Ngày sinh"
              value={data.dateOfBirth ? formatDate(data.dateOfBirth, 'dd/MM/yyyy') : '—'}
            />
            <InfoRowOnDetailUser
              icon={ClockIcon}
              label="Thời gian tạo tài khoản"
              value={formatDate(data.createdAt, 'dd/MM/yyyy HH:mm:ss')}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
