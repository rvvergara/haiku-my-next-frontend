import { LIST_NOTIFICATIONS, LIST_NOTIFICATION_PRACTITIONER } from './types';

export const listNotification = (notification) => ({
  type: LIST_NOTIFICATIONS,
  notification,
});

export const listNotificationPractitioner = (notifications) => ({
  type: LIST_NOTIFICATION_PRACTITIONER,
  notifications,
});
