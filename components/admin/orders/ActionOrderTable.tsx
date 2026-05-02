import { Ellipsis } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import DetailOrderDialog from './DetailOrderDialog';

type Props = {
  id: string;
  orderCode: string;
};

export default function ActionOrderTable({ orderCode, id }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-14">
        <DetailOrderDialog orderCode={orderCode} id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
