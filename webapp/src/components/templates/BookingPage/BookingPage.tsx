import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Clock, 
  DollarSign, 
  User, 
  Calendar as CalendarIcon,
  X,
  ChevronRight,
  MessageCircle,
  CheckCircle,
  Trash2,
  Star
} from 'lucide-react';
import { RootState } from '@/store/store';
import { 
  removeService,
  selectStylist,
  selectDateTime,
  updateCustomerNotes,
  clearBooking
} from '@/store/slices/bookingSlice';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Mock data for available stylists
const availableStylists = [
  {
    id: 'stylist-1',
    name: 'Alexandra Santos',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    specialties: ['Balayage', 'Precision Cuts', 'Bridal'],
    rating: 4.9
  },
  {
    id: 'stylist-2',
    name: 'Marcus Chen',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop',
    specialties: ['Fashion Color', 'Men\'s Styling', 'Texture'],
    rating: 4.8
  },
  {
    id: 'stylist-3',
    name: 'Zoe Jackson',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    specialties: ['Extensions', 'Curly Hair', 'Color Correction'],
    rating: 5.0
  },
  {
    id: 'stylist-4',
    name: 'David Kim',
    image: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=150&h=150&fit=crop',
    specialties: ['Artistic Cuts', 'Styling', 'Keratin Treatments'],
    rating: 4.9
  }
];

// Mock available time slots
const generateTimeSlots = (date: Date) => {
  const slots = [];
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const startHour = isWeekend ? 9 : 8; // 8am on weekdays, 9am on weekends
  const endHour = isWeekend ? 17 : 19; // 7pm on weekdays, 5pm on weekends
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Make some slots unavailable randomly
      const isAvailable = Math.random() > 0.4;
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        available: isAvailable
      });
    }
  }
  
  return slots;
};

