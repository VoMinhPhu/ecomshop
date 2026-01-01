const ProductDetailLoading = () => {
  return (
    <>
      <div className="max-w-300 mx-auto flex items-center gap-2 text-zinc-500 mb-2">
        <div >
          Trang chủ
        </div>
        <span>&gt;</span>
        <div  >
          Sản phẩm
        </div>
      </div>
      <div className="lg:max-w-300 bg-white mx-auto md:flex">
        <div>
          <div className="p-4 mx-auto w-87.5 h-112 bg-gray-100 md:m-4 md:ml-4 animate-pulse" />
        </div>

        <div className="flex-1 pt-6 px-8 pb-4 relative">
          <div className="h-14 mb-4">
            <div className="h-6 bg-gray-100 animate-pulse rounded mb-2" />
            <div className="h-6 bg-gray-100 animate-pulse rounded w-3/4" />
          </div>

          <div className="h-6 bg-gray-100 animate-pulse rounded w-40 mb-4" />

          <div className="h-10 bg-gray-100 animate-pulse rounded w-60 mb-2" />

          <div className="h-5 bg-gray-100 animate-pulse rounded w-48 mb-4" />

          <div className="md:absolute fixed bg-white z-10 bottom-0 px-3 w-full left-0 pb-4">
            <div className="mb-6 flex items-center">
              <div className="h-6 bg-gray-100 animate-pulse rounded w-24 mr-10" />
              <div className="flex items-center justify-start gap-2 mt-3">
                <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-sm" />
                <div className="px-16 h-10 bg-gray-100 animate-pulse rounded-sm w-32" />
                <div className="h-10 w-10 bg-gray-100 animate-pulse rounded-sm" />
              </div>
            </div>

            <div className="md:flex gap-3 items-center grid grid-cols-2 mb-6">
              <div className="h-12 bg-gray-100 animate-pulse rounded lg:w-3/4 md:w-4/7 w-full" />
              <div className="h-12 bg-gray-100 animate-pulse rounded w-full md:w-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-300 px-3 pt-3 pb-10 bg-white mx-auto mt-3">
        <div className="h-7 bg-gray-100 animate-pulse rounded w-48 mb-4" />

        <div className="space-y-3">
          <div className="h-4 bg-gray-100 animate-pulse rounded" />
          <div className="h-4 bg-gray-100 animate-pulse rounded" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-5/6" />
          <div className="h-4 bg-gray-100 animate-pulse rounded" />
          <div className="h-4 bg-gray-100 animate-pulse rounded w-4/5" />
        </div>
      </div>
    </>
  );
};

export default ProductDetailLoading;
