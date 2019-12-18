import { SETTING_APPOINTMENT } from '../actions/types';

export default (state = false, action) => {
  if (action.type === SETTING_APPOINTMENT) {
    return action.isBooking;
  }
  return state;
};
