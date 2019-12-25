import { sendRequest } from '../../utils/api';
import {
 addClinic, listClinics, setClinic, updateClinic,
} from '../actions/clinic';
import setError from '../actions/error';

export const createClinic = (params) => async (dispatch) => {
  const path = 'v1/clinics';
  try {
    const res = await sendRequest('post', path, params);
    const { clinic } = res.data;
    dispatch(addClinic(clinic));
    return clinic;
  } catch (error) {
    return dispatch(setError(error.response.data.error));
  }
};

export const changeClinic = (clinicId, params) => async (dispatch) => {
  const path = `v1/clinics/${clinicId}`;
  try {
    const res = await sendRequest('put', path, params);
    const changedClinic = res.data.clinic;
    dispatch(updateClinic(changedClinic));
    return changedClinic;
  } catch (err) {
    return dispatch(setError(err.response.data.error));
  }
};

export const fetchClinics = () => async (dispatch) => {
  const path = 'v1/clinics';
  try {
    const res = await sendRequest('get', path);
    dispatch(listClinics(res.data.clinics));
    return res.data.clinics;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};

export const fetchOneClinic = (clinicId) => async (dispatch) => {
  const path = `v1/clinics/${clinicId}`;
  try {
    const res = await sendRequest('get', path);
    const clinic = await res.data.clinic;
    dispatch(setClinic(clinic));
    return clinic;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};
