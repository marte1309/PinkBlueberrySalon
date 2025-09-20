import React, { useState } from 'react';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Calendar,
  Clock,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  CheckCircle2,
  Clock3,
  Heart
} from 'lucide-react';
import { useForm } from 'react-hook-form';

// Contact information
const contactInfo = {
  address: '123 Luxury Lane, Beverly Hills, CA 90210',
  phone: '+1 (800) 555-PINK',
  email: 'hello@pinkblueberry.com',
  hours: [
    { days: 'Monday - Friday', hours: '9:00 AM - 8:00 PM' },
    { days: 'Saturday', hours: '9:00 AM - 6:00 PM' },
    { days: 'Sunday', hours: '10:00 AM - 5:00 PM' }
  ],
  social: [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/pinkblueberrysalon' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/pinkblueberrysalon' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/pinkblueberry' },
    { name: 'Youtube', icon: Youtube, url: 'https://youtube.com/pinkblueberrysalon' }
  ]
};

// FAQ data
const faqData = [
  {
    question: "How far in advance should I book my appointment?",
    answer: "We recommend booking at least 1-2 weeks in advance for regular services and 4-6 weeks in advance for special occasions, bridal services, or extensive color treatments to ensure availability with your preferred stylist."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours notice for cancellations. Late cancellations or no-shows may be subject to a fee of 50% of the service cost to respect our stylists' time. Emergencies are considered on a case-by-case basis."
  },
  {
    question: "Do you offer consultations before services?",
    answer: "Yes, we offer complimentary 15-minute consultations for all new clients and for existing clients considering a significant change. Extended consultations may be booked for a small fee which is credited toward your service."
  },
  {
    question: "What brands of products do you use and sell?",
    answer: "We use premium, professional-grade products including Oribe, Kerastase, R+Co, Olaplex, and our own exclusive Pink Blueberry signature line. All products are available for purchase in our salon and online shop."
  },
  {
    question: "Do you have a loyalty or rewards program?",
    answer: "Yes! Our Blueberry Rewards program offers points on all services and product purchases, exclusive member-only discounts, birthday treats, and early access to new products and special events. Ask our front desk for details."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, Apple Pay, Google Pay, cash, and Pink Blueberry gift cards. We also offer Klarna and Affirm for installment payments on qualifying services and purchases."
  }
];

