import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils";
import darkLuxurySalon from "@/assets/dark-luxury-salon.jpg";

interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={darkLuxurySalon}
          alt="Dark Luxury Salon Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-luxury-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Main Headline - Matching Reference Style */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-foreground leading-tight tracking-wide">
                Luxury
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Experience unparalleled beauty treatments in an atmosphere of
              <br className="hidden md:block" />
              pure elegance and sophistication
            </p>
          </div>

          {/* Action Buttons - Matching Reference Style */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link to="/booking">
              <Button variant="hero" size="xl" className="min-w-[220px]">
                Book Appointment
              </Button>
            </Link>

            <Link to="/services">
              <Button variant="watercolor" size="xl" className="min-w-[220px]">
                View Services
              </Button>
            </Link>
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
