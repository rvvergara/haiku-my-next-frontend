import uuid from 'uuid';
import {
  ADD_AVAILABILITY,
  LIST_AVAILABILITIES,
  REMOVE_AVAILABILITY,
  BOOK_AVAILABILITY,
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
    default:
      return state;
  }
};
