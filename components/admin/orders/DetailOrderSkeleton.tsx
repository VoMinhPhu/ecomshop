import { Skeleton } from '@/components/ui/skeleton';

export default function DetailOrderSkeleton() {
  return (
    <>
      <div className="px-2 overflow-hidden max-h-80">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start gap-2 my-3">
            <Skeleton className="h-20 w-20 rounded-md shrink-0" />
            <div className="space-y-2 max-w-64 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="flex-1 flex justify-end mr-3">
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-3 pt-1.5 px-2">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="md:min-w-70 min-w-max flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-sm shrink-0" />
              <Skeleton className="h-5 w-28" />
            </div>
            <Skeleton className="h-5 w-40 ml-2" />
          </div>
        ))}

        <div className="border-t border-border flex justify-between py-3 mt-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32 mx-1" />
        </div>
      </div>
    </>
  );
}