// Form types
type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<ContactFormData>();
  
  const onSubmit = (data: ContactFormData) => {
    // In a real application, this would send the form data to a backend service
    console.log('Form submitted:', data);
    setFormSubmitted(true);
    reset();
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h1 className="text-h1 font-light text-foreground mb-6">
                We'd Love to 
                <span className="bg-gradient-luxury bg-clip-text text-transparent"> Hear From You</span>
              </h1>
              <p className="text-h3 text-muted-foreground mb-8">
                Have questions, feedback, or ready to book? Reach out to our team for a personalized response.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button 
                  variant="luxury" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => window.location.href = '/booking'}
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Button>
                <Button 
                  variant="watercolor" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-light text-foreground">
                Contact <span className="bg-gradient-luxury bg-clip-text text-transparent">Options</span>
              </h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto mt-4">
                Choose the most convenient way to connect with us
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Phone Card */}
              <Card className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-h3 font-medium text-foreground mb-4">Call Us</h3>
                <p className="text-muted-foreground mb-6">We're available during salon hours for quick inquiries and bookings</p>
                <p className="text-h3 font-medium text-foreground">{contactInfo.phone}</p>
              </Card>

              {/* Email Card */}
              <Card className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                  <Mail className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-h3 font-medium text-foreground mb-4">Email Us</h3>
                <p className="text-muted-foreground mb-6">Send us a message anytime and we'll respond within 24 hours</p>
                <p className="text-h3 font-medium text-foreground">{contactInfo.email}</p>
              </Card>

              {/* Visit Card */}
              <Card className="group overflow-hidden bg-gradient-subtle shadow-soft hover:shadow-luxury transition-all duration-300 hover:scale-105 p-8 text-center">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6 shadow-gold">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-h3 font-medium text-foreground mb-4">Visit Us</h3>
                <p className="text-muted-foreground mb-6">Drop by our salon for a consultation or to shop our products</p>
                <p className="text-h3 font-medium text-foreground">{contactInfo.address}</p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Hours and Map Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hours */}
              <div>
                <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
                  <Clock className="w-4 h-4 mr-2" />
                  Salon Hours
                </Badge>
                <h2 className="text-h2 font-light text-foreground mb-6">
                  When To <span className="bg-gradient-luxury bg-clip-text text-transparent">Find Us</span>
                </h2>
                <p className="text-body text-muted-foreground mb-8">
                  Visit us during our operating hours or book an appointment online anytime
                </p>
                
                <div className="space-y-6">
                  {contactInfo.hours.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-luxury rounded-full flex-shrink-0 flex items-center justify-center shadow-gold mt-1">
                        <Clock3 className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-h3 font-medium text-foreground">{item.days}</h3>
                        <p className="text-muted-foreground">{item.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="luxury" 
                    size="lg" 
                    onClick={() => window.location.href = '/booking'}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      window.open('https://maps.google.com/?q=' + encodeURIComponent(contactInfo.address));
                    }}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
              
              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-luxury h-[400px] relative">
                {/* In a real application, this would be a Google Maps iframe */}
                <div className="absolute inset-0 bg-gradient-watercolor opacity-10"></div>
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Beverly+Hills,CA&zoom=14&size=800x600&key=YOUR_API_KEY&markers=color:pink%7C34.0736,-118.4004"
                  alt="Map showing Pink Blueberry salon location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
                  <h3 className="text-h3 font-medium text-foreground mb-1">Pink Blueberry Salon</h3>
                  <p className="text-small text-muted-foreground">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and FAQ Section */}
        <section className="py-16" id="contact-form">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact & FAQ
              </Badge>
              <h2 className="text-h2 font-light text-foreground mb-4">
                How Can We <span className="bg-gradient-luxury bg-clip-text text-transparent">Help You?</span>
              </h2>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Send us a message or check our frequently asked questions
              </p>
            </div>

            <Tabs defaultValue="contact" className="mb-12" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex justify-center mb-8 bg-transparent">
                <TabsTrigger
                  value="contact"
                  className={`rounded-full px-5 py-2 mr-3 ${
                    activeTab === 'contact' 
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold' 
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Us
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className={`rounded-full px-5 py-2 mr-3 ${
                    activeTab === 'faq'
                      ? 'bg-gradient-luxury text-primary-foreground shadow-gold'
                      : 'bg-surface text-muted-foreground hover:bg-muted hover:text-foreground shadow-soft'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <Card className="p-8 shadow-soft">
                    <h3 className="text-h3 font-medium text-foreground mb-6">Send Us a Message</h3>
                    
                    {formSubmitted ? (
                      <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
                        <CheckCircle2 className="w-12 h-12 mx-auto text-success mb-4" />
                        <h4 className="text-h3 font-medium text-foreground mb-2">Message Sent!</h4>
                        <p className="text-muted-foreground mb-4">
                          Thank you for reaching out. Our team will get back to you within 24 hours.
                        </p>
                        <Button 
                          variant="outline" 
                          onClick={() => setFormSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-small font-medium text-foreground">
                            Full Name <span className="text-primary">*</span>
                          </label>
                          <Input 
                            id="name"
                            placeholder="Your Name"
                            className={errors.name ? "border-destructive" : ""}
                            {...register("name", { required: true })}
                          />
                          {errors.name && (
                            <p className="text-small text-destructive">Please enter your name</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-small font-medium text-foreground">
                              Email <span className="text-primary">*</span>
                            </label>
                            <Input 
                              id="email"
                              type="email"
                              placeholder="Your Email"
                              className={errors.email ? "border-destructive" : ""}
                              {...register("email", { 
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                              })}
                            />
                            {errors.email && (
                              <p className="text-small text-destructive">Please enter a valid email</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-small font-medium text-foreground">
                              Phone Number
                            </label>
                            <Input 
                              id="phone"
                              placeholder="Your Phone"
                              {...register("phone")}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-small font-medium text-foreground">
                            Subject <span className="text-primary">*</span>
                          </label>
                          <Input 
                            id="subject"
                            placeholder="Message Subject"
                            className={errors.subject ? "border-destructive" : ""}
                            {...register("subject", { required: true })}
                          />
                          {errors.subject && (
                            <p className="text-small text-destructive">Please enter a subject</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="block text-small font-medium text-foreground">
                            Message <span className="text-primary">*</span>
                          </label>
                          <Textarea 
                            id="message"
                            placeholder="Your Message"
                            rows={5}
                            className={errors.message ? "border-destructive" : ""}
                            {...register("message", { required: true })}
                          />
                          {errors.message && (
                            <p className="text-small text-destructive">Please enter your message</p>
                          )}
                        </div>
                        
                        <Button 
                          type="submit" 
                          variant="luxury"
                          size="lg"
                          className="w-full"
                        >
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    )}
                  </Card>
                  
                  {/* Contact Info Card */}
                  <div className="space-y-8">
                    <Card className="p-8 bg-gradient-subtle shadow-soft">
                      <h3 className="text-h3 font-medium text-foreground mb-6">Reach Out Directly</h3>
                      
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Phone</h4>
                            <p className="text-muted-foreground">{contactInfo.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Email</h4>
                            <p className="text-muted-foreground">{contactInfo.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex-shrink-0 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Address</h4>
                            <p className="text-muted-foreground">{contactInfo.address}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-8 bg-gradient-subtle shadow-soft">
                      <h3 className="text-h3 font-medium text-foreground mb-6">Connect With Us</h3>
                      <p className="text-muted-foreground mb-6">
                        Follow us on social media for the latest styles, promotions, and behind-the-scenes content
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                        {contactInfo.social.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <a 
                              key={index}
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-12 h-12 bg-gradient-luxury rounded-full flex items-center justify-center shadow-gold transition-transform hover:scale-110"
                            >
                              <Icon className="w-6 h-6 text-primary-foreground" />
                            </a>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="mt-0">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-h3 font-medium text-center text-foreground mb-8">
                    Frequently Asked Questions
                  </h3>
                  
                  <div className="space-y-6">
                    {faqData.map((faq, index) => (
                      <Card key={index} className="p-6 shadow-soft hover:shadow-luxury transition-all duration-300">
                        <h4 className="text-h3 font-medium text-foreground mb-4">
                          {faq.question}
                        </h4>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-6">
                      Can't find what you're looking for? Send us a message and we'll get back to you.
                    </p>
                    <Button 
                      variant="luxury"
                      size="lg"
                      onClick={() => setActiveTab('contact')}
                    >
                      Contact Us
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
                <Heart className="w-4 h-4 mr-2" />
                Client Love
              </Badge>
              <h2 className="text-h1 font-light text-foreground mb-6">
                What Our <span className="bg-gradient-luxury bg-clip-text text-transparent">Clients Say</span>
              </h2>
              <p className="text-h3 text-muted-foreground max-w-2xl mx-auto">
                Discover what makes Pink Blueberry the preferred salon for discerning clients
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Amanda J.",
                  testimonial: "The Pink Blueberry experience is unlike any salon I've ever visited. From the moment you enter, you're treated like royalty. My colorist, Sarah, completely transformed my hair with the watercolor highlights technique - it's the perfect blend of colors that looks completely natural and dimensional.",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop"
                },
                {
                  name: "Michael R.",
                  testimonial: "As someone who's always been apprehensive about salon visits, Pink Blueberry completely changed my perspective. Their men's grooming service is comprehensive and the attention to detail is impressive. The scalp treatment was an unexpected highlight - never thought I'd enjoy that so much!",
                  image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop"
                },
                {
                  name: "Sophia T.",
                  testimonial: "I had my wedding hair done at Pink Blueberry and it was flawless. The trial session helped perfect exactly what I wanted, and on the day itself, my hair stayed perfectly styled through 12 hours of festivities, photographs, and dancing. Worth every penny for that peace of mind!",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-8 shadow-soft hover:shadow-luxury transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-background"
                    />
                    <div>
                      <h3 className="font-medium text-foreground">{testimonial.name}</h3>
                      <div className="flex text-accent mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.testimonial}"</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Book Now CTA */}
        <section className="py-16 bg-gradient-luxury text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-h1 font-light mb-6">Ready for a Luxurious Experience?</h2>
              <p className="text-h3 opacity-90 mb-8">
                Book your appointment today and let our team pamper you
              </p>
              <Button 
                variant="watercolor" 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/booking'}
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