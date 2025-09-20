import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, User, Scissors } from 'lucide-react';

interface CheckoutSummaryProps {
  type: 'products' | 'services';
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ type }) => {
  const cart = useSelector((state: RootState) => state.cart);
  const booking = useSelector((state: RootState) => state.booking);

  // Common function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  if (type === 'products') {
    return (
      <Card className="border border-primary/10 shadow-soft bg-gradient-subtle">
        <CardHeader className="pb-3">
          <CardTitle className="text-h3 font-light flex items-center justify-between">
            <span>Order Summary</span>
            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
              {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="max-h-64 overflow-auto pr-2 space-y-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-start">
                    <div
                      className="h-12 w-12 rounded-md bg-cover bg-center mr-3 shadow-soft"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
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
          </div>
        </CardContent>
      </Card>
    );
  }

  // For services
  return (
    <Card className="border border-primary/10 shadow-soft bg-gradient-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="text-h3 font-light flex items-center justify-between">
          <span>Booking Summary</span>
          <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
            {booking.totalDuration} min
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {booking.selectedStylist && (
            <div className="flex items-start">
              <User className="h-5 w-5 mr-2 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Your Stylist</p>
                <div className="flex items-center mt-1">
                  <div
                    className="h-10 w-10 rounded-full bg-cover bg-center mr-2 shadow-soft"
                    style={{ backgroundImage: `url(${booking.selectedStylist.image})` }}
                  ></div>
                  <span>{booking.selectedStylist.name}</span>
                </div>
              </div>
            </div>
          )}

          {booking.selectedDate && booking.selectedTime && (
            <div className="flex items-start">
              <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Your Appointment</p>
                <p>
                  {format(new Date(booking.selectedDate), 'EEEE, MMMM d, yyyy')}
                  <br />
                  {booking.selectedTime}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <Scissors className="h-5 w-5 mr-2 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Your Services</p>
              <div className="space-y-2 mt-1">
                {booking.selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between">
                    <div>
                      <p>{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.duration} mins</p>
                    </div>
                    <p className="font-medium">{formatPrice(service.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Total Duration</p>
              <p>{booking.totalDuration} minutes</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary">{formatPrice(booking.totalPrice)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;