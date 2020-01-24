import { LIST_UPCOMING_APPOINTMENT } from '../actions/types';

// Temporarily set notification from local file

export default (state = [], action) => {
  switch (action.type) {
    case LIST_UPCOMING_APPOINTMENT:
      return action.upcomingAppointment;
    default:
      return state;
  }
};
