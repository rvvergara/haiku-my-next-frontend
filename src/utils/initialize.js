import decode from 'jwt-decode';
import redirect from 'next-redirect';
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

export default async (ctx) => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const { req, store } = ctx;
      const { dispatch } = store;
      const token = getCookie('token', req);
      const id = decode(token).user_id;
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
