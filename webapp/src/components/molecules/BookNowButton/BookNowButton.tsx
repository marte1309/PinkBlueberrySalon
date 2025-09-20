import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { addService } from '@/store/slices/bookingSlice';
import { cn } from '@/lib/utils';

// For direct booking of specific services
export interface ServiceOption {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: 'cut' | 'color' | 'treatment' | 'styling';
}

interface BookNowButtonProps extends Omit<ButtonProps, 'onClick'> {
  service?: ServiceOption;
  showIcon?: boolean;
  text?: string;
}

export const BookNowButton: React.FC<BookNowButtonProps> = ({
  service,
  showIcon = true,
  text = 'Book Now',
  className,
  variant = 'luxury',
  size = 'default',
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (service) {
      dispatch(addService(service));
    }
    navigate('/checkout/services');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={cn(
        showIcon && 'flex items-center gap-2',
        className
      )}
      {...props}
    >
      {showIcon && <Calendar className="h-4 w-4" />}
      {text}
    </Button>
  );
};

export default BookNowButton;