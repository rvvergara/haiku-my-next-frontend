import { ADD_BOOKING, LIST_BOOKINGS, CONFIRM_BOOKING } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return [...state, action.booking];
    case LIST_BOOKINGS:
      return action.bookings;
    default:
      return state;
  }
};
