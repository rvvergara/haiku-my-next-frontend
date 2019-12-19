import decode from 'jwt-decode';
import redirect from 'next-redirect';
import moment from 'moment';
import { getCookie } from './cookie';
import { setAuthorizationToken } from './api';
import { fetchUserData } from '../store/thunks/user';

const redirectIfNoProfile = (ctx, data) => {
  if (!data.profile && !(ctx.pathname === '/profile/new')) {
    return redirect(ctx, '/profile/new');
  }
  if (ctx.pathname === '/login' || ctx.pathname === '/signup') {
    return redirect(ctx, '/');
  }
};

const redirectIfNoToken = (ctx) => {
  const { pathname } = ctx;
  if (!(pathname === '/' || pathname === '/signup' || pathname === '/login')) {
    return redirect(ctx, '/');
  }
};

const checkIfTokenExp = (decoded) => {
  const expirationTime = moment.unix(decoded.exp);
  const nowTime = moment.unix();
  console.log('IS ALREADY EXPIRED???', expirationTime < nowTime);
  return expirationTime < nowTime;
};

export default async (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const { req, store } = ctx;
      const { dispatch } = store;
      const token = getCookie('token', req);
      const decoded = decode(token);
      if (checkIfTokenExp(decoded)) {
        return redirectIfNoToken(ctx);
      }
      console.log('THIS SHOULD NOT APPEAR ANYMORE');
      const id = decoded.user_id;
      setAuthorizationToken(token);
      await dispatch(fetchUserData(id));
      const { data } = store.getState().currentUser;
      // return redirectIfNoProfile(ctx, data);
    }
    redirectIfNoToken(ctx);
  } else {
    try {
      const { token } = localStorage;
      if (token) {
        const decoded = decode(token);
        if (checkIfTokenExp(decoded)) {
          return redirectIfNoToken(ctx);
        }
        console.log('IN THE CLIENT THIS SHOULD NOT APPEAR');
        setAuthorizationToken(token);
        const { data } = ctx.store.getState().currentUser;
        // return redirectIfNoProfile(ctx, data);
      }
      return redirectIfNoToken(ctx);
    } catch (err) {
      throw new Error(err);
    }
  }
};
