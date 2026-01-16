'use client';

import { Minus, Plus } from 'lucide-react';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const ManageQuantityBtn = ({ value, onChange }: Props) => {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(value > 1 ? value - 1 : 1);

  return (
    <div className="flex items-center justify-start gap-2 mt-3 ml-4">
      <button
        onClick={decrease}
        disabled={value === 1}
        className="flex items-center justify-center border h-6 w-6 rounded-sm disabled:opacity-50"
      >
        <Minus className="size-4.5" />
      </button>

      <span className="px-8 border rounded-sm text-center">{value}</span>

      <button onClick={increase} className="flex items-center justify-center border h-6 w-6 rounded-sm">
        <Plus className="size-4.5" />
      </button>
    </div>
  );
};

export default ManageQuantityBtn;
