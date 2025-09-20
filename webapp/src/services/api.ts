// Base API configuration with Axios
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://yfpgb7jeyc.execute-api.us-east-1.amazonaws.com";

class APIService {
  private api: AxiosInstance;

  constructor() {
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 15000, // 15 second timeout
    });

    // Request interceptor for adding auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for handling common errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common error cases
        if (error.response) {
          // The request was made and the server responded with a status code
          // outside of the range of 2xx
          console.error(
            "API Error Response:",
            error.response.status,
            error.response.data
          );

          // Handle authentication errors
          if (error.response.status === 401) {
            // Clear token and user data on auth errors
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Optionally redirect to login page
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error("API No Response:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("API Request Error:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: endpoint,
        ...options,
      };

      // Add data based on method
      if (data) {
        if (["post", "put", "patch"].includes(method.toLowerCase())) {
          config.data = data;
        } else if (["get", "delete"].includes(method.toLowerCase())) {
          config.params = data;
        }
      }

      const response: AxiosResponse<T> = await this.api.request<T>(config);
      
      // Para depuración
      console.log(`API ${method.toUpperCase()} ${endpoint} Response:`, response.data);
      
      return response.data;
    } catch (error) {
      console.error(`API ${method} request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>("get", endpoint, params);
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>("post", endpoint, data);
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>("put", endpoint, data);
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>("patch", endpoint, data);
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    return this.request<T>("delete", endpoint, params);
  }
  
  // Método para configurar datos de prueba (solo para desarrollo)
  async mockAuthResponse() {
    // Simulación para probar en desarrollo local
    const mockUser = {
      id: "14a8d448-5081-7052-0d83-d0a65805d10",
      email: "mrd1309+test@gmail.com",
      firstName: "Mariano",
      lastName: "Rodriguez",
      rewardPoints: 100
    };
    
    const mockToken = "eyJraWQiOiJiVTNlUHRScnpOYTBocUJLSWpmWnFIVm5wcVBKTW5kODFxR3Vud1wvQ3VyWT0iLCJhbGciOiJSUzI1NiJ9..."; // Token truncado
    
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("token", mockToken);
    
    return {
      user: mockUser,
      token: mockToken
    };
  }
}

export const apiService = new APIService();