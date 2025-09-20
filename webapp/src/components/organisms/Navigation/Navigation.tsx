import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo/Logo';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  ShoppingBag, 
  User, 
  Calendar, 
  Sparkles,
  Phone,
  X,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { MiniCart } from '@/components/molecules/MiniCart';
import { UserMenu } from '@/components/molecules/UserMenu';
import { LogoutButton } from '@/components/molecules/LogoutButton';
import { RootState } from '@/store/store';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { name: 'Services', href: '/services', icon: Sparkles },
  { name: 'Products', href: '/products', icon: ShoppingBag },
  { name: 'Book Now', href: '/booking', icon: Calendar },
  { name: 'Contact', href: '/contact', icon: Phone },
];

export const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <nav className={cn(
      'sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-lg shadow-soft border-b border-border',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-body font-medium transition-all duration-200',
                    isActiveRoute(item.href)
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <MiniCart />

            {/* Sustituimos la simple redirección a /account por el UserMenu */}
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <MiniCart />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-subtle">
                <div className="flex items-center justify-between mb-8">
                  <Logo size="sm" />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* User info section for mobile (solo si está autenticado) */}
                {isAuthenticated && user && (
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">{user.firstName} {user.lastName}</span>
                        <span className="text-sm text-muted-foreground">{user.rewardPoints} points</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-lg text-body font-medium transition-all duration-200 w-full',
                          isActiveRoute(item.href)
                            ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  {isAuthenticated ? (
                    <>
                      <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="w-4 h-4 mr-2" />
                          My Account
                        </Button>
                      </Link>
                      <LogoutButton 
                        variant="outline" 
                        size="default" 
                        className="w-full justify-start" 
                      />
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="luxury" className="w-full">
                          Join Now
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};