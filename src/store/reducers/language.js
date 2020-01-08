import { SET_LANGUAGE } from '../actions/types';

export default (state = '', action) => {
  if (action.type === SET_LANGUAGE) {
    return action.language;
  }
  return state;
};
