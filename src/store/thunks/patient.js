import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { fetchUserData } from './user';

export const createPatient = (params) => async (dispatch) => {
  const path = 'v1/patients';
  try {
    await sendRequest('post', path, params);
    dispatch(fetchUserData(params.userId));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const updatePatient = (patientId, params) => async (dispatch) => {
  const path = `v1/patients/${patientId}`;
  try {
    await sendRequest('put', path, params);
    dispatch(fetchUserData(params.userId));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};
