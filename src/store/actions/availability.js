import {
  LIST_AVAILABILITIES,
  REMOVE_AVAILABILITY,
  SET_SESSION_DATE,
  SET_SESSION_DURATION,
} from './types';

export const listAvailabilies = (availabilities) => ({
  type: LIST_AVAILABILITIES,
  availabilities,
});

export const removeAvailability = (id) => ({
  type: REMOVE_AVAILABILITY,
  id,
});

export const setSessionDate = (sessionDate) => ({
  type: SET_SESSION_DATE,
  sessionDate,
});

export const setSessionDuration = (sessionDuration) => ({
  type: SET_SESSION_DURATION,
  sessionDuration,
});
