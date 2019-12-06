import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { fetchUserData } from './user';

export const createPractitioner = (params) => async (dispatch) => {
  const path = 'v1/practitioners';
  try {
    await sendRequest('post', path, params);
    dispatch(fetchUserData(params.userId));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const updatePractitioner = (practitionerId, params) => async (dispatch) => {
  const path = `v1/practitioner/${practitionerId}`;
  try {
    await sendRequest('put', path, params);
    dispatch(fetchUserData(params.userId));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};
