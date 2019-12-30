import uuid from 'uuid';
import {
  ADD_AVAILABILITY,
  LIST_AVAILABILITIES,
  REMOVE_AVAILABILITY,
  BOOK_AVAILABILITY,
  CONFIRM_BOOKING,
  REJECT_BOOKING,
} from '../actions/types';

// Temporarily setting id for new availabilities until we connect to backend

export default (state = [], action) => {
  switch (action.type) {
    case LIST_AVAILABILITIES:
      return action.availabilities;
    case ADD_AVAILABILITY:
      return [...state, { ...action.availability, id: uuid(), booked: false }];
    case REMOVE_AVAILABILITY:
      return state.filter((avail) => avail.id !== action.id);
    case BOOK_AVAILABILITY:
      {
        const indexToBook = state.findIndex((avail) => avail.id === action.availabilityId);
        const bookedSlot = { ...state[indexToBook], patientId: action.patientId, remarks: action.remarks };
        const newState = [...state];
        newState[indexToBook] = bookedSlot;
        return newState;
      }
      case CONFIRM_BOOKING:
        {
          const indexToConfirm = state.findIndex((slot) => slot.id === action.bookingId);

          const newState = [...state];
          const confirmedSlot = { ...newState[indexToConfirm], status: 'CONFIRMED' };
          newState[indexToConfirm] = confirmedSlot;
          return newState;
        }
        case REJECT_BOOKING:
        {
          const indexToConfirm = state.findIndex((slot) => slot.id === action.bookingId);

          const newState = [...state];
          const rejectedSlot = { ...newState[indexToConfirm], status: 'REJECTED' };
          newState[indexToConfirm] = rejectedSlot;
          return newState;
        }
    default:
      return state;
  }
};
