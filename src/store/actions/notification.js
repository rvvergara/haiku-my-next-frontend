import { LIST_NOTIFICATION, LIST_NOTIFICATION_PRACTITIONER } from './types';

export const listNotification = notification => ({
  type: LIST_NOTIFICATION,
  notification,
});

export const listNotificationPractitioner = notifications => ({
  type: LIST_NOTIFICATION_PRACTITIONER,
  notifications,
});