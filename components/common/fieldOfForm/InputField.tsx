'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

type InputFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  disabled?: boolean;
  requireIcon?: boolean;
  type?: string;
};

const InputField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  label,
  field,
  placeholder,
  disabled,
  requireIcon = false,
  type = 'text',
}: InputFieldProps<TFieldValues, TName>) => (
  <FormItem>
    <FormLabel className="gap-1">
      {label}
      <span className={cn('text-red-500 font-bold', !requireIcon && 'hidden')}>*</span>
    </FormLabel>
    <FormControl>
      <Input placeholder={placeholder} disabled={disabled} {...field} value={field.value ?? ''} type={type} />
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default InputField;
