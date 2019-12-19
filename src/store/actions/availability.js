import {
  LIST_AVAILABILITIES,
  REMOVE_AVAILABILITY,
  SET_SESSION_DATE,
  SET_SESSION_DURATION,
  SET_SESSION_START_TIME,
  DISPLAY_AVAILABILITY,
  ADD_AVAILABILITY,
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

export const setSessionStartTime = (sessionStartTime) => ({
  type: SET_SESSION_START_TIME,
  sessionStartTime,
});

export const addAvailability = (availability) => ({
  type: ADD_AVAILABILITY,
  availability,
});

export const displayAvailability = (availability) => ({
  type: DISPLAY_AVAILABILITY,
  availability,
});
