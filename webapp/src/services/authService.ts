import { apiService } from './api';
import axios from 'axios';
import { handleApiError } from '@/lib/api/errorHandling';

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

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await apiService.post<AuthResponse>('/auth/login', credentials);
    } catch (error) {
      throw handleApiError(error, {
        401: 'Invalid email or password. Please try again.',
        429: 'Too many login attempts. Please try again later.'
      });
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      return await apiService.post<AuthResponse>('/auth/register', data);
    } catch (error) {
      throw handleApiError(error, {
        409: 'This email is already registered. Please use a different email or try to login.',
        400: 'Please check your information and try again. All required fields must be provided.',
        422: 'Password does not meet security requirements. It must contain uppercase, lowercase, numbers and special characters.'
      });
    }
  }

  async logout(): Promise<void> {
    try {
      return await apiService.post<void>('/auth/logout');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      return await apiService.post<AuthResponse>('/auth/refresh');
    } catch (error) {
      throw handleApiError(error, {
        401: 'Your session has expired. Please login again.'
      });
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      return await apiService.post<void>('/auth/forgot-password', { email });
    } catch (error) {
      throw handleApiError(error, {
        404: 'Email address not found. Please check and try again.'
      });
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      return await apiService.post<void>('/auth/reset-password', { token, newPassword });
    } catch (error) {
      throw handleApiError(error, {
        400: 'Invalid or expired token. Please request a new password reset link.',
        422: 'Password does not meet the security requirements.'
      });
    }
  }

  async updateProfile(profileData: Partial<RegisterData>): Promise<AuthResponse['user']> {
    try {
      return await apiService.put<AuthResponse['user']>('/auth/profile', profileData);
    } catch (error) {
      throw handleApiError(error, {
        409: 'This email is already in use. Please use a different email.'
      });
    }
  }
}

export const authService = new AuthService();