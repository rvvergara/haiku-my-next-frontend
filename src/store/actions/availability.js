import { LIST_AVAILABILITIES, REMOVE_AVAILABILITY } from './types';

export const listAvailabilies = (availabilities) => ({
  type: LIST_AVAILABILITIES,
  availabilities,
});

export const removeAvailability = (id) => ({
  type: REMOVE_AVAILABILITY,
  id,
});
