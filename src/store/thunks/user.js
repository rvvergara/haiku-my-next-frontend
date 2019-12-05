import { sendRequest, setAuthorizationToken } from '../../utils/api';
import { setCurrentUser } from '../actions/user';
import setError from '../actions/error';
import { setCookie, removeCookie } from '../../utils/cookie';

export const signup = (params) => async (dispatch) => {
  const path = 'v1/users';
  try {
    const res = await sendRequest('post', path, params);
    const { user, token } = await res.data;
    setCookie('token', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser({
      authenticated: true,
      data: user,
    }));
    return user;
  } catch (err) {
    dispatch(setError(err.response.data.error));
    throw new Error();
  }
};

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
    return user;
  } catch (err) {
    dispatch(setError(err.response.data.error));
    throw new Error();
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

// Function to fetch profile based on role and userID
const fetchUserProfile = async (id, role) => {
  const path = `v1/${role}/${id}/user`;

  try {
    const res = await sendRequest('get', path);
    return res;
  } catch (err) {
    throw Error();
  }
};

export const fetchUserData = (id) => async (dispatch) => {
  const path = `v1/user/${id}`;

  try {
    const res = await sendRequest('get', path);
    const user = await res.data;
    const { role } = user.user;
    // Fetch user's profile data (whether patient or practitioner)
    const profile = await fetchUserProfile(id, role);
    if (profile.data[role]) {
      // If user has a profile already add it to user data
      dispatch(setCurrentUser({
        authenticated: true,
        data: { ...user.user, profile: profile.data[role] },
      }));
    } else {
      // Redirect user to profile edit page
      dispatch(setCurrentUser({
        authenticated: true,
        data: user.user,
      }));
    }
  } catch (err) {
    dispatch(setError(err.response.data.error));
  }
};
