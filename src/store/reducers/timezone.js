import { SET_TIMEZONE_OFFSET } from '../actions/types';

export default (state = 0, action) => {
  switch (action.type) {
    case SET_TIMEZONE_OFFSET:
      return action.timezone;
    default:
      return state;
  }
};
