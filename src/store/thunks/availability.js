import { sendRequest } from '../../utils/api';
import { addAvailability } from '../actions/availability';
import setError from '../actions/error';

export const createAvailabilityOnDb = (params) => async (dispatch) => {
  const path = 'v1/bookings';

  try {
    const res = await sendRequest('post', path, params);
    dispatch(addAvailability(params));
    return res;
  } catch (err) {
    dispatch(setError(err));
  }
};
