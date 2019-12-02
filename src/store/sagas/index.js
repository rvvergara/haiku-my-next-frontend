import { all } from 'redux-saga/effects';
import watchAsyncLogUser from './login';

export default function* rootSaga() {
  yield all([
    watchAsyncLogUser(),
  ]);
}
