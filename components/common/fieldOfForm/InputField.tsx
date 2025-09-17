'use client';

import { Input } from '@/components/ui/input';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

type InputFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
  disabled?: boolean;
};

const InputField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  label,
  field,
  placeholder,
  disabled,
}: InputFieldProps<TFieldValues, TName>) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Input placeholder={placeholder} disabled={disabled} {...field} value={field.value ?? ''} />
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default InputField;
