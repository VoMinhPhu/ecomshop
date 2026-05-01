import { Ellipsis } from 'lucide-react';

import { AccountStatus } from '@/types/users.type';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import DetailCustomer from './DetailCustomer';
import UpdateStatusAccountButton from './UpdateStatusAccountButton';

type Props = {
  userId: string;
  status: AccountStatus;
};

export default function ActionTableCustomer({ userId, status }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-14">
        <DetailCustomer customerId={userId} />
        <UpdateStatusAccountButton status={status} customerId={userId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
