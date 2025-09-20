import React from 'react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/logos/pink-blueberry-logo.svg';

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
        <img 
          src={logoSvg} 
          alt="Pink Blueberry Logo" 
          className={cn(
            'animate-float',
            {
              'w-8 h-8': size === 'sm',
              'w-10 h-10': size === 'md',
              'w-12 h-12': size === 'lg',
              'w-16 h-16': size === 'xl',
            }
          )} 
        />
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
      <img 
        src={logoSvg} 
        alt="Pink Blueberry Logo" 
        className={cn(
          'animate-float',
          {
            'w-8 h-8': size === 'sm',
            'w-10 h-10': size === 'md',
            'w-12 h-12': size === 'lg',
            'w-16 h-16': size === 'xl',
          }
        )} 
      />
      <span className={baseClasses}>
        Pink Blueberry
      </span>
    </div>
  );
};