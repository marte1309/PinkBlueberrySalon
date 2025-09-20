import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store/store';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrashIcon, MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  maxHeight?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  showCheckoutButton = true,
  maxHeight = '400px',
}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  if (cart.items.length === 0) {
    return (
      <Card className="border border-primary/10 shadow-soft bg-gradient-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="text-h3 font-light">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="bg-muted/50 rounded-full p-6 mb-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">
            Add items to your cart to continue shopping
          </p>
          <Button asChild variant="luxury">
            <Link to="/products">Browse Products</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Card className="border border-primary/10 shadow-soft bg-gradient-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="text-h3 font-light flex items-center justify-between">
          <span>Your Cart</span>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
            {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          style={{ maxHeight }}
          className="overflow-y-auto pr-1 space-y-4"
        >
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-3 p-2 hover:bg-muted/50 rounded-lg transition-all">
              <div
                className="h-20 w-20 rounded-md bg-cover bg-center flex-shrink-0 shadow-soft"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="flex-grow space-y-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.category.replace('-', ' ')}
                </p>
                <p className="text-sm font-medium">{formatPrice(item.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <Input
                    className="w-10 h-7 text-center p-0 border-none text-sm bg-muted/50"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        handleQuantityChange(item.id, value);
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">{formatPrice(cart.total)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-medium">{formatPrice(cart.total * 0.16)}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary">
            {formatPrice(cart.total + (cart.total * 0.16))}
          </span>
        </div>
      </CardContent>
      {showCheckoutButton && (
        <CardFooter>
          <Button asChild className="w-full bg-gradient-luxury" size="lg">
            <Link to="/checkout/products">
              Proceed to Checkout
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartSummary;