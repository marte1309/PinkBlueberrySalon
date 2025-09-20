# Registration Module Integration

This document outlines the integration of the user registration functionality in the Pink Blueberry web application.

## Overview

The registration module allows new users to create accounts with the Pink Blueberry salon. It follows the Atomic Design methodology and integrates with the existing Redux state management.

## Features

- User registration with first name, last name, email, and password
- Optional phone number field
- Password strength requirements and validation
- Terms and conditions acceptance
- Social login integration placeholders
- Success/error notifications
- Redirect after successful registration
- Complete integration with authentication Redux store

## Files Created/Modified

### New Files

1. `/components/templates/RegisterPage/RegisterPage.tsx` - Main registration form template
2. `/components/templates/RegisterPage/index.ts` - Export file
3. `/pages/Register.tsx` - Page component that uses the template
4. `/hooks/useRegister.ts` - Custom hook for registration logic
5. `/__tests__/components/templates/RegisterPage.test.tsx` - Test for the registration page

### Modified Files

1. `/store/slices/authSlice.ts` - Added register actions and reducers

## Implementation Details

The registration form validates user input using Zod schema validation and includes:

- First Name (required)
- Last Name (required)
- Email (required, must be valid format)
- Phone (optional)
- Password (required, must include uppercase, lowercase, numbers, special characters)
- Confirm Password (must match password)
- Terms and Conditions acceptance (required)

The implementation follows best practices for form handling:

- Controlled inputs with React Hook Form
- Visual feedback on validation errors
- Loading state during submission
- Toast notifications for success/error
- Centralized authentication state management via Redux

## Redux Integration

The auth slice has been extended with new actions:

- `registerStart`: Sets loading state
- `registerSuccess`: Updates state with user and token after successful registration
- `registerFailure`: Handles registration errors

## Custom Hook

A reusable `useRegister` hook has been created to encapsulate registration logic:

```typescript
const { register, isLoading, error } = useRegister({
  redirectTo: '/',
  showToast: true,
  autoNavigate: true
});

// Usage
await register({
  firstName: 'Mariano',
  lastName: 'Rodriguez',
  email: 'mrd1309@gmail.com',
  password: 'M4rt31309$'
});
```

## Testing

The registration component is fully tested with Vitest and React Testing Library:

- Rendering of form elements
- Validation of required fields
- Form submission with valid data
- Integration with Redux store

## Usage

The registration page is accessible at `/register` and is linked from the login page.

---

Document created: September 20, 2025
