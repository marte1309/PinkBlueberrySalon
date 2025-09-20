import React from 'react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/logos/pink-blueberry-logo.svg';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'logo' | 'dots';
}

export const Loader: React.FC<LoaderProps> = ({ 
  className,
  size = 'md',
  variant = 'logo'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  if (variant === 'circle') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-2 border-b-transparent border-secondary animate-spin animation-delay-500"></div>
      </div>
    );
  }

  if (variant === 'logo') {
    return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
        <div className="relative">
          <img 
            src={logoSvg} 
            alt="Loading" 
            className={cn(
              'animate-bounce-slow',
              sizeClasses[size]
            )} 
          />
          <div className={cn(
            'absolute -inset-4 rounded-full bg-gradient-watercolor opacity-30 blur-md animate-pulse',
            {
              '-inset-2': size === 'sm',
              '-inset-4': size === 'md',
              '-inset-6': size === 'lg',
            }
          )}></div>
        </div>
        <div className="mt-4 flex gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex gap-1', className)}>
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '300ms' }}></div>
        <div className="w-3 h-3 rounded-full bg-accent animate-pulse" style={{ animationDelay: '600ms' }}></div>
      </div>
    );
  }

  return null;
};
