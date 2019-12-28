import decode from 'jwt-decode';
import redirect from 'next-redirect';
import moment from 'moment';
import { getCookie, removeCookie } from './cookie';
import { setAuthorizationToken } from './api';
import { fetchUserData } from '../store/thunks/user';
import { setCurrentUser } from '../store/actions/user';

const redirectIfNoProfile = (ctx, data) => {
  if (!(data.patient || data.practitioner) && !(ctx.pathname === '/profile/new')) {
    return redirect(ctx, '/profile/new');
  }
  if (ctx.pathname === '/login' || ctx.pathname === '/signup') {
    return redirect(ctx, '/');
  }
};

const redirectIfNoToken = (ctx) => {
  const { pathname } = ctx;
  if (!(pathname === '/' || pathname === '/signup' || pathname === '/login' || pathname === '/verify' || pathname === '/verify-account' || pathname === '/reverification-sent')) {
    return redirect(ctx, '/');
  }
};

const checkIfTokenExp = (decoded) => {
  const expirationTime = moment.unix(decoded.exp);
  const nowTime = moment();
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
        removeCookie('token');
        setAuthorizationToken(null);
        dispatch(setCurrentUser({
          authenticated: false,
          data: {},
        }));
        return redirectIfNoToken(ctx);
      }
      const id = decoded.user_id;
      setAuthorizationToken(token);
      await dispatch(fetchUserData(id));
      const { data } = store.getState().currentUser;
      return redirectIfNoProfile(ctx, data);
    }
    redirectIfNoToken(ctx);
  } else {
    try {
      const { token } = localStorage;
      if (token) {
        const decoded = decode(token);
        if (checkIfTokenExp(decoded)) {
          removeCookie('token');
          localStorage.clear();
          setAuthorizationToken(null);
          ctx.store.dispatch(setCurrentUser({
            authenticated: false,
            data: {},
          }));
          return redirectIfNoToken(ctx);
        }
        setAuthorizationToken(token);
        const { data } = ctx.store.getState().currentUser;
        return redirectIfNoProfile(ctx, data);
      }
      return redirectIfNoToken(ctx);
    } catch (err) {
      throw new Error(err);
    }
  }
};
