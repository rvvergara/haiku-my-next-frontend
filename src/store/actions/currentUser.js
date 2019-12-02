import { SET_CURRENT_USER, ASYNC_LOG_USER } from './types';

export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser,
});

export const asyncLogUser = (params) => ({
  type: ASYNC_LOG_USER,
  params,
});
