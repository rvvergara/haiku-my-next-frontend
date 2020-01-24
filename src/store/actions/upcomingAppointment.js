import { LIST_UPCOMING_APPOINTMENT } from './types';

export const listUpcomingAppointment = upcomingAppointment => ({
  type: LIST_UPCOMING_APPOINTMENT,
  upcomingAppointment,
});
