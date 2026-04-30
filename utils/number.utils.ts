const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('vi-VN', {
    maximumFractionDigits: 0,
  }).format(amount);

export { formatCurrency };
