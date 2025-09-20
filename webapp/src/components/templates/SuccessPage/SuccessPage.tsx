import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, Calendar, ArrowRight } from 'lucide-react';

interface SuccessPageProps {
  type: 'order' | 'booking';
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ type }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-subtle rounded-full h-24 w-24 mx-auto mb-8 flex items-center justify-center shadow-soft">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-h1 font-light mb-6">
            <span className="bg-gradient-luxury bg-clip-text text-transparent">
              {type === 'order' ? 'Order Confirmed!' : 'Appointment Booked!'}
            </span>
          </h1>
          
          <p className="text-h3 text-muted-foreground mb-8">
            {type === 'order' 
              ? 'Thank you for your purchase. We have sent a confirmation email with all the details.' 
              : 'Thank you for booking with us. We have sent a confirmation email with all the details.'}
          </p>
          
          <div className="bg-gradient-subtle p-8 rounded-xl border border-primary/10 shadow-soft mb-12">
            <div className="flex items-center justify-center mb-6">
              {type === 'order' 
                ? <ShoppingBag className="h-8 w-8 text-primary mr-3" /> 
                : <Calendar className="h-8 w-8 text-primary mr-3" />}
              <h2 className="text-h2 font-light">
                {type === 'order' ? 'Order #PB' : 'Booking #PB'}
                {Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
              </h2>
            </div>
            
            <p className="mb-6">
              {type === 'order'
                ? 'We will email you shipping information as soon as your order is on its way.'
                : 'We will send a reminder 24 hours before your appointment.'}
            </p>
            
            <div className="text-sm text-muted-foreground">
              <p>
                If you have any questions, please contact us at:
                <br />
                <a href="mailto:hello@pinkblueberry.com" className="text-primary hover:underline">
                  hello@pinkblueberry.com
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-luxury">
              <Link to="/">
                Return Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to={type === 'order' ? '/products' : '/services'}>
                {type === 'order' ? 'Continue Shopping' : 'Explore More Services'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SuccessPage;