import React, { useState } from 'react';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Sparkles, 
  Award,
  Star,
  Search,
  Heart,
  ShieldCheck,
  Leaf,
  CircleDollarSign,
  Truck,
  Package,
  Droplet,
  Filter,
  FlaskRound,
  ChevronDown
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';

// Product data organized by categories
const productData = {
  'hair-care': [
    {
      id: 'blueberry-revival-shampoo',
      name: 'Blueberry Revival Shampoo',
      description: 'Antioxidant-rich shampoo that cleanses while nourishing and protecting hair from environmental damage.',
      price: 38,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
      category: 'hair-care',
      bestSeller: true,
      size: '250ml'
    },
    {
      id: 'blueberry-revival-conditioner',
      name: 'Blueberry Revival Conditioner',
      description: 'Silky conditioner that detangles and hydrates with our signature antioxidant-rich formula.',
      price: 42,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
      category: 'hair-care',
      bestSeller: true,
      size: '250ml'
    },
    {
      id: 'moisture-mask',
      name: 'Intensive Moisture Mask',
      description: 'Deep conditioning treatment that restores hydration and repairs damage for silky, manageable hair.',
      price: 48,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop',
      category: 'hair-care',
      bestSeller: false,
      size: '200ml'
    },
    {
      id: 'scalp-treatment',
      name: 'Scalp Revival Treatment',
      description: 'Exfoliating and soothing treatment that restores scalp health and promotes optimal hair growth.',
      price: 53,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1556229174-5e42a09e40eb?w=400&h=400&fit=crop',
      category: 'hair-care',
      bestSeller: false,
      size: '150ml'
    }
  ],
  'styling': [
    {
      id: 'volume-mousse',
      name: 'Volumizing Cloud Mousse',
      description: 'Lightweight mousse that adds incredible volume and body without stiffness or residue.',
      price: 34,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
      category: 'styling',
      bestSeller: true,
      size: '200ml'
    },
    {
      id: 'texture-spray',
      name: 'Sea Salt Texture Spray',
      description: 'Creates effortless beach waves and adds texture to all hair types without dryness.',
      price: 32,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1597354984706-fac992d9306f?w=400&h=400&fit=crop',
      category: 'styling',
      bestSeller: false,
      size: '150ml'
    },
    {
      id: 'heat-protectant',
      name: 'Thermal Shield Spray',
      description: 'Heat protection up to 450°F while adding shine and reducing frizz during styling.',
      price: 36,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1635440483224-4b778326728a?w=400&h=400&fit=crop',
      category: 'styling',
      bestSeller: false,
      size: '175ml'
    },
    {
      id: 'shine-serum',
      name: 'Glossy Finish Serum',
      description: 'Lightweight serum that adds incredible shine without weighing hair down, while taming frizz.',
      price: 46,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1631730359585-38a4929884c0?w=400&h=400&fit=crop',
      category: 'styling',
      bestSeller: true,
      size: '100ml'
    }
  ],
  'color': [
    {
      id: 'color-protection-shampoo',
      name: 'Color Lock Shampoo',
      description: 'Gentle cleansing formula that preserves color vibrancy while preventing fading and dulling.',
      price: 44,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
      category: 'color',
      bestSeller: true,
      size: '250ml'
    },
    {
      id: 'color-protection-conditioner',
      name: 'Color Lock Conditioner',
      description: 'Color-preserving conditioner that seals the cuticle while providing intense hydration.',
      price: 48,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1620917669809-1af0497965a1?w=400&h=400&fit=crop',
      category: 'color',
      bestSeller: true,
      size: '250ml'
    },
    {
      id: 'purple-shampoo',
      name: 'Violet Toning Shampoo',
      description: 'Neutralizes brassy tones in blonde, silver, and highlighted hair while cleansing gently.',
      price: 42,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
      category: 'color',
      bestSeller: false,
      size: '250ml'
    },
    {
      id: 'color-refresher',
      name: 'Color Refresher Treatment',
      description: 'Temporary color-depositing mask that refreshes faded color between salon visits.',
      price: 52,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?w=400&h=400&fit=crop',
      category: 'color',
      bestSeller: false,
      size: '200ml'
    }
  ],
  'accessories': [
    {
      id: 'luxury-brush',
      name: 'Detangling Brush',
      description: 'Ergonomic brush that gently detangles even the most difficult knots without pulling or breakage.',
      price: 68,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1590759668628-05b0fc34bb70?w=400&h=400&fit=crop',
      category: 'accessories',
      bestSeller: true,
      size: 'Standard'
    },
    {
      id: 'silk-scrunchies',
      name: 'Silk Scrunchies Set',
      description: 'Set of 3 pure mulberry silk scrunchies that prevent breakage and hair creasing.',
      price: 32,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1625055929490-95ec9fba3392?w=400&h=400&fit=crop',
      category: 'accessories',
      bestSeller: false,
      size: 'Set of 3'
    },
    {
      id: 'silk-pillowcase',
      name: 'Mulberry Silk Pillowcase',
      description: 'Reduce friction and prevent hair breakage and frizz with this luxurious silk pillowcase.',
      price: 95,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1652755516427-0619d6df414d?w=400&h=400&fit=crop',
      category: 'accessories',
      bestSeller: true,
      size: 'Standard'
    },
    {
      id: 'microfiber-towel',
      name: 'Microfiber Hair Towel',
      description: 'Super-absorbent towel that cuts drying time in half while reducing frizz and damage.',
      price: 38,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1583306346437-f9552e96d4b0?w=400&h=400&fit=crop',
      category: 'accessories',
      bestSeller: false,
      size: 'One Size'
    }
  ]
};

