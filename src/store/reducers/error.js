import { SET_ERROR } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SET_ERROR) {
    return action.error;
  }
  return state;
};
