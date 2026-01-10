'use client';

import { useState } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

import { convertDate } from '@/utils/date';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

type DatePickerFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  label?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
};

const DatePickerField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  label,
  field,
}: DatePickerFieldProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false);

  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline" className="w-full justify-between font-normal">
              {field.value ? convertDate(new Date(field.value)) : 'Chọn ngày'}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={field.value}
            onSelect={(date) => {
              field.onChange(date || undefined);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export default DatePickerField;
