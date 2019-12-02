import { all } from 'redux-saga/effects';
import {
  watchAsyncLogUser,
  watchFetchCurrentUserData,
  watchAsyncSignUp,
} from './user';

export default function* rootSaga() {
  yield all([
    watchAsyncLogUser(),
    watchFetchCurrentUserData(),
    watchAsyncSignUp(),
  ]);
}
