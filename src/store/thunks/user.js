import { sendRequest, setAuthorizationToken } from '../../utils/api';
import { setCurrentUser } from '../actions/user';
import setError from '../actions/error';
import { setCookie, removeCookie } from '../../utils/cookie';

export const login = (params) => async (dispatch) => {
  const path = 'v1/users/login';

  try {
    const res = await sendRequest('post', path, params);
    const { user, token } = res.data;
    dispatch(setCurrentUser({
      authenticated: true,
      data: user,
    }));
    setAuthorizationToken(token);
    setCookie('token', token);
  } catch (err) {
    dispatch(setError('Invalid token'));
  }
};

export const logout = () => (dispatch) => {
  setAuthorizationToken(false);
  removeCookie('token');
  dispatch(setCurrentUser({
    authenticated: false,
    data: {},
  }));
};

export const fetchCurrentUserData = (id) => async (dispatch) => {
  const path = `v1/user/${id}`;

  try {
    const res = await sendRequest('get', path);
    const user = await res.data;
    dispatch(setCurrentUser({
      authenticated: true,
      data: user,
    }));
  } catch (err) {
    dispatch(setError(err));
  }
};
