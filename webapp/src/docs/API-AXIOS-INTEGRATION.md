# API Integration with Axios

This document outlines the changes made to migrate the Pink Blueberry API service from Fetch to Axios.

## Overview

The API service has been updated to use Axios instead of Fetch for making HTTP requests. Axios provides a more robust and feature-rich API for handling HTTP requests, including better error handling, interceptors, and request/response transformations.

## Changes Made

### 1. API Service Implementation

The base API service has been completely rewritten to use Axios:

- Created an Axios instance with default configuration
- Added request interceptors for authentication
- Added response interceptors for error handling
- Improved error handling with consistent error messages
- Added support for request cancellation
- Added timeout configuration

### 2. Error Handling

A new error handling utility has been created to provide consistent error handling across all API calls:

- Centralized error handling in a single utility
- Custom error messages for specific HTTP status codes
- Better error messages for common API errors
- Consistent error handling pattern across all services

### 3. Authentication Service

All authentication service methods have been updated to use the new error handling utility:

- Login
- Registration
- Password reset
- Token refresh
- Profile updates

## Benefits of Axios

1. **Better Error Handling**: Axios provides more detailed error information, making it easier to handle different types of errors.
2. **Interceptors**: Axios allows us to intercept requests and responses to add common functionality like authentication or error handling.
3. **Request Cancellation**: Axios supports request cancellation using cancel tokens.
4. **Automatic JSON Transformation**: Axios automatically transforms request and response data to/from JSON.
5. **Browser and Node.js Support**: Axios works the same way in both browser and Node.js environments.
6. **Better TypeScript Support**: Axios has better TypeScript support than the Fetch API.

## Usage Examples

### Making API Requests

```typescript
// GET request
const users = await apiService.get<User[]>('/users');

// POST request with data
const newUser = await apiService.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// PUT request to update a resource
const updatedUser = await apiService.put<User>('/users/123', {
  name: 'Jane Doe'
});

// DELETE request
await apiService.delete('/users/123');
```

### Error Handling

```typescript
try {
  const result = await apiService.post('/some-endpoint', data);
  // Handle success
} catch (error) {
  // Use the error handling utility
  throw handleApiError(error, {
    400: 'Custom error message for 400 status',
    404: 'Custom error message for 404 status'
  });
}
```

## Best Practices

1. **Always use try/catch**: Always wrap API calls in try/catch blocks to handle errors properly.
2. **Use the error handling utility**: Use the `handleApiError` utility for consistent error handling.
3. **Add custom error messages**: Add custom error messages for specific status codes when needed.
4. **Use TypeScript generics**: Use TypeScript generics to type the API responses correctly.

---

Document created: September 20, 2025
