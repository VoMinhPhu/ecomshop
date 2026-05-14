import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/utils/number.utils';

describe('formatCurrency', () => {
  it('formats numbers with vi-VN thousand separators', () => {
    expect(formatCurrency(1250000)).toBe('1.250.000');
  });

  it('rounds decimal amounts to the nearest integer', () => {
    expect(formatCurrency(1299.6)).toBe('1.300');
  });
});
