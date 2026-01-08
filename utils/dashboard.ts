const formatPercent = (value: number | null) => {
  if (value === null) return '—';
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

const isUp = (value: number | null) => value !== null && value >= 0;

export { formatPercent, isUp };
