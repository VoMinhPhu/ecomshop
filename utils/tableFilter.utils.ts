import { ColumnFiltersState } from '@tanstack/react-table';

export function getFilter<T = string>(filters: ColumnFiltersState, id: string): T | undefined {
  return filters.find((f) => f.id === id)?.value as T | undefined;
}
