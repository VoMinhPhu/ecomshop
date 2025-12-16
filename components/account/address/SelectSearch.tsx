'use client';

import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  title: string;
  placehoder?: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};

export default function SelectSearch({ data, title, placehoder, value, setValue }: Props) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>{title}</Label>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]"
            id={id}
            role="combobox"
            variant="outline"
          >
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value ? data.find((d) => d.value === value)?.label : placehoder}
            </span>
            <ChevronDownIcon aria-hidden="true" className="shrink-0 text-muted-foreground/80" size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm" />
            <CommandList>
              <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
              <CommandGroup>
                {data.map((d) => (
                  <CommandItem
                    key={d.value}
                    keywords={[d.label]}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    value={d.value}
                  >
                    {d.label}
                    {value === d.value && <CheckIcon className="ml-auto" size={16} />}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
