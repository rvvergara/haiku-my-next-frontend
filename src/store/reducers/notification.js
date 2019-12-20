import notification from '../../Dummy/notification';
import { LIST_NOTIFICATION } from '../actions/types';

// Temporarily set notification from local file

export default (state = notification, action) => {
  switch (action.type) {
    case LIST_NOTIFICATION:
      return action.notification;
    default:
      return state;
  }
};
