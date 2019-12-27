import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { fetchUserData } from './user';
import { listPractitioners, setPractitioner } from '../actions/practitioners';

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
  const path = `v1/practitioners/${practitionerId}`;
  try {
    await sendRequest('put', path, params);
    dispatch(fetchUserData(params.userId));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const fetchPractitionersByClinicId = () => async (dispatch) => {
  console.log('Im called');
  const path = 'v1/practitioners';
  try {
    const res = await sendRequest('get', path);
    dispatch(listPractitioners(res.data.practitioners));
    return res.data.practitioners;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};


export const fetchOnePractitioner = (practitionerId) => async (dispatch) => {
  const path = `v1/practitioners/${practitionerId}`;
  try {
    const res = await sendRequest('get', path);
    dispatch(setPractitioner(res.data.practitioner));
    return res.data;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};
