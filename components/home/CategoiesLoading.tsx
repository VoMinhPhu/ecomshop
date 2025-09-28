const CategoiesLoading = () => {
  return (
    <div className="w-50 hidden md:block">
      <div className="sticky top-23 bg-white rounded-md shadow">
        <p className="text-lg font-semibold px-4 py-2">Danh mục</p>
        <div className="px-4 pb-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-10 bg-zinc-100 rounded-sm animate-pulse mb-1"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoiesLoading;
