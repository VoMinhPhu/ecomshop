import { SortType } from '@/hooks/useProductFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  value: SortType;
  onChange: (v: SortType) => void;
};

const SortFilter = ({ value, onChange }: Props) => {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortType)}>
      <SelectTrigger className="text-sm">
        <SelectValue placeholder="Sắp xếp theo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="priceAsc">Giá tăng dần</SelectItem>
        <SelectItem value="priceDesc">Giá giảm dần</SelectItem>
        <SelectItem value="newest">Sản phẩm mới nhất</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
