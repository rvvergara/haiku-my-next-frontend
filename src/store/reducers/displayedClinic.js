import { SET_CLINIC } from '../actions/types';

export default (state = {}, action) => {
  if (action.type === SET_CLINIC) {
    return action.clinic;
  }
  return state;
};
