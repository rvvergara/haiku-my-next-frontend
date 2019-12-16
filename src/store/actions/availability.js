import { LIST_AVAILABILITIES } from './types';

export const listAvailabilies = availabilities => ({
  type: LIST_AVAILABILITIES,
  availabilities,
});
