import { sendRequest } from '../../utils/api';
import setError from '../actions/error';

export const uploadPic = (params) => async (dispatch) => {
  const path = 'v1/upload/image';
  try {
    const uploadRes = await sendRequest('post', path, params, { files: params.files });
    const image = uploadRes.data.location[0];
    return image;
  } catch (err) {
    return dispatch(setError(err.response.data));
  }
};
