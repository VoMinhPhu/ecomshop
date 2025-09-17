'use client';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SelectFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  options: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
};

const SelectField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  label,
  field,
  options,
  placeholder,
  disabled,
}: SelectFieldProps<TFieldValues, TName>) => (
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <Select onValueChange={(val) => field.onChange(val || undefined)} value={field.value ?? ''} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder || `Chọn ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {(options ?? []).map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage />
  </FormItem>
);

export default SelectField;
