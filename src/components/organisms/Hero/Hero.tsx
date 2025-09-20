import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import salonHero from '@/assets/salon-hero.jpg';

interface HeroProps {
  className?: string;
}

const stats = [
  { icon: Star, label: 'Five-Star Reviews', value: '2,500+' },
  { icon: Award, label: 'Years of Excellence', value: '15+' },
  { icon: Users, label: 'Happy Clients', value: '10K+' },
  { icon: Calendar, label: 'Services Completed', value: '50K+' },
];

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center overflow-hidden',
      className
    )}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={salonHero}
          alt="Pink Blueberry Salon Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-watercolor opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/20 via-transparent to-surface/20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-luxury rounded-full opacity-60 animate-float" />
      <div className="absolute bottom-32 right-16 w-12 h-12 bg-gradient-primary rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-luxury-gold rounded-full opacity-40 animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge className="bg-surface/90 text-foreground border-primary/20 backdrop-blur-sm px-6 py-2 text-body font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-luxury-gold" />
              Luxury Hair & Beauty Experience
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-hero font-light text-foreground leading-tight">
              Transform Your Beauty 
              <span className="block bg-gradient-luxury bg-clip-text text-transparent animate-shimmer">
                With Artistic Excellence
              </span>
            </h1>
            
            <p className="text-h3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the artistry of premium hair care and styling at our luxury salon. 
              Where watercolor dreams meet blueberry-fresh results.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/booking">
              <Button variant="hero" size="xl">
                <Calendar className="w-6 h-6" />
                Book Your Appointment
              </Button>
            </Link>
            
            <Link to="/services">
              <Button variant="watercolor" size="xl">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12">
            <p className="text-small text-muted-foreground mb-6">Trusted by thousands of satisfied clients</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 shadow-soft hover:shadow-gold transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-8 h-8 text-luxury-gold mx-auto mb-3" />
                    <div className="text-h2 font-light text-foreground mb-1">{stat.value}</div>
                    <div className="text-caption text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Missing import
import { Sparkles } from 'lucide-react';