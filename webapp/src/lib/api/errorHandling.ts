import axios, { AxiosError } from 'axios';

/**
 * Helper function to extract error messages from Axios errors
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    // Extract response data message if available
    const responseData = axiosError.response?.data as { message?: string } | undefined;
    const responseMessage = responseData?.message;
    
    // Return most detailed message available
    return responseMessage || axiosError.message || 'An error occurred';
  }
  
  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};

/**
 * Generic API error handler for consistent error handling
 * 
 * @param error The caught error
 * @param customMessages Optional map of status codes to custom error messages
 * @returns Error with appropriate message
 */
export const handleApiError = (
  error: unknown, 
  customMessages: Record<number, string> = {}
): Error => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 0;
    
    // Check if there's a custom message for this status code
    if (status in customMessages) {
      return new Error(customMessages[status]);
    }

    // Default error messages by status code
    if (status === 400) {
      return new Error('Bad request. Please check your input.');
    } else if (status === 401) {
      return new Error('Authentication required. Please login again.');
    } else if (status === 403) {
      return new Error('You do not have permission to perform this action.');
    } else if (status === 404) {
      return new Error('The requested resource was not found.');
    } else if (status === 409) {
      return new Error('A conflict occurred. This resource may already exist.');
    } else if (status === 422) {
      return new Error('Validation failed. Please check your input.');
    } else if (status === 429) {
      return new Error('Too many requests. Please try again later.');
    } else if (status >= 500) {
      return new Error('Server error. Please try again later.');
    }
    
    // Extract message from response if available
    const responseData = error.response?.data as { message?: string } | undefined;
    return new Error(responseData?.message || error.message || 'An API error occurred');
  }
  
  // Handle non-Axios errors
  if (error instanceof Error) {
    return error;
  }
  
  return new Error('An unknown error occurred');
};

/**
 * Type for defining custom error messages by status code
 */
export type ApiErrorMessages = Record<number, string>;
