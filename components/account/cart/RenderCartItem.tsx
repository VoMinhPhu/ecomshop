import Image from 'next/image';

import { formatCurrency } from '@/utils/number.utils';

import { Checkbox } from '@/components/ui/checkbox';
import ManageQuantityBtn from './ManageQuantityBtn';

import { CartItem, CartUIState } from '@/types/cart.type';

type CartItemProps = {
  ui: CartUIState;
  item: CartItem;
  onChangeQuantity: (v: number) => void;
  onToggleSelected: (v: boolean) => void;
};

const RenderCartItem = ({ item, ui, onChangeQuantity, onToggleSelected }: CartItemProps) => (
  <div className="flex gap-3 border rounded-md p-4">
    <label className="flex items-center gap-3">
      <Checkbox checked={ui.selected} onCheckedChange={onToggleSelected} />
      <Image src={item.product.thumbnail} width={100} height={100} alt={item.product.name} />
    </label>
    <div className="flex-1 grid gap-2">
      <p>{item.product.name}</p>
      <div className="flex flex-col gap-0">
        <span className="text-red-500 font-semibold">
          {formatCurrency((item.product.salePrice ?? item.product.price) * ui.quantity)} vnđ
        </span>
        {item.product.salePrice && (
          <span className="line-through text-zinc-400 text-sm">{formatCurrency(item.product.price)}</span>
        )}
      </div>
      <ManageQuantityBtn value={ui.quantity} onChange={onChangeQuantity} />
    </div>
  </div>
);

export default RenderCartItem;
