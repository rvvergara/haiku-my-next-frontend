import { sendRequest, setAuthorizationToken } from '../../utils/api';
import { setCurrentUser } from '../actions/user';
import setError from '../actions/error';
import { setCookie, removeCookie } from '../../utils/cookie';

// Function to fetch profile based on role and userID
const fetchUserProfile = async (id, role) => {
  const path = `v1/${role}s/${id}/user`;
  try {
    const res = await sendRequest('get', path);
    return res;
  } catch (err) {
    return false;
  }
};

export const signup = (params) => async (dispatch) => {
  const path = 'v1/users';
  try {
    const res = await sendRequest('post', path, params);
    return res;
  } catch (err) {
    dispatch(setError(err.response.data.error));
    throw new Error();
  }
};

export const login = (params) => async (dispatch) => {
  const path = 'v1/login';

  try {
    const res = await sendRequest('post', path, params);
    const { user, token } = res.data;
    setAuthorizationToken(token);
    setCookie('token', token);
    localStorage.setItem('token', token);
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

export const logout = () => (dispatch) => {
  setAuthorizationToken(false);
  removeCookie('token');
  localStorage.clear();
  dispatch(setCurrentUser({
    authenticated: false,
    data: {},
  }));
};

export const fetchUserData = (id) => async (dispatch) => {
  const path = `v1/users/${id}`;
  try {
    const res = await sendRequest('get', path);
    const user = await res.data;
    const { role } = user.user;
    // Fetch user's profile data (whether patient or practitioner)
    const profile = await fetchUserProfile(id, role);
    if (profile) {
      // If user has a profile already add it to user data
      dispatch(setCurrentUser({
        authenticated: true,
        data: { ...user.user, [role.toLowerCase()]: profile.data[role.toLowerCase()], token: user.token },
      }));
    } else {
      // Redirect user to profile edit page
      dispatch(setCurrentUser({
        authenticated: true,
        data: { ...user.user, token: user.token },
      }));
    }
  } catch (err) {
    dispatch(setError(err.response.data));
  }
};
