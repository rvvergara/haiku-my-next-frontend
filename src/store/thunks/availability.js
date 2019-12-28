import { sendRequest } from '../../utils/api';
import { localizeBookingSlot } from '../../utils/localize';
import { addAvailability, listAvailabilies } from '../actions/availability';
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

export const fetchPractitionerAvailabilities = (practitionerId) => async (dispatch) => {
  const path = `v1/booking-slots/${practitionerId}/practitioner`;

  try {
    const res = await sendRequest('get', path);
    const { booking_slots } = res.data;
    const localizedAvailabilities = booking_slots.map((slot) => localizeBookingSlot(slot));
    return dispatch(listAvailabilies(localizedAvailabilities));
  } catch (err) {
    return dispatch(setError(err));
  }
};
