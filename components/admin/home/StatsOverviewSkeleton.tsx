export default function StatsOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg p-4 border shadow bg-gradient-to-b from-white via-white to-zinc-50">
          <div className="animate-pulse">
            <div className="flex items-center justify-between">
              <div className="h-6 w-28 rounded bg-zinc-200" />
              <div className="h-6 w-16 rounded-lg bg-zinc-200" />
            </div>

            <div className="mt-4 h-10 w-24 rounded bg-zinc-200" />

            <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200" />
            <div className="mt-2 h-3 w-5/6 rounded bg-zinc-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
