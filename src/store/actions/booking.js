import {
 ADD_BOOKING,
  LIST_BOOKINGS,
  SETTING_APPOINTMENT,
  CONFIRM_BOOKING,
} from './types';

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking,
});

export const listBookings = (bookings) => ({
  type: LIST_BOOKINGS,
  bookings,
});

export const toggleSetAppointment = (isBooking) => ({
  type: SETTING_APPOINTMENT,
  isBooking,
});

export const confirmBooking = (bookingId) => ({
  type: CONFIRM_BOOKING,
  bookingId,
});
