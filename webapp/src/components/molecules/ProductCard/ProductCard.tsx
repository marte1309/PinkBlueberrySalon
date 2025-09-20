import React from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  brand: string;
  inStock: boolean;
  onAddToCart: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  salePrice,
  rating,
  reviewCount,
  image,
  brand,
  inStock,
  onAddToCart,
  onAddToWishlist,
  className,
}) => {
  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <Card className={cn(
      'group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105',
      !inStock && 'opacity-75',
      className
    )}>
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-caption font-medium">
            -{discountPercentage}%
          </div>
        )}
        
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
          <span className="text-caption font-medium">{rating}</span>
          <span className="text-caption text-muted-foreground">({reviewCount})</span>
        </div>

        {onAddToWishlist && (
          <button 
            onClick={() => onAddToWishlist(id)}
            className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          >
            <Heart className="w-4 h-4" />
          </button>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-surface/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-h3 font-medium text-muted-foreground">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div>
          <p className="text-caption text-muted-foreground mb-1">{brand}</p>
          <h3 className="text-h3 font-medium text-foreground mb-2">{name}</h3>
          <p className="text-muted-foreground text-small leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {salePrice ? (
              <>
                <span className="text-h3 font-medium text-accent">${salePrice}</span>
                <span className="text-small text-muted-foreground line-through">${price}</span>
              </>
            ) : (
              <span className="text-h3 font-medium text-foreground">${price}</span>
            )}
          </div>
        </div>

        <Button 
          onClick={() => onAddToCart(id)}
          disabled={!inStock}
          variant={inStock ? "luxury" : "outline"}
          size="lg"
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </Card>
  );
};