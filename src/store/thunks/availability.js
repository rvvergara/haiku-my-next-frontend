import { sendRequest } from '../../utils/api';
import { localizeBookingSlot } from '../../utils/localize';
import { addAvailability, listAvailabilies, displayAvailability } from '../actions/availability';
import { confirmBooking, rejectBooking } from '../actions/booking';
import setError from '../actions/error';

export const createAvailabilityOnDb = (params) => async (dispatch) => {
  const path = 'v1/booking-slots';

  try {
    const res = await sendRequest('post', path, params);
    const { booking_slot } = res.data;
    const localizedBookingSlot = localizeBookingSlot(booking_slot);
    dispatch(addAvailability(localizedBookingSlot));
    return localizedBookingSlot;
  } catch (err) {
    return dispatch(setError(err));
  }
};

export const fetchPractitionerAvailabilities = (practitionerId,
  patientId,
  status) => async (dispatch) => {
  const path = `v1/practitioners/${practitionerId}/booking-slots?status=${status ? status.toUpperCase() : ''}&include=patient&patientId=${patientId || ''}`;

  try {
    const res = await sendRequest('get', path);
    const { booking_slots } = res.data;
    const localizedAvailabilities = booking_slots.map((slot) => localizeBookingSlot(slot));
    return dispatch(listAvailabilies(localizedAvailabilities));
  } catch (err) {
    return dispatch(setError(err));
  }
};

export const confirmBookingSlotInDb = (bookingSlotId) => async (dispatch) => {
  const path = `v1/booking-slots/${bookingSlotId}/confirm`;

  try {
    const res = await sendRequest('post', path);
    dispatch(confirmBooking(bookingSlotId));
    return res;
  } catch (err) {
    return dispatch(setError(err));
  }
};

export const rejectBookingSlotInDb = (bookingSlotId) => async (dispatch) => {
  const path = `v1/booking-slots/${bookingSlotId}/reject`;

  try {
    const res = await sendRequest('post', path);
    dispatch(rejectBooking(bookingSlotId));
    return res;
  } catch (err) {
    return dispatch(setError(err));
  }
};

export const fetchOneAvailability = (bookingSlotId) => async (dispatch) => {
  const path = `v1/booking-slots/${bookingSlotId}`;

  try {
    const res = await sendRequest('get', path);
    const { booking_slot } = res.data;
    dispatch(displayAvailability(localizeBookingSlot(booking_slot)));
  } catch (err) {
    dispatch(setError(err));
  }
};
