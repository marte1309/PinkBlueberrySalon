import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LogOut, Loader2 } from 'lucide-react';

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "luxury" | "watercolor" | "hero";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  onlyIcon?: boolean;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = "outline",
  size = "default",
  onlyIcon = false,
  className = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      
      // Llamar al servicio de autenticación para logout
      await authService.logout();
      
      // Despachar acción de logout para actualizar el estado
      dispatch(logout());
      
      // Mostrar toast de éxito
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Redirigir al usuario a la página de inicio
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      
      // Aunque falle la llamada a la API, seguimos haciendo logout localmente
      dispatch(logout());
      
      toast({
        title: "Logged out",
        description: "You have been logged out of the application.",
      });
      
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          {!onlyIcon && "Logging out..."}
        </>
      ) : (
        <>
          <LogOut className={`h-4 w-4 ${onlyIcon ? "" : "mr-2"}`} />
          {!onlyIcon && "Sign Out"}
        </>
      )}
    </Button>
  );
};
