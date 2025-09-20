import React from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Card } from '@/components/ui/card';
import { Clock, DollarSign, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  rating: number;
  image: string;
  category: string;
  onBook: (serviceId: string) => void;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  duration,
  price,
  rating,
  image,
  category,
  onBook,
  className,
}) => {
  return (
    <Card className={cn(
      'group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105',
      className
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
          <span className="text-caption font-medium">{rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-caption font-medium">
          {category}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-h3 font-medium text-foreground mb-2">{name}</h3>
          <p className="text-muted-foreground text-small leading-relaxed">{description}</p>
        </div>

        <div className="flex items-center justify-between text-muted-foreground text-small">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-foreground font-medium text-body">${price}</span>
          </div>
        </div>

        <Button 
          onClick={() => onBook(id)}
          variant="luxury"
          size="lg"
          className="w-full"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};