export const BookingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    selectedServices, 
    selectedStylist, 
    selectedDate, 
    selectedTime,
    customerNotes,
    totalDuration, 
    totalPrice 
  } = useSelector((state: RootState) => state.booking);
  
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<{ time: string; available: boolean }[]>([]);

  // Redirect to services page if no services selected
  useEffect(() => {
    if (selectedServices.length === 0) {
      navigate('/services');
    }
  }, [selectedServices, navigate]);

  // Update date object when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setSelectedDateObj(new Date(selectedDate));
    }
  }, [selectedDate]);

  // Generate available slots when date changes
  useEffect(() => {
    if (selectedDateObj) {
      const slots = generateTimeSlots(selectedDateObj);
      setAvailableSlots(slots);
    }
  }, [selectedDateObj]);

  const handleRemoveService = (serviceId: string) => {
    dispatch(removeService(serviceId));
  };

  const handleSelectStylist = (stylist: typeof availableStylists[0]) => {
    dispatch(selectStylist(stylist));
    setActiveStep(3);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDateObj(date);
    dispatch(selectDateTime({ 
      date: date.toISOString(), 
      time: selectedTime || '' 
    }));
  };

  const handleSelectTime = (time: string) => {
    dispatch(selectDateTime({ 
      date: selectedDate || new Date().toISOString(), 
      time 
    }));
    setActiveStep(4);
  };

  const handleUpdateNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateCustomerNotes(e.target.value));
  };

  const handleConfirmBooking = () => {
    // In a real app, you would submit the booking to an API here
    // For now, just navigate to the success page
    navigate('/booking-success');
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-8">
            <h2 className="text-h2 font-light">
              Selected <span className="bg-gradient-luxury bg-clip-text text-transparent">Services</span>
            </h2>
            
            {selectedServices.map(service => (
              <Card key={service.id} className="p-6 shadow-soft hover:shadow-luxury transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-h3 font-medium text-foreground mb-2">{service.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-small text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>${service.price}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveService(service.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            ))}
            
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mt-8 p-6 bg-muted rounded-lg">
              <div>
                <p className="text-small text-muted-foreground">Total Time</p>
                <div className="flex items-center gap-1 text-h3 font-medium text-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{totalDuration} min</span>
                </div>
              </div>
              <div>
                <p className="text-small text-muted-foreground">Total Price</p>
                <div className="flex items-center gap-1 text-h3 font-medium text-foreground">
                  <DollarSign className="w-5 h-5" />
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => navigate('/services')}>
                Add More Services
              </Button>
              <Button variant="luxury" onClick={() => setActiveStep(2)}>
                Continue
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-h2 font-light">
              Choose Your <span className="bg-gradient-luxury bg-clip-text text-transparent">Stylist</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableStylists.map(stylist => (
                <Card 
                  key={stylist.id} 
                  className={cn(
                    "overflow-hidden cursor-pointer shadow-soft transition-all duration-300 hover:shadow-luxury hover:scale-105",
                    selectedStylist?.id === stylist.id && "ring-2 ring-primary shadow-luxury"
                  )}
                  onClick={() => handleSelectStylist(stylist)}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={stylist.image} 
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                      <span className="text-caption font-medium">{stylist.rating}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-h3 font-medium text-foreground mb-2">{stylist.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {stylist.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary" className="bg-secondary/10 text-secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="luxury" className="w-full" onClick={() => handleSelectStylist(stylist)}>
                      Choose Stylist
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setActiveStep(1)}>
                Back
              </Button>
              {selectedStylist && (
                <Button variant="luxury" onClick={() => setActiveStep(3)}>
                  Continue
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-8">
            <h2 className="text-h2 font-light">
              Select a <span className="bg-gradient-luxury bg-clip-text text-transparent">Date & Time</span>
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-6 shadow-soft">
                <h3 className="text-h3 font-medium mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Select Date
                </h3>
                <div className="calendar-container">
                  {/* In a real implementation, use a date picker component like react-day-picker */}
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-muted-foreground text-small font-medium py-2">
                        {day}
                      </div>
                    ))}
                    
                    {/* This is just a dummy calendar - in a real implementation use a proper calendar component */}
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = new Date();
                      day.setDate(day.getDate() + i - day.getDay());
                      const isSelected = selectedDateObj?.toDateString() === day.toDateString();
                      const isPast = day < new Date(new Date().setHours(0,0,0,0));
                      
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "aspect-square rounded-md flex items-center justify-center text-small",
                            isPast ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed" : 
                            isSelected ? "bg-gradient-luxury text-primary-foreground shadow-gold" : 
                            "bg-background hover:bg-muted cursor-pointer"
                          )}
                          onClick={() => !isPast && handleSelectDate(day)}
                        >
                          {day.getDate()}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {selectedDateObj && (
                  <div className="mt-4 p-3 bg-muted rounded-md text-center">
                    Selected: <span className="font-medium">{format(selectedDateObj, 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                )}
              </Card>
              
              <Card className={cn("p-6 shadow-soft", !selectedDateObj && "opacity-70 pointer-events-none")}>
                <h3 className="text-h3 font-medium mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Select Time
                </h3>
                
                {selectedDateObj ? (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
                      {availableSlots.map((slot) => (
                        <div 
                          key={slot.time}
                          className={cn(
                            "p-3 rounded-md text-center text-small font-medium transition-all",
                            slot.available ? 
                              selectedTime === slot.time ?
                                "bg-gradient-luxury text-primary-foreground shadow-gold" : 
                                "bg-background hover:bg-muted cursor-pointer" :
                              "bg-muted/50 text-muted-foreground line-through opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => slot.available && handleSelectTime(slot.time)}
                        >
                          {slot.time}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center text-small text-muted-foreground">
                      All times shown are in your local timezone
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Please select a date first
                  </div>
                )}
              </Card>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setActiveStep(2)}>
                Back
              </Button>
              {selectedTime && (
                <Button variant="luxury" onClick={() => setActiveStep(4)}>
                  Continue
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-h2 font-light">
              Review & <span className="bg-gradient-luxury bg-clip-text text-transparent">Confirm</span>
            </h2>
            
            <Card className="shadow-soft p-6 space-y-6">
              <h3 className="text-h3 font-medium border-b pb-2">Booking Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-small font-medium text-muted-foreground mb-2">Selected Services</h4>
                  <div className="space-y-2">
                    {selectedServices.map(service => (
                      <div key={service.id} className="flex justify-between">
                        <span>{service.name}</span>
                        <span>${service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-small font-medium text-muted-foreground mb-2">Stylist</h4>
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedStylist?.image} 
                      alt={selectedStylist?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{selectedStylist?.name}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-small font-medium text-muted-foreground mb-2">Date & Time</h4>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedDateObj ? format(selectedDateObj, 'EEEE, MMMM d, yyyy') : 'Not selected'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="text-small font-medium text-muted-foreground mb-2">Notes for Stylist (Optional)</h4>
                  <Textarea
                    placeholder="Any special requests or information for your stylist..."
                    value={customerNotes}
                    onChange={handleUpdateNotes}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="shadow-soft p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-small text-muted-foreground">Total</p>
                  <div className="text-h2 font-light text-foreground">${totalPrice}</div>
                </div>
                <Button variant="luxury" size="lg" onClick={handleConfirmBooking}>
                  Confirm Booking
                  <CheckCircle className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </Card>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setActiveStep(3)}>
                Back
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Calendar className="w-4 h-4 mr-2" />
              Booking Process
            </Badge>
            <h1 className="text-h1 font-light text-foreground mb-6">
              Book Your <span className="bg-gradient-luxury bg-clip-text text-transparent">Appointment</span>
            </h1>
          </div>
          
          {/* Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {[
                { step: 1, title: 'Services' },
                { step: 2, title: 'Stylist' },
                { step: 3, title: 'Date & Time' },
                { step: 4, title: 'Confirm' },
              ].map((step, index, array) => (
                <React.Fragment key={step.step}>
                  <div 
                    className={cn(
                      "flex flex-col items-center",
                      activeStep > step.step ? "cursor-pointer" : ""
                    )}
                    onClick={() => activeStep > step.step && setActiveStep(step.step)}
                  >
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-small font-medium mb-2 transition-all",
                        activeStep === step.step ? "bg-gradient-luxury text-primary-foreground shadow-gold" :
                        activeStep > step.step ? "bg-success text-primary-foreground" :
                        "bg-muted text-muted-foreground"
                      )}
                    >
                      {activeStep > step.step ? <CheckCircle className="w-5 h-5" /> : step.step}
                    </div>
                    <div className={cn(
                      "text-small font-medium",
                      activeStep === step.step ? "text-primary" :
                      activeStep > step.step ? "text-success" :
                      "text-muted-foreground"
                    )}>
                      {step.title}
                    </div>
                  </div>
                  
                  {index < array.length - 1 && (
                    <div 
                      className={cn(
                        "w-12 md:w-24 h-1 rounded",
                        activeStep > index + 1 ? "bg-success" : "bg-muted"
                      )}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {renderStepContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};