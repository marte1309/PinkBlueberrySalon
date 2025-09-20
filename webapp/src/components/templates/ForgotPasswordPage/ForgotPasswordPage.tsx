import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from '@/services/authService';
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Loader2, CheckCircle, Key } from 'lucide-react';

// Define form schema with validation
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      
      // Call the auth service to request password reset
      await authService.forgotPassword(values.email);
      
      // Show success state
      setIsSuccess(true);
      
      // Show success toast
      toast({
        title: "Reset link sent!",
        description: "Check your email for a link to reset your password.",
      });
    } catch (error) {
      // Show error toast with message from API service
      toast({
        title: "Request failed",
        description: error instanceof Error ? error.message : "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section className="py-16 md:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Page header */}
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Key className="w-4 h-4 mr-2" />
                  Password Recovery
                </Badge>
                <h1 className="text-h1 font-light text-foreground mb-6">
                  Forgot 
                  <span className="bg-gradient-luxury bg-clip-text text-transparent"> Password?</span>
                </h1>
                <p className="text-h3 text-muted-foreground">
                  {isSuccess 
                    ? "Check your email for a link to reset your password."
                    : "Enter your email address below and we'll send you a link to reset your password."
                  }
                </p>
              </div>

              {/* Form */}
              <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-luxury transition-all duration-300">
                {isSuccess ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-h3 font-medium mb-4">Email Sent!</h3>
                    <p className="text-muted-foreground mb-8">
                      We've sent a password reset link to <span className="font-semibold">{form.getValues("email")}</span>. 
                      Please check your inbox and follow the instructions to reset your password.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Didn't receive the email? Check your spam folder or request a new link.
                    </p>
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                        onClick={() => form.handleSubmit(onSubmit)()}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resending...
                          </>
                        ) : (
                          "Resend Email"
                        )}
                      </Button>
                      <Link to="/login">
                        <Button variant="luxury" size="lg" className="w-full">
                          Back to Login
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
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
                      
                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        variant="luxury" 
                        size="lg" 
                        className="w-full mt-6"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Reset Password"
                        )}
                      </Button>
                      
                      <div className="text-center mt-4">
                        <Link to="/login" className="text-primary hover:underline text-sm">
                          Back to Login
                        </Link>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
              
              {/* Help Information */}
              <div className="mt-12">
                <div className="bg-card p-6 rounded-lg shadow-soft">
                  <h3 className="text-h3 font-medium mb-3 text-center">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    If you're still having trouble accessing your account, please contact our customer support.
                  </p>
                  <div className="text-center">
                    <Link to="/contact" className="text-primary hover:underline text-sm font-semibold">
                      Contact Support
                    </Link>
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
