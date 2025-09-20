import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/atoms/Button/Button';
import { Loader } from '@/components/atoms/Loader/Loader';
import { LoadingSkeleton } from '@/components/molecules/LoadingSkeleton/LoadingSkeleton';
import { ServiceCard } from '@/components/molecules/ServiceCard/ServiceCard';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Sparkles, 
  Code,
  CircleHeart,
  Zap,
  Loader as LoaderIcon,
  RefreshCcw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/logos/pink-blueberry-logo.svg';

export const ShowcasePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeDemo, setActiveDemo] = useState<string>('logo');
  const [isCardLoading, setIsCardLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulate card loading when switching demos
  const handleDemoChange = (demo: string) => {
    setIsCardLoading(true);
    setActiveDemo(demo);
    
    setTimeout(() => {
      setIsCardLoading(false);
    }, 1500);
  };
  
  // Example service for showcase
  const exampleService = {
    id: 'luxury-showcase',
    name: 'Luxury Showcase Service',
    description: 'This is a demonstration of our enhanced service card with beautiful hover effects and animations.',
    duration: 90,
    price: 165,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
    category: 'demo' as const
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader variant="logo" size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Animation Showcase
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Enhanced 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Animations</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Showcasing the new animation components for the Pink Blueberry project
              </p>
            </div>
            
            {/* Demo Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'logo', label: 'Animated Logo', icon: CircleHeart },
                { id: 'buttons', label: 'Enhanced Buttons', icon: Zap },
                { id: 'loaders', label: 'Loading States', icon: LoaderIcon },
                { id: 'cards', label: 'Card Hover Effects', icon: Sparkles }
              ].map((item) => (
                <Button 
                  key={item.id}
                  variant={activeDemo === item.id ? 'luxury' : 'outline'}
                  onClick={() => handleDemoChange(item.id)}
                  className="min-w-[160px]"
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
            
            {/* Demo Content */}
            <Card className="p-8 md:p-12 bg-gradient-subtle shadow-soft">
              {isCardLoading ? (
                <div className="flex justify-center py-12">
                  <Loader variant="logo" size="md" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {activeDemo === 'logo' && (
                    <div className="text-center space-y-8">
                      <h3 className="text-h2 font-medium text-foreground">Animated Logo</h3>
                      <div className="flex justify-center py-12 relative">
                        <div className="relative">
                          <img 
                            src={logoSvg} 
                            alt="Pink Blueberry Logo" 
                            className="w-32 h-32 animate-float"
                          />
                          <div className="absolute -inset-8 rounded-full bg-gradient-watercolor opacity-20 blur-md animate-pulse"></div>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <div className="text-center p-4">
                          <div className="mb-4">
                            <CheckCircle className="w-8 h-8 text-success mx-auto" />
                          </div>
                          <h4 className="text-h3 font-medium text-foreground mb-2">Custom Animation</h4>
                          <p className="text-muted-foreground">The logo floats gently with a smooth animation that adds subtle movement to the page.</p>
                        </div>
                        <div className="text-center p-4">
                          <div className="mb-4">
                            <CheckCircle className="w-8 h-8 text-success mx-auto" />
                          </div>
                          <h4 className="text-h3 font-medium text-foreground mb-2">Glowing Effect</h4>
                          <p className="text-muted-foreground">A subtle gradient glow animates behind the logo to enhance the luxury feel.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeDemo === 'buttons' && (
                    <div className="text-center space-y-8">
                      <h3 className="text-h2 font-medium text-foreground">Enhanced Buttons</h3>
                      
                      <div className="flex flex-wrap justify-center gap-6 py-12">
                        <Button variant="luxury" size="lg" className="min-w-[200px]">
                          <Sparkles className="w-5 h-5 mr-2" />
                          Luxury Button
                        </Button>
                        
                        <Button variant="watercolor" size="lg" className="min-w-[200px]">
                          <Sparkles className="w-5 h-5 mr-2" />
                          Watercolor Button
                        </Button>
                        
                        <Button variant="hero" size="lg" className="min-w-[200px]">
                          <Sparkles className="w-5 h-5 mr-2" />
                          Hero Button
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <div className="text-center p-4">
                          <div className="mb-4">
                            <CheckCircle className="w-8 h-8 text-success mx-auto" />
                          </div>
                          <h4 className="text-h3 font-medium text-foreground mb-2">Sweep Animation</h4>
                          <p className="text-muted-foreground">Buttons now have an elegant sweep animation that creates a wave effect on hover.</p>
                        </div>
                        <div className="text-center p-4">
                          <div className="mb-4">
                            <CheckCircle className="w-8 h-8 text-success mx-auto" />
                          </div>
                          <h4 className="text-h3 font-medium text-foreground mb-2">Smooth Scaling</h4>
                          <p className="text-muted-foreground">Enhanced scale transition provides a more premium interactive feel.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeDemo === 'loaders' && (
                    <div className="text-center space-y-8">
                      <h3 className="text-h2 font-medium text-foreground">Loading Components</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
                        <div className="flex flex-col items-center gap-4">
                          <Loader variant="logo" size="md" />
                          <h4 className="text-h3 font-medium text-foreground">Logo Loader</h4>
                          <p className="text-muted-foreground text-small">Brand-centric loading animation using the logo.</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4">
                          <Loader variant="circle" size="md" />
                          <h4 className="text-h3 font-medium text-foreground">Circle Spinner</h4>
                          <p className="text-muted-foreground text-small">Elegant circular loading animation with brand colors.</p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4">
                          <Loader variant="dots" size="md" />
                          <h4 className="text-h3 font-medium text-foreground">Dots Indicator</h4>
                          <p className="text-muted-foreground text-small">Subtle dots animation for inline loading states.</p>
                        </div>
                      </div>
                      
                      <div className="pt-8 border-t border-border">
                        <h4 className="text-h3 font-medium text-foreground mb-6">Content Loading Skeletons</h4>
                        <LoadingSkeleton type="service" count={3} />
                      </div>
                    </div>
                  )}
                  
                  {activeDemo === 'cards' && (
                    <div className="text-center space-y-8">
                      <h3 className="text-h2 font-medium text-foreground">Card Hover Effects</h3>
                      
                      <div className="py-12 max-w-md mx-auto">
                        <ServiceCard
                          id={exampleService.id}
                          name={exampleService.name}
                          description={exampleService.description}
                          duration={exampleService.duration}
                          price={exampleService.price}
                          rating={exampleService.rating}
                          image={exampleService.image}
                          category={exampleService.category}
                          onBook={() => {}}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        <div className="text-center p-4">
                          <div className="mb-4">
                            <CheckCircle className="w-8 h-8 text-success mx-auto" />
                          </div>
                          <h4 className="text-h3 font-medium text-foreground mb-2">Animated Border</h4>
                          <p className="text-muted-foreground">Cards now feature an animated glowing border on hover.</p>
                        </div>
                        <div className="text-center p-4">
                          <div className="mb-4">
                            <CheckCircle className="w-8 h-8 text-success mx-auto" />
                          </div>
                          <h4 className="text-h3 font-medium text-foreground mb-2">Enhanced Image Zoom</h4>
                          <p className="text-muted-foreground">Image zoom effect with subtle overlay creates a premium interaction.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};