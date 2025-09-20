import React, { useState } from 'react';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { ServiceCard } from '@/components/molecules/ServiceCard/ServiceCard';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Scissors, 
  Palette, 
  Sparkles, 
  Award,
  Star,
  Calendar,
  ArrowRight,
  Search,
  Clock,
  Heart,
  PaintBucket,
  Droplet,
  Leaf,
  MessageCircle
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addService } from '@/store/slices/bookingSlice';
import { Input } from '@/components/ui/input';

// Service data organized by categories
const serviceData = {
  haircuts: [
    {
      id: 'luxury-cut-style',
      name: 'Luxury Cut & Style',
      description: 'Precision cuts tailored to your unique style and face shape, finished with professional styling.',
      duration: 90,
      price: 165,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
      category: 'cut'
    },
    {
      id: 'express-cut',
      name: 'Express Cut',
      description: 'Quick, efficient haircut for those on the go while maintaining our signature quality and precision.',
      duration: 45,
      price: 95,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
      category: 'cut'
    },
    {
      id: 'mens-grooming',
      name: 'Men\'s Complete Grooming',
      description: 'Comprehensive men\'s cut and style with optional beard trim and hot towel treatment.',
      duration: 60,
      price: 115,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
      category: 'cut'
    },
    {
      id: 'kids-cut',
      name: 'Children\'s Styling',
      description: 'Gentle, patient approach to children\'s haircuts in our kid-friendly styling area.',
      duration: 45,
      price: 75,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1629189858155-9eb2649ec778?w=400&h=300&fit=crop',
      category: 'cut'
    }
  ],
  coloring: [
    {
      id: 'watercolor-highlights',
      name: 'Watercolor Highlights',
      description: 'Our signature blended coloring technique creating seamless, natural-looking highlights.',
      duration: 180,
      price: 285,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop',
      category: 'color'
    },
    {
      id: 'full-color',
      name: 'Luxe Full Color',
      description: 'Complete color transformation using premium, low-ammonia formulas that protect hair integrity.',
      duration: 150,
      price: 225,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop',
      category: 'color'
    },
    {
      id: 'balayage',
      name: 'Artisan Balayage',
      description: 'Hand-painted highlights creating a natural, sun-kissed gradient effect personalized to your style.',
      duration: 210,
      price: 315,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=300&fit=crop',
      category: 'color'
    },
    {
      id: 'fashion-color',
      name: 'Couture Fashion Color',
      description: 'Vibrant, creative color expressions from subtle pastel tones to bold, vivid hues.',
      duration: 240,
      price: 350,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1481066717225-cbc2937ff99d?w=400&h=300&fit=crop',
      category: 'color'
    }
  ],
  treatments: [
    {
      id: 'blueberry-treatment',
      name: 'Blueberry Revival Treatment',
      description: 'Antioxidant-rich deep conditioning treatment that restores shine and vitality to damaged hair.',
      duration: 75,
      price: 125,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=400&h=300&fit=crop',
      category: 'treatment'
    },
    {
      id: 'keratin-smooth',
      name: 'Keratin Smoothing Therapy',
      description: 'Advanced keratin treatment that reduces frizz and enhances manageability for up to 3 months.',
      duration: 180,
      price: 375,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=300&fit=crop',
      category: 'treatment'
    },
    {
      id: 'scalp-facial',
      name: 'Luxury Scalp Facial',
      description: 'Rejuvenating scalp treatment using exfoliation and massage to promote hair health and growth.',
      duration: 60,
      price: 110,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
      category: 'treatment'
    },
    {
      id: 'bond-repair',
      name: 'Bond Reconstruction',
      description: 'Intensive repair treatment that rebuilds damaged hair bonds for stronger, healthier hair.',
      duration: 90,
      price: 145,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=300&fit=crop',
      category: 'treatment'
    }
  ],
  styling: [
    {
      id: 'formal-styling',
      name: 'Formal Event Styling',
      description: 'Elegant, long-lasting styles for weddings, galas, and special events, including consultations.',
      duration: 120,
      price: 175,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1549236177-f9b0031756eb?w=400&h=300&fit=crop',
      category: 'styling'
    },
    {
      id: 'bridal-styling',
      name: 'Bridal Hair Design',
      description: 'Comprehensive bridal hair styling with trial session and day-of perfection.',
      duration: 150,
      price: 325,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=300&fit=crop',
      category: 'styling'
    },
    {
      id: 'blowout',
      name: 'Signature Blowout',
      description: 'Our premium blowout service creates smooth, voluminous styles that last for days.',
      duration: 60,
      price: 95,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=300&fit=crop',
      category: 'styling'
    },
    {
      id: 'extensions',
      name: 'Luxury Extensions',
      description: 'Premium quality hair extensions meticulously applied for natural-looking length and volume.',
      duration: 240,
      price: 850,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1596635058195-8fc35cd410d5?w=400&h=300&fit=crop',
      category: 'styling'
    }
  ]
};

