import { SET_SESSION_START_TIME } from '../actions/types';

const initialState = '9:00 am';

export default (state = initialState, action) => {
  if (action.type === SET_SESSION_START_TIME) {
    return action.sessionStartTime;
  }
  return state;
};
