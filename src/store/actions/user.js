import {
 SET_CURRENT_USER,
  ASYNC_LOG_USER,
  ASYNC_FETCH_CURRENT_USER_DATA,
  ASYNC_SIGNUP,
} from './types';

export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser
});

export const asyncLogUser = (params) => ({
  type: ASYNC_LOG_USER,
  params,
});

export const asyncFetchCurrentUserData = (id) => ({
  type: ASYNC_FETCH_CURRENT_USER_DATA,
  id,
});

export const asyncSignUp = (params) => ({
  type: ASYNC_SIGNUP,
  params,
});
