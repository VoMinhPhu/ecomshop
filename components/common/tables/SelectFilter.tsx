'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';
import { ChevronDown } from 'lucide-react';

type SelectFilterProps = {
  options: { id: string; name: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SelectFilter = ({ options, value, onChange, placeholder = 'Tất cả' }: SelectFilterProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between font-normal rounded-md ${!value ? 'text-muted-foreground' : ''}`}
        >
          {selected ? selected.name : placeholder}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command className="w-full">
          <CommandInput placeholder="Tìm kiếm..." />
          <CommandList>
            <CommandItem
              key="all"
              onSelect={() => {
                onChange('');
                setOpen(false);
              }}
            >
              Tất cả
            </CommandItem>
            {options.map((opt) => (
              <CommandItem
                key={opt.id}
                onSelect={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
              >
                {opt.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectFilter;
