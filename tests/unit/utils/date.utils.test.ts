import { describe, expect, it } from 'vitest';

import { convertDate, formatDateToYMD } from '@/utils/date.utils';

describe('date utils', () => {
  const date = new Date(2026, 4, 9);

  it('converts a date to dd/mm/yyyy', () => {
    expect(convertDate(date)).toBe('09/05/2026');
  });

  it('returns an empty string when date is missing', () => {
    expect(convertDate()).toBe('');
  });

  it('formats a date to yyyy-mm-dd', () => {
    expect(formatDateToYMD(date)).toBe('2026-05-09');
  });
});
