import moment from 'moment';
import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { listUpcomingAppointment } from '../actions/upcomingAppointment';
import { localizeBookingSlot } from '../../utils/localize';

export const fetchUpcomingAppointment = (
  role,
  profileId,
) => async (dispatch) => {
  const fromDate = moment().format('MM-DD-YYYY');
  const toDate = moment().endOf('isoWeek').format('MM-DD-YYYY');
  const path = `v1/${role.toLowerCase()}s/${profileId}/booking-slots?include=patient,practitioner&fromDate=${fromDate}&toDate=${toDate}&status=CONFIRMED`;
  try {
    const res = await sendRequest('get', path);
    const bookingSlots = res.data.booking_slots
      .filter((slot) => moment.utc(slot.endTime) >= moment.utc());
    const localizedSlots = bookingSlots.map((slot) => localizeBookingSlot(slot));
    return dispatch(listUpcomingAppointment(localizedSlots));
  } catch (err) {
    setError(err);
  }
};
