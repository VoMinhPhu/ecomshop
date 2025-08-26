import { CircleCheck, CircleX, TriangleAlert } from 'lucide-react';
import { Toaster } from '../ui/sonner';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          title: 'font-semibold text-base',
        },
      }}
      icons={{
        success: <CircleCheck color="#00DC33" strokeWidth={3} size={20} />,
        warning: <TriangleAlert color="#e6f425" strokeWidth={3} size={20} />,
        error: <CircleX color="#f44e25" strokeWidth={3} size={20} />,
      }}
    />
  );
};

export default ToastProvider;
