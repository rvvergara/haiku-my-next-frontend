import {
  LIST_NOTIFICATIONS,
  LIST_NOTIFICATION_PRACTITIONER,
} from '../actions/types';

// Temporarily set notification from local file

export default (state = [], action) => {
  switch (action.type) {
    case LIST_NOTIFICATIONS:
      return action.notifications;
    case LIST_NOTIFICATION_PRACTITIONER:
      return action.booking_slots;
    default:
      return state;
  }
};
