import {
 ADD_BOOKING,
  LIST_BOOKINGS,
  SET_BOOKING_DATE,
  SET_BOOKING_TIME,
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

export const setBookingDate = (bookingDate) => ({
  type: SET_BOOKING_DATE,
  bookingDate,
});

export const setBookingTime = (bookingTime) => ({
  type: SET_BOOKING_TIME,
  bookingTime,
});

export const toggleSetAppointment = () => ({
  type: SETTING_APPOINTMENT,
});
