import { sendRequest } from '../../utils/api';
import { addClinic } from '../actions/clinic';
import setError from '../actions/error';

export const createClinic = (params) => async (dispatch) => {
  const path = 'v1/clinics';
  try {
    const res = await sendRequest('post', path, params);
    const { clinic } = res.data;
    dispatch(addClinic(clinic));
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};
