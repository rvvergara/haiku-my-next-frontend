import {
 ADD_BOOKING,
  LIST_BOOKINGS,
  SETTING_APPOINTMENT,
} from './types';

export const addBooking = (booking) => ({
  type: ADD_BOOKING,
  booking,
});

export const listBookings = (bookings) => ({
  type: LIST_BOOKINGS,
  bookings,
});

export const toggleSetAppointment = () => ({
  type: SETTING_APPOINTMENT,
});
