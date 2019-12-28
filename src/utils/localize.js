import moment from 'moment';

export const localizeBookingSlot = (booking_slot) => {
  const { date, startTime, endTime } = booking_slot;
  const localizedDate = moment(date).format('MMMM DD, YYYY');
  const localizedStartTime = moment(startTime).local().format('LT');
  const localizedEndTime = moment(endTime).local().format('LT');
  return {
    ...booking_slot,
    date: localizedDate,
    startTime: localizedStartTime,
    endTime: localizedEndTime,
  };
};
