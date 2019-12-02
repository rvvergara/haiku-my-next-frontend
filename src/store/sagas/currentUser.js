import { put, takeLatest, call } from 'redux-saga/effects';
import { ASYNC_LOG_USER, ASYNC_FETCH_CURRENT_USER_DATA } from '../actions/types';
import { setCurrentUser } from '../actions/currentUser';
import setError from '../actions/error';
import { sendRequest, setAuthorizationToken } from '../../utils/api';
import { setCookie } from '../../utils/cookie';

function* currentUserError(error) {
  yield put(setError(error.error));
}

function* setupCurrentUser(user) {
  yield setCookie('token', user.token);
  yield setAuthorizationToken(user.token);
  yield put(setCurrentUser({
    authenticated: true,
    data: user.user,
  }));
}

function* asyncLogUser(action) {
  const path = 'v1/users/login';
  try {
    const response = yield call(sendRequest, 'post', path, action.params);
    const user = yield response.data;
    yield call(setupCurrentUser, user);
    yield put(setError(null));
    return user;
  } catch (err) {
    yield put(setCurrentUser({
      authenticated: false,
      data: {},
    }));

    return yield call(currentUserError, err);
  }
}

function* asyncFetchCurrentUserData(id) {
  const path = `v1/user/${id}`;

  try {
    const response = yield call(sendRequest, 'get', path);
    const user = yield response.data;
    yield put(setCurrentUser({
      authenticated: true,
      data: user.user,
    }));
    return user;
  } catch (err) {
    return yield call(currentUserError, err);
  }
}

export function* watchAsyncLogUser() {
  yield takeLatest(ASYNC_LOG_USER, asyncLogUser);
}

export function* watchFetchCurrentUserData() {
  yield takeLatest(ASYNC_FETCH_CURRENT_USER_DATA, asyncFetchCurrentUserData);
}
