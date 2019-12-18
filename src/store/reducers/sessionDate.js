import moment from 'moment';
import { SET_SESSION_DATE } from '../actions/types';

const initialState = moment().format('MMMM D, YYYY');

export default (state = initialState, action) => {
  if (action.type === SET_SESSION_DATE) {
    return action.sessionDate;
  }
  return state;
};
