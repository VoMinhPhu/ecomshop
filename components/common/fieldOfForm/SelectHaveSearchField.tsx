'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormLabel } from '@/components/ui/form';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';

import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type Option = {
  value: string;
  label: string;
};

type SelectHaveSearchFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  options: Option[];
  field: ControllerRenderProps<TFieldValues, TName>;
  nameField: string;
  requireIcon?: boolean;
  disabled?: boolean;
};

const SelectHaveSearchField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  options,
  field,
  nameField,
  requireIcon = false,
  disabled = false,
}: SelectHaveSearchFieldProps<TFieldValues, TName>) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o: any) => o.value === field.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col gap-2">
        <FormLabel className="gap-1">
          {nameField}
          <span className={cn('text-red-500 font-bold', !requireIcon && 'hidden')}>*</span>
        </FormLabel>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className={`w-full font-normal justify-between rounded-md ${field.value ? '' : 'text-muted-foreground'}`}
          >
            {selected?.label || 'Chọn danh mục'}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command className="w-full">
          <CommandInput placeholder="Tìm kiếm..." />
          <CommandList>
            <CommandEmpty>Không có kết quả</CommandEmpty>
            {options.map((opt: any) => (
              <CommandItem
                key={opt.value}
                onSelect={() => {
                  field.onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectHaveSearchField;
