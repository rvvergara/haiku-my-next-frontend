import moment from 'moment';
import {
  ADD_AVAILABILITY,
  BOOK_AVAILABILITY,
  CONFIRM_BOOKING,
  LIST_AVAILABILITIES,
  REJECT_BOOKING,
  REMOVE_AVAILABILITY,
} from '../actions/types';

// Temporarily setting id for new availabilities until we connect to backend

export default (state = [], action) => {
  switch (action.type) {
    case LIST_AVAILABILITIES:
      return action.availabilities.sort((x, y) => {
        if (moment(x.date) < moment(y.date)) {
          return -1;
        }
        if (moment(x.date) > moment(y.date)) {
          return 1;
        }
        return 0;
      });
    case ADD_AVAILABILITY:
      return [
        ...state,
        { ...action.availability, patientId: null },
      ];
    case REMOVE_AVAILABILITY:
      return state.filter((avail) => avail.id !== action.id);
    case BOOK_AVAILABILITY: {
      const indexToBook = state.findIndex(
        (avail) => avail.id === action.availabilityId,
      );
      const bookedSlot = {
        ...state[indexToBook],
        patientId: action.patientId,
        remarks: action.remarks,
      };
      const newState = [...state];
      newState[indexToBook] = bookedSlot;
      return newState;
    }
    case CONFIRM_BOOKING: {
      const indexToConfirm = state.findIndex(
        (slot) => slot.id === action.bookingId,
      );

      const newState = [...state];
      const confirmedSlot = {
        ...newState[indexToConfirm],
        status: 'CONFIRMED',
      };
      newState[indexToConfirm] = confirmedSlot;
      return newState;
    }
    case REJECT_BOOKING: {
      const indexToConfirm = state.findIndex(
        (slot) => slot.id === action.bookingId,
      );

      const newState = [...state];
      const rejectedSlot = { ...newState[indexToConfirm], status: 'REJECTED' };
      newState[indexToConfirm] = rejectedSlot;
      return newState;
    }
    default:
      return state;
  }
};
