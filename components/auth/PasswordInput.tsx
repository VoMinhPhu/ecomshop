import { useState } from 'react';

import { Input } from '../ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';

const PasswordInput = ({
  field,
  label,
  className,
  require = false,
  placeholder = 'Nhập mật khẩu...',
}: {
  field: any;
  label: string;
  require?: boolean;
  placeholder?: string;
  className?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <FormItem>
      <FormLabel>
        {label} <span className={cn('text-red-400', !require && 'hidden')}>*</span>
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            className={cn('h-11', className)}
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            {...field}
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" onClick={() => setShow(!show)}>
            {show ? <EyeIcon className="size-4.5 text-zinc-400" /> : <EyeOffIcon className="size-4.5 text-zinc-400" />}
          </span>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PasswordInput;