const productSets = [
  {
    id: 'blueberry-revival-set',
    name: 'Blueberry Revival Complete Set',
    description: 'Full hair care regimen with our signature Blueberry Revival line to cleanse, condition, and treat.',
    includes: ['Blueberry Revival Shampoo', 'Blueberry Revival Conditioner', 'Intensive Moisture Mask', 'Glossy Finish Serum'],
    price: 145,
    saving: 19,
    image: 'https://images.unsplash.com/photo-1629207338695-701db1b037a2?w=400&h=300&fit=crop'
  },
  {
    id: 'color-protection-set',
    name: 'Color Protection System',
    description: 'Complete regimen designed to preserve and protect color-treated hair for long-lasting vibrancy.',
    includes: ['Color Lock Shampoo', 'Color Lock Conditioner', 'Thermal Shield Spray', 'Color Refresher Treatment'],
    price: 165,
    saving: 25,
    image: 'https://images.unsplash.com/photo-1581713889263-fce74d50e15c?w=400&h=300&fit=crop'
  },
  {
    id: 'styling-essentials',
    name: 'Styling Essentials Collection',
    description: 'Everything you need for effortless, salon-quality styling at home with professional results.',
    includes: ['Volumizing Cloud Mousse', 'Sea Salt Texture Spray', 'Thermal Shield Spray', 'Silk Scrunchies Set'],
    price: 125,
    saving: 15,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=300&fit=crop'
  }
];

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter products based on search query
  const filterProducts = (products) => {
    if (!searchQuery) return products;
    return products.filter(
      product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get all products for the "all" tab
  const getAllProducts = () => {
    return [
      ...productData['hair-care'],
      ...productData['styling'],
      ...productData['color'],
      ...productData['accessories']
    ];
  };

  const getDisplayedProducts = () => {
    switch(activeTab) {
      case 'hair-care':
        return filterProducts(productData['hair-care']);
      case 'styling':
        return filterProducts(productData['styling']);
      case 'color':
        return filterProducts(productData['color']);
      case 'accessories':
        return filterProducts(productData['accessories']);
      case 'all':
      default:
        return filterProducts(getAllProducts());
    }
  };

  const handleAddToCart = (productId: string) => {
    const product = getAllProducts().find(p => p.id === productId);
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category as any
      }));
    }
  };

  const handleAddSetToCart = (setId: string) => {
    const set = productSets.find(s => s.id === setId);
    if (set) {
      dispatch(addToCart({
        id: set.id,
        name: set.name,
        price: set.price,
        image: set.image,
        category: 'hair-care' // Default category for sets
      }));
    }
  };

  // Get rating stars
  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3 h-3 fill-accent text-accent" />
        ))}
        {halfStar && (
          <Star key="half" className="w-3 h-3 text-accent" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-3 h-3 text-muted" />
        ))}
        <span className="ml-1 text-small text-muted-foreground">{rating}</span>
      </div>
    );
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
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Our Products
              </Badge>
              <h1 className="text-h1 font-light text-foreground mb-6">
                Salon-Quality 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Hair Products</span>
              </h1>
              <p className="text-h3 text-muted-foreground mb-8">
                Discover our premium collection of professional-grade products, formulated with natural ingredients and advanced technology
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => setActiveTab('all')}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop All Products
                </Button>
                <Button 
                  variant="watercolor" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => window.location.href = '#product-sets'}
                >
                  <Package className="w-5 h-5" />
                  View Product Sets
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-h2 font-light text-foreground">
                Our <span className="bg-gradient-luxury bg-clip-text text-transparent">Products</span>
              </h2>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-64 lg:w-80 rounded-full bg-muted"
                />
              </div>
            </div>

            {/* Product Categories */}
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
                  All Products
                </TabsTrigger>
                <TabsTrigger
                  value="hair-care"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'hair-care'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Droplet className="w-4 h-4 mr-2" />
                  Hair Care
                </TabsTrigger>
                <TabsTrigger
                  value="styling"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'styling'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <FlaskRound className="w-4 h-4 mr-2" />
                  Styling
                </TabsTrigger>
                <TabsTrigger
                  value="color"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'color'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Color
                </TabsTrigger>
                <TabsTrigger
                  value="accessories"
                  className={`rounded-full px-5 py-2 mr-3 mb-2 ${
                    activeTab === 'accessories'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Accessories
                </TabsTrigger>
              </TabsList>

              {/* Products Grid */}
              <TabsContent value={activeTab} className="mt-0">
                {getDisplayedProducts().length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {getDisplayedProducts().map((product) => (
                      <Card
                        key={product.id}
                        className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="relative overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {product.bestSeller && (
                            <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white">
                              <Star className="w-3 h-3 fill-white" />
                              <span className="text-caption font-medium">Best Seller</span>
                            </div>
                          )}
                        </div>

                        <div className="p-6 space-y-4">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-h3 font-medium text-foreground">{product.name}</h3>
                              <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">
                                {product.size}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground text-small leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                            
                            {getRatingStars(product.rating)}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-foreground font-medium text-h3">${product.price}</span>
                            <Button 
                              onClick={() => handleAddToCart(product.id)}
                              variant="luxury"
                              size="sm"
                              className="rounded-full"
                            >
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-h3 text-muted-foreground mb-4">No products found matching "{searchQuery}"</p>
                    <Button variant="outline" onClick={() => setSearchQuery('')}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Product Sets Section */}
        <section id="product-sets" className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                <Package className="w-4 h-4 mr-2" />
                Value Sets
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Curated <span className="bg-gradient-luxury bg-clip-text text-transparent">Collections</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Save on our expertly curated product sets designed for specific hair needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {productSets.map((set) => (
                <Card key={set.id} className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img 
                      src={set.image} 
                      alt={set.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white">
                      <CircleDollarSign className="w-3 h-3" />
                      <span className="text-caption font-medium">Save ${set.saving}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-h3 font-medium text-foreground mb-2">{set.name}</h3>
                      <p className="text-muted-foreground text-small leading-relaxed mb-4">{set.description}</p>
                      
                      <div className="bg-muted rounded-lg p-4 mb-4">
                        <h4 className="text-small font-medium text-foreground mb-2">Set Includes:</h4>
                        <ul className="space-y-1">
                          {set.includes.map((item, index) => (
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
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium text-h3">${set.price}</span>
                        <span className="text-muted-foreground text-small line-through">
                          ${set.price + set.saving}
                        </span>
                      </div>
                      <Button 
                        onClick={() => handleAddSetToCart(set.id)}
                        variant="luxury"
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                <Award className="w-4 h-4 mr-2" />
                Our Promise
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                The Pink Blueberry <span className="bg-gradient-luxury bg-clip-text text-transparent">Difference</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                What sets our products apart from everything else on the market
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Leaf,
                  title: 'Natural Ingredients',
                  description: 'Formulated with clean, naturally-derived ingredients that deliver results without compromise.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Salon Tested',
                  description: 'Every product is rigorously tested by our stylists to ensure professional-grade performance.'
                },
                {
                  icon: Heart,
                  title: 'Cruelty-Free',
                  description: 'We never test on animals and only partner with suppliers who share our ethical standards.'
                },
                {
                  icon: Truck,
                  title: 'Free Shipping',
                  description: 'Enjoy free shipping on all orders over $75, with eco-friendly packaging.'
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="p-8 text-center bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="pt-2">
                      <div className="w-14 h-14 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="text-h3 font-medium text-foreground mb-4">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                Common <span className="bg-gradient-luxury bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about our product formulations and usage
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: 'How are Pink Blueberry products different?',
                  answer: 'Our products combine natural ingredients with cutting-edge formulation science. Each product undergoes extensive testing in our salon before being approved for retail, ensuring professional-grade results at home.'
                },
                {
                  question: 'Are your products safe for color-treated hair?',
                  answer: 'Yes, all of our products are specifically formulated to be color-safe. Our Color Lock line is specially designed to extend color vibrancy and prevent fading between salon visits.'
                },
                {
                  question: 'How long will these products last?',
                  answer: 'Our standard-sized products typically last 2-3 months with regular use. The exact longevity depends on hair length, thickness, and frequency of use.'
                },
                {
                  question: 'Do you offer samples or travel sizes?',
                  answer: 'Yes! We offer travel sizes of our bestselling products, and customers receive complimentary samples with every order over $100.'
                },
                {
                  question: 'What\'s your return policy?',
                  answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely satisfied with your purchase, we\'ll happily provide a full refund or exchange.'
                }
              ].map((faq, index) => (
                <div key={index} className="mb-6">
                  <div className="bg-background rounded-xl shadow-soft hover:shadow-luxury transition-all duration-300 overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-6">
                        <h3 className="text-h3 font-medium text-foreground">{faq.question}</h3>
                        <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="p-6 pt-0 text-muted-foreground">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop Now CTA */}
        <section className="py-16 bg-gradient-luxury text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-h1 font-light mb-6">Ready to Transform Your Hair?</h2>
              <p className="text-h3 opacity-90 mb-8">
                Bring the salon experience home with our professional-grade products
              </p>
              <Button 
                variant="watercolor" 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setActiveTab('all')}
              >
                Shop All Products
                <ShoppingBag className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};