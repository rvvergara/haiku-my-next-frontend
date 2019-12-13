import { combineReducers } from 'redux';
import currentUser from './currentUser';
import clinics from './clinic';
import error from './error';
import practitioners from './practitioners';
import displayedPractitioner from './displayedPractitioner';
import displayedClinic from './displayedClinic';

export default combineReducers({
  currentUser,
  error,
  clinics,
  practitioners,
  displayedPractitioner,
  displayedClinic,
});
