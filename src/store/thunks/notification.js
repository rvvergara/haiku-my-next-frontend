import moment from 'moment';
import { sendRequest } from '../../utils/api';
import { localizeBookingSlot } from '../../utils/localize';
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
  const path = `v1/${role.toLowerCase()}s/${profileId}/booking-slots?include=patient,practitioner`;
  try {
    const res = await sendRequest('get', path);
    const bookingSlots = res.data.booking_slots;
    const notifications = bookingSlots.filter((slot) => (
        slot.status === 'CONFIRMED'
        && moment().add('7', 'days') >= moment(slot.date)
      ));
    const formattedNotifications = notifications.map((notification) => localizeBookingSlot(notification));
    return dispatch(listNotifications(formattedNotifications));
  } catch (err) {
    setError(err);
  }
};
