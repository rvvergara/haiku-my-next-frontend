import { SET_BOOKING_TIME } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SET_BOOKING_TIME) {
    return action.bookingTime;
  }
  return state;
};
