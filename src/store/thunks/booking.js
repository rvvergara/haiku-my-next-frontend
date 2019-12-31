import { sendRequest } from '../../utils/api';
import { addBooking } from '../actions/booking';
import setError from '../actions/error';

export const bookSlot = (params, slotId) => async (dispatch) => {
  const path = `v1/booking-slots/${slotId}/book`;

  try {
    const res = await sendRequest('post', path, params);
    const bookedSlot = await res.data.booking_slot;
    dispatch(addBooking(bookedSlot));
  } catch (err) {
    dispatch(setError(err));
  }
};
