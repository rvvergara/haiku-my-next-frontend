import moment from 'moment';
import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { listNotifications } from '../actions/notification';

export const fetchPatientNotification = (patiendId) => async (dispatch) => {
  const path = `v1/booking-slots/${patiendId}/patient`;
  try {
    const res = await sendRequest('get', path);
    // dispatch(listNotification(res.data.booking_slots));
    // return res.data;
  } catch (err) {
    return dispatch(setError(err));
  }
};

export const fetchUpcomingAppointment = (role, profileId) => async (dispatch) => {
  const path = `v1/${role.toLowerCase()}s/${profileId}/booking-slots`;
  try {
    const res = await sendRequest('get', path);
    const bookingSlots = res.data.booking_slots;
    const notifications = bookingSlots.filter((slot) => {
      console.log(moment().add('1', 'day') >= moment(slot.date));
      return slot.status === 'CONFIRMED' && (moment().add('7', 'days') >= moment(slot.date));
    });
    dispatch(listNotifications(notifications));
  } catch (err) {
    setError(err);
  }
};
