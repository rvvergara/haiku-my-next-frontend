import { put, takeLatest, call } from 'redux-saga/effects';
import { ASYNC_LOG_USER } from '../actions/types';
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
  const path = '/users/login';
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

export default function* watchAsyncLogUser() {
  yield takeLatest(ASYNC_LOG_USER, asyncLogUser);
}
