import { SET_SESSION_START_TIME } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SET_SESSION_START_TIME) {
    return action.sessionStartTime;
  }
  return state;
};
