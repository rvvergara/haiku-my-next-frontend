import { combineReducers } from 'redux';
import currentUser from './currentUser';
import clinics from './clinic'
import error from './error';

export default combineReducers({
  currentUser,
  error,
  clinics
});
