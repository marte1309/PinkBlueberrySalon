import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { authService, RegisterData } from '@/services/authService';
import { registerStart, registerSuccess, registerFailure } from '@/store/slices/authSlice';

export interface UseRegisterOptions {
  redirectTo?: string;
  showToast?: boolean;
  autoNavigate?: boolean;
}

export const useRegister = (options: UseRegisterOptions = {}) => {
  const {
    redirectTo = '/',
    showToast = true,
    autoNavigate = true,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);
      dispatch(registerStart());

      // Call the register API
      const response = await authService.register(data);

      // Dispatch success action
      dispatch(registerSuccess({
        user: response.user,
        token: response.token,
      }));

      // Show success toast if enabled
      if (showToast) {
        toast({
          title: "Account created!",
          description: "Welcome to Pink Blueberry. You've been successfully registered.",
        });
      }

      // Navigate if enabled
      if (autoNavigate) {
        setTimeout(() => {
          navigate(redirectTo);
        }, 1500);
      }

      return response;
    } catch (err) {
      // Handle error
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      dispatch(registerFailure());

      // Show error toast if enabled
      if (showToast) {
        toast({
          title: "Registration failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
