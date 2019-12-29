import { ADD_BOOKING, LIST_BOOKINGS, CONFIRM_BOOKING } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return [...state, action.booking];
    case LIST_BOOKINGS:
      return action.bookings;
    case CONFIRM_BOOKING:
      {
        const indexToConfirm = state.findIndex((slot) => slot.id === action.bookingId);
        const newState = [...state];
        const confirmedSlot = { ...newState[indexToConfirm], status: 'CONFIRMED' };
        newState[indexToConfirm] = confirmedSlot;
        return newState;
      }
    default:
      return state;
  }
};
