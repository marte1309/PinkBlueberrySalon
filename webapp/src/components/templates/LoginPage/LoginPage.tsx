import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Lock, Mail, CheckCircle, Key, Loader2 } from 'lucide-react';

// Define form schema with validation
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      // Dispatch login start action to show loading state
      dispatch(loginStart());

      console.log("Login form submitted with values:", values);

      // Call the auth service to login
      const response = await authService.login({
        email: values.email,
        password: values.password,
      });

      console.log("Login API response:", response);

      // Store remember me preference
      if (values.rememberMe) {
        localStorage.setItem("rememberEmail", values.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      // Dispatch login success with user and token
      dispatch(loginSuccess({
        user: response.user,
        token: response.token,
      }));
      
      // Verificar que se almacenaron correctamente
      console.log("After login success - localStorage state:", {
        user: localStorage.getItem("user"),
        token: localStorage.getItem("token"),
      });
      
      // Show success toast
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      // Redirect to homepage after successful login
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      // Log error details
      console.error("Login error:", error);
      
      // Dispatch login failure
      dispatch(loginFailure());

      // Show error toast with message from API service
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Populate email from localStorage if "remember me" was checked previously
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      form.setValue("email", rememberedEmail);
      form.setValue("rememberMe", true);
    }
    
    // Log initial localStorage state for debugging
    console.log("Initial localStorage state:", {
      rememberEmail: localStorage.getItem("rememberEmail"),
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token"),
    });
  }, [form]);

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
                  Welcome Back
                </Badge>
                <h1 className="text-h1 font-light text-foreground mb-6">
                  Sign 
                  <span className="bg-gradient-luxury bg-clip-text text-transparent"> In</span>
                </h1>
                <p className="text-h3 text-muted-foreground">
                  Access your Pink Blueberry account for bookings, rewards, and personalized experiences.
                </p>
              </div>

              {/* Login form */}
              <div className="bg-card p-8 rounded-xl shadow-soft hover:shadow-luxury transition-all duration-300">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              <Input className="pl-10" type="password" placeholder="Enter your password" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      {/* Remember Me */}
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                                id="rememberMe" 
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel htmlFor="rememberMe" className="font-normal text-sm">
                                Remember me
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      {/* Forgot Password Link */}
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    
                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      variant="luxury" 
                      size="lg" 
                      className="w-full mt-6"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
                
                <Separator className="my-8" />
                
                {/* Social Logins (optional) */}
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground">Or continue with</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" className="w-full">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                        <path fill="none" d="M1 1h22v22H1z" />
                      </svg>
                      Google
                    </Button>
                    
                    <Button variant="outline" size="lg" className="w-full">
                      <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-muted-foreground">
                    Don't have an account? <Link to="/register" className="text-primary hover:underline font-semibold">Sign Up</Link>
                  </p>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="mt-12 space-y-6">
                <div className="bg-card p-6 rounded-lg shadow-soft">
                  <h3 className="text-h3 font-medium mb-3 text-center">Why Create an Account?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Easy Booking:</span> Quick appointment scheduling with your favorite stylists.
                      </p>
                    </li>
                    
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Exclusive Rewards:</span> Earn points with every service and product purchase.
                      </p>
                    </li>
                    
                    <li className="flex items-start">
                      <CheckCircle className="text-primary mt-1 mr-2 h-5 w-5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Personalized Experience:</span> Get recommendations tailored to your preferences.
                      </p>
                    </li>
                  </ul>
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
