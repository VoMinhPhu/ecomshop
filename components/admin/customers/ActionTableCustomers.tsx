import { Ellipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import DetailCustomer from './DetailCustomer';

type Props = {
  userId: string;
};

export default function ActionTableCustomer({ userId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-14">
        <DetailCustomer customerId={userId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
