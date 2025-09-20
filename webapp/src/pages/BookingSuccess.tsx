import { SuccessPage } from '@/components/templates/SuccessPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearBooking } from '@/store/slices/bookingSlice';

const BookingSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear booking state when the success page is loaded
    dispatch(clearBooking());
  }, [dispatch]);

  return <SuccessPage type="booking" />;
};

export default BookingSuccess;