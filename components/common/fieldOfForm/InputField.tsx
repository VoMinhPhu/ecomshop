'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

type InputFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  type?: string;
  label: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  requireIcon?: boolean;
  field: ControllerRenderProps<TFieldValues, TName>;
};

const InputField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  label,
  field,
  disabled,
  className,
  placeholder,
  type = 'text',
  requireIcon = false,
}: InputFieldProps<TFieldValues, TName>) => (
  <FormItem>
    <FormLabel className="gap-1">
      {label}
      <span className={cn('text-red-500 font-bold', !requireIcon && 'hidden')}>*</span>
    </FormLabel>
    <FormControl>
      <Input
        {...field}
        type={type}
        disabled={disabled}
        value={field.value ?? ''}
        className={cn(className)}
        placeholder={placeholder}
      />
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default InputField;
