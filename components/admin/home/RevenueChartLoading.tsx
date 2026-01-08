'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader } from 'lucide-react';

export default function RevenueChartLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-4 mt-5">
      <Card className="pt-0 col-span-2 animate-pulse">
        <CardHeader className="border-b py-5 space-y-2">
          <div className="h-5 w-40 bg-zinc-200 rounded" />
          <div className="h-4 w-64 bg-muted rounded" />
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>

      <Card className="animate-pulse">
        <CardHeader className="items-center pb-4 space-y-2">
          <div className="h-5 w-32 bg-zinc-200 rounded" />
          <div className="h-4 w-48 bg-muted rounded" />
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <Loader className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    </div>
  );
}
