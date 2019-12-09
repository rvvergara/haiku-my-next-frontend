import { all } from 'redux-saga/effects';
import {
  watchAsyncLogUser,
  watchFetchCurrentUserData,
  watchAsyncSignUp,
} from './user';
import { clinicSagas } from './clinicSagas'

export default function* rootSaga() {
  yield all([
    watchAsyncLogUser(),
    watchFetchCurrentUserData(),
    watchAsyncSignUp(),
    ...clinicSagas
  ]);
}
