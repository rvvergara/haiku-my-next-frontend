import uuid from 'uuid';
import {
  ADD_AVAILABILITY,
  LIST_AVAILABILITIES,
  REMOVE_AVAILABILITY,
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
    default:
      return state;
  }
};
