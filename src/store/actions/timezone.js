import {
  SET_TIMEZONE_OFFSET
} from './types';

export const setLocalTimeZone = timezone => ({
  type: SET_TIMEZONE_OFFSET,
 timezone,
});