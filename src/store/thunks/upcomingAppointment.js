import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { listUpcomingAppointment } from '../actions/upcomingAppointment';

export const fetchUpcomingAppointment = (
  role,
  profileId,
) => async dispatch => {
  const path = `v1/${role.toLowerCase()}s/${profileId}/booking-slots?include=patient,practitioner&fromDate=01-01-2020&toDate=01-31-2020&status=CONFIRMED`;
  try {
    const res = await sendRequest('get', path);
    const bookingSlots = res.data.booking_slots;
    return dispatch(listUpcomingAppointment(bookingSlots));
  } catch (err) {
    setError(err);
  }
};
