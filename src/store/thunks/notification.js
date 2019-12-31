import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { listNotification } from '../actions/notification';

export const fetchPatientNotification = patiendId => async dispatch => {
  const path = `v1/booking-slots/${patiendId}/patient`;
  try {
    const res = await sendRequest('get', path);
    dispatch(listNotification(res.data.booking_slots));
    return res.data;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};
