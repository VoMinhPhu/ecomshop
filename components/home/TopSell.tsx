import ProductCard from '../common/ProductCard';

export default function TopSell() {
  return (
    <div className="bg-white mt-4 rounded-md p-4 pb-6 grid grid-cols-4 gap-2">
      <p className="col-span-4 font-bold text-lg mb-3">Những sản phẩm bán chạy nhất</p>
      {[1, 2, 3, 4].map((p) => (
        <ProductCard key={p} />
      ))}
    </div>
  );
}
