import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { setCurrentUser } from '../actions/user';
import { listBookings } from '../actions/booking';
import { listNotifications } from '../actions/notification';
import { localizeBookingSlot } from '../../utils/localize';

export const createPatient = (params) => async (dispatch, getState) => {
  const path = 'v1/patients';
  try {
    const res = await sendRequest('post', path, params);
    const patient = res.data;
    const { currentUser } = getState();
    const updatedUserData = { ...currentUser.data, patient };
    dispatch(setCurrentUser({ ...currentUser, data: updatedUserData }));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const updatePatient = (patientId, params) => async (dispatch, getState) => {
  const path = `v1/patients/${patientId}`;
  try {
    const res = await sendRequest('put', path, params);
    const { patient } = res.data;
    const { currentUser } = getState();
    const updatedUserData = { ...currentUser.data, patient };
    dispatch(setCurrentUser({ ...currentUser, data: updatedUserData }));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const fetchPatientBookedSlot = (patiendId) => async (dispatch) => {
  const path = `v1/patients/${patiendId}/booking-slots?include=practitioner`;
  try {
    const res = await sendRequest('get', path);
    const { booking_slots } = res.data;
    return dispatch(listBookings(booking_slots));
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};

export const fetchPatient = (patientId) => async (dispatch) => {
  const path = `v1/patients/${patientId}`;

  try {
    const res = await sendRequest('get', path);
    const { patient } = res.data;
    return patient;
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};

export const fetchPatientNotifications = (patientId) => async (dispatch) => {
  const path = `v1/patients/${patientId}/notifications`;

  try {
    const res = await sendRequest('get', path);
    const { notifications } = res.data;
    const localizedNotifs = notifications.map((notif) => {
      if (notif.notifiableType === 'BOOKING_SLOT') {
        const localizedSlot = localizeBookingSlot(notif.notifiable);
        return { ...notif, notifiable: localizedSlot };
      }
    });
    return dispatch(listNotifications(localizedNotifs));
  } catch (err) {
    dispatch(setError(err));
  }
};
