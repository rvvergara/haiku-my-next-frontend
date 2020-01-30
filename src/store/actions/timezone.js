import {
  SET_TIMEZONE_OFFSET
} from './types';

export const getLocalTimeZone = timezone => ({
  type: SET_TIMEZONE_OFFSET,
 timezone,
});