const servicePackages = [
  {
    id: 'wedding-package',
    name: 'Complete Wedding Package',
    description: 'Comprehensive bridal styling including trial, day-of styling, and party services for the entire bridal party.',
    includes: ['Bridal trial styling', 'Day-of bridal styling', 'Up to 4 bridesmaids styling', 'Mother of bride styling', 'Blueberry treatment for bride'],
    price: 1250,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop'
  },
  {
    id: 'transformation',
    name: 'Complete Transformation',
    description: 'Full hair makeover including luxury cut, premium color service, and revitalizing treatments.',
    includes: ['Luxury consultation', 'Couture color service', 'Precision haircut', 'Bond reconstruction treatment', 'Styling lesson'],
    price: 575,
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=300&fit=crop'
  },
  {
    id: 'vip-monthly',
    name: 'VIP Monthly Membership',
    description: 'Monthly maintenance program for those who want to keep their style perfect all year round.',
    includes: ['Monthly haircut and style', 'Bi-monthly color touch-up', 'Weekly blowout', 'Monthly treatment', '15% off all products'],
    price: 425,
    image: 'https://images.unsplash.com/photo-1501699169021-3759ee435d66?w=400&h=300&fit=crop'
  }
];

export const ServicesPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter services based on search query
  const filterServices = (services) => {
    if (!searchQuery) return services;
    return services.filter(
      service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get all services for the "all" tab
  const getAllServices = () => {
    return [
      ...serviceData.haircuts,
      ...serviceData.coloring,
      ...serviceData.treatments,
      ...serviceData.styling
    ];
  };

  const getDisplayedServices = () => {
    switch(activeTab) {
      case 'haircuts':
        return filterServices(serviceData.haircuts);
      case 'coloring':
        return filterServices(serviceData.coloring);
      case 'treatments':
        return filterServices(serviceData.treatments);
      case 'styling':
        return filterServices(serviceData.styling);
      case 'all':
      default:
        return filterServices(getAllServices());
    }
  };

  const handleBookService = (serviceId: string) => {
    const service = getAllServices().find(s => s.id === serviceId);
    if (service) {
      dispatch(addService(service));
      // Navigate to booking page - would use router here
      window.location.href = '/booking';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Scissors className="w-4 h-4 mr-2" />
                Our Services
              </Badge>
              <h1 className="text-h1 font-light text-foreground mb-6">
                Experience Artisanal 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Hair Services</span>
              </h1>
              <p className="text-h3 text-muted-foreground mb-8">
                Each service is crafted with precision and passion, using premium products and techniques to create your perfect look
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button variant="luxury" size="lg" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
                <Button variant="watercolor" size="lg" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-h2 font-light text-foreground">
                Our <span className="bg-gradient-luxury bg-clip-text text-transparent">Services</span>
              </h2>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-64 lg:w-80 rounded-full bg-muted"
                />
              </div>
            </div>

            {/* Service Categories */}
            <Tabs defaultValue="all" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap justify-start mb-8 bg-transparent">
                <TabsTrigger
                  value="all"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'all' 
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold' 
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  All Services
                </TabsTrigger>
                <TabsTrigger
                  value="haircuts"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'haircuts'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Scissors className="w-4 h-4 mr-2" />
                  Haircuts
                </TabsTrigger>
                <TabsTrigger
                  value="coloring"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'coloring'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <PaintBucket className="w-4 h-4 mr-2" />
                  Coloring
                </TabsTrigger>
                <TabsTrigger
                  value="treatments"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'treatments'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Droplet className="w-4 h-4 mr-2" />
                  Treatments
                </TabsTrigger>
                <TabsTrigger
                  value="styling"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'styling'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Styling
                </TabsTrigger>
              </TabsList>

              {/* Services Grid */}
              <TabsContent value={activeTab} className="mt-0">
                {getDisplayedServices().length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {getDisplayedServices().map((service) => (
                      <ServiceCard
                        key={service.id}
                        {...service}
                        category={service.category}
                        onBook={handleBookService}
                        className="animate-fade-in"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-h3 text-muted-foreground mb-4">No services found matching "{searchQuery}"</p>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Service Packages Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                <Star className="w-4 h-4 mr-2" />
                Premium Packages
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Signature <span className="bg-gradient-luxury bg-clip-text text-transparent">Collections</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Comprehensive service packages designed to provide the ultimate salon experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {servicePackages.map((pkg) => (
                <Card key={pkg.id} className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                      <span className="text-caption font-medium">Popular</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-h3 font-medium text-foreground mb-2">{pkg.name}</h3>
                      <p className="text-muted-foreground text-small leading-relaxed mb-4">{pkg.description}</p>
                      
                      <div className="bg-muted rounded-lg p-4 mb-4">
                        <h4 className="text-small font-medium text-foreground mb-2">Package Includes:</h4>
                        <ul className="space-y-1">
                          {pkg.includes.map((item, index) => (
                            <li key={index} className="flex items-start gap-2 text-small text-muted-foreground">
                              <span className="w-4 h-4 mt-1 bg-accent/20 text-accent flex items-center justify-center rounded-full">
                                <svg viewBox="0 0 8 8" className="w-4 h-4 fill-current">
                                  <path d="M2.3 6.7L0.5 4.9L1.1 4.3L2.3 5.5L6.9 0.9L7.5 1.5L2.3 6.7Z" />
                                </svg>
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Multiple sessions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-foreground font-medium text-body">${pkg.price}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleBookService(pkg.id)}
                      variant="luxury"
                      size="lg"
                      className="w-full"
                    >
                      Book Package
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Service Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                <Award className="w-4 h-4 mr-2" />
                Our Process
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                The Pink Blueberry <span className="bg-gradient-luxury bg-clip-text text-transparent">Experience</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Our approach to creating the perfect look for every client
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
              {[
                {
                  step: 1,
                  title: 'Consultation',
                  description: 'In-depth discussion about your style goals, hair health, and personal preferences.',
                  icon: MessageCircle
                },
                {
                  step: 2,
                  title: 'Personalization',
                  description: 'Customized service plan tailored to your unique features, lifestyle, and maintenance preferences.',
                  icon: Heart
                },
                {
                  step: 3,
                  title: 'Artisanal Service',
                  description: 'Expert execution using premium techniques and products for exceptional results.',
                  icon: Sparkles
                },
                {
                  step: 4,
                  title: 'Home Care',
                  description: 'Personalized product recommendations and styling education for maintaining your look.',
                  icon: Leaf
                }
              ].map((process, index) => {
                const Icon = process.icon;
                return (
                  <div key={process.step} className="relative">
                    <Card className="p-8 text-center bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105 z-10 relative h-full">
                      <div className="relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center text-primary-foreground font-medium shadow-gold">
                          {process.step}
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="w-14 h-14 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                          <Icon className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <h3 className="text-h3 font-medium text-foreground mb-4">{process.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{process.description}</p>
                      </div>
                    </Card>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                        <ArrowRight className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Book Now CTA */}
        <section className="py-16 bg-gradient-luxury text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-h1 font-light mb-6">Ready to Transform Your Look?</h2>
              <p className="text-h3 opacity-90 mb-8">
                Schedule your appointment today and experience the Pink Blueberry difference
              </p>
              <Button 
                variant="watercolor" 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90"
              >
                Book Your Appointment
                <Calendar className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};