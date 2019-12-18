import { SET_BOOKING_DATE } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SET_BOOKING_DATE) {
    return action.bookingDate;
  }
  return state;
};
