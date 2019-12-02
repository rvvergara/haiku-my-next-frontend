import { all } from 'redux-saga/effects';
import { watchAsyncLogUser, watchFetchCurrentUserData } from './user';

export default function* rootSaga() {
  yield all([
    watchAsyncLogUser(),
    watchFetchCurrentUserData(),
  ]);
}
