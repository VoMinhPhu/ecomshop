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
import { useSetAddressDefault } from '@/hooks/api/address';
import { MapPin } from 'lucide-react';

type Props = {
  id: string;
  address: string;
};

const SetAddressDefaultBtn = ({ address, id }: Props) => {
  const { mutate } = useSetAddressDefault();

  const handleDelete = () => {
    mutate({ id });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal hover:text-primary">
          <MapPin />
          Đặt làm mặc định
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn muốn đặt địa chỉ
            <span className="mx-1.5 text-primary">{address}</span>
            thành địa chỉ mặc định?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="cursor-pointer">
            Đặt làm mặc định
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SetAddressDefaultBtn;
