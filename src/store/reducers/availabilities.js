import availabilities from '../../Dummy/availabilites';
import { LIST_AVAILABILITIES, REMOVE_AVAILABILITY, ADD_AVAILABILITY } from '../actions/types';

export default (state = availabilities, action) => {
  switch (action.type) {
    case LIST_AVAILABILITIES:
      return action.availabilities;
    case ADD_AVAILABILITY:
      return [...state, action.availability];
    case REMOVE_AVAILABILITY:
      return state.filter((avail) => avail.id !== action.id);
    default:
      return state;
  }
};
