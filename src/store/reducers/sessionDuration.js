import { SET_SESSION_DURATION } from '../actions/types';

export default (state = 30, action) => {
  if (action.type === SET_SESSION_DURATION) {
    return action.sessionDuration;
  }
  return state;
};
