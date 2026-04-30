import { Address } from '@/types/address.type';
import { Ellipsis } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';

import DeleteAddressBtn from './DeleteAddressBtn';
import UpdateAddressBtn from './UpdateAddressBtn';
import SetAddressDefaultBtn from './SetAddressDefaultBtn';

type Props = {
  data: Address;
};

const ManageAddress = ({ data }: Props) => {
  return (
    <div className="w-20 flex items-center justify-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-md hover:border">
            <Ellipsis className="size-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="max-w-43">
          {!data.default && <SetAddressDefaultBtn address={data.address} id={data.id} />}

          <UpdateAddressBtn address={data.address} id={data.id} />
          <DeleteAddressBtn address={data.address} id={data.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ManageAddress;
