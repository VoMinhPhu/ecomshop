import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LoadingUpdateCategory = () => {
  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-56" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-65 md:h-16 w-full rounded-md" />
            </div>
          </div>

          <Skeleton className="h-10 w-full md:w-40 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingUpdateCategory;
