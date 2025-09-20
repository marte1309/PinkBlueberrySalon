import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigation } from '@/components/organisms/Navigation/Navigation';
import { Footer } from '@/components/organisms/Footer/Footer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock, Mail, CheckCircle } from 'lucide-react';

// Define form schema with validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "Password must include uppercase, lowercase, number, and special character.",
  }),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
  marketingOptIn: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      marketingOptIn: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      // Here you would normally send the registration data to your API
      console.log("Registration form submitted:", values);
      
      // Show success toast
      toast({
        title: "Account created successfully!",
        description: "Welcome to Pink Blueberry Salon!",
      });
      
      // Redirect to homepage after successful registration
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              {/* Page header */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <User className="w-4 h-4 mr-2" />
                  Join Our Community
                </Badge>
                <h1 className="text-h1 font-light text-foreground mb-6">
                  Create Your 
                  <span className="bg-gradient-luxury bg-clip-text text-transparent"> Account</span>
                </h1>
                <p className="text-h3 text-muted-foreground">
                  Join the Pink Blueberry experience and unlock exclusive rewards, easy booking, and personalized recommendations.
                </p>
              </div>

              {/* Registration form */}
              <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-luxury transition-all duration-300">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Last Name */}
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="youremail@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="password" placeholder="Create a strong password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground mt-2">
                            Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                          </p>
                        </FormItem>
                      )}
                    />
                    
                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="password" placeholder="Confirm your password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Terms & Conditions */}
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="terms" 
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="terms" className="font-normal">
                              I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* Marketing Opt-In */}
                    <FormField
                      control={form.control}
                      name="marketingOptIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="marketing" 
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="marketing" className="font-normal">
                              I would like to receive promotional emails and updates (optional)
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      variant="luxury" 
                      size="lg" 
                      className="w-full mt-8"
                    >
                      Create Account
                    </Button>
                  </form>
                </Form>
                
                <Separator className="my-8" />
                
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
                  </p>
                </div>
              </div>
              
              {/* Benefits Section */}
              <div className="mt-12 space-y-6">
                <h3 className="text-h3 font-medium text-center">Benefits of Registration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card p-4 rounded-lg shadow-soft hover:shadow-luxury transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="text-primary mr-2 h-5 w-5" />
                      <h4 className="font-medium">Easy Booking</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Schedule appointments with your preferred stylist in seconds.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg shadow-soft hover:shadow-luxury transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="text-primary mr-2 h-5 w-5" />
                      <h4 className="font-medium">Rewards Program</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Earn points with every visit and redeem for exclusive services.
                    </p>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg shadow-soft hover:shadow-luxury transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="text-primary mr-2 h-5 w-5" />
                      <h4 className="font-medium">Special Offers</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get access to member-only promotions and early product releases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
