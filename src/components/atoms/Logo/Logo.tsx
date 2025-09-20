import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'text' | 'icon' | 'full';
}

const sizeClasses = {
  sm: 'text-h3',
  md: 'text-h2', 
  lg: 'text-h1',
  xl: 'text-hero'
};

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md',
  variant = 'full'
}) => {
  const baseClasses = cn(
    'font-light bg-gradient-luxury bg-clip-text text-transparent animate-shimmer',
    sizeClasses[size],
    className
  );

  if (variant === 'icon') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <div className="w-8 h-8 bg-gradient-luxury rounded-full shadow-gold animate-float" />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span className={baseClasses}>
        Pink Blueberry
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="w-8 h-8 bg-gradient-luxury rounded-full shadow-gold animate-float" />
      <span className={baseClasses}>
        Pink Blueberry
      </span>
    </div>
  );
};