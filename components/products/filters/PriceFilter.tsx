import { Filter, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  minInput?: number;
  maxInput?: number;
  applyPrice: () => void;
  clearPrice: () => void;
  setMinInput: (v: number | undefined) => void;
  setMaxInput: (v: number | undefined) => void;
};

const PriceFilter = ({ minInput, maxInput, setMinInput, setMaxInput, applyPrice, clearPrice }: Props) => {
  return (
    <div>
      <p className="mb-1 text-zinc-500 text-sm">Mức giá</p>
      <div className="flex items-end gap-3">
        <Input
          className="h-8 text-sm"
          type="number"
          placeholder="Giá nhỏ nhất"
          value={minInput ?? ''}
          min={0}
          onChange={(e) => setMinInput(e.target.value ? Number(e.target.value) : undefined)}
        />
        <Input
          className="h-8 text-sm"
          type="number"
          placeholder="Giá lớn nhất"
          value={maxInput ?? ''}
          onChange={(e) => setMaxInput(e.target.value ? Number(e.target.value) : undefined)}
        />
        <Button size="sm" onClick={applyPrice}>
          <Filter />
        </Button>
        <Button size="sm" variant="outline" onClick={clearPrice}>
          <X />
        </Button>
      </div>
    </div>
  );
};

export default PriceFilter;
