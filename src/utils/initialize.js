import decode from 'jwt-decode';
import { setLanguage } from '../store/actions/language';
import { setCurrentUser } from '../store/actions/user';
import { fetchPatientNotifications } from '../store/thunks/patient';
import { fetchPractitionerNotifications } from '../store/thunks/practitioner';
import { fetchUserData } from '../store/thunks/user';
import { setAuthorizationToken } from './api';
import { findIfCookiePresent, getCookie, removeCookie } from './cookie';
import {
  checkIfTokenExp,
  redirectIfNoProfile,
  redirectIfNoToken,
} from './initializeHelpers';

export default async ctx => {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      const cookiesArr = ctx.req.headers.cookie.split(';');
      const hasLangCookie = cookiesArr.some(cookie =>
        cookie.includes('next-i18next'),
      );
      if (hasLangCookie) {
        const langCookie = cookiesArr.find(cookie =>
          cookie.includes('next-i18next'),
        );
        const lang = langCookie.split('=')[1];
        ctx.store.dispatch(setLanguage(lang));
      }
    }
    if (ctx.req.headers.cookie && findIfCookiePresent(ctx.req, 'token')) {
      const { req, store } = ctx;
      const { dispatch } = store;
      const token = getCookie('token', req);
      const decoded = decode(token);
      if (checkIfTokenExp(decoded)) {
        removeCookie('token');
        setAuthorizationToken(null);
        dispatch(
          setCurrentUser({
            authenticated: false,
            data: {},
          }),
        );
        return redirectIfNoToken(ctx);
      }
      const id = decoded.user_id;
      setAuthorizationToken(token);
      await dispatch(fetchUserData(id));
      const { data } = store.getState().currentUser;
      redirectIfNoProfile(ctx, data);
      return data.role === 'PATIENT'
        ? dispatch(fetchPatientNotifications(data.patient.id))
        : dispatch(fetchPractitionerNotifications(data.practitioner.id));
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
        ctx.store.dispatch(
          setCurrentUser({
            authenticated: false,
            data: {},
          }),
        );
        return redirectIfNoToken(ctx);
      }
      setAuthorizationToken(token);
      const { data } = ctx.store.getState().currentUser;
      redirectIfNoProfile(ctx, data);
      return ctx.store.dispatch(fetchPatientNotifications(data.patient.id));
    }
    return redirectIfNoToken(ctx);
  } catch (err) {
    throw new Error(err);
  }
};
