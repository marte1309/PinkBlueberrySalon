import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerPreferences {
  favoriteServices: string[];
  preferredStylist: string | null;
  communicationPreference: 'email' | 'sms' | 'both';
  appointmentReminders: boolean;
  marketingEmails: boolean;
}

interface AppointmentHistory {
  id: string;
  date: string;
  services: string[];
  stylist: string;
  total: number;
  status: 'completed' | 'cancelled' | 'upcoming';
}

interface CustomerState {
  preferences: CustomerPreferences;
  appointmentHistory: AppointmentHistory[];
  rewardTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  loading: boolean;
}

const getStoredCustomerData = () => {
  try {
    const stored = localStorage.getItem('customerPreferences');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const stored = getStoredCustomerData();

const initialState: CustomerState = {
  preferences: stored?.preferences || {
    favoriteServices: [],
    preferredStylist: null,
    communicationPreference: 'email',
    appointmentReminders: true,
    marketingEmails: false,
  },
  appointmentHistory: stored?.appointmentHistory || [],
  rewardTier: stored?.rewardTier || 'bronze',
  loading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<CustomerPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
      localStorage.setItem('customerPreferences', JSON.stringify({
        preferences: state.preferences,
        appointmentHistory: state.appointmentHistory,
        rewardTier: state.rewardTier,
      }));
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.preferences.favoriteServices.includes(action.payload)) {
        state.preferences.favoriteServices.push(action.payload);
        localStorage.setItem('customerPreferences', JSON.stringify({
          preferences: state.preferences,
          appointmentHistory: state.appointmentHistory,
          rewardTier: state.rewardTier,
        }));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.preferences.favoriteServices = state.preferences.favoriteServices.filter(
        id => id !== action.payload
      );
      localStorage.setItem('customerPreferences', JSON.stringify({
        preferences: state.preferences,
        appointmentHistory: state.appointmentHistory,
        rewardTier: state.rewardTier,
      }));
    },
    addAppointment: (state, action: PayloadAction<AppointmentHistory>) => {
      state.appointmentHistory.push(action.payload);
      localStorage.setItem('customerPreferences', JSON.stringify({
        preferences: state.preferences,
        appointmentHistory: state.appointmentHistory,
        rewardTier: state.rewardTier,
      }));
    },
    updateRewardTier: (state, action: PayloadAction<'bronze' | 'silver' | 'gold' | 'platinum'>) => {
      state.rewardTier = action.payload;
      localStorage.setItem('customerPreferences', JSON.stringify({
        preferences: state.preferences,
        appointmentHistory: state.appointmentHistory,
        rewardTier: state.rewardTier,
      }));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  updatePreferences,
  addToFavorites,
  removeFromFavorites,
  addAppointment,
  updateRewardTier,
  setLoading,
} = customerSlice.actions;

export default customerSlice.reducer;