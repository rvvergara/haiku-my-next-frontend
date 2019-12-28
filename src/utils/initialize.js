import decode from 'jwt-decode';
import { getCookie, removeCookie } from './cookie';
import { setAuthorizationToken } from './api';
import { fetchUserData } from '../store/thunks/user';
import { setCurrentUser } from '../store/actions/user';
import { checkIfTokenExp, redirectIfNoProfile, redirectIfNoToken } from './initializeHelpers';

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
    return redirectIfNoToken(ctx);
  }
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
};
