import { Skeleton } from '@/components/ui/skeleton';

const LoadingUpdate = () => {
  return (
    <div className="bg-white rounded-lg border m-4 p-6">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="border-2 border-dashed border-blue-300 rounded-lg h-48 flex items-center justify-center">
            <Skeleton className="h-6 w-64" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-5 w-16 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-28 mb-2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <div className="grid md:grid-cols-2 gap-4 h-40">
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="bg-gray-50 rounded border p-4">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="h-5 w-20 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
};
export default LoadingUpdate;
