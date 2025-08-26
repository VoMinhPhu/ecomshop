import { useState } from 'react';

import { Input } from '../ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';

const PasswordInput = ({ field, label }: { field: any; label: string }) => {
  const [show, setShow] = useState(false);
  return (
    <FormItem className="mt-4">
      <FormLabel>
        {label} <span className="text-red-400">*</span>
      </FormLabel>
      <FormControl>
        <div className="relative">
          <Input className="h-11" type={show ? 'text' : 'password'} placeholder={label} {...field} />
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
