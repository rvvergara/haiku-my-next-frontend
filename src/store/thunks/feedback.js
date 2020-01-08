import { sendRequest } from '../../utils/api';
import setError from '../actions/error';

export const sendFeedback = params => async dispatch => {
  const path = 'v1/feedbacks';
  try {
    const res = await sendRequest('post', path, params);
    return res;
  } catch (error) {
    dispatch(setError(error));
    throw new Error();
  }
};
