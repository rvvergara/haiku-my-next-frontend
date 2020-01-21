import { LIST_NOTIFICATIONS, LIST_NOTIFICATION_PRACTITIONER } from './types';

export const listNotifications = (notifications) => ({
  type: LIST_NOTIFICATIONS,
  notifications,
});

export const listNotificationPractitioner = (notifications) => ({
  type: LIST_NOTIFICATION_PRACTITIONER,
  notifications,
});
