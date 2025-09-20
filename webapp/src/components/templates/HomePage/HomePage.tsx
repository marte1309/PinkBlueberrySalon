import React from 'react';
import { Hero } from '@/components/organisms/Hero/Hero';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ServiceCard } from '@/components/molecules/ServiceCard/ServiceCard';
import { ProductCard } from '@/components/molecules/ProductCard/ProductCard';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Scissors, 
  Palette, 
  Sparkles, 
  Award, 
  Users,
  Star,
  ArrowRight,
  Gift,
  Crown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addService } from '@/store/slices/bookingSlice';
import { addToCart } from '@/store/slices/cartSlice';

// Mock data - in production this would come from API
const featuredServices = [
  {
    id: 'luxury-cut-style',
    name: 'Luxury Cut & Style',
    description: 'Precision cuts tailored to your unique style and face shape, finished with professional styling.',
    duration: 90,
    price: 165,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    category: 'cut' as const
  },
  {
    id: 'watercolor-highlights',
    name: 'Watercolor Highlights',
    description: 'Our signature blended coloring technique creating seamless, natural-looking highlights.',
    duration: 180,
    price: 285,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    category: 'color' as const
  },
  {
    id: 'blueberry-treatment',
    name: 'Blueberry Revival Treatment',
    description: 'Antioxidant-rich deep conditioning treatment that restores shine and vitality to damaged hair.',
    duration: 75,
    price: 125,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=400&h=300&fit=crop',
    category: 'treatment' as const
  }
];

const featuredProducts = [
  {
    id: 'luxury-shampoo',
    name: 'Blueberry Antioxidant Shampoo',
    description: 'Gentle cleansing formula enriched with blueberry extract and vitamins for healthy, vibrant hair.',
    price: 48,
    salePrice: 38,
    rating: 4.7,
    reviewCount: 124,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=400&h=400&fit=crop',
    brand: 'Pink Blueberry',
    inStock: true
  },
  {
    id: 'styling-cream',
    name: 'Watercolor Styling Cream',
    description: 'Medium-hold styling cream that provides natural texture and movement without weighing hair down.',
    price: 35,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    brand: 'Pink Blueberry',
    inStock: true
  }
];

const rewardsTiers = [
  { tier: 'Bronze', points: '0-499', perks: 'Birthday rewards, exclusive offers' },
  { tier: 'Silver', points: '500-999', perks: 'Priority booking, 5% discount' },
  { tier: 'Gold', points: '1000-2499', perks: 'Complimentary treatments, 10% discount' },
  { tier: 'Platinum', points: '2500+', perks: 'VIP access, 15% discount, concierge service' }
];

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleBookService = (serviceId: string) => {
    const service = featuredServices.find(s => s.id === serviceId);
    if (service) {
      dispatch(addService(service));
      // Navigate to booking page - would use router here
      window.location.href = '/booking';
    }
  };

  const handleAddToCart = (productId: string) => {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.image,
        category: 'hair-care' as const
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Featured Services */}
        <section className="py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Scissors className="w-4 h-4 mr-2" />
                Signature Services
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Experience Our 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Artistry</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Each service is crafted with precision and passion, using premium products and techniques
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredServices.map((service) => (
        <ServiceCard
          key={service.id}
          {...service}
          category={service.category}
          onBook={handleBookService}
          className="animate-fade-in"
        />
              ))}
            </div>

            <div className="text-center">
              <Link to="/services">
                <Button variant="luxury" size="lg">
                  View All Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                <Award className="w-4 h-4 mr-2" />
                Excellence
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Why Choose Pink Blueberry
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Crown,
                  title: 'Luxury Experience',
                  description: 'Immerse yourself in our premium salon environment designed for ultimate relaxation and pampering.'
                },
                {
                  icon: Users,
                  title: 'Expert Stylists',
                  description: 'Our team of certified professionals brings decades of experience and ongoing education to every service.'
                },
                {
                  icon: Sparkles,
                  title: 'Premium Products',
                  description: 'We use only the finest hair care products, many exclusively formulated for our salon.'
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="p-8 text-center bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-h3 font-medium text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                <Gift className="w-4 h-4 mr-2" />
                Exclusive Products
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Take Home The 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Experience</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Professional-grade products to maintain your beautiful results at home
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                  className="animate-fade-in"
                />
              ))}
            </div>

            <div className="text-center">
              <Link to="/products">
                <Button variant="watercolor" size="lg">
                  Shop All Products
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Rewards Program */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20">
                <Star className="w-4 h-4 mr-2" />
                Rewards Program
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Blueberry 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Rewards</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto mb-12">
                Earn points with every visit and unlock exclusive perks as you reach new tiers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {rewardsTiers.map((tier, index) => (
                <Card 
                  key={tier.tier}
                  className={`p-6 text-center relative overflow-hidden ${
                    tier.tier === 'Platinum' ? 'bg-gradient-luxury text-primary-foreground shadow-luxury' : 'bg-gradient-subtle shadow-soft'
                  } hover:shadow-gold transition-all duration-300 hover:scale-105`}
                >
                  <div className="relative z-10">
                    <h3 className={`text-h3 font-medium mb-2 ${tier.tier === 'Platinum' ? 'text-primary-foreground' : 'text-foreground'}`}>
                      {tier.tier}
                    </h3>
                    <p className={`text-small mb-4 ${tier.tier === 'Platinum' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {tier.points} points
                    </p>
                    <p className={`text-small leading-relaxed ${tier.tier === 'Platinum' ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                      {tier.perks}
                    </p>
                  </div>
                  {tier.tier === 'Platinum' && (
                    <div className="absolute top-2 right-2">
                      <Crown className="w-6 h-6 text-luxury-gold animate-glow" />
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link to="/rewards">
                <Button variant="luxury" size="lg">
                  Join Rewards Program
                  <Gift className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};