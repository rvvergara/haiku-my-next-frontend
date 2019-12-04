import Router from 'next/router';
import decode from 'jwt-decode';
import { getCookie } from './cookie';
import { setAuthorizationToken } from './api';
import { fetchCurrentUserData } from '../store/thunks/user';

export default async (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const { req, store } = ctx;
      const { dispatch } = store;
      const token = getCookie('token', req);
      const id = decode(token).user_id;
      setAuthorizationToken(token);
      await dispatch(fetchCurrentUserData(id));
    }
  } else {
    try {
      const { token } = ctx.store.getState().currentUser.data;

      if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
        setTimeout(() => Router.push('/'), 0);
      }
    } catch (err) {
      err;
    }
  }
};
