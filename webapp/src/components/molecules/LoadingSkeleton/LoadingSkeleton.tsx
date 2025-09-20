import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LoadingSkeletonProps {
  type?: 'service' | 'product' | 'content' | 'hero';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'service',
  count = 1,
  className
}) => {
  // Service Card Skeleton
  const ServiceSkeleton = () => (
    <Card className="overflow-hidden bg-gradient-subtle shadow-soft">
      <div className="relative">
        <Skeleton className="w-full h-48" />
        <div className="absolute top-4 right-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Skeleton className="w-20 h-6 rounded-full" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-full h-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-16 h-6" />
        </div>
        <Skeleton className="w-full h-12 rounded-lg" />
      </div>
    </Card>
  );

  // Product Card Skeleton
  const ProductSkeleton = () => (
    <Card className="overflow-hidden bg-gradient-subtle shadow-soft">
      <div className="relative">
        <Skeleton className="w-full aspect-square" />
        <div className="absolute top-4 right-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-full h-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
        <Skeleton className="w-full h-12 rounded-lg" />
      </div>
    </Card>
  );

  // Content Section Skeleton
  const ContentSkeleton = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Skeleton className="w-32 h-8 rounded-full" />
        </div>
        <Skeleton className="w-3/4 h-12 mx-auto" />
        <Skeleton className="w-2/3 h-8 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 bg-gradient-subtle shadow-soft">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-full h-16" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-subtle shadow-soft">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-full h-16" />
          </div>
        </Card>
        <Card className="p-6 bg-gradient-subtle shadow-soft">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-2/3 h-6" />
            <Skeleton className="w-full h-16" />
          </div>
        </Card>
      </div>
    </div>
  );

  // Hero Section Skeleton
  const HeroSkeleton = () => (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-gradient-subtle">
      <div className="absolute inset-0 bg-gradient-watercolor opacity-30 animate-pulse" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-8">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="space-y-6 max-w-2xl mx-auto">
            <Skeleton className="w-full md:w-3/4 h-16 mx-auto" />
            <Skeleton className="w-full md:w-2/3 h-8 mx-auto" />
            <Skeleton className="w-full md:w-1/2 h-6 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Skeleton className="w-40 h-16 rounded-lg" />
            <Skeleton className="w-40 h-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSkeletons = () => {
    const items = [];
    
    for (let i = 0; i < count; i++) {
      if (type === 'service') {
        items.push(<ServiceSkeleton key={i} />);
      } else if (type === 'product') {
        items.push(<ProductSkeleton key={i} />);
      } else if (type === 'content') {
        items.push(<ContentSkeleton key={i} />);
      } else if (type === 'hero') {
        items.push(<HeroSkeleton key={i} />);
      }
    }
    
    return items;
  };

  if (type === 'hero' || type === 'content') {
    return <div className={cn(className)}>{renderSkeletons()}</div>;
  }

  return (
    <div className={cn("grid gap-8", {
      'md:grid-cols-2 lg:grid-cols-3': type === 'service',
      'md:grid-cols-2': type === 'product'
    }, className)}>
      {renderSkeletons()}
    </div>
  );
};