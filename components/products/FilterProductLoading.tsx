const FilterProductLoading = () => {
  return (
    <div className="bg-white pb-6 px-3">
      <p className="font-semibold text-2xl">Sản phẩm</p>
      <div className="mt-2 grid grid-cols-3 gap-3">
        <div className="col-span-3 md:col-span-1">
          <p className="mb-1 text-zinc-500 text-sm">Thương hiệu</p>
          <div className="flex items-center justify-between gap-2">
            <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
            <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
            <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
            <div className="w-9 h-9 rounded-full bg-zinc-100 animate-pulse"></div>
          </div>
        </div>
        <div className="col-span-2 flex items-center">
          <div className="w-[1px] h-12 bg-zinc-200 mr-2"></div>
          <div className="flex-1">
            <p className="mb-1 text-zinc-500 text-sm">Danh mục</p>
            <div className="flex items-center justify-between gap-2">
              <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
              <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
              <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
              <div className="border-[1.5px] rounded-3xl px-3 py-1.5 flex-1 h-8 bg-zinc-100 animate-pulse"></div>
              <div className="w-9 h-9 rounded-full bg-zinc-100 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 mb-1 text-zinc-500 text-sm">Mức giá</p>
      <div className="flex items-center justify-between gap-3">
        <div className="h-8 flex-1 bg-zinc-100 animate-pulse boder-[1.5px] rounded-md"></div>
        <div className="h-8 flex-1 bg-zinc-100 animate-pulse boder-[1.5px] rounded-md"></div>
        <div className="h-8 w-8 border bg-zinc-100 rounded-sm"></div>
        <div className="h-8 w-8 border bg-zinc-100 rounded-sm"></div>
      </div>
      <div className="flex items-start justify-between mt-2">
        <p className="text-sm">Bộ lọc hiện tại:</p>
        <div className="flex items-center gap-2">
          <p className="text-sm">Sắp xếp theo</p>
          <div className="border py-1 px-3 flex items-center text-zinc-400 rounded-md">Sắp xếp theo</div>
        </div>
      </div>
    </div>
  );
};

export default FilterProductLoading;
