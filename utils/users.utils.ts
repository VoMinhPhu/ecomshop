export const formatGender = (gender: 'male' | 'female' | null) => {
  if (gender === 'male') return 'Nam';
  else if (gender === 'female') return 'Nữ';

  return '-';
};
