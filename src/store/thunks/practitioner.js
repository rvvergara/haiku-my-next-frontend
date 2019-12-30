import { listNotificationPractitioner } from '../actions/notification';
import { sendRequest } from '../../utils/api';
import setError from '../actions/error';
import { listPractitioners, setPractitioner } from '../actions/practitioners';
import { setCurrentUser } from '../actions/user';

export const createPractitioner = (params) => async (dispatch, getState) => {
  const path = 'v1/practitioners';
  try {
    const res = await sendRequest('post', path, params);
    const { practitioner } = res.data;
    const { currentUser } = getState();
    const updatedUserData = { ...currentUser.data, practitioner };
    dispatch(setCurrentUser({ ...currentUser, data: updatedUserData }));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const updatePractitioner = (practitionerId, params) => async (
  dispatch,
  getState,
) => {
  const path = `v1/practitioners/${practitionerId}`;
  try {
    const res = await sendRequest('put', path, params);
    const { practitioner } = res.data;
    const { currentUser } = getState();
    const updatedUserData = { ...currentUser.data, practitioner };
    dispatch(setCurrentUser({ ...currentUser, data: updatedUserData }));
  } catch (err) {
    dispatch(setError(err.response.data));
    throw new Error();
  }
};

export const fetchPractitionersByClinicId = (clinicId) => async (dispatch) => {
  const path = `v1/practitioners/${clinicId}/clinic`;
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

export const fetchPractitionerBookedSlot = (practitionerId) => async (dispatch) => {
  const path = `v1/practitioners/${practitionerId}/booking-slots`;
  try {
    const res = await sendRequest('get', path);
    listNotificationPractitioner(res.data);
    return res.data;
  } catch (err) {
    return dispatch(setError(err));
  }
};
