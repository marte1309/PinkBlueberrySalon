import { apiService } from './api';

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
    return apiService.post<AuthResponse>('/auth/login', credentials);
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', data);
  }

  async logout(): Promise<void> {
    return apiService.post<void>('/auth/logout');
  }

  async refreshToken(): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/refresh');
  }

  async forgotPassword(email: string): Promise<void> {
    return apiService.post<void>('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return apiService.post<void>('/auth/reset-password', { token, newPassword });
  }

  async updateProfile(profileData: Partial<RegisterData>): Promise<AuthResponse['user']> {
    return apiService.put<AuthResponse['user']>('/auth/profile', profileData);
  }
}

export const authService = new AuthService();