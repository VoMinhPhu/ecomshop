const ListProductLoading = () => {
  return (
    <div className="mt-3 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 lg:px-0 px-2">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="bg-white rounded-md border animate-pulse">
          <div className="relative">
            <div className="w-full h-[250px] bg-gray-200 rounded-t-md md:rounded-t-none" />
            <div className="absolute bottom-0 w-25 rounded-tr-md h-12 bg-gray-300" />
          </div>

          <div className="px-2 pb-6 pt-3 space-y-2">
            <div className="h-5 bg-gray-200 rounded w-2/3" />

            <div className="h-4 bg-gray-200 rounded w-1/2" />

            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProductLoading;
