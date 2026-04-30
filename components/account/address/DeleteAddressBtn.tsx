import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeleteAddAddress } from '@/hooks/api/address.hook';
import { Trash2 } from 'lucide-react';

type Props = {
  id: string;
  address: string;
};

const DeleteAddressBtn = ({ address, id }: Props) => {
  const { mutate } = useDeleteAddAddress();

  const handleDelete = () => {
    mutate({ id });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500">
          <Trash2 />
          Xóa
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Nếu bạn nhấn nút
            <span className="text-red-500 font-semibold text-base mx-1.5">xóa</span>
            địa chỉ
            <span className="mx-1.5 text-primary">{address}</span>
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive cursor-pointer">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddressBtn;
