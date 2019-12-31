import { SET_SESSION_DATE } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SET_SESSION_DATE) {
    return action.sessionDate;
  }
  return state;
};
