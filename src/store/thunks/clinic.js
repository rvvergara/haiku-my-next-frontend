import { sendRequest } from '../../utils/api';

export const createClinic = params => async (dispatch) => {
  const path = 'v1/clinics';
  try {
    const res = await sendRequest('post', path, params);
    console.log(`This is a response ${res}`);
  } catch (error) {
    console.log(error);
  }
};
