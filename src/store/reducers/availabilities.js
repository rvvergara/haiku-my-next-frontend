import availabilities from '../../Dummy/availabilites';
import { LIST_AVAILABILITIES } from '../actions/types';

export default (state = availabilities, action) => {
  switch (action.type) {
    case LIST_AVAILABILITIES:
      return action.availabilities;
    default:
      return state;
  }
};
