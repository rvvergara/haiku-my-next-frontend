import { all } from 'redux-saga/effects';
import { watchAsyncLogUser, watchFetchCurrentUserData } from './currentUser';

export default function* rootSaga() {
  yield all([
    watchAsyncLogUser(),
    watchFetchCurrentUserData(),
  ]);
}
