import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Loader2, CheckCircle, Key, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define form schema with validation
const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "Password must include uppercase, lowercase, number and special character.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const token = searchParams.get('token');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Check if token is valid on mount
  React.useEffect(() => {
    if (!token) {
      setInvalidToken(true);
    }
  }, [token]);

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!token) {
      setInvalidToken(true);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Call the auth service to reset password
      await authService.resetPassword(token, values.password);
      
      // Show success state
      setIsSuccess(true);
      
      // Show success toast
      toast({
        title: "Password reset successful!",
        description: "Your password has been updated. You can now log in with your new password.",
      });
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      // Check if token is invalid
      if (error instanceof Error && error.message.includes('Invalid or expired token')) {
        setInvalidToken(true);
      } else {
        // Show error toast with message from API service
        toast({
          title: "Password reset failed",
          description: error instanceof Error ? error.message : "There was an error resetting your password. Please try again.",
          variant: "destructive",
        });
      }
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
                  Password Reset
                </Badge>
                <h1 className="text-h1 font-light text-foreground mb-6">
                  Reset 
                  <span className="bg-gradient-luxury bg-clip-text text-transparent"> Password</span>
                </h1>
                <p className="text-h3 text-muted-foreground">
                  {isSuccess 
                    ? "Your password has been reset successfully."
                    : invalidToken
                      ? "Invalid or expired reset link."
                      : "Create a new, strong password for your account."
                  }
                </p>
              </div>

              {/* Form */}
              <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-luxury transition-all duration-300">
                {invalidToken ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle className="text-destructive h-6 w-6" />
                    </div>
                    <h3 className="text-h3 font-medium mb-4">Invalid Reset Link</h3>
                    <p className="text-muted-foreground mb-8">
                      The password reset link is invalid or has expired. Please request a new password reset link.
                    </p>
                    <Link to="/forgot-password">
                      <Button variant="luxury" size="lg" className="w-full">
                        Request New Link
                      </Button>
                    </Link>
                  </div>
                ) : isSuccess ? (
                  <div className="text-center py-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-h3 font-medium mb-4">Password Reset Successfully!</h3>
                    <p className="text-muted-foreground mb-8">
                      Your password has been updated. You can now log in with your new password.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      You'll be redirected to the login page in a few seconds.
                    </p>
                    <Link to="/login">
                      <Button variant="luxury" size="lg" className="w-full">
                        Go to Login
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Password */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" type="password" placeholder="Enter a new password" {...field} />
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              Password must be at least 8 characters with uppercase, lowercase, number and special character.
                            </FormDescription>
                            <FormMessage />
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
                                <Input className="pl-10" type="password" placeholder="Confirm your new password" {...field} />
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
                            Resetting...
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
              
              {/* Security Tips */}
              {!invalidToken && !isSuccess && (
                <div className="mt-12">
                  <div className="bg-card p-6 rounded-lg shadow-soft">
                    <h3 className="text-h3 font-medium mb-3 text-center">Password Security Tips</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Use a unique password for each account.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Combine uppercase, lowercase, numbers, and special characters.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Avoid using personal information like birthdays or names.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="text-primary mt-1 mr-2 h-4 w-4 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Consider using a password manager for added security.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
