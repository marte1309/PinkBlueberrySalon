import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo/Logo';
import { Button } from '@/components/atoms/Button/Button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Clock,
  Award,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const contactInfo = {
  phone: '(555) 123-PINK',
  email: 'hello@pinkblueberrysalon.com',
  address: '123 Beauty Boulevard, Luxury District, LA 90210',
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/pinkblueberrysalon', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/pinkblueberrysalon', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/pinkblueberrysalon', label: 'Twitter' },
];

const footerLinks = {
  services: [
    { name: 'Hair Cuts & Styling', href: '/services/cuts' },
    { name: 'Hair Coloring', href: '/services/color' },
    { name: 'Hair Treatments', href: '/services/treatments' },
    { name: 'Special Occasions', href: '/services/events' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Stylists', href: '/stylists' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Careers', href: '/careers' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Booking Help', href: '/help/booking' },
    { name: 'Returns & Exchanges', href: '/help/returns' },
    { name: 'FAQ', href: '/help/faq' },
  ],
};

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '8:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 5:00 PM' },
];

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      'bg-gradient-subtle border-t border-border',
      className
    )}>
      {/* Newsletter Section */}
      <div className="border-b border-border bg-gradient-watercolor">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-h2 font-medium text-foreground mb-4">
              Stay Beautiful, Stay Connected
            </h3>
            <p className="text-body text-muted-foreground mb-6">
              Get exclusive offers, beauty tips, and first access to new services and products.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-surface/80 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Button variant="luxury" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1 space-y-6">
            <Logo size="lg" />
            <p className="text-body text-muted-foreground leading-relaxed">
              Where artistry meets luxury. Experience the finest in hair care and beauty services.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-luxury-gold" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-foreground transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-luxury-gold" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-foreground transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-luxury-gold mt-0.5" />
                <span>{contactInfo.address}</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted hover:bg-gradient-luxury rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-gold group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-h3 font-medium text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-h3 font-medium text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Support */}
          <div>
            <h4 className="text-h3 font-medium text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-luxury-gold" />
              Business Hours
            </h4>
            <ul className="space-y-3 mb-6">
              {businessHours.map((schedule) => (
                <li key={schedule.day} className="flex justify-between text-small">
                  <span className="text-muted-foreground">{schedule.day}</span>
                  <span className="text-foreground font-medium">{schedule.hours}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-h3 font-medium text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-small text-muted-foreground">
              <span>© {currentYear} Pink Blueberry Salon. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-accent fill-current" />
                <span>in Los Angeles</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-small">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="w-4 h-4 text-luxury-gold" />
                <span>Licensed & Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};