const DynamicProductInfoLoading = () => {
  return (
    <div className="flex flex-1 h-full flex-col pt-4 pb-4">
      <div className="h-10 bg-gray-100 animate-pulse rounded w-60 mb-2" />
      <div className="h-5 bg-gray-100 animate-pulse rounded w-48 mb-4" />

      <div className="h-5 bg-gray-100 animate-pulse rounded w-28 mb-4 mt-2" />
      <div className="h-5 bg-gray-100 animate-pulse rounded w-28 mb-4" />

      <div className="bg-white z-10 px-3 w-full mt-36 pb-4">
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
  );
};

export default DynamicProductInfoLoading;
