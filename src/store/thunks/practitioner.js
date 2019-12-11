import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { fetchUserData } from './user';
import {listPractitioners} from '../actions/practitioners'

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

export const fetchPractitioners = () => async (dispatch) => {
  const path = 'v1/practitioners';
  try {
    const res = await sendRequest('get', path);
    dispatch(listPractitioners(res.data.practitioners));
    return res.data.practitioners;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};
