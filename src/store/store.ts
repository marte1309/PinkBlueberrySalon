import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import cartSlice from './slices/cartSlice';
import bookingSlice from './slices/bookingSlice';
import customerSlice from './slices/customerSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    booking: bookingSlice,
    customer: customerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;