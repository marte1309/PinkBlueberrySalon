import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '@/store/store';
import { ShoppingBag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export const MiniCart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  if (cart.itemCount === 0) {
    return (
      <Button variant="ghost" size="icon" className="relative" asChild>
        <Link to="/products">
          <ShoppingBag className="h-5 w-5" />
          <span className="sr-only">Shopping cart</span>
        </Link>
      </Button>
    );
  }

  // Format price helper
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          <Badge
            className="absolute -top-1 -right-1 px-1.5 py-0.5 h-5 min-w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs"
            variant="default"
          >
            {cart.itemCount}
          </Badge>
          <span className="sr-only">Shopping cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 mr-4" align="end">
        <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cart.items.length > 0 ? (
          <>
            <ScrollArea className="h-[250px]">
              <DropdownMenuGroup className="p-2 space-y-2">
                {cart.items.map((item) => (
                  <DropdownMenuItem key={item.id} className="flex justify-between cursor-default p-0">
                    <div className="flex items-center p-2">
                      <div
                        className="h-12 w-12 rounded-md bg-cover bg-center mr-3 shadow-soft"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex justify-between">
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </ScrollArea>
            <DropdownMenuSeparator />
            <div className="p-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <Button className="w-full bg-gradient-luxury" asChild>
                <Link to="/checkout/products">Checkout</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            Your cart is empty
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MiniCart;