import { combineReducers } from 'redux';
import alert from './alert';
import availabilities from './availabilities';
import bookings from './booking';
import clinics from './clinic';
import currentUser from './currentUser';
import displayedAvailability from './displayedAvailability';
import displayedClinic from './displayedClinic';
import displayedPractitioner from './displayedPractitioner';
import error from './error';
import language from './language';
import notifications from './notifications';
import practitioners from './practitioners';
import sessionDate from './sessionDate';
import sessionDuration from './sessionDuration';
import sessionStartTime from './sessionStartTime';
import settingAppointment from './settingAppointment';
import upcomingAppointment from './upcomingApppointment';

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
  alert,
  settingAppointment,
  displayedAvailability,
  notifications,
  language,
  upcomingAppointment,
});
