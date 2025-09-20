import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { CartSummary } from '@/components/organisms/CartSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { BookNowButton } from '@/components/molecules/BookNowButton';

export const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-h1 font-light text-center mb-8">
          <span className="bg-gradient-luxury bg-clip-text text-transparent">Shopping Cart</span>
        </h1>

        <div className="flex justify-start mb-8">
          <Button asChild variant="outline">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartSummary maxHeight="none" />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gradient-subtle rounded-xl border border-primary/10 p-6 shadow-soft">
              <h3 className="text-h3 font-light mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                <span>Want a makeover?</span>
              </h3>
              
              <p className="text-muted-foreground mb-4">
                Check out our salon services for a complete beauty experience. Our skilled stylists are ready to transform your look.
              </p>
              
              <div className="flex justify-center">
                <BookNowButton text="Book Appointment" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;