import {
  LIST_NOTIFICATION,
  LIST_NOTIFICATION_PRACTITIONER,
} from '../actions/types';

// Temporarily set notification from local file

export default (state = {}, action) => {
  switch (action.type) {
    case LIST_NOTIFICATION:
      return action.notification;
    case LIST_NOTIFICATION_PRACTITIONER:
      return action.booking_slots;
    default:
      return state;
  }
};
