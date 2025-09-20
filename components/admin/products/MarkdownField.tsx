'use client';

import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MarkdownFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label?: string;
  requireIcon?: boolean;
  disabled?: boolean;
};

const MarkdownField = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  field,
  label,
  requireIcon = false,
  disabled = false,
}: MarkdownFieldProps<TFieldValues, TName>) => {
  return (
    <FormItem>
      {label && (
        <FormLabel className="gap-1">
          {label}
          <span className={cn('text-red-500', !requireIcon && 'hidden')}>*</span>
        </FormLabel>
      )}
      <div data-color-mode="light">
        <MDEditor
          value={field.value || ''}
          onChange={(v) => field.onChange(v || '')}
          height={300}
          textareaProps={{ readOnly: disabled }}
        />
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default MarkdownField;
