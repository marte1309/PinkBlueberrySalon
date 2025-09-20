import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceItem {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  category: 'cut' | 'color' | 'treatment' | 'styling';
}

interface Stylist {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  rating: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingState {
  selectedServices: ServiceItem[];
  selectedStylist: Stylist | null;
  selectedDate: string | null;
  selectedTime: string | null;
  customerNotes: string;
  totalDuration: number;
  totalPrice: number;
  availableSlots: TimeSlot[];
  loading: boolean;
}

const getStoredBooking = () => {
  try {
    const stored = localStorage.getItem('currentBooking');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const stored = getStoredBooking();

const initialState: BookingState = {
  selectedServices: stored.selectedServices || [],
  selectedStylist: stored.selectedStylist || null,
  selectedDate: stored.selectedDate || null,
  selectedTime: stored.selectedTime || null,
  customerNotes: stored.customerNotes || '',
  totalDuration: stored.totalDuration || 0,
  totalPrice: stored.totalPrice || 0,
  availableSlots: [],
  loading: false,
};

const calculateTotals = (services: ServiceItem[]) => {
  return {
    totalDuration: services.reduce((sum, service) => sum + service.duration, 0),
    totalPrice: services.reduce((sum, service) => sum + service.price, 0),
  };
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addService: (state, action: PayloadAction<ServiceItem>) => {
      const existingService = state.selectedServices.find(s => s.id === action.payload.id);
      if (!existingService) {
        state.selectedServices.push(action.payload);
        const totals = calculateTotals(state.selectedServices);
        state.totalDuration = totals.totalDuration;
        state.totalPrice = totals.totalPrice;
        
        localStorage.setItem('currentBooking', JSON.stringify({
          ...state,
          availableSlots: [], // Don't store slots
          loading: false,
        }));
      }
    },
    removeService: (state, action: PayloadAction<string>) => {
      state.selectedServices = state.selectedServices.filter(s => s.id !== action.payload);
      const totals = calculateTotals(state.selectedServices);
      state.totalDuration = totals.totalDuration;
      state.totalPrice = totals.totalPrice;
      
      localStorage.setItem('currentBooking', JSON.stringify({
        ...state,
        availableSlots: [],
        loading: false,
      }));
    },
    selectStylist: (state, action: PayloadAction<Stylist>) => {
      state.selectedStylist = action.payload;
      localStorage.setItem('currentBooking', JSON.stringify({
        ...state,
        availableSlots: [],
        loading: false,
      }));
    },
    selectDateTime: (state, action: PayloadAction<{ date: string; time: string }>) => {
      state.selectedDate = action.payload.date;
      state.selectedTime = action.payload.time;
      localStorage.setItem('currentBooking', JSON.stringify({
        ...state,
        availableSlots: [],
        loading: false,
      }));
    },
    updateCustomerNotes: (state, action: PayloadAction<string>) => {
      state.customerNotes = action.payload;
      localStorage.setItem('currentBooking', JSON.stringify({
        ...state,
        availableSlots: [],
        loading: false,
      }));
    },
    setAvailableSlots: (state, action: PayloadAction<TimeSlot[]>) => {
      state.availableSlots = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearBooking: (state) => {
      Object.assign(state, {
        selectedServices: [],
        selectedStylist: null,
        selectedDate: null,
        selectedTime: null,
        customerNotes: '',
        totalDuration: 0,
        totalPrice: 0,
        availableSlots: [],
        loading: false,
      });
      localStorage.removeItem('currentBooking');
    },
  },
});

export const {
  addService,
  removeService,
  selectStylist,
  selectDateTime,
  updateCustomerNotes,
  setAvailableSlots,
  setLoading,
  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;