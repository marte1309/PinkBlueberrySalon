import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutState {
  // Personal information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Billing information
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Payment information
  paymentMethod: 'credit-card' | 'paypal' | null;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  nameOnCard: string;
  
  // Special requirements (for service bookings)
  specialRequirements: string;
  
  // Progress tracking
  currentStep: number;
  
  // Terms and marketing
  acceptedTerms: boolean;
  marketingConsent: boolean;
}

const getStoredCheckout = (): Partial<CheckoutState> => {
  try {
    return JSON.parse(localStorage.getItem('checkout') || '{}');
  } catch {
    return {};
  }
};

const initialState: CheckoutState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'Mexico',
  paymentMethod: null,
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  nameOnCard: '',
  specialRequirements: '',
  currentStep: 1,
  acceptedTerms: false,
  marketingConsent: false,
  ...getStoredCheckout()
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<{
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    updateBillingInfo: (state, action: PayloadAction<{
      address1: string;
      address2: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    }>) => {
      state.address1 = action.payload.address1;
      state.address2 = action.payload.address2;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.postalCode = action.payload.postalCode;
      state.country = action.payload.country;
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    updatePaymentInfo: (state, action: PayloadAction<{
      paymentMethod: 'credit-card' | 'paypal';
      cardNumber?: string;
      cardExpiry?: string;
      cardCvc?: string;
      nameOnCard?: string;
    }>) => {
      state.paymentMethod = action.payload.paymentMethod;
      
      if (action.payload.paymentMethod === 'credit-card') {
        state.cardNumber = action.payload.cardNumber || state.cardNumber;
        state.cardExpiry = action.payload.cardExpiry || state.cardExpiry;
        state.cardCvc = action.payload.cardCvc || state.cardCvc;
        state.nameOnCard = action.payload.nameOnCard || state.nameOnCard;
      }
      
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    updateSpecialRequirements: (state, action: PayloadAction<string>) => {
      state.specialRequirements = action.payload;
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    nextStep: (state) => {
      state.currentStep += 1;
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    prevStep: (state) => {
      state.currentStep = Math.max(1, state.currentStep - 1);
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    updateTerms: (state, action: PayloadAction<{
      acceptedTerms: boolean;
      marketingConsent: boolean;
    }>) => {
      state.acceptedTerms = action.payload.acceptedTerms;
      state.marketingConsent = action.payload.marketingConsent;
      localStorage.setItem('checkout', JSON.stringify(state));
    },
    
    resetCheckout: (state) => {
      // Preserve only personal information for convenience
      const { firstName, lastName, email, phone, country } = state;
      Object.assign(state, {
        ...initialState,
        firstName,
        lastName,
        email,
        phone,
        country,
        currentStep: 1
      });
      localStorage.setItem('checkout', JSON.stringify(state));
    }
  }
});

export const {
  updatePersonalInfo,
  updateBillingInfo,
  updatePaymentInfo,
  updateSpecialRequirements,
  setCurrentStep,
  nextStep,
  prevStep,
  updateTerms,
  resetCheckout
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
