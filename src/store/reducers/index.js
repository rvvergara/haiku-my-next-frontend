import { combineReducers } from 'redux';
import currentUser from './currentUser';
import clinicReducers from './clinicReducers';
import error from './error';

export default combineReducers({
  currentUser,
  error,
  clinicReducers
});
