import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { Logo } from "@/components/atoms/Logo/Logo";
import { cn } from "@/lib/utils";
import darkLuxurySalon from "@/assets/dark-luxury-salon.jpg";
import logoSvg from "@/assets/logos/pink-blueberry-logo.svg";
import { ArrowDown, CalendarCheck, Sparkles } from "lucide-react";

interface AnimatedHeroProps {
  className?: string;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({ className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulating content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      {/* Background Image with Animated Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={darkLuxurySalon}
          alt="Dark Luxury Salon Interior"
          className={cn(
            "w-full h-full object-cover transition-all duration-1000 ease-in-out",
            isLoaded ? "blur-0 scale-100" : "blur-md scale-105"
          )}
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-90" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,hsla(var(--primary-pink)/0.2)_0%,transparent_80%)] animate-pulse-glow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_100%_100%,hsla(var(--primary-blue)/0.2)_0%,transparent_80%)] animate-pulse-glow animation-delay-500"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(40%_40%_at_0%_100%,hsla(var(--luxury-gold)/0.2)_0%,transparent_80%)] animate-pulse-glow"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      {/* Animated Logo */}
      <div
        className={cn(
          "absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-150"
        )}
      >
        <div className="relative">
          <img
            src={logoSvg}
            alt="Pink Blueberry Logo"
            className="w-32 h-32 md:w-40 md:h-40 animate-float"
          />
          <div className="absolute -inset-6 rounded-full bg-gradient-watercolor opacity-20 blur-lg animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ease-out",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="max-w-5xl mx-auto space-y-12 pt-20">
          {/* Main Headline - with animated reveal */}
          <div className="space-y-8">
            <div className="space-y-4 overflow-hidden">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-foreground leading-tight tracking-wide bg-gradient-luxury bg-clip-text text-transparent animate-shimmer">
                Luxury Beauty
              </h1>
              <h2
                className={cn(
                  "text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight transition-all duration-1000 ease-out delay-200",
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
              >
                <span className="bg-gradient-watercolor bg-clip-text text-transparent">
                  Redefined
                </span>
              </h2>
            </div>

            <p
              className={cn(
                "text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light transition-all duration-1000 ease-out delay-500",
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
            >
              Experience unparalleled beauty treatments in an atmosphere of
              <br className="hidden md:block" />
              pure elegance and sophistication
            </p>
          </div>

          {/* Action Buttons - with animated reveal */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 transition-all duration-1000 ease-out delay-700",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <Link to="/booking">
              <Button variant="hero" size="xl" className="min-w-[220px] group">
                <CalendarCheck className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Book Appointment
              </Button>
            </Link>

            <Link to="/services">
              <Button
                variant="watercolor"
                size="xl"
                className="min-w-[220px] group"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000 ease-out delay-1000",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-bounce" />
          </div>
          <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};
