import { DISPLAY_AVAILABILITY } from '../actions/types';

export default (state = null, action) => {
  if (action.type === DISPLAY_AVAILABILITY) {
    return action.availability;
  }
  return state;
};
