import { combineReducers } from 'redux';
import availabilities from './availabilities';
import bookings from './booking';
import clinics from './clinic';
import currentUser from './currentUser';
import displayedClinic from './displayedClinic';
import displayedPractitioner from './displayedPractitioner';
import error from './error';
import practitioners from './practitioners';
import sessionDate from './sessionDate';
import sessionDuration from './sessionDuration';
import sessionStartTime from './sessionStartTime';

export default combineReducers({
  currentUser,
  error,
  clinics,
  practitioners,
  displayedPractitioner,
  displayedClinic,
  availabilities,
  bookings,
  sessionDate,
  sessionDuration,
  sessionStartTime,
});
