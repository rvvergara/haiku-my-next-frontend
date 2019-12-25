import moment from 'moment';
import { sendRequest } from '../../utils/api';
import { addAvailability } from '../actions/availability';
import setError from '../actions/error';

export const createAvailabilityOnDb = (params) => async (dispatch) => {
  const path = 'v1/booking-slots';

  try {
    const res = await sendRequest('post', path, params);
    const { booking_slot } = res.data;
    const { date, startTime, endTime } = booking_slot;
    const localizedDate = moment(date).format('MMMM DD, YYYY');
    const localizedStartTime = moment(startTime).local().format('LT');
    const localizedEndTime = moment(endTime).local().format('LT');
    const localizedBookingSlot = {
      ...booking_slot,
     date: localizedDate,
     startTime: localizedStartTime,
     endTime: localizedEndTime,
   };
    dispatch(addAvailability(localizedBookingSlot));
    return localizedBookingSlot;
  } catch (err) {
    dispatch(setError(err));
  }
};
