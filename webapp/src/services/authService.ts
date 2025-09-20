import { apiService } from "./api";
import axios from "axios";
import { handleApiError } from "@/lib/api/errorHandling";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    rewardPoints: number;
  };
  token: string;
}

// Interfaz para la respuesta real del servidor
export interface ApiAuthResponse {
  message: string;
  tokens: {
    idToken: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RegisterResponse {
  message: string;
  userId: string;
  userConfirmed: false;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Llamar al API con las credenciales
      const response = await apiService.post<ApiAuthResponse>(
        "/auth/login",
        credentials
      );

      // Extraer información del token para obtener datos del usuario
      // En un caso real, podrías decodificar el JWT para obtener la información del usuario
      // o hacer una petición adicional al API para obtener los detalles del usuario
      const tokenPayload = this.parseJwt(response.tokens.idToken);

      // Transformar la respuesta al formato esperado por la aplicación
      const authResponse: AuthResponse = {
        user: {
          id: tokenPayload.sub || "",
          email: tokenPayload.email || "",
          firstName: tokenPayload.name ? tokenPayload.name.split(" ")[0] : "",
          lastName: tokenPayload.name
            ? tokenPayload.name.split(" ")[1] || ""
            : "",
          rewardPoints: 0, // Este dato vendría de otro endpoint o estaría en el token
        },
        token: response.tokens.accessToken,
      };

      // También podemos guardar el refresh token para usarlo más tarde
      localStorage.setItem("refreshToken", response.tokens.refreshToken);

      return authResponse;
    } catch (error) {
      throw handleApiError(error, {
        401: "Invalid email or password. Please try again.",
        429: "Too many login attempts. Please try again later.",
      });
    }
  }

  // Función auxiliar para decodificar un JWT
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT token:", error);
      return {};
    }
  }

  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await apiService.post<RegisterResponse>(
        "/auth/register",
        data
      );

      return {
        message: response.message,
        userId: response.userId,
        userConfirmed: response.userConfirmed, // Asumimos que el usuario no está confirmado hasta que verifique su email
      };
    } catch (error) {
      throw handleApiError(error, {
        409: "This email is already registered. Please use a different email or try to login.",
        400: "Please check your information and try again. All required fields must be provided.",
        422: "Password does not meet security requirements. It must contain uppercase, lowercase, numbers and special characters.",
      });
    }
  }

  async logout(): Promise<void> {
    try {
      return await apiService.post<void>("/auth/logout");
    } catch (error) {
      throw handleApiError(error);
    } finally {
      // Siempre eliminamos los tokens del almacenamiento local al cerrar sesión
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiService.post<ApiAuthResponse>("/auth/refresh", {
        refreshToken,
      });

      const tokenPayload = this.parseJwt(response.tokens.idToken);

      const authResponse: AuthResponse = {
        user: {
          id: tokenPayload.sub || "",
          email: tokenPayload.email || "",
          firstName: tokenPayload.name ? tokenPayload.name.split(" ")[0] : "",
          lastName: tokenPayload.name
            ? tokenPayload.name.split(" ")[1] || ""
            : "",
          rewardPoints: 0, // Este dato vendría de otro endpoint
        },
        token: response.tokens.accessToken,
      };

      localStorage.setItem("refreshToken", response.tokens.refreshToken);

      return authResponse;
    } catch (error) {
      throw handleApiError(error, {
        401: "Your session has expired. Please login again.",
      });
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      return await apiService.post<void>("/auth/forgot-password", { email });
    } catch (error) {
      throw handleApiError(error, {
        404: "Email address not found. Please check and try again.",
      });
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      return await apiService.post<void>("/auth/reset-password", {
        token,
        newPassword,
      });
    } catch (error) {
      throw handleApiError(error, {
        400: "Invalid or expired token. Please request a new password reset link.",
        422: "Password does not meet the security requirements.",
      });
    }
  }

  async updateProfile(
    profileData: Partial<RegisterData>
  ): Promise<AuthResponse["user"]> {
    try {
      return await apiService.put<AuthResponse["user"]>(
        "/auth/profile",
        profileData
      );
    } catch (error) {
      throw handleApiError(error, {
        409: "This email is already in use. Please use a different email.",
      });
    }
  }
}

export const authService = new AuthService